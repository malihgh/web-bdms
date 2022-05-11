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
  createInstrument,
} from '@ist-supsi/bmsjs';
import { useTranslation } from 'react-i18next';
import { profileKind } from '../../constance';

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

  const CreateStratigraphy = useCallback(boreholeID => {
    createStratigraphy(boreholeID, profileKind.INSTRUMENT)
      .then(response => {
        if (response.data.success) {
          setState(prevState => ({
            ...prevState,
            instrumentID: response.data.id,
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
    getProfiles(boreholeID, profileKind.INSTRUMENT)
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

  const getCasingProfile = useCallback(() => {
    getProfiles(boreholeID, profileKind.CASING)
      .then(response => {
        if (response.data.success) {
          if (response.data.data.length > 0) {
            for (const e of response.data.data) {
              setCasing(prevState => {
                return [
                  ...prevState,
                  {
                    key: e.id,
                    value: e.id,
                    text:
                      e.name === null || e.name === ''
                        ? t('common:np')
                        : e.name,
                  },
                ];
              });
            }
            getInstrumentProfile();
          } else {
            setCasing([]);
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [boreholeID, t, getInstrumentProfile]);

  useEffect(() => {
    getCasingProfile();
  }, [getCasingProfile]);

  const getData = useCallback(
    (instrumentID, isAll) => {
      getProfileLayers(instrumentID, false)
        .then(function (response) {
          if (response.data.success) {
            if (isAll) setInstruments(response.data.data);
            else if (selectedStratigraphyID) {
              const selected = response.data.data.filter(
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
  }, [state.instrumentID, reloadLayer, getData, showAllInstrument, reload]);

  const createNewLayer = () => {
    if (state.instrumentID) {
      if (selectedStratigraphyID) {
        createInstrument(state.instrumentID, selectedStratigraphyID)
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
      } else {
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
    <Styled.Container disable={casing.length === 0}>
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
                deleting: deletingLayer,
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
