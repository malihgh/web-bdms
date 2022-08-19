import React from 'react';
import useCasingList from '../../hooks/useCasingList';
import { Dropdown } from 'semantic-ui-react';

const CasingList = props => {
  const { dropDownValue, handleCasing, id, ItemValue } = props;
  const { casing } = useCasingList(id);

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
