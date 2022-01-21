export const attributes = [
  {
    id: 0,
    type: 'Input',
    label: 'layer_depth_from',
    value: 'layer.depth_from',
    isVisible: true,
    require: true,
  },
  {
    id: 1,
    type: 'Input',
    label: 'layer_depth_to',
    value: 'layer.depth_to',
    isVisible: true,
    require: true,
    // ref:createRef(),
  },
  {
    id: 2,
    type: 'TextArea',
    label: 'description',
    value: 'layer.description',
    isVisible: true,
  },
  {
    id: 3,
    type: 'TextArea',
    label: 'layer_geology',
    value: 'layer.geology',
  },
  {
    id: 4,
    type: 'Radio',
    label: 'layer_last',
    value: true,
    onYesSelect: () => console.log('Yes'),
    onNoSelect: () => console.log('No'),
    isVisible: true,
  },
  {
    id: 5,
    type: 'Dropdown',
    label: 'layer_qt_description',
    value: 'layer.qt_description',
    schema: 'qt_description',
    multiple: false,
    search: false,
  },
  {
    id: 6,
    type: 'DomainTree',
    label: 'layer_lithology',
    value: 'layer.lithology',
    schema: 'custom.lit_pet_top_bedrock',
    levels: {
      1: 'rock',
      2: 'process',
      3: 'type',
    },
    isVisible: true,
    require: true,
  },
  {
    id: 7,
    type: 'DomainTree',
    label: 'layer_lithostratigraphy',
    value: 'layer.lithostratigraphy',
    schema: 'custom.lit_str_top_bedrock',
    levels: {
      1: 'super',
      2: 'group',
      3: 'subgroup',
      4: 'superformation',
      5: 'formation',
    },
    isVisible: true,
    require: true,
  },
  {
    id: 8,
    type: 'DomainTree',
    label: 'layer_chronostratigraphy',
    value: 'layer.chronostratigraphy',
    schema: 'custom.chro_str_top_bedrock',
    levels: {
      1: '1st_order_eon',
      2: '2nd_order_era',
      3: '3rd_order_period',
      4: '4th_order_epoch',
      5: '5th_order_sub_epoch',
      6: '6th_order_sub_stage',
    },
    isVisible: true,
    require: false,
  },
  {
    id: 9,
    type: 'Dropdown',
    label: 'layer_color',
    value: 'layer.color',
    schema: 'mlpr112',
    multiple: true,
    search: true,
  },
  {
    id: 10,
    type: 'Dropdown',
    label: 'layer_plasticity',
    value: 'layer.plasticity',
    schema: 'mlpr101',
    multiple: false,
    search: false,
  },
  {
    id: 11,
    type: 'Dropdown',
    label: 'layer_humidity',
    value: 'layer.layer_humidity',
    schema: 'mlpr105',
    multiple: false,
    search: false,
  },
  {
    id: 12,
    type: 'Dropdown',
    label: 'layer_compactness',
    value: 'layer.compactness',
    schema: 'mlpr102',
    multiple: false,
    search: false,
  },
  {
    id: 13,
    type: 'Dropdown',
    label: 'layer_alteration',
    value: 'layer.alteration',
    schema: 'mlpr106',
    multiple: false,
    search: false,
  },
  {
    id: 14,
    type: 'Dropdown',
    label: 'layer_compactness',
    value: 'layer.compactness',
    schema: 'mlpr102',
    multiple: false,
    search: false,
  },
  {
    id: 15,
    type: 'Dropdown',
    label: 'layer_organic_component',
    value: 'layer.organic_component',
    schema: 'mlpr108',
    multiple: true,
    search: true,
  },
  {
    id: 16,
    type: 'Radio',
    label: 'layer_striae',
    value: false,
    onYesSelect: () => console.log('Yes'),
    onNoSelect: () => console.log('No'),
  },
  {
    id: 17,
    type: 'Dropdown',
    label: 'layer_grain_size_1',
    value: 'layer.grain_size_1',
    schema: 'mlpr109',
    multiple: false,
    search: false,
  },
  {
    id: 18,
    type: 'Dropdown',
    label: 'layer_grain_size_2',
    value: 'layer.grain_size_2',
    schema: 'mlpr109',
    multiple: false,
    search: false,
  },
  {
    id: 19,
    type: 'Dropdown',
    label: 'layer_grain_shape',
    value: 'layer.grain_shape',
    schema: 'mlpr110',
    multiple: true,
    search: true,
  },
  {
    id: 20,
    type: 'Dropdown',
    label: 'layer_grain_granularity',
    value: 'layer.grain_granularity',
    schema: 'mlpr115',
    multiple: true,
    search: true,
  },
  {
    id: 21,
    type: 'Dropdown',
    label: 'layer_cohesion',
    value: 'layer.cohesion',
    schema: 'mlpr116',
    multiple: false,
    search: false,
  },
  {
    id: 22,
    type: 'Dropdown',
    label: 'layer_further_properties',
    value: 'layer.further_properties',
    schema: 'mlpr117',
    multiple: true,
    search: true,
  },
  {
    id: 23,
    type: 'Dropdown',
    label: 'layer_uscs_1',
    value: 'layer.uscs_1',
    schema: 'mlpr101',
    multiple: false,
    search: false,
  },
  {
    id: 24,
    type: 'Dropdown',
    label: 'layer_uscs_2',
    value: 'layer.uscs_2',
    schema: 'mlpr101',
    multiple: false,
    search: false,
  },
  {
    id: 25,
    type: 'Dropdown',
    label: 'layer_uscs_3',
    value: 'layer.uscs_3',
    schema: 'mlpr101',
    multiple: false,
    search: false,
  },
  {
    id: 26,
    type: 'Input',
    label: 'layer_uscs_original',
    value: 'layer.uscs_original',

    require: false,
  },
  {
    id: 27,
    type: 'Dropdown',
    label: 'layer_uscs_determination',
    value: 'layer.uscs_determination',
    schema: 'mlpr104',
    multiple: true,
    search: true,
  },
  {
    id: 28,
    type: 'Dropdown',
    label: 'layer_debris',
    value: 'layer.debris',
    schema: 'mcla107',
    multiple: true,
    search: true,
  },
  {
    id: 29,
    type: 'Dropdown',
    label: 'layer_lit_pet_deb',
    value: 'layer.lit_pet_deb',
    schema: 'custom.lit_pet_top_bedrock',
    multiple: true,
    search: true,
  },
  {
    id: 30,
    type: 'TextArea',
    label: 'remarks',
    lue: 'layer.notes',
    isVisible: true,
  },
];
