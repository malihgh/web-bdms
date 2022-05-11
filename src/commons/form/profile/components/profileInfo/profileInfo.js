import React, { useRef, useState, useCallback, useEffect } from 'react';
import * as Styled from './styles';
import InfoList from './components/infoList/InfoList';
import { useTranslation } from 'react-i18next';
import { getData, sendProfile } from './api';
import _ from 'lodash';

const ProfileInfo = props => {
  const {
    selectedStratigraphyID: id,
    isEditable,
    onUpdated,
    attribute,
    kind,
  } = props.data;

  const mounted = useRef(false);
  const { t } = useTranslation();

  const [state, setState] = useState({
    isPatching: false,
    updateAttributeDelay: {},
    profileInfo: {
      id: null,
      casng_id: null,
      kind: null,
      casng_kind: null,
      fill_kind: null,
      name: null,
      primary: false,
      date: null,
      elevation: null,
      elevation_ref: null,
      date_spud: null,
      date_fin: null,
      date_abd: null,
      notes: null,
    },
  });

  const setData = useCallback(id => {
    getData(id).then(data => {
      if (mounted.current) setState({ profileInfo: data });
    });
  }, []);

  useEffect(() => {
    //using useRef for memory leak error
    mounted.current = true;
    if (id && mounted.current) setData(id);
    else setState({});

    return () => {
      mounted.current = false;
    };
  }, [id, setData]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert(t('common:errorStartEditing'));
      return;
    }
    setState(prevState => ({ ...prevState, isPatching: true }));
    _.set(state.profileInfo, attribute, value);

    if (isNumber && value !== null) {
      if (/^-?\d*[.,]?\d*$/.test(value)) {
        patch(attribute, _.toNumber(value));
      }
    } else {
      patch(attribute, value);
    }
  };

  const patch = (attribute, value) => {
    clearTimeout(state.updateAttributeDelay?.[attribute]);

    let setDelay = setTimeout(() => {
      sendProfile(id, attribute, value).then(res => {
        if (res) {
          setState(prevState => ({ ...prevState, isPatching: false }));
          if (_.isFunction(onUpdated)) {
            onUpdated(attribute);
          }
        }
      });
    }, 500);

    Promise.resolve().then(() => {
      setState(prevState => ({
        ...prevState,
        updateAttributeDelay: { [attribute]: setDelay },
      }));
    });
  };
  return (
    <Styled.Container>
      {attribute && (
        <InfoList
          data={{
            attribute,
            id,
            isEditable,
            onUpdated,
            kind,
            updateChange,
            profileInfo: state.profileInfo,
          }}
        />
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
