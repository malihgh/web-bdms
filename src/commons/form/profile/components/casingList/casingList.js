import React, { useEffect } from 'react';
import useCasingList from '../../hooks/useCasingList';
import { Dropdown } from 'semantic-ui-react';

const CasingList = props => {
  const { dropDownValue, handleCasing, id, ItemValue } = props;
  const { casing, getCasingList } = useCasingList(id);

  useEffect(() => {
    (async () => {
      await getCasingList();
    })();
  }, [getCasingList]);

  return (
    <div>
      <Dropdown
        fluid
        onChange={(e, data) => {
          handleCasing(ItemValue, data.value);
        }}
        options={casing}
        selection
        value={dropDownValue}
      />
    </div>
  );
};

export default CasingList;
