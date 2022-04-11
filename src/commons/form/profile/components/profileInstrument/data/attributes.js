export const attributes = [
  {
    id: 0,
    type: 'Input',
    label: 'from',
    value: 'depth_from',
    require: true,
    isNumber: true,
  },
  {
    id: 1,
    type: 'Input',
    label: 'to',
    value: 'depth_to',
    require: true,
    isNumber: true,
  },
  {
    id: 2,
    type: 'Dropdown',
    label: 'kindCasing',
    value: 'instrument_kind',
    require: true,
    schema: 'inst100',
    multiple: false,
    search: false,
  },
  {
    id: 3,
    type: 'Dropdown',
    label: 'status',
    value: 'instrument_status',
    require: true,
    schema: 'inst101',
    multiple: false,
    search: false,
  },
  {
    id: 4,
    type: 'CasingDropdown',
    label: 'casing',
    value: 'casing_id',
    require: true,
    schema: 'inst100',
    multiple: false,
    search: false,
  },
  {
    id: 5,
    type: 'Input',
    label: 'layer_notes',
    value: 'notes',
  },
  {
    id: 6,
    type: 'Button',
    label: 'delete',
    value: '',
  },
];
