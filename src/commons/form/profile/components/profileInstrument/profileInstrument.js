import React, { useEffect, useState } from 'react';
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
  const [instruments, setInstruments] = useState([]);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    allfields: false,
  });
  useEffect(() => {
    if (selectedStratigraphyID) {
      GetData();
    }
    // else setLayers(null);
  }, [selectedStratigraphyID, reloadLayer]);

  const GetData = () => {
    getProfileLayers(selectedStratigraphyID, false)
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
