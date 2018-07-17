import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

let resources = {
  en: {
    common: {
      "title": "istSOS-3.0",
      "start": "This page is in English."
    },
    header: {
      'explore': 'Explore',
      'borehole': 'Borehole editor',
      'check': 'Pending',
      'validation': 'Publish',
      'settings': 'Settings',
      'language': 'Language',
      'view_preferences': 'View',
      'user_preferences': 'User preferences',
      'hide_map': 'Hide map'
    },
    home: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter',
      'back_to_list': 'back to list'
    },
    editor: {

    },
    borehole_form: {
      'meta_location': 'Location',
      'meta_borehole': 'Borehole',
      'form_admin': 'Admin',
      'creation_fetch': 'Preparing a new borehole..',
      'duplicate': 'Duplicated value: assign a new value.',
      'date_format': 'dd.mm.yyyy',
      'original_name': 'Original name',
      'public_name': 'Public name',
      'kind': 'Drilling type',
      'project_name': 'Project name',
      'restriction': 'Restriction',
      'restriction_date': 'Restriction date',
      'location_x': 'Coordinate East',
      'location_y': 'Coordinate North',
      'srs': 'SRS',
      'qt_location': 'CQ Coordinates',
      'elevation_z': 'Elevation Z (masl)',
      'hrs': 'HRS',
      'qt_elevation': 'CQ Elevation Z',
      'country': 'Country',
      'canton': 'Canton',
      'city': 'City',
      'address': 'Address',
      'landuse': 'Land use',
      'drilling_method': 'Drilling method',
      'drilling_end': 'Drill end date',
      'cuttings': 'Cuttings',
      'purpose': 'Purpose',
      'drill_diameter': 'Drill diameter (m)',
      'borhole_status': 'Status of borehole',
      'inclination': 'Inclination (°)',
      'inclination_direction': 'Inclination direction (°)',
      'qt_inclination_direction': 'QC Inclin. / Direction',
      'depth': 'Depth (MD) (m)',
      'qt_depth': 'QC depth',
      'top_bedrock': 'Top bedrock',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock'
    },
    search: {
      'reset': 'reset',
      'identifier': 'Identifier'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    }
  },
  it: {
    common: {
      "title": "istSOS-3.0",
      "start": "Questa pagina è in Italiano"
    },
    header: {
      'explore': 'Esplora',
      'borehole': 'Editor sondaggi',
      'check': 'Pendenze',
      'validation': 'Pubblicazione',
      'settings': 'Impostazioni',
      'language': 'Lingua',
      'view_preferences': 'Visualizzazione',
      'user_preferences': 'Preferenze utente',
      'hide_map': 'Nascondi la mappa'
    },
    home: {
      'legend': 'Legenda mappa',
      'attribute_filter': 'Filtri',
      'spatial_filter': 'Filtri spaziali',
      'back_to_list': 'Torna alla lista'
    },
    editor: {

    },
    borehole_form: {
      'meta_location': 'Posizione',
      'meta_borehole': 'Sondaggio',
      'form_admin': 'Amministrativo',
      'creation_fetch': 'Preparazione di un nuovo sondaggio..',
      'duplicate': 'Valore duplicato: assegnare un altro valore.',
      'date_format': 'gg.mm.aaaa',
      'original_name': 'Nome originario',
      'public_name': 'Nome pubblico',
      'kind': 'Tipologia di perforazione',
      'project_name': 'Nome progetto',
      'restriction': 'Restrizione',
      'restriction_date': 'Data restrizione',
      'location_x': 'Coordinata Est',
      'location_y': 'Coordinata Nord',
      'srs': 'SRS',
      'qt_location': 'Qualità coordinate',
      'elevation_z': 'Elevazione Z (msl)',
      'hrs': 'HRS',
      'qt_elevation': 'Qualità elevazione',
      'country': 'Paese',
      'canton': 'Cantone',
      'city': 'Città',
      'address': 'Indirizzo',
      'landuse': 'Uso del suolo',
      'drilling_method': 'Tipologia di perforazione',
      'drilling_end': 'Data fine perforazione',
      'cuttings': 'Taglio',
      'purpose': 'Scopo',
      'drill_diameter': 'diametro perforazione (m)',
      'borhole_status': 'Stato del sondaggio',
      'inclination': 'Inclinazione (°)',
      'inclination_direction': 'Direzione inclinazione (°)',
      'depth': 'Profondità (MD) (m)',
      'qt_depth': 'Qualità profondità',
      'top_bedrock': 'Top bedrock',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock'
    },
    search: {
      'reset': 'azzera',
      'identifier': 'Codice di identificazione'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    }
  }
}

i18n
.use(LanguageDetector)
.init({
  // we init with resources
  resources: resources,
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['common', 'header', 'menu'],
  defaultNS: 'common',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
})

export default i18n
