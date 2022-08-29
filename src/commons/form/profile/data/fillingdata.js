export const fillingData = {
  profileInfo: [
    {
      id: 0,
      type: 'Input',
      label: 'fill_name',
      value: 'fill_name',
      require: true,
      isVisible: true,
    },
    {
      id: 1,
      type: 'CasingDropdown',
      label: 'casingName',
      value: 'fill_casing',
      require: true,
      multiple: false,
      search: false,
      isVisible: true,
    },
    {
      id: 2,
      type: 'Input',
      label: 'remarks',
      value: 'notes',
      isVisible: true,
    },
  ],
  profileAttribute: [
    {
      id: 0,
      type: 'Input',
      label: 'layer_depth_from',
      value: 'depth_from',
      isVisible: true,
      require: true,
      isNumber: true,
    },
    {
      id: 1,
      type: 'Input',
      label: 'layer_depth_to',
      value: 'depth_to',
      isVisible: true,
      require: true,
      isNumber: true,
    },
    {
      id: 2,
      type: 'Dropdown',
      label: 'kindFilling',
      value: 'fill_kind',
      require: true,
      schema: 'fill100',
      multiple: false,
      search: false,
      isVisible: true,
    },
    {
      id: 3,
      type: 'Dropdown',
      label: 'materialFilling',
      value: 'fill_material',
      require: true,
      schema: 'fill200',
      multiple: false,
      search: false,
      isVisible: true,
    },
    {
      id: 4,
      type: 'TextArea',
      label: 'layer_notes',
      value: 'notes',
      isVisible: true,
    },
  ],
};
