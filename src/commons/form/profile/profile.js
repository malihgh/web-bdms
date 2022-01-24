import React, { useState, useEffect } from 'react';
import * as Style from './styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ProfileHeader from './components/profileHeader';
import ProfileLayers from './components/profileLayers';
import ProfileInfo from './components/profileInfo';
import ProfileAttributes from './components/profileAttributes';
import _ from 'lodash';

import {
  // getStratigraphies,
  getStratigraphy,
  getLayers,
  deleteLayer,
  addBedrock,
  gapLayer,
  createLayer,
  patchStratigraphy,
  deleteStratigraphy,
  cloneStratigraphy,
} from '@ist-supsi/bmsjs';

// Take a look at the StratigraphyFormContainer

const Profile = props => {
  const { user, borehole, domains } = useSelector(state => ({
    borehole: state.core_borehole,
    user: state.core_user,
    domains: state.core_domain_list,
  }));

  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [state, setState] = useState({
    consistency: {},
    stratigraphy: null,
    isPatching: false,
    stratigraphyEmpty: false,
    fetchingStratigraphy: false,
    layers: null,
    layer: null,
    viewas: null,
  });

  useEffect(() => {
    if (
      !(
        borehole?.data?.lock === null ||
        borehole?.data?.lock.username !== user?.data?.username ||
        borehole?.data?.role !== 'EDIT'
      )
    ) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }

    if (borehole.data.stratigraphy && borehole.data.stratigraphy.length > 0) {
      setSelectedStratigraphy(borehole.data.stratigraphy[0]);
    }
  }, [setIsEditable, borehole, user]);

  useEffect(() => {
    if (selectedStratigraphy) {
      Load(selectedStratigraphy.id);
    }
  }, [selectedStratigraphy]);

  // let selectedStratigraphy = useMemo(
  //   () => {
  //     return borehole?.data?.stratigraphy?.[0] ?? null;
  // }, [borehole]);

  const dataBorehole = {
    data: borehole.data,
    user: user.data,
    selectedStratigraphy: selectedStratigraphy,
    setSelectedStratigraphy: e => {
      setSelectedStratigraphy(e);
    },
    isEditable: isEditable,
  };

  const Load = (id, keepselected = false) => {
    // Get Stratigraphy by borehole and stratigraphy kind
    setState({
      ...state,
      consistency: {},
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      ...(keepselected === false
        ? {
            layer: null,
            stratigraphy: null,
          }
        : null),
      viewas: null,
    });

    getStratigraphy(id)
      .then(response => {
        if (response.data.success) {
          const stratigraphy = response.data.data;
          setState({
            ...state,
            stratigraphy: stratigraphy,
            viewas: stratigraphy.kinds[0],
            // viewas: stratigraphy.kinds.includes(
            //   this.props.setting.data.defaults.stratigraphy
            // )?
            //   this.props.setting.data.defaults.stratigraphy:
            //   stratigraphy.kinds[0]
          });
          // Load Stratigraphy Layers
          getLayers(stratigraphy.id)
            .then(response => {
              if (response.data.success) {
                setState({ ...state, layers: response.data.data });
                // CheckConsistency();
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          // Stratigraphy not created yet
          setState({
            ...state,
            stratigraphyEmpty: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const CheckConsistency = () => {
    const { layers } = state;

    const borehole = dataBorehole.data;

    const consistency = {};

    const isDepthDefined = !_.isNil(borehole.length);
    let wrongDepth = false;

    //   Bedrock defined the top bedrock is set
    // const isBedrockDefined = (
    //   borehole.custom.lit_pet_top_bedrock !== null
    // );
    let missingBedrock = true;
    let bedrockLitPetWrong = false;
    let bedrockLitStratiWrong = false;
    let bedrockChronoWrong = false;

    for (let idx = 0, len = layers.length; idx < len; idx++) {
      const item = layers[idx];

      // Check if this item is the bedrock
      const isBedrock = item.depth_from === borehole.extended.top_bedrock;
      // Only top_bedrock: meeting 20191017
      // item.lithostratigraphy === borehole.custom.lit_str_top_bedrock
      // && item.lithology === borehole.custom.lit_pet_top_bedrock
      // && item.chronostratigraphy === borehole.custom.chro_str_top_bedrock
      // && item.depth_from === borehole.extended.top_bedrock

      // Space between surface and bedrock not filled
      const missingLayers =
        isBedrock === true && // Is the first layer inserted (maybe using the auto fill feature)
        ((idx === 0 && item.depth_from > 0) ||
          // Is not the first and there is some space
          (idx > 0 && item.depth_from > layers[idx - 1].depth_to));

      if (isBedrock === true) {
        bedrockLitPetWrong =
          item.lithology !== borehole.custom.lit_pet_top_bedrock;

        bedrockLitStratiWrong =
          item.lithostratigraphy !== borehole.custom.lit_str_top_bedrock;

        bedrockChronoWrong =
          item.chronostratigraphy !== borehole.custom.chro_str_top_bedrock;
      }

      // First layer not starting from 0 meters
      const errorStartWrong =
        isBedrock === false && idx === 0 && item.depth_from !== 0;

      // Bottom higher then top
      const errorInverted = item.depth_from > item.depth_to;

      // There is a gap between two layers
      const errorGap =
        len > 0 &&
        isBedrock === false &&
        idx > 0 &&
        layers[idx - 1].depth_to < item.depth_from;

      // There is an overlapping between two layers
      const errorOverlap =
        idx > 0 &&
        errorInverted === false &&
        item.depth_from < layers[idx - 1].depth_to;

      // Check if bedrock is missing
      if (
        // isBedrockDefined === true &&
        isBedrock === true &&
        missingBedrock === true
      ) {
        missingBedrock = !isBedrock;
      }

      if (idx === layers.length - 1 && isDepthDefined) {
        wrongDepth = `${item.depth_to}` !== `${borehole.length}`;
      }

      const error =
        errorStartWrong || missingLayers || errorGap || errorOverlap;

      // const message = (
      //   errorStartWrong === true?
      //     'First layer not starting from the surface':
      //     errorOverlap === true?
      //       'Overlapping layers':
      //       'Non continuos data found'
      // );

      if (error === true) {
        consistency[item.id] = {
          errorStartWrong: errorStartWrong,
          missingLayers: missingLayers,
          errorInverted: errorInverted,
          errorGap: errorGap,
          errorOverlap: errorOverlap,
          // message: message
        };
      }
    }

    if (missingBedrock === true) {
      consistency.missingBedrock = missingBedrock;
    }
    if (wrongDepth === true) {
      consistency.wrongDepth = wrongDepth;
    }

    if (bedrockLitPetWrong === true) {
      consistency.bedrockLitPetWrong = bedrockLitPetWrong;
    }
    if (bedrockLitStratiWrong === true) {
      consistency.bedrockLitStratiWrong = bedrockLitStratiWrong;
    }
    if (bedrockChronoWrong === true) {
      consistency.bedrockChronoWrong = bedrockChronoWrong;
    }

    setState({ ...state, consistency: consistency });

    console.log(consistency);
  };

  const AddBedrockToLayer = () => {
    addBedrock(state.stratigraphy.id).then(response => {
      if (response.data.success) {
        getLayers(state.stratigraphy.id)
          .then(function (response) {
            if (response.data.success) {
              setState({
                ...state,
                layers: response.data.data,
                layer: null,
              });
              CheckConsistency();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const OnDeleteLayers = (layer, solution, value = null) => {
    if (!isEditable) {
      return;
    }
    deleteLayer(layer.id, solution, value)
      .then(response => {
        if (response.data.success) {
          getLayers(state.stratigraphy.id)
            .then(response => {
              if (response.data.success) {
                setState({
                  ...state,
                  layers: response.data.data,
                  layer: null,
                });
                // CheckConsistency();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const OnResolveLayer = (layer, solution) => {
    if (!isEditable) {
      return;
    }
    gapLayer(layer.id, solution)
      .then(function (response) {
        if (response.data.success) {
          getLayers(state.stratigraphy.id)
            .then(function (response) {
              if (response.data.success) {
                setState({
                  ...state,
                  consistency: {},
                  layers: response.data.data,
                  layer: null,
                });
                CheckConsistency();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ConfigForm = () => {
    if (domains.data.hasOwnProperty('layer_kind')) {
      const filtered = domains.data.layer_kind.filter(kind =>
        state?.stratigraphy?.kinds?.includes(kind.id),
      );
      let fields = { ...filtered[0].conf.fields };
      if (filtered.length > 1) {
        for (let index = 1; index < filtered.length; index++) {
          const element = filtered[index];
          fields = _.mergeWith(
            fields,
            element.conf.fields,
            (objValue, srcValue) => {
              return objValue || srcValue;
            },
          );
        }
      }
      return {
        fields: fields,
      };
    }
  };

  const OnUpdateForm = (id, attribute, value) => {
    const layers = [...state.layers];
    for (var i = 0; i < layers.length; i++) {
      if (id === layers[i].id) {
        layers[i][attribute] = value;
        break;
      }
    }
    setState({ ...state, layers: layers });

    if (
      attribute === 'depth_to' ||
      attribute === 'depth_from' ||
      attribute === 'lithostratigraphy' ||
      attribute === 'lithology' ||
      attribute === 'chronostratigraphy'
    ) {
      CheckConsistency();
      Load(selectedStratigraphy.id, true);
    }
  };

  return (
    <Style.MainContainer>
      <ProfileHeader data={dataBorehole} />
      <Style.Container>
        <div style={{ width: '60%' }}>
          <ProfileInfo data={dataBorehole} />

          <ProfileLayers
            consistency={state.consistency}
            layers={state.layers}
            onAddBedrock={AddBedrockToLayer}
            onDelete={(layer, solution, value) =>
              OnDeleteLayers(layer, solution, value)
            }
            onResolve={(layer, solution) => OnResolveLayer(layer, solution)}
            onSelected={layerID => setState({ ...state, layer: layerID })}
            selected={state.layer}
            style={
              {
                // color: domains?.data?.layer_kind?.find(
                //   element => element.id === state.viewas,
                // ).conf.color,
                // colorNS: domains?.data?.layer_kind?.find(
                //   element => element.id === state.viewas,
                // ).conf.colorNS,
                // pattern: domains?.data?.layer_kind?.find(
                //   element => element.id === state.viewas,
                // ).conf.pattern,
                // patternNS: domains?.data?.layer_kind?.find(
                //   element => element.id === state.viewas,
                // ).conf.patternNS,
              }
            }
          />
        </div>
        <div style={{ width: '40%' }}>
          <ProfileAttributes
            conf={ConfigForm}
            id={state.layer}
            isEditable={isEditable}
            onUpdated={(id, attribute, value) =>
              OnUpdateForm(id, attribute, value)
            }
          />
        </div>
      </Style.Container>
    </Style.MainContainer>
  );
};

Profile.propTypes = {
  // borehole: PropTypes.object,
  // id: PropTypes.number,
  // kind: PropTypes.number,
  // unlocked: PropTypes.bool,
};

Profile.defaultProps = {
  id: undefined,
};

export default Profile;
