import React, { useCallback, useEffect, useState } from 'react';
import * as Styled from './styles';
import Instrument from './components/instrument';
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
    reloadLayer,
    onUpdated,
    selectedStratigraphyID,
    showAllInstrument,
  } = props.data;
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

  const getInstrumentProfile = useCallback(() => {
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
    getInstrumentProfile();
  }, [getInstrumentProfile]);

  const getData = useCallback(
    (instrumentID, isAll) => {
      getProfileLayers(instrumentID, false)
        .then(function (response) {
          if (response.data.success) {
            if (isAll) setInstruments(response.data.data);
            else if (selectedStratigraphyID) {
              const selected = response.data.data.find(
                e => e.casing_id === selectedStratigraphyID,
              );
              setInstruments(selected);
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    [selectedStratigraphyID],
  );

  useEffect(() => {
    if (state.instrumentID) {
      getData(state.instrumentID, showAllInstrument);
    }
  }, [state.instrumentID, reloadLayer, getData, showAllInstrument]);

  const createNewLayer = () => {
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

  const deletingLayer = id => {
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
          onClick={createNewLayer}
          secondary
          size="tiny"
        />
      </Styled.ButtonContainer>
      <Styled.ListContainer>
        {instruments?.map((item, index) => (
          <Instrument
            data={{
              boreholeID,
              info: item,
              index,
              deleting: deletingLayer,
              onUpdated,
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
