import React, { useCallback, useEffect, useState } from 'react';
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
  const { isEditable, boreholeID, reloadLayer, onUpdated } = props.data;
  const [instruments, setInstruments] = useState([]);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    instrumentID: null,
    allfields: false,
  });

  const CreateStratigraphy = useCallback(boreholeID => {
    createStratigraphy(boreholeID, 3003)
      .then(response => {
        if (response.data.success) {
          setState(prevState => ({
            ...prevState,
            instrumentID: response.data.data.id,
          }));
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const GetInstrumentProfile = useCallback(() => {
    getProfiles(boreholeID, 3003)
      .then(response => {
        if (response.data.success) {
          if (response.data.data.length > 0) {
            setState(prevState => ({
              ...prevState,
              instrumentID: response.data.data[0].id,
            }));
          } else if (response.data.data.length === 0) {
            CreateStratigraphy(boreholeID);
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [boreholeID, CreateStratigraphy]);

  useEffect(() => {
    GetInstrumentProfile();
  }, [GetInstrumentProfile]);

  const GetData = useCallback(instrumentID => {
    getProfileLayers(instrumentID, false)
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
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (state.instrumentID) {
      GetData(state.instrumentID);
    }
  }, [state.instrumentID, reloadLayer, GetData]);

  const CreateLayer = () => {
    if (state.instrumentID) {
      createLayer(state.instrumentID)
        .then(response => {
          if (response.data.success) {
            onUpdated('newLayer');
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
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
        console.error(error);
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
