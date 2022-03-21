export const fillingData = {
  profileInfo: [
    {
      id: 0,
      type: 'Dropdown',
      label: 'Kind',
      value: '',
      require: true,
      schema: 'fill100',
      multiple: false,
      search: false,
    },
    {
      id: 1,
      type: 'Input',
      label: 'remarks',
      value: '',
      require: true,
      isNumber: true,
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
      label: 'Material',
      value: '',
      require: true,
      schema: 'fill200',
      multiple: false,
      search: false,
      isVisible: true,
    },
    {
      id: 3,
      type: 'TextArea',
      label: 'Notes',
      value: '',
      require: true,
      isVisible: true,
    },
  ],
};
