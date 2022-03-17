import React, { useEffect } from 'react';
import * as Styled from './styles';
import InstrumentList from './components/infoList/InstrumentList';
import { attributes } from './data/attributes';
import { Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import { getProfileLayers, createLayer, deleteLayer } from '@ist-supsi/bmsjs';

const ProfileInstrument = props => {
  const {
    isEditable,
    selectedStratigraphyID,
    selectedLayer,
    setSelectedLayer,
    reloadLayer,
    onUpdated,
  } = props.data;

  useEffect(() => {
    if (selectedStratigraphyID) {
      GetData();
    }
    // else setLayers(null);
  }, [selectedStratigraphyID, reloadLayer]);

  const GetData = () => {
    getProfileLayers(selectedStratigraphyID, true)
      .then(response => {
        if (response.data.success) {
          //   setLayers(response.data);
          console.log('dataaa in instrument', response.data);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const CreateLayer = () => {
    createLayer(selectedStratigraphyID)
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
          //   onClick={CreateLayer}
          secondary
          size="tiny"
        />
      </Styled.ButtonContainer>
      <Styled.ListContainer>
        <InstrumentList data={{ attributes, id: 0 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
      </Styled.ListContainer>
    </Styled.Container>
  );
};

export default ProfileInstrument;
