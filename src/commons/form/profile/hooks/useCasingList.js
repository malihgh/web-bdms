import { useCallback, useState } from 'react';
import { profileKind } from '../constance';
import { useTranslation } from 'react-i18next';
import { getProfile } from '../components/profileInstrument/api';

export default function useCasingList(boreholeID) {
  const { t } = useTranslation();
  const [casing, setCasing] = useState([
    {
      key: 0,
      value: null,
      text: t('common:reset'),
    },
    { key: 1, value: 0, text: t('common:nocasing') },
  ]);

  const getCasingList = useCallback(() => {
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
      } else {
        setCasing([]);
      }
    });
  }, [boreholeID, t]);
  return { casing, getCasingList };
}
