export const LocationSearchData = [
  {
    id: 0,
    type: 'Dropdown',
    label: 'borehole_identifier',
    value: 'borehole_identifier',
    schema: 'borehole_identifier',
    multiple: false,
    search: false,
    isVisibleValue: 'custom.borehole_identifier',
  },
  {
    id: 1,
    type: 'Input',
    label: 'borehole_identifier_value',
    value: 'identifier_value',
    isVisibleValue: 'custom.borehole_identifier',
  },
  {
    id: 2,
    type: 'Input',
    label: 'original_name',
    value: 'original_name',
    isVisibleValue: 'extended.original_name',
  },
  {
    id: 3,
    type: 'Input',
    label: 'project_name',
    value: 'project_name',
    isVisibleValue: 'custom.project_name',
  },
  {
    id: 4,
    type: 'Input',
    label: 'alternate_name',
    value: 'alternate_name',
    isVisibleValue: 'custom.alternate_name',
  },
  {
    id: 5,
    type: 'Dropdown',
    label: 'restriction',
    value: 'restriction',
    schema: 'restriction',
    multiple: false,
    search: false,
    isVisibleValue: 'restriction',
  },
  {
    id: 6,
    type: 'Date',
    label: 'restriction_until',
    value: 'restriction_until_from',
    placeholder: 'afterdate',
    hasTwoFields: true,
    isVisibleValue: 'restriction_until',
  },
  {
    id: 7,
    type: 'Date',
    label: '',
    value: 'restriction_until_to',
    placeholder: 'beforedate',
    hasTwoFields: true,
    isVisibleValue: 'restriction_until',
  },
  {
    id: 8,
    type: 'Input',
    label: 'elevation_z',
    value: 'elevation_z_from',
    isNumber: true,
    inputType: 'number',
    placeholder: 'fromelevation',
    hasTwoFields: true,
    isVisibleValue: 'elevation_z',
  },
  {
    id: 9,
    type: 'Input',
    label: '',
    value: 'elevation_z_to',
    isNumber: true,
    inputType: 'number',
    placeholder: 'toelevation',
    hasTwoFields: true,
    isVisibleValue: 'elevation_z',
  },
  {
    id: 10,
    type: 'Input',
    label: 'reference_elevation',
    value: 'reference_elevation_from',
    isNumber: true,
    inputType: 'number',
    placeholder: 'fromelevation',
    hasTwoFields: true,
    isVisibleValue: 'reference_elevation',
  },
  {
    id: 11,
    type: 'Input',
    label: '',
    value: 'reference_elevation_to',
    isNumber: true,
    inputType: 'number',
    placeholder: 'toelevation',
    hasTwoFields: true,
    isVisibleValue: 'reference_elevation',
  },
  {
    id: 12,
    type: 'Dropdown',
    label: 'reference_elevation_type',
    value: 'reference_elevation_type',
    schema: 'ibor117',
    multiple: false,
    search: false,
    isVisibleValue: 'reference_elevation_type',
  },
  {
    id: 13,
    type: 'Dropdown',
    label: 'qt_location',
    value: 'qt_location',
    schema: 'qt_location',
    multiple: false,
    search: false,
    isVisibleValue: 'qt_location',
  },
  {
    id: 14,
    type: 'Dropdown',
    label: 'qt_elevation',
    value: 'qt_elevation',
    schema: 'qt_elevation',
    multiple: false,
    search: false,
    isVisibleValue: 'qt_elevation',
  },
  {
    id: 15,
    type: 'Dropdown',
    label: 'reference_elevation_qt',
    value: 'qt_reference_evelation',
    schema: 'qt_elevation',
    multiple: false,
    search: false,
    isVisibleValue: 'reference_elevation_qt',
  },
  {
    id: 16,
    type: 'Canton',
    label: 'canton',
    value: 'canton',
    isVisibleValue: 'custom.canton',
  },
];
