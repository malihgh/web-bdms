import React, { useState, useEffect } from 'react';
import { profileKind } from '../constance';
import { useTranslation } from 'react-i18next';
import { getProfile } from '../components/profileInstrument/api';

export default function useCasingList(boreholeID) {
  const { t } = useTranslation();
  const initialCasing = [
    {
      key: 0,
      value: null,
      text: (
        <span
          style={{
            color: 'red',
          }}>
          {t('common:reset')}
        </span>
      ),
    },
    { key: 1, value: 0, text: t('common:no_casing') },
  ];
  const [casing, setCasing] = useState([]);

  useEffect(() => {
    getProfile(boreholeID, profileKind.CASING).then(response => {
      const temp = initialCasing;
      if (response.length > 0) {
        for (const e of response) {
          temp.push({
            key: e.id,
            value: e.id,
            text: e.name === null || e.name === '' ? t('common:np') : e.name,
          });
        }
      }
      setCasing(temp);
    });
  }, [boreholeID, t, initialCasing]);

  return { casing };
}
