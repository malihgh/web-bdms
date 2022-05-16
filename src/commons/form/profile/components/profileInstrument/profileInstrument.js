import React, { useCallback, useEffect, useState } from 'react';
import * as Styled from './styles';
import Instrument from './components/instrument';
import { Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import { useTranslation } from 'react-i18next';
import { profileKind } from '../../constance';
import {
  createNewInstrument,
  createNewLayer,
  createNewStratigraphy,
  deletingLayer,
  getData,
  getProfile,
} from './api';

const ProfileInstrument = props => {
  const {
    isEditable,
    boreholeID,
    reloadLayer,
    onUpdated,
    selectedStratigraphyID,
    showAllInstrument,
  } = props.data;

  const { t } = useTranslation();

  const [instruments, setInstruments] = useState([]);
  const [casing, setCasing] = useState([]);
  const [reload, setReload] = useState(0);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    instrumentID: null,
    allfields: false,
  });

  const createStratigraphy = useCallback(boreholeID => {
    createNewStratigraphy(boreholeID, profileKind.INSTRUMENT).then(id => {
      setState(prevState => ({
        ...prevState,
        instrumentID: id,
      }));
    });
  }, []);

  const getInstrumentProfile = useCallback(() => {
    getProfile(boreholeID, profileKind.INSTRUMENT).then(response => {
      if (response.length > 0) {
        setState(prevState => ({
          ...prevState,
          instrumentID: response[0].id,
        }));
      } else if (response.length === 0) {
        createStratigraphy(boreholeID);
      }
    });
  }, [boreholeID, createStratigraphy]);

  const getCasingProfile = useCallback(() => {
    getProfile(boreholeID, profileKind.CASING).then(response => {
      if (response.length > 0) {
        for (const e of response) {
          setCasing(prevState => {
            return [
              ...prevState,
              {
                key: e.id,
                value: e.id,
                text:
                  e.name === null || e.name === '' ? t('common:np') : e.name,
              },
            ];
          });
        }
        getInstrumentProfile();
      } else {
        setCasing([]);
      }
    });
  }, [boreholeID, t, getInstrumentProfile]);

  useEffect(() => {
    getCasingProfile();
  }, [getCasingProfile]);

  const setData = useCallback(
    (instrumentID, isAll) => {
      getData(instrumentID).then(response => {
        if (isAll) setInstruments(response);
        else if (selectedStratigraphyID) {
          const selected = response.filter(
            e => e.casing_id === selectedStratigraphyID,
          );
          setInstruments(selected);
        }
      });
    },
    [selectedStratigraphyID],
  );

  useEffect(() => {
    if (state.instrumentID) {
      setData(state.instrumentID, showAllInstrument);
    }
  }, [state.instrumentID, reloadLayer, setData, showAllInstrument, reload]);

  const createLayer = () => {
    if (state.instrumentID) {
      if (selectedStratigraphyID) {
        createNewInstrument(state.instrumentID, selectedStratigraphyID).then(
          response => {
            if (response) onUpdated('newLayer');
          },
        );
      } else {
        createNewLayer(state.instrumentID).then(response => {
          if (response) onUpdated('newLayer');
        });
      }
    }
  };

  const deleteLayer = id => {
    deletingLayer(id).then(response => {
      if (response) onUpdated('deleteLayer');
    });
  };

  return (
    <Styled.Container disable={casing.length === 0}>
      <Styled.ButtonContainer>
        <Button
          content={<TranslationText id="addInstrument" />}
          disabled={!isEditable}
          icon="add"
          onClick={createLayer}
          secondary
          size="tiny"
        />
      </Styled.ButtonContainer>
      {instruments.length === 0 && (
        <Styled.Empty>
          <TranslationText id="nothingToShow" />
        </Styled.Empty>
      )}

      {instruments.length > 0 && (
        <Styled.ListContainer>
          {instruments.map((item, index) => (
            <Instrument
              data={{
                info: item,
                index,
                deleting: deleteLayer,
                onUpdated,
                isEditable,
                update: () => {
                  setReload(prevState => prevState + 1);
                },
                casing,
              }}
              key={index}
            />
          ))}
        </Styled.ListContainer>
      )}
    </Styled.Container>
  );
};

export default ProfileInstrument;
