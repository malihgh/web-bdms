export const stratigraphyData = {
  profileInfo: [
    {
      id: 0,
      type: 'Input',
      label: 'stratigraphy_name',
      value: '',
      require: true,
      isNumber: true,
    },
    {
      id: 1,
      type: 'Date',
      label: 'date',
      value: '',
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
      // ref:createRef(),
    },
    {
      id: 2,
      type: 'TextArea',
      label: 'description',
      value: 'description',
      isVisible: true,
    },
    {
      id: 3,
      type: 'TextArea',
      label: 'layer_geology',
      value: 'geology',
    },
    {
      id: 4,
      type: 'Radio',
      label: 'layer_last',
      value: 'last',
      to: false,
      isVisible: true,
    },
    {
      id: 5,
      type: 'Dropdown',
      label: 'layer_qt_description',
      value: 'qt_description',
      schema: 'qt_description',
      multiple: false,
      search: false,
    },
    {
      id: 6,
      type: 'DomainTree',
      label: 'layer_lithology',
      value: 'lithology',
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
      value: 'lithostratigraphy',
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
      value: 'chronostratigraphy',
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
      value: 'color',
      schema: 'mlpr112',
      multiple: true,
      search: true,
    },
    {
      id: 10,
      type: 'Dropdown',
      label: 'layer_plasticity',
      value: 'plasticity',
      schema: 'mlpr101',
      multiple: false,
      search: false,
    },
    {
      id: 11,
      type: 'Dropdown',
      label: 'layer_humidity',
      value: 'humidity',
      schema: 'mlpr105',
      multiple: false,
      search: false,
    },
    {
      id: 12,
      type: 'Dropdown',
      label: 'layer_compactness',
      value: 'compactness',
      schema: 'mlpr102',
      multiple: false,
      search: false,
    },
    {
      id: 13,
      type: 'Dropdown',
      label: 'layer_alteration',
      value: 'alteration',
      schema: 'mlpr106',
      multiple: false,
      search: false,
    },
    {
      id: 14,
      type: 'Dropdown',
      label: 'layer_compactness',
      value: 'compactness',
      schema: 'mlpr102',
      multiple: false,
      search: false,
    },
    {
      id: 15,
      type: 'Dropdown',
      label: 'layer_organic_component',
      value: 'organic_component',
      schema: 'mlpr108',
      multiple: true,
      search: true,
    },
    {
      id: 16,
      type: 'Radio',
      label: 'layer_striae',
      value: 'striae',
      to: false,
    },
    {
      id: 17,
      type: 'Dropdown',
      label: 'layer_grain_size_1',
      value: 'grain_size_1',
      schema: 'mlpr109',
      multiple: false,
      search: false,
    },
    {
      id: 18,
      type: 'Dropdown',
      label: 'layer_grain_size_2',
      value: 'grain_size_2',
      schema: 'mlpr109',
      multiple: false,
      search: false,
    },
    {
      id: 19,
      type: 'Dropdown',
      label: 'layer_grain_shape',
      value: 'grain_shape',
      schema: 'mlpr110',
      multiple: true,
      search: true,
    },
    {
      id: 20,
      type: 'Dropdown',
      label: 'layer_grain_granularity',
      value: 'grain_granularity',
      schema: 'mlpr115',
      multiple: true,
      search: true,
    },
    {
      id: 21,
      type: 'Dropdown',
      label: 'layer_cohesion',
      value: 'cohesion',
      schema: 'mlpr116',
      multiple: false,
      search: false,
    },
    {
      id: 22,
      type: 'Dropdown',
      label: 'layer_further_properties',
      value: 'further_properties',
      schema: 'mlpr117',
      multiple: true,
      search: true,
    },
    {
      id: 23,
      type: 'Dropdown',
      label: 'layer_uscs_1',
      value: 'uscs_1',
      schema: 'mlpr101',
      multiple: false,
      search: false,
    },
    {
      id: 24,
      type: 'Dropdown',
      label: 'layer_uscs_2',
      value: 'uscs_2',
      schema: 'mlpr101',
      multiple: false,
      search: false,
    },
    {
      id: 25,
      type: 'Dropdown',
      label: 'layer_uscs_3',
      value: 'uscs_3',
      schema: 'mlpr101',
      multiple: true,
      search: false,
    },
    {
      id: 26,
      type: 'Input',
      label: 'layer_uscs_original',
      value: 'uscs_original',

      require: false,
    },
    {
      id: 27,
      type: 'Dropdown',
      label: 'layer_uscs_determination',
      value: 'uscs_determination',
      schema: 'mlpr104',
      multiple: true,
      search: true,
    },
    {
      id: 28,
      type: 'Dropdown',
      label: 'layer_debris',
      value: 'debris',
      schema: 'mcla107',
      multiple: true,
      search: true,
    },
    {
      id: 29,
      type: 'Dropdown',
      label: 'layer_lit_pet_deb',
      value: 'lit_pet_deb',
      schema: 'custom.lit_pet_top_bedrock',
      multiple: true,
      search: true,
    },
    {
      id: 30,
      type: 'TextArea',
      label: 'remarks',
      value: 'notes',
      isVisible: true,
    },
  ],
};
