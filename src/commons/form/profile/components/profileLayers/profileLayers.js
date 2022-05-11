import React, { useCallback, useEffect, useState, useRef } from 'react';
import * as Styled from './styles';
import { Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import { createLayerApi, getData } from './api';
import ProfileLayersList from './components/profileLayersList/profileLayersList';

const ProfileLayers = props => {
  const {
    isEditable,
    selectedStratigraphyID,
    selectedLayer,
    setSelectedLayer,
    reloadLayer,
    onUpdated,
  } = props.data;
  const [layers, setLayers] = useState(null);
  const [showDelete, setShowDelete] = useState();

  const mounted = useRef(false);

  const setData = useCallback(stratigraphyID => {
    getData(stratigraphyID).then(res => {
      if (mounted.current) {
        setLayers(res);
      }
    });
  }, []);

  useEffect(() => {
    mounted.current = true;

    if (selectedStratigraphyID && mounted.current) {
      setData(selectedStratigraphyID);
    } else {
      setLayers(null);
    }
    return () => {
      mounted.current = false;
    };
  }, [selectedStratigraphyID, reloadLayer, setData]);

  const createNewLayer = () => {
    createLayerApi(selectedStratigraphyID).then(res => {
      if (res) {
        onUpdated('newLayer');
      }
    });
  };

  const setSelectedLayerFunc = item => {
    setSelectedLayer(item);
  };
  return (
    <Styled.Container>
      {isEditable && selectedStratigraphyID !== null && (
        <Button
          fluid
          onClick={createNewLayer}
          secondary
          size="tiny"
          style={{ marginBottom: '10px' }}>
          <TranslationText id="add" />
        </Button>
      )}
      {layers?.data?.length === 0 && (
        <Styled.Empty>
          <TranslationText id="nothingToShow" />
        </Styled.Empty>
      )}

      {layers !== null && layers?.data?.length !== 0 && (
        <ProfileLayersList
          data={{
            layers,
            isEditable,
            onUpdated,
            selectedLayer,
            showDelete,
            setShowDelete,
            selectedStratigraphyID,
            setSelectedLayer: setSelectedLayerFunc,
          }}
        />
      )}
    </Styled.Container>
  );
};

export default ProfileLayers;
