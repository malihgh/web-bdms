export const LocationSearchData = [
  {
    id: 0,
    type: 'Dropdown',
    label: 'borehole_identifier',
    value: '',
    require: true,
    schema: 'borehole_identifier',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 1,
    type: 'Input',
    label: 'original_name',
    value: '',
    require: true,
    isVisible: true,
  },
  {
    id: 2,
    type: 'Input',
    label: 'project_name',
    value: '',
    require: true,
    isVisible: true,
  },
  {
    id: 3,
    type: 'Input',
    label: 'alternate_name',
    value: '',
    require: true,
    isVisible: true,
  },
  {
    id: 4,
    type: 'Dropdown',
    label: 'restriction',
    value: '',
    require: true,
    schema: 'restriction',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 5,
    type: 'Date',
    label: 'restriction_until',
    value: '_from',
    isVisible: true,
    hasTwoFields: true,
  },
  {
    id: 6,
    type: 'Date',
    label: '',
    value: '_to',
    isVisible: true,
    hasTwoFields: true,
  },
  {
    id: 7,
    type: 'Dropdown',
    label: 'qt_location',
    value: '',
    require: true,
    schema: 'qt_location',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 8,
    type: 'Input',
    label: 'elevation_z',
    value: '_from',
    isVisible: true,
    require: true,
    isNumber: true,
    inputType: 'number',
    hasTwoFields: true,
  },
  {
    id: 9,
    type: 'Input',
    label: '',
    value: '_to',
    isVisible: true,
    require: true,
    isNumber: true,
    inputType: 'number',
    hasTwoFields: true,
  },
  {
    id: 10,
    type: 'Dropdown',
    label: 'qt_elevation',
    value: '',
    require: true,
    schema: 'qt_elevation',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 11,
    type: 'Input',
    label: 'reference_elevation',
    value: '_from',
    isVisible: true,
    require: true,
    isNumber: true,
    inputType: 'number',
    hasTwoFields: true,
  },
  {
    id: 12,
    type: 'Input',
    label: '',
    value: '_to',
    isVisible: true,
    require: true,
    isNumber: true,
    inputType: 'number',
    hasTwoFields: true,
  },
  {
    id: 13,
    type: 'Dropdown',
    label: 'reference_elevation_qt',
    value: '',
    require: true,
    schema: 'qt_elevation',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 14,
    type: 'Dropdown',
    label: 'reference_elevation_type',
    value: '',
    require: true,
    schema: 'qt_elevation',
    multiple: false,
    search: false,
    isVisible: true,
  },
  {
    id: 15,
    type: 'Dropdown',
    label: 'hrs',
    value: '',
    require: true,
    schema: 'hrs',
    multiple: false,
    search: false,
    isVisible: true,
  },
  //canton , city
];
