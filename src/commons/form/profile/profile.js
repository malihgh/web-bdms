import React, { useState, useEffect } from 'react';
import * as Style from './styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ProfileHeader from './components/profileHeader';
import ProfileLayers from './components/profileLayers';
import ProfileInfo from './components/profileInfo';
import ProfileAttributes from './components/profileAttributes';
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
  const { user, borehole } = useSelector(state => ({
    borehole: state.core_borehole,
    user: state.core_user,
  }));

  const [selectedStratigraphy, setSelectedStratigraphy] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

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

  // let selectedStratigraphy = useMemo(
  //   () => {
  //     return borehole?.data?.stratigraphy?.[0] ?? null;
  // }, [borehole]);

  const dataBorehole = {
    data: borehole.data,
    user: user.data,
    selectedStratigraphy: selectedStratigraphy,
    setSelectedStratigraphy: e => {
      console.log('hey', e, isEditable);
      setSelectedStratigraphy(e);
    },
    isEditable: isEditable,
  };

  const AddBedrockToLayer = () => {
    // addBedrock(state.stratigraphy.id).then(response => {
    //   if (response.data.success) {
    //     getLayers(state.stratigraphy.id)
    //       .then(function (response) {
    //         if (response.data.success) {
    //           setState({
    //             layers: response.data.data,
    //             layer: null,
    //           });
    //           checkConsistency();
    //         }
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }
    // });
  };

  const OnDeleteLayers = (layer, solution, value = null) => {
    if (!isEditable) {
      return;
    }

    // deleteLayer(layer.id, solution, value)
    //   .then(response => {
    //     if (response.data.success) {
    //       getLayers(state.stratigraphy.id)
    //         .then(response => {
    //           if (response.data.success) {
    //             setState({
    //               layers: response.data.data,
    //               layer: null,
    //             });
    //             checkConsistency();
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const OnResolveLayer = (layer, solution) => {
    if (!isEditable) {
      return;
    }

    // gapLayer(layer.id, solution)
    //   .then(function (response) {
    //     if (response.data.success) {
    //       getLayers(state.stratigraphy.id)
    //         .then(function (response) {
    //           if (response.data.success) {
    //             setState({
    //               consistency: {},
    //               layers: response.data.data,
    //               layer: null,
    //             });
    //             checkConsistency();
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <Style.MainContainer>
      <ProfileHeader data={dataBorehole} />
      <Style.Container>
        <div style={{ width: '60%' }}>
          <ProfileInfo data={dataBorehole} />
          <ProfileLayers
            selected={17}
            consistency={{
              5: {
                errorStartWrong: false,
                missingLayers: false,
                errorInverted: false,
                errorGap: false,
                errorOverlap: true,
              },
            }}
            layers={[
              {
                id: 17,
                depth_from: 0,
                depth_to: 3,
                msm_from: 605.8,
                msm_to: 602.8,
                lithostratigraphy: 15201403,
                lithology: 15101003,
                chronostratigraphy: 15001004,
                uscs_1: null,
              },
              {
                id: 5,
                depth_from: 2,
                depth_to: 5,
                msm_from: 603.8,
                msm_to: 600.8,
                lithostratigraphy: 15201312,
                lithology: 15101003,
                chronostratigraphy: 15001005,
                uscs_1: null,
              },
              {
                id: 6,
                depth_from: 5,
                depth_to: 7,
                msm_from: 600.8,
                msm_to: 598.8,
                lithostratigraphy: 15201402,
                lithology: 15101017,
                chronostratigraphy: 15001002,
                uscs_1: null,
              },
              {
                id: 7,
                depth_from: 7,
                depth_to: 7,
                msm_from: 598.8,
                msm_to: 598.8,
                lithostratigraphy: null,
                lithology: 15101005,
                chronostratigraphy: null,
                uscs_1: null,
              },
              {
                id: 12,
                depth_from: 7,
                depth_to: 22,
                msm_from: 598.8,
                msm_to: 583.8,
                lithostratigraphy: null,
                lithology: null,
                chronostratigraphy: null,
                uscs_1: null,
              },
              {
                id: 15,
                depth_from: 22,
                depth_to: 25,
                msm_from: 583.8,
                msm_to: 580.8,
                lithostratigraphy: 15201312,
                lithology: 15101017,
                chronostratigraphy: 15001003,
                uscs_1: null,
              },
            ]}
            onAddBedrock={AddBedrockToLayer}
            onDelete={(layer, solution, value) =>
              OnDeleteLayers(layer, solution, value)
            }
            onResolve={(layer, solution) => OnResolveLayer(layer, solution)}
            onSelected={layer => {
              // setState({
              //   layer: layer.id,
              // });
            }}
            style={
              {
                // color: domains.data.layer_kind.find(
                //   element => element.id === this.state.viewas,
                // ).conf.color,
                // colorNS: domains.data.layer_kind.find(
                //   element => element.id === this.state.viewas,
                // ).conf.colorNS,
                // pattern: domains.data.layer_kind.find(
                //   element => element.id === this.state.viewas,
                // ).conf.pattern,
                // patternNS: domains.data.layer_kind.find(
                //   element => element.id === this.state.viewas,
                // ).conf.patternNS,
              }
            }
          />
        </div>
        <div style={{ width: '40%' }}>
          <ProfileAttributes />
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
