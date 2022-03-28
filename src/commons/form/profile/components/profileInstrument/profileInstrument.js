import React, { useEffect, useState } from 'react';
import * as Styled from './styles';
import InstrumentList from './components/infoList/InstrumentList';
import { attributes } from './data/attributes';
import { Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import {
  getProfileLayers,
  createLayer,
  deleteLayer,
  getProfiles,
  createStratigraphy,
} from '@ist-supsi/bmsjs';

const ProfileInstrument = props => {
  const {
    isEditable,
    boreholeID,
    // selectedStratigraphyID,
    selectedLayer,
    setSelectedLayer,
    reloadLayer,
    onUpdated,
  } = props.data;
  const [instruments, setInstruments] = useState([]);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    instrumentID: null,
    allfields: false,
  });
  useEffect(() => {
    CreateInstrumentProfile();
    if (state.instrumentID) {
      GetData();
    }
    // else setLayers(null);
  }, [state.instrumentID, reloadLayer]);

  const CreateInstrumentProfile = () => {
    getProfiles(boreholeID, 3003)
      .then(response => {
        if (response.data.success) {
          if (response.data.data.length > 0) {
            console.log('hhhh', response.data.data);
            setState({ ...state, instrumentID: response.data.data[0].id });
          } else if (response.data.data.length === 0) {
            CreateStratigraphy();
          }

          // setProfiles(response.data.data);
          // setSelectedItem(selectedStratigraphy ?? response.data.data[0]);
          // setSelectedStratigraphy(
          //   selectedStratigraphy ?? response.data.data[0],
          // );
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const CreateStratigraphy = () => {
    createStratigraphy(boreholeID, 3003)
      .then(response => {
        console.log('response', response);
        // if (response.data.success) {
        //   setState({ ...state, instrumentID: response.data.id });
        // } else {
        //   alert(response.data.message);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetData = () => {
    getProfileLayers(state.instrumentID, false)
      .then(response => {
        if (response.data.success) {
          setInstruments([]);
          for (const e of response.data.data) {
            setInstruments(instruments => {
              return [
                ...instruments,
                {
                  id: e.id,
                  kind: null,
                  depth_from: e.depth_from,
                  depth_to: e.depth_to,
                  notes: e.description,
                },
              ];
            });
          }
          // console.log('dataaa in instrument', instruments, response.data.data);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const CreateLayer = () => {
    createLayer(state.instrumentID)
      .then(response => {
        if (response.data.success) {
          onUpdated('newLayer');
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const DeleteLayer = id => {
    deleteLayer(id)
      .then(response => {
        if (response.data.success) {
          onUpdated('deleteLayer');
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        <Button
          content={<TranslationText id="addInstrument" />}
          disabled={!isEditable}
          icon="add"
          onClick={CreateLayer}
          secondary
          size="tiny"
        />
      </Styled.ButtonContainer>
      <Styled.ListContainer>
        {instruments?.map((item, index) => (
          <InstrumentList
            data={{
              attributes,
              info: item,
              index,
              deleting: DeleteLayer,
              isEditable,
            }}
            key={index}
          />
        ))}
      </Styled.ListContainer>
    </Styled.Container>
  );
};

export default ProfileInstrument;
