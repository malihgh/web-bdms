import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

let resources = {
  en: {
    common: {
      appearance: 'Appearance',
      map: 'Map',
      boreholeidentifiers: 'Borehole identifiers',
      searchfilters: 'Search filters',
      stratigraphyfields: 'Stratigraphy fields',
      admin: 'Administrator',
      date: 'Date',
      add: 'Add',
      close: 'Close',
      confirm: 'Confirm',
      iagree: 'I agree',
      all: 'all',
      attachments: 'Attachments',
      new: 'New {{what}}',
      background: "Background",
      borehole: "borehole",
      boreholes: "boreholes",
      cancel: "cancel",
      clickLayer: "Click on a layer for details",
      collapse: "collapse",
      creation_date: "Creation date",
      creator: "Created by",
      csvFormat: "Comma-Separated Values (CSV) format",
      degree: "degree",
      delete: "Delete",
      deleteForever: "Delete forever",
      deleting: "Deleting {{what}}",
      disable: "disable",
      disableWorkgroup: "disable workgroup",
      disabled: "disabled",
      disabling: "Disabling {{what}}",
      done: "Done",
      draft: "draft",
      enable: "enable",
      enableWorkgroup: "enable workgroup",
      enabled: "enabled",
      enabling: "Enabling {{what}}",
      expand: "expand",
      filterByHierarchicalUnits: "Filter by hierarchical units",
      filterByName: "Filter by name",
      firstname: 'Firstname',
      from: "from",
      identifier: "Identifier",
      lastname: 'Lastname',
      load: 'Load',
      meter: "meter",
      newBorehole: "New borehole",
      no: "No",
      np: "Unknown",
      overlay: "Maps displayed",
      password: "Password",
      publish: 'publish',
      preview: 'preview',
      refresh: "refresh",
      reset: "reset",
      resources: "Resources",
      result: "result",
      results: "results",
      role: "role",
      roles: "roles",
      save: "save",
      saving: "saving",
      search: "search",
      show: "show {{what}}",
      showallfields: "show all fields",
      start: "This page is in English.",
      submit: "Submit",
      sure: "Are you sure?",
      terms: "Terms of service",
      title: "BMS",
      to: "to",
      upload: "Upload",
      updateDate: "Update date",
      uploadFile: "Select the CSV file to upload",
      user: "user",
      username: "Username",
      viewas: "View as",
      workgroup: "workgroup",
      yes: "Yes",
      you: "you",
      yourcomments: "Your comments",
      public: "Public",
      name: "Name",
      description: "Description",
      type: "Type",
      uploaded: "Uploaded",
    },
    messages: {
      'enablingUser': (
        'You are going to re-enable the user ' +
        '"{{user}}". This user will ' +
        'be able to login and apply modifications based on ' +
        'its roles. '
      ),
      'enablingWorkgroup': (
        'You are going to reenable the "{{workgroup}}" ' +
        'workgroup. Users ' +
        'belonging to this workgroup will be able ' +
        'to apply again modifications based on ' +
        'theirs roles.'
      ),
      'deleteUser': (
        'The selected user can be deleted forever ' +
        'because currently there is not any trace ' +
        'of activity in the database.'
      ),
      'deleteWorkgroup': (
        'The selected workgroup can be deleted forever ' +
        'because currently there are not any traces of ' +
        'activities in the database.'
      ),
      'disablingUser': (
        'The selected user can not be deleted ' +
        'because currently there are some traces ' +
        'of activities in the database.'
      ),
      'disablingWorkgroup': (
        'The selected workgroup can not be deleted because ' +
        'currently there are some traces of activities ' +
        'in the database.'
      ),
      'reenablingTip': (
        'you will be able to re-enable ' + 
        'it later.'
      ),
      'deletingUserTip': (
        'the user will be deleted ' +
        'from the database, but later you will be ' +
        'able to recreate the same user again.'
      ),
      'deletingWorkgroupTip': (
        'The workgroup will be permanently deleted from the database'
      ),
      'identifierAlreadyUsed': (
        'Identifier already used'
      ),
      'disclaimer_publish_title': (
        'Publish disclaimer'
      ),
      'disclaimer_publish_message': (
        'Are you sure you want to pubblish this new disclaimer?'
      ),
      'disclaimer_publish_note': (
        `Note that, by publishing the new discalimer, you will
trigger all users to agree again.`
      )
    },
    error: {
      'oneerror': 'One error found',
      'moreerror': '{{number}} errors found',
      'E-900': 'Borehole locked by {{user}}',
      'howToResolve': 'How to resolve this issue?',
      'errorGap': 'Non continuos data found',
      'errorGapSolution1': 'Fill gap with "undefined" layer',
      'errorGapSolution2': 'Replace upper layer base with top from lower layer',
      'errorGapSolution3': 'Replace lower layer top with 0 meters',
      'errorGapSolution4': 'Replace lower layer top with base from upper layer',
      'wrongDepth': 'Wrong depth',
      'wrongDepthSolution1': (
        'Last layer depth ({{lDepth}}) not equals to ' +
        'total borehole depth {{bDepth}}. ' +
        'Manually change the Base MD field.'
      ),
      'missingBedrock': 'Missing bedrock',
      'missingBedrockSolution': (
        'Add the Bedrock automatically from data filled into the ' +
        'Borehole page.'
      ),
      'missingLayer': 'Missing layers',
      'missingLayerSolution': (
        'Please fill the space between the surface and the bedrock ' + 
        '(below) adding new layers'
      ),
      'errorOverlap': 'Overlapping layers',
      'errorStartWrong': 'First layer not starting from the surface',
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
      'hide_map': 'Hide map',
      'viewerdesc': 'Search and display',
      'editordesc': 'Create or modify',
      'settingdesc': 'Update your preferences',
    },
    home: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter',
      'back_to_list': 'back to list'
    },
    editor: {
      'title': 'Project',
      'title2': 'Boreholes',
      'search': 'Search project',
      'project_name': 'Project name',
      'create_new': 'Create new project',
      'create': 'Create',
      'editingEnabled': 'Editing started',
      'locked_by': 'Change in progress by',
      'locked_at': 'Locked at',
      'locked_status': 'Status'
    },
    borehole_form: {
      'andzoom': '...and zoom',
      'afterdate': 'After this date',
      'beforedate': 'Before this date',
      'date': 'Date',
      'editingStart': 'Start editing',
      'editingStop': 'Stop editing',
      'centerselected': 'Center to selected',
      'completness': 'Completness',
      'creation': 'Creation date',
      'author': 'Author',
      'mainStratigraphy': 'This is the main stratigraphy',
      'meta_location': 'Location',
      'meta_borehole': 'Borehole',
      'municipality': "Municipality",
      'form_admin': 'Admin',
      'fromdepth': 'from depth',
      'todepth': 'to depth',
      'fromelevation': 'From elevation',
      'toelevation': 'To elevation',
      'fromdiameter': 'From diameter',
      'todiameter': 'To diameter',
      'frommeters': 'From meters',
      'tometers': 'To meters',
      'frommillimeters': 'From millimeters',
      'meta_stratigraphy': 'Stratigraphy',
      'loading_fetch': 'Loading an existing borehole..',
      'creation_fetch': 'Preparing a new borehole..',
      'duplicate': 'Duplicated value: assign a new value.',
      'date_format': 'dd.mm.yyyy',
      'filterbymap': 'Filter by map',
      'original_name': 'Original name',
      'public_name': 'Public name',
      'kind': 'Drilling type',
      'project_name': 'Project name',
      'restriction': 'Restriction',
      'restriction_until': 'Restriction date',
      'coordinates': 'Coordinates',
      'location_x': 'Coordinate East',
      'location_y': 'Coordinate North',
      'srs': 'SRS',
      'qt_location': 'CQ Coordinates',
      'elevation_z': 'Elevation (masl)',
      'hrs': 'HRS',
      'qt_elevation': 'CQ Elevation Z',
      'country': 'Country',
      'canton': 'Canton',
      'city': 'City',
      'address': 'Address',
      'landuse': 'Land use',
      'method': 'Drilling method',
      'drilling_date': 'Drill end date',
      'cuttings': 'Cuttings',
      'purpose': 'Purpose',
      'drill_diameter': 'Drill diameter (mm)',
      'status': 'Status of borehole',
      'bore_inc': 'Inclination (°)',
      'bore_inc_dir': 'Inclination direction (°)',
      'qt_bore_inc_dir': 'QC Inclin. / Direction',
      'length': 'Total depth (m)',
      'qt_length': 'QC depth',
      'top_bedrock': 'Top bedrock (m)',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'yes': 'Yes',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock',
      'processing_status': 'Processing status',
      'national_relevance': 'Nationale relevance',
      // 'attributes_to_edit': 'Attributes to edit',
      'mistakes': 'Mistakes',
      'remarks': 'Remarks',
      'stratigraphy_name': 'Name / Version'
    },
    layer_form: {
      'attention': 'Attention',
      'deletelayerconfirmation': 'You are about to delete this level, how do you want to procede?',
      'deletelayer': 'Just delete this layer',
      'extendupper': 'Extend upper layer to bottom',
      'extendlower': 'Extend lower layer to top',
      'setmanually': 'Set manually',
      'layers': 'Layers',
      'loading_fetch': 'Loading an existing layer..',
      'creation_fetch': 'Preparing a new layer..',
      'depth': 'Depth',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Layer description',
      'geology': 'Geology description',
      'last': 'End of borehole',
      'qt_description': 'QC description',
      'lithology': 'Lithology / Petrology',
      'lithostratigraphy': 'Litho-stratigraphy',
      'chronostratigraphy': 'Chrono-stratigraphie',
      'tectonic_unit': 'Tectonic Unit',
      'symbol': 'Symbol',
      'color': 'Color',
      'plasticity': 'Plasticity',
      'humidity': 'Humidity',
      'consistance': 'Consistance',
      'alteration': 'Alteration',
      'compactness': 'Compactness',
      'jointing': 'Jointing',
      'soil_state': 'Soil state',
      'organic_component': 'Organic components',
      'striae': 'Striae',
      'grain_size_1': 'Grain size 1',
      'grain_size_2': 'Grain size 2',
      'grain_shape': 'Grain shape',
      'grain_granularity': 'Grain angularity',
      'cohesion': 'Cohesion',
      'further_properties': 'Further properties',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS original',
      'uscs_determination': 'USCS determination',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'remarks': 'Remarks',
    },
    search: {
      'reset': 'reset',
      'identifier': 'Identifier',
      'last_update': 'Last update',
      'creation': 'Creation date',
      'completness': 'Filter by completness',
      'all': 'All',
      'complete': 'Completed',
      'incomplete': 'Incompleted',
      'empty': 'Empty'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    },
    version: {
      '0': 'Completed',
      'EDIT': 'Change in progress',
      'CONTROL': 'Scientific check',
      'VALID':'Validation',
      'PUBLIC': 'Publish'
    }
  },
  de: {
    common: {
      appearance: 'Erscheinungsbild',
      map: 'Karte',
      boreholeidentifiers: 'Bohrungskennung',
      searchfilters: 'Suchfilter',
      stratigraphyfields: 'Stratigraphiefelder',
      admin: 'Administrator',
      date: 'Datum',
      add: 'Hinzufüden',
      close: 'Schlissen',
      confirm: 'Bestätigen',
      iagree: 'Ich stimme zu',
      all: 'Alle',
      attachments: 'Anhänge',
      new: 'Neue {{what}}',
      background: "Hintergrund",
      borehole: "Bohrung",
      boreholes: "Bohrungen",
      clickLayer: "Klicken Sie für Informationen",
      cancel: "Abbrechen",
      collapse: "Zuklappen",
      creation_date: "Erstellungsdatum",
      creator: "Erstellt von",
      csvFormat: "Dateiformat (.csv)",
      degree: "Grad",
      delete: "Löschen",
      deleteForever: "Dauerhaft löschen",
      deleting: "{{what}} löschen",
      disable: "Deaktivieren",
      disableWorkgroup: "Arbeitsgruppe deaktivieren",
      disabled: "Deaktiviert",
      disabling: "{{what}} deaktivieren",
      done: "Ok",
      draft: "Entwurf",
      enable: "Aktivieren",
      enableWorkgroup: "Arbeitsgruppe aktivieren",
      enabled: "Aktiviert",
      enabling: "{{what}} aktivieren",
      expand: "Aufklappen",
      filterByHierarchicalUnits: "Nach hierarchischen Einheiten filtern",
      filterByName: "Nach Name filtern",
      firstname: 'Vorname',
      from: "von",
      identifier: "Kennung",
      lastname: 'Nachname',
      load: 'Laden',
      meter: "Meter",
      newBorehole: "Neue Bohrung",
      no: "Nein",
      np: "Keine Angabe",
      overlay: "Dargestellte Karten",
      password: "Passwort",
      publish: 'Veröffentlichen',
      preview: 'Vorschau',
      refresh: "Aktualisieren",
      reset: "Zurücksetzen",
      result: "Ergebnis",
      results: "Ergebnisse",
      resources: "Dokumentation",
      role: "Rolle",
      roles: "Rollen",
      saving: "Speichern",
      search: "Suchen",
      show: "{{what}} anzeigen",
      showallfields: "Alle Felder anzeigen",
      start: "Diese Seite ist auf Deutsch.",
      submit: "Weiterleiten",
      sure: "Sind Sie sicher?",
      terms: "Nutzungsbedingungen",
      title: "BDMS",
      to: "bis",
      updateDate: "Bearbeitungsdatum",
      uploadFile: "Wählen Sie eine Datei (*.csv) aus",
      upload: "Hochladen",
      user: "Benutzer",
      username: "Benutzername",
      viewas: "Ansicht als",
      workgroup: "Arbeitsgruppe",
      yes: "Ja",
      you: "Du",
      yourcomments: "Ihre Kommentare",
      public: "Öffentlich",
      name: "Name",
      description: "Beschreibung",
      type: "Typ",
      uploaded: "Hochgeladen",
    },
    messages: {
      'enablingUser': (
        'Der Benutzer "{{user}}" wird wieder ' +
        'aktiviert. Dieser Benutzer kann sich dann wieder anmelden ' +
        'und Änderungen basierend auf seinen Rollen vornehmen.'
      ),
      'enablingWorkgroup': (
        'Die Arbeitsgruppe "{{workgroup}}" wird wieder aktiviert. ' +
        'Benutzer, die zu dieser Arbeitsgruppe gehören, können ' +
        'Änderungen basierend auf ihren Rollen vornehmen.'
      ),
      'deleteUser': (
        'Der ausgewählte Benutzer kann für immer gelöscht ' +
        'werden, da derzeit keine Aktivitäten in der Datenbank ' +
        'vorhanden sind.'
      ),
      'deleteWorkgroup': (
        'Die ausgewählte Arbeitsgruppe kann für immer gelöscht ' +
        'werden, da derzeit keine Aktivitäten in der Datenbank ' +
        'vorhanden sind.'
      ),
      'disablingUser': (
        'Der ausgewählte Benutzer kann nicht gelöscht werden, ' +
        'da sich derzeit einige Aktivitäten in der Datenbank befinden.'
      ),
      'disablingWorkgroup': (
        'Die ausgewählte Arbeitsgruppe kann nicht gelöscht werden, ' +
        'da sich derzeit einige Aktivitäten in der Datenbank befinden.'
      ),
      'reenablingTip': (
        'Sie können ihn später wieder aktivieren.'
      ),
      'deletingUserTip': (
        'Der Benutzer wird aus der Datenbank gelöscht.'
      ),
      'deletingWorkgroupTip': (
        'Die Arbeitsgruppe wird dauerhaft aus der Datenbank gelöscht'
      ),
      'identifierAlreadyUsed': (
        'Identifikator bereits vergeben.'
      ),
      'disclaimer_publish_title': (
        'Haftungsausschluss veröffentlichen'
      ),
      'disclaimer_publish_message': (
        'Sind Sie sicher, dass Sie diesen neuen Haftungsausschluss veröffentlichen möchten?'
      ),
      'disclaimer_publish_note': (
        `Beachten Sie, dass Sie durch die Veröffentlichung
des neuen Discalimers alle Benutzer erneut zur Zustimmung veranlassen.`
      )
    },
    error: {
      'oneerror': 'Ein Fehler gefunden',
      'moreerror': '{{number}} Fehler gefunden',
      'E-900': `Bohrung durch den {{user}} gesperrt`,
      'howToResolve': 'Wie soll dieser Fehler behoben werden?',
      'errorGap': 'Schichttiefen sind nicht kontinuierlich',
      'errorGapSolution1': 'Lücke mit "nicht definierter Schicht" füllen',
      'errorGapSolution2': 'Basis der oberen Schicht mit Top der unteren Schicht ersetzen',
      'errorGapSolution3': 'Top der unteren Schicht mit o Metern ersetzen',
      'errorGapSolution4': 'Top der unteren Schicht mit der Basis der oberen Schicht ersetzen',
      'wrongDepth': 'Falsche Endtiefe',
      'wrongDepthSolution1': (
        'Tiefe der letzten Schicht ({{lDepth}} m) stimmt nicht mit der ' +
        'Endtiefe ({{bDepth}}) überein. ' +
        'Ändern Sie das Feld Basis-MD manuell.'
      ),
      'missingBedrock': 'Tiefe Top Fels fehlt!',
      'missingBedrockSolution': (
        'Tiefe Top Fels automatisch aus der Bohrdaten-Seite ' +
        'übernehmen.'
      ),
      'missingLayer': 'Fehlende Schicht',
      'missingLayerSolution': (
        'Bitte Schichten zwischen Geländeoberfläche und Top Fels (unten) ergänzen'
      ),
      'errorOverlap': 'Überlappende Schichten',
      'errorStartWrong': 'Erste Schicht beginnt nicht an der Geländeoberfläche',
    },
    header: {
      'explore': 'Durchsuchen',
      'borehole': 'Bohrloch Editor',
      'check': 'In Bearbeitung',
      'validation': 'Validieren',
      'settings': 'Einstellungen',
      'language': 'Sprache',
      'view_preferences': 'Ansicht',
      'user_preferences': 'Benutzereinstellungen',
      'hide_map': 'Karte ausblenden',
      'viewerdesc': 'Suchen und anzeigen',
      'editordesc': 'Erstellen und ändern',
      'settingdesc': 'Aktualizieren sie ihre Einstellungen',
    },
    home: {
      'legend': 'Legende',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Räumlicher Filter',
      'back_to_list': 'Zurück zur Liste'
    },
    editor: {
      'title': 'Projekt',
      'title2': 'Bohrlöcher',
      'search': 'Suche Projekt',
      'project_name': 'Projektname',
      'create_new': 'Neues Projekt erstellen',
      'create': 'Erstellen',
      'editingEnabled': 'Die Bearbeitung hat begonnen',
      'locked_by': 'Änderung in Bearbeitung von',
      'locked_at': 'Gesperrt am',
      'locked_status': 'Status'
    },
    borehole_form: {
      'andzoom': '...und zoomen',
      'afterdate': 'von Datum',
      'beforedate': 'bis Datum',
      'date': 'Datum',
      'editingStart': 'Bearbeitung beginnen',
      'editingStop': 'Bearbeitung beenden',
      'centerselected': 'Auf Auswahl zentrieren',
      'completness': 'Vollständigkeit',
      'creation': 'Erstellungsdatum',
      'author': 'Autor',
      'mainStratigraphy': 'Dies ist die Hauptstratigraphie',
      'meta_location': 'Standort',
      'meta_borehole': 'Bohrung',
      'municipality': "Gemeinde",
      'form_admin': 'Admin',
      'fromdepth': 'von Tiefe',
      'todepth': 'bis Tiefe',
      'fromelevation': 'von Hohe',
      'toelevation': 'bis Hohe',
      'fromdiameter': 'von Durchmesser',
      'todiameter': 'bis Durchmesser',
      'frommeters': 'Von Metern',
      'tometers': 'bis zu Meter',
      'meta_stratigraphy': 'Stratigrafie',
      'loading_fetch': 'Lade Bohrloch.',
      'creation_fetch': 'Vorbereitung neues Bohrloch.',
      'duplicate': 'Doppelter Wert: neuen Wert setzen.',
      'date_format': 'TT.MM.JJJJ',
      'original_name': 'Originalname',
      'filterbymap': 'Mit Karteausschinitt filtern',
      'public_name': 'Öffentlicher Name',
      'kind': 'Bohrtyp',
      'project_name': 'Projektname',
      'restriction': 'Beschränkung',
      'restriction_until': 'Datum Beschränkung',
      'coordinates': 'Koordinaten',
      'location_x': 'Koordinate O',
      'location_y': 'Koordinate N',
      'srs': 'SRS',
      'qt_location': 'CQ Koordinaten',
      'elevation_z': 'Ansatzhöhe (müM)',
      'hrs': 'HRS',
      'qt_elevation': 'QC Ansatz Z',
      'country': 'Land',
      'canton': 'Kanton',
      'city': 'Gemeinde',
      'address': 'Addresse',
      'landuse': 'Landnutzung',
      'method': 'Bohrmethode',
      'drilling_date': 'Bohrende Datum',
      'cuttings': 'Schnitt',
      'purpose': 'Bohrzweck',
      'drill_diameter': 'Bohrdurchmesser (mm)',
      'status': 'Status Bohrloch',
      'bore_inc': 'Inklination (°)',
      'bore_inc_dir': 'Einfallsrichtung (°)',
      'qt_bore_inc_dir': 'QC Inc. / Richtung',
      'length': 'Gesamttiefe (m)',
      'qt_length': 'QC Tiefe',
      'top_bedrock': 'Top Fels (m)',
      'qt_top_bedrock': 'QC Top Fels',
      'groundwater': 'Grundwasser',
      'yes': 'Ja',
      'no': 'Nein',
      'lit_pet_top_bedrock': 'Lit/Pet Top Fels',
      'lit_str_top_bedrock': 'Litstrati Top Fels',
      'chro_str_top_bedrock': 'Chronostrati Top Fels',
      'processing_status': 'Prozesstatus',
      'national_relevance': 'Nationale Relevanz',
      // 'attributes_to_edit': 'Attributes zu bearbeiten',
      'mistakes': 'Fehler',
      'remarks': 'Bemerkungen',
      'stratigraphy_name': 'Name / Version'
    },
    layer_form: {
      'attention': 'Achtung',
      'deletelayerconfirmation': 'Sie löschen diese Schicht. Wie wollen Sie fortfahren?',
      'deletelayer': 'Bestehende Schicht löschen',
      'extendupper': 'Obere Schicht nach unten ausdehnen',
      'extendlower': 'Untere Schicht zum Top ausdehnen',
      'setmanually': 'Manuell einstellen',
      'loading_fetch': 'Lade Schicht..',
      'creation_fetch': 'Bereite neue Schicht vor..',
      'depth': 'Bohrendtiefe',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Basis MD (m)',
      'description': 'Schichtbeschreibung',
      'geology': 'Geologische Beschreibung',
      'last': 'Bohrlochende',
      'qt_description': 'QC Beschreibung',
      'lithology': 'Lithologie / Petrologie',
      'lithostratigraphy': 'Lithostratigrafie',
      'chronostratigraphy': 'Chronostratigrafie',
      'tectonic_unit': 'Tektonische Einheit',
      'symbol': 'Symbol',
      'color': 'Farbe',
      'plasticity': 'Plastizität',
      'humidity': 'Feuchtigkeit',
      'consistance': 'Konsistenz',
      'alteration': 'Alteration',
      'compactness': 'Lagerungsdichte',
      'jointing': 'Verbindung',
      'soil_state': 'Zustand',
      'organic_component': 'Organische Komponenten',
      'striae': 'Striemung',
      'grain_size_1': 'Korngrösse 1',
      'grain_size_2': 'Korngrösse 2',
      'grain_shape': 'Kornform',
      'grain_granularity': 'Kornrundung',
      'cohesion': 'Kohäsion',
      'further_properties': 'Weitere Eigenschaften',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS Original',
      'uscs_determination': 'USCS Bestimmung',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Grobbestandteile',
      'lit_pet_deb': 'Litho/Petro Grobbestandteile',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'remarks': 'Bemerkungen',
    },
    search: {
      'reset': 'Zurücksetzen',
      'identifier': 'Kennung',
      'last_update': 'Letzte Aktualisierung',
      'creation': 'Erstellungsdatum',
      'completness': 'Filter auf Vollständigkeit',
      'all': 'Alle',
      'complete': 'Vollständig',
      'incomplete': 'Unvollständig',
      'empty': 'Leer'
    },
    grid: {
      'legend': 'Legende',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Räumlicher Filter'
    },
    version: {
      '0': 'fertiggestellt',
      'EDIT': 'in Bearbeitung',
      'CONTROL':'wissenschaftlich geprüft',
      'VALID': 'validiert',
      'PUBLIC': 'veröffentlicht'
    }
  },
  it: {
    common: {
      appearance: 'Aspetto',
      map: 'Mappa',
      boreholeidentifiers: 'Identificatori perforazione',
      searchfilters: 'Filtri di ricerca',
      stratigraphyfields: 'Champs stratigraphiques',
      admin: 'Amministratore',
      date: 'Data',
      add: 'Aggiungi',
      close: 'Chiudi',
      confirm: 'Conferma',
      iagree: 'Accetto',
      all: 'tutto',
      attachments: 'Allegati',
      background: "Sfondo",
      borehole: "perforazione",
      boreholes: "perforazioni",
      cancel: "annulla",
      clickLayer: "Clic su un layer per le informazioni",
      collapse: "collassare",
      creation_date: "Data di creazione",
      creator: "Creato da",
      csvFormat: "Formato CSV",
      degree: "gradi",
      delete: "Elimina",
      deleteForever: "Elimina definitivamente",
      deleting: "Eliminazione {{what}}",
      disable: "disabilitare",
      disableWorkgroup: "disabilita gruppo di lavoro",
      disabled: "disabilitato",
      disabling: "Disabilitazione {{what}}",
      done: "Fatto",
      draft: "bozza",
      enable: "abilitare",
      enableWorkgroup: "abilitare gruppo di lavoro",
      enabled: "abilitati",
      enabling: "Abilitazione {{what}}",
      expand: "espandere",
      filterByHierarchicalUnits: "Filtra per unità (gerarchicamente)",
      filterByName: "Filtra per nome",
      firstname: 'Nome',
      from: "da",
      identifier: "Identificatore",
      lastname: 'Cognome',
      load: 'Carica',
      meter: "metri",
      new: 'Nuovo {{what}}',
      newBorehole: "Nuova perforazione",
      no: "No",
      np: "Sconosciuto",
      overlay: "Mappe visualizzate",
      password: "Password",
      publish: 'pubblica',
      preview: 'anteprima',
      refresh: "ricarica",
      reset: "azzerare",
      result: "risultato",
      results: "risultati",
      resources: "Risorse",
      role: "ruolo",
      roles: "ruoli",
      save: "salva",
      saving: "salvataggio",
      search: "cerca",
      show: "Mostra {{what}}",
      showallfields: "Mostra tutti i campi",
      start: "Questa pagina è in Italiano",
      submit: "Applica",
      sure: "Sei sicuro?",
      terms: "Termini di servizio",
      title: "BMS",
      to: "a",
      upload: "Carica",
      updateDate: "Data di aggiornamento",
      uploadFile: "Seleziona il file CSV da caricare",
      user: "utente",
      username: "Nome utente",
      viewas: "Visualizza come",
      workgroup: "Gruppo di Lavoro",
      yes: "Sì",
      you: "te",
      yourcomments: "Commenti",
      public: "Pubblico",
      name: "Nome",
      description: "Descrizione",
      type: "Tipo",
      uploaded: "caricamento",
    },
    messages: {
      'enablingUser': (
        'Stai per riattivare l\'utente "{{user}}". ' +
        'Questo utente sarà in grado di accedere e ' +
        'applicare le modifiche in base ai suoi ruoli.'
      ),
      'enablingWorkgroup': (
        'Riattiverai il gruppo di lavoro "{{workgroup}}". ' +
        'Gli utenti appartenenti a questo gruppo di lavoro ' +
        'potranno applicare le modifiche in base ai loro ruoli.'
      ),
      'deleteUser': (
        'L\'utente selezionato può essere eliminato per ' +
        'sempre perché al momento non esiste alcuna traccia ' +
        'di attività nel database.'
      ),
      'deleteWorkgroup': (
        'Visto che al momento non ci sono tracce di attività ' +
        'nel database, il gruppo di lavoro selezionato, può ' +
        'essere eliminato per sempre.'
      ),
      'disablingUser': (
        'L\'utente selezionato non può essere eliminato ' +
        'perché al momento ci sono sue tracce di attività nel database.'
      ),
      'disablingWorkgroup': (
        'Il gruppo di lavoro selezionato non può essere eliminato ' +
        'perché al momento ci sono alcune sue tracce di attività ' +
        'nel database.'
      ),
      'reenablingTip': (
        'sarai in grado di riattivarlo in seguito'
      ),
      'deletingUserTip': (
        'l\'utente verrà eliminato dal database, ma in ' + 
        'seguito sarà possibile ricreare nuovamente lo stesso utente.'
      ),
      'deletingWorkgroupTip': (
        'il gruppo di lavoro verrà eliminato definitivamente dal database'
      ),
      'identifierAlreadyUsed': (
        'identificatore già in uso'
      ),
      'disclaimer_publish_title': (
        'Pubblica i termini'
      ),
      'disclaimer_publish_message': (
        'Sei sicuro di voler pubblicare i nuovi termini di servizio?'
      ),
      'disclaimer_publish_note': (
        `Nota che a tutti gli utenti verrà chiesto di accettare
nuovamente i termini.`
      )
    },
    error: {
      'oneerror': 'Un errore trovato',
      'moreerror': '{{number}} errori trovati',
      'E-900': 'Modifica in corso da parte di "{{user}}"',
      'howToResolve': 'Come risolvere questo problema?',
      'errorGap': 'Sequenza layers non continua',
      'errorGapSolution1': 'Riempi il vuoto con un layer di tipo indefinito',
      'errorGapSolution2': (
        'Sostituisci la base del layer superiore con la ' + 
        'cima del layer inferiore'
      ),
      'errorGapSolution3': 'Sostituisci la cima del layer inferiore con 0m',
      'errorGapSolution4': (
        'Sostituisci la cima del layer inferiore con la base ' + 
        'del layer superiore'
      ),
      'wrongDepth': 'Profondità errata',
      'wrongDepthSolution1': (
        'La profondità dell\'ultimo layer ({{lDepth}}) non coincide con ' +
        'quanto dichiarato nei metadati sul sondaggio ({{bDepth}}). ' +
        'Modifica manualmente il campo Base MD.'
      ),
      'missingBedrock': 'Bedrock mancante',
      'missingBedrockSolution': (
        'Crea automaticamente il bedrock attingendo dai dati inseriti ' +
        'nella pagina del sondaggio.'
      ),
      'missingLayer': 'Layers mancanti',
      'missingLayerSolution': (
        'Per favore riempire lo spazio tra la superficie e il bedrock ' + 
        'aggiungendo nuovi layers'
      ),
      'errorOverlap': 'Sovrapposizione layers',
      'errorStartWrong': 'Il primo layer non inizia dalla superficie'
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
      'hide_map': 'Nascondi la mappa',
      'viewerdesc': 'Cerca e visualizza',
      'editordesc': 'Crea o modifica',
      'settingdesc': 'Aggiorna le impostazioni',
    },
    home: {
      'legend': 'Legenda mappa',
      'attribute_filter': 'Filtri',
      'spatial_filter': 'Filtri spaziali',
      'back_to_list': 'Torna alla lista'
    },
    editor: {
      'title': 'Progetti',
      'title2': 'Sondaggi',
      'project_name': 'Nome progetto',
      'search': 'Ricerca progetto',
      'create_new': 'Crea nuovo',
      'create': 'Crea',
      'editingEnabled': 'Modifica avviata',
      'locked_by': 'Modifiche in corso da parte di',
      'locked_at': 'Bloccato il',
      'locked_status': 'Stato'
    },
    borehole_form: {
      'andzoom': '...e ingrandisci',
      'afterdate': 'A partire da data',
      'beforedate': 'Fino a data',
      'date': 'Data',
      'editingStart': 'Inizia modifica',
      'editingStop': 'Interrompi modifica',
      'centerselected': 'Centra selezionato',
      'completness': 'Completezza',
      'creation': 'Data di creazione',
      'author': 'Author',
      'mainStratigraphy': 'Questa è la stratigrafia principale',
      'meta_location': 'Posizione',
      'meta_borehole': 'Sondaggio',
      'municipality': "Comune",
      'form_admin': 'Amministrativo',
      'fromdepth': 'dalla profondità',
      'todepth': 'alla profondità',
      'fromelevation': 'Da elevazione',
      'toelevation': 'A elevazione',
      'fromdiameter': 'da diametro',
      'todiameter': 'a diametro',
      'frommeters': 'A partire da metri',
      'tometers': 'Fino a metri',
      'frommillimeters': 'Da millimetri',
      'meta_stratigraphy': 'Stratigrafia',
      'loading_fetch': 'Caricamento di un sondaggio esistente..',
      'creation_fetch': 'Preparazione di un nuovo sondaggio..',
      'duplicate': 'Valore duplicato: assegnare un altro valore.',
      'date_format': 'gg.mm.aaaa',
      'filterbymap': 'Filtra da mappa',
      'original_name': 'Nome originario',
      'public_name': 'Nome pubblico',
      'kind': 'Tipologia di perforazione',
      'project_name': 'Nome progetto',
      'restriction': 'Restrizione',
      'restriction_until': 'Data restrizione',
      'coordinates': 'Coordinate',
      'location_x': 'Coordinata Est',
      'location_y': 'Coordinata Nord',
      'srs': 'SRS',
      'qt_location': 'Qualità coordinate',
      'elevation_z': 'Altitudine (msl)',
      'hrs': 'HRS',
      'qt_elevation': 'Qualità elevazione',
      'country': 'Paese',
      'canton': 'Cantone',
      'city': 'Città',
      'address': 'Indirizzo',
      'landuse': 'Uso del suolo',
      'method': 'Metodologia di perforazione',
      'drilling_date': 'Data fine perforazione',
      'cuttings': 'Taglio',
      'purpose': 'Scopo',
      'drill_diameter': 'Diametro perforazione (mm)',
      'status': 'Stato del sondaggio',
      'bore_inc': 'Inclinazione (°)',
      'bore_inc_dir': 'Direzione inclinazione (°)',
      'qt_bore_inc_dir': 'Qualità Inclin. / Direz.',
      'length': 'Profondità totale (m)',
      'qt_length': 'Qualità profondità',
      'top_bedrock': 'Top substrato (m)',
      'qt_top_bedrock': 'QC top substrato',
      'groundwater': 'Groundwater',
      'yes': 'Sì',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top substrato',
      'lit_str_top_bedrock': 'Litstrati top substrato',
      'chro_str_top_bedrock': 'Chronostrati top substrato',
      'processing_status': 'Stato del processamento',
      'national_relevance': 'Rilevanza nazionale',
      // 'attributes_to_edit': 'Attributi da modificare',
      'mistakes': 'Errori',
      'remarks': 'Osservazioni',
      'stratigraphy_name': 'Nome / Versione'
    },
    layer_form: {
      'deletelayer': 'Elimina questo livello',
      'attention': 'Attention',
      'deletelayerconfirmation': 'Stai per eliminare questo livello, come vuoi procedere?',
      'extendupper': 'Estendi livello superiore in basso',
      'extendlower': 'Estendi livello inferiore in alto',
      'setmanually': 'Impostare manualmente',
      'layers': 'Livelli',
      'loading_fetch': 'Caricamento livelli in corso..',
      'creation_fetch': 'Creazione di un nuovo livello..',
      'depth': 'Profondità',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Descrizione livello',
      'geology': 'Descrizione geologia',
      'last': 'Fine del sondaggio',
      'qt_description': 'Qualità descrizione',
      'lithology': 'Litologia / Petrologia',
      'lithostratigraphy': 'Litho-stratigrafia',
      'chronostratigraphy': 'Chrono-stratigrafia',
      'tectonic_unit': 'Unità tettoniche',
      'symbol': 'Simbolo',
      'color': 'Colore',
      'plasticity': 'Plasticità',
      'humidity': 'Umidità',
      'consistance': 'Consistenza',
      'alteration': 'Alterazione',
      'compactness': 'Compattezza',
      'jointing': 'Connessione',
      'soil_state': 'Stato del suolo',
      'organic_component': 'Componenti organici',
      'striae': 'Striae',
      'grain_size_1': 'Grandezza grano 1',
      'grain_size_2': 'Grandezza grano 2',
      'grain_shape': 'Forma del grano',
      'grain_granularity': 'Angolosità del grano',
      'cohesion': 'Coesione',
      'further_properties': 'Altri parametri',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS originale',
      'uscs_determination': 'USCS determinazione',
      'unconrocks': 'Classe del suolo (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Litho',
      'kirost': 'Kiros',
      'remarks': 'Osservazioni'
    },
    search: {
      'reset': 'azzera',
      'identifier': 'Codice di identificazione',
      'last_update': 'Ultima modifica',
      'creation': 'Data di creazione',
      'completness': 'Filtra per complettezza',
      'all': 'Tutti',
      'complete': 'Completati',
      'incomplete': 'Incompleti',
      'empty': 'Vuoti'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filtro',
      'spatial_filter': 'Filtro spaziale'
    },
    version: {
      '0': 'Completato',
      'EDIT': 'Modifica',
      'CONTROL': 'Controllo scientifico',
      'VALID': 'Validazione',
      'PUBLIC': 'Pubblica'
    }
  },
  fr: {
    common: {
      appearance: 'Aspect',
      map: 'Carte',
      boreholeidentifiers: 'Identificateurs de forage',
      searchfilters: 'Filtres de recherche',
      stratigraphyfields: 'Campi stratigrafia',
      admin: 'Administrateur',
      date: 'Date',
      add: 'Ajouter',
      close: 'Fermer',
      confirm: 'Confirmer',
      iagree: 'J\'accepte',
      all: 'tout',
      attachments: 'Pièces jointes',
      background: 'Arrière-plan',
      borehole: "Perforation",
      boreholes: "Perforations",
      cancel: 'Annuler',
      clickLayer: "Cliquez sur un calque pour plus d'informations",
      collapse: 'Réduire',
      creation_date: "Date de création",
      creator: "Créé par",
      csvFormat: "Format CSV",
      degree: 'Degrés',
      delete: 'Supprimer',
      deleteForever: "Supprimer définitivement",
      deleting: "Suppression {{what}}",
      disable: 'Désactiver',
      disableWorkgroup: "désactiver le groupe de travail",
      disabled: 'Désactivé',
      disabling: "Désactiver {{quoi}}",
      done: "Fini",
      draft: "projet",
      enable: 'Activer',
      enableWorkgroup: "activer le groupe de travail",
      enabled: 'Activé',
      enabling: "Activer {{what}}",
      expand: "Expand",
      filterByHierarchicalUnits: "Filtrer par unité (hiérarchique)",
      filterByName: "Filtrer par nom",
      firstname: 'Prenom',
      from: 'De',
      identifier: "Identifiant",
      lastname: 'Nom de famille',
      load: 'Charger',
      meter: 'Mètres',
      new: 'Neuf {{what}}',
      newBorehole: "Nouveau forage",
      no: 'Non',
      np: 'Inconnu',
      overlay: "Cartes affichées",
      password: 'Mot de passe',
      publish: 'publier',
      preview: 'preview',
      refresh: 'Charge',
      reset: "Reset",
      result: 'Résultat',
      results: 'Résultats',
      role: 'Rôle',
      roles: 'Rôles',
      save: "enregistrer",
      saving: 'Enregistrement',
      search: 'Recherche',
      show: "Afficher {{what}}",
      showallfields: "afficher tous les champs",
      start: "Cette page est en italien",
      submit: 'Appliquer',
      sure: "Êtes-vous sûr?",
      terms: "Conditions de service",
      title: "BMS",
      to: "a",
      upload: 'Télécharger',
      updateDate: "Date de mise à jour",
      uploadFile: "Sélectionnez le fichier CSV à télécharger",
      user: 'Utilisateur',
      username: "Nom d'utilisateur",
      viewas: "Voir comme",
      workgroup: "Groupe de travail",
      yes: "oui",
      you: "tu",
      yourcomments: "Vos commentaires",
      public: "Public",
      name: "Nome",
      description: "Description",
      type: "Typologie",
      uploaded: "Téléchargé",
    },
    messages: {
      'enablingUser': (
        'Vous êtes sur le point de réactiver "{{user}}". ' +
        'Cet utilisateur pourra se connecter et ' +
        'appliquez les modifications en fonction de vos rôles.'
      ),
      'enablingWorkgroup': (
        'Vous réactiverez le groupe de travail "{{workgroup}}".' +
        'Utilisateurs appartenant à ce groupe de travail' +
        'peut appliquer les modifications en fonction de leurs rôles.'
      ),
      'deleteUser': (
        'L\'utilisateur sélectionné peut être supprimé par ' +
        'toujours parce qu\'il n\'y a aucune trace pour le moment' +
        'd\'activité dans la base de données.'
      ),
      'deleteWorkgroup': (
        'Depuis, il n\'y a aucune trace d\'activité ' +
        'dans la base de données, le groupe de travail sélectionné peut' +
        'être éliminé pour toujours.'
      ),
      'disablingUser': (
        'L\'utilisateur sélectionné ne peut pas être supprimé ' +
        'parce que pour le moment il y a des traces d\'activité dans la base de données.'
      ),
      'disablingWorkgroup': (
        'Le groupe de travail sélectionné ne peut pas être supprimé ' +
        'parce qu\'il y a pour le moment certaines de ses traces d\'activité ' +
        'dans la base de données.'
      ),
      'reenablingTip': (
        'tu pourras le réactiver plus tard'
      ),
      'deletingUserTip': (
        'l\'utilisateur sera supprimé de la base de données, mais dans ' +
        'Le même utilisateur peut être recréé à nouveau.'
      ),
      'deletingWorkgroupTip': (
        'le groupe de travail sera définitivement supprimé de la base de données'
      ),
      'identifierAlreadyUsed': (
        'Identifiant déjà utilisé'
      ),
      'disclaimer_publish_title': (
        'Publier les conditions de service'
      ),
      'disclaimer_publish_message': (
        'Êtes-vous sûr de vouloir publier cette nouvelle clause de non-responsabilité ?'
      ),
      'disclaimer_publish_note': (
        `Notez qu'en publiant le nouveau disclaimer, vous inciterez tous les
utilisateurs à donner leur accord.`
      )
    },
    error: {
      'oneerror': 'Une erreur constatée',
      'moreerror': '{{number}} erreurs constatées',
      'E-900': 'Modification en cours de l\'utilisateur "{{user}}"',
      'howToResolve': 'Comment résoudre ce problème?',
      'errorGap': 'Les Niveaux de séquence ne continuent pas',
      'errorGapSolution1': 'Remplir le vide avec un calque non défini',
      'errorGapSolution2': (
        'Remplacez la couche supérieure par le ' +
        'haut de la couche inférieure'
      ),
      'errorGapSolution3': 'Remplacer le haut de la couche inférieure par 0m',
      'errorGapSolution4': (
        'Remplacer le haut de la couche inférieure par la base' +
        'de niveau supérieure'
      ),
      'wrongDepth': 'Mauvaise profondeur',
      'wrongDepthSolution1': (
        'La profondeur de la dernière couche ({{lDepth}}m) ne coïncide pas avec' +
        'comme indiqué dans les métadonnées de forage ({{bDepth}}m). ' +
        'Modifiez manuellement le champ Base MD.'
      ),
      'missingBedrock': 'Roche manquante',
      'missingBedrockSolution': (
        'Crée automatiquement le substrat rocheux à partir des données saisies' +
        'sur la page de forage.'
      ),
      'missingLayer': 'Niveaux manquantes',
      'missingLayerSolution': (
        'S\'il vous plaît remplir l\'espace entre la surface et le substrat rocheux' +
        'ajout de nouveaux calques'
      ),
      'errorOverlap': "Calques superposés",
      'errorStartWrong': 'La première couche ne part pas de la surface'
    },
    header: {
      'explore': 'Explorer',
      'borehole': 'Éditeur de forage',
      'check': 'Pente',
      'validation': 'Publication',
      'settings': 'Paramètres',
      'language': 'Langue',
      'view_preferences': 'Afficher',
      'user_preferences': "Préférences de l'utilisateur",
      'hide_map': 'Cacher la carte',
      'viewerdesc': 'Recherche et affichage',
      'editordesc': 'Créer ou modifier',
      'settingdesc': 'Mettre à jour vos préférences',
    },
    home: {
      'legend': 'Légende de la carte',
      'attribute_filter': 'Filtre',
      'spatial_filter': 'Filtres spatiaux',
      'back_to_list': 'Retour à la liste'
    },
    editor: {
      'title': 'Projets',
      'title2': 'forages',
      'project_name': 'Nom du projet',
      'search': 'Recherche de projet',
      'create_new': 'Créer nouveau',
      'create': 'Créer',
      'editingEnabled': 'Le changement a commencé',
      'locked_by': 'Changements en cours de',
      'locked_at': 'Verrouillé',
      'locked_status': 'État '
    },
    borehole_form: {
      'andzoom': '...et zoomer',
      'afterdate': 'Après cette date',
      'beforedate': 'Avant cette date',
      'date': 'Date',
      'editingStart': 'Commencer l\'édition',
      'editingStop': 'Arrêtez l\'édition',
      'centerselected': 'Centre sélectionné',
      'completness': 'Exhaustivité',
      'creation': 'Date de création',
      'author': 'Auteur',
      'mainStratigraphy': 'Ceci est la stratigraphie principale',
      'meta_location': 'Position',
      'meta_borehole': 'Forage',
      'municipality': "Municipalité",
      'form_admin': 'Administration',
      'fromdepth': 'De la profondeur',
      'todepth': 'Jusqu\'à la profondeur',
      'fromelevation': 'De l\'altitude',
      'toelevation': 'Jusqu\'à l\'altitude',
      'fromdiameter': 'À partir du diamètre',
      'todiameter': 'Jusqu\'au diamètre',
      'meta_stratigraphy': 'Startigrafia',
      'loading_fetch': 'Chargement d\'une enquête existante ..',
      'creation_fetch': 'Préparation d\'une nouvelle enquête ..',
      'duplicate': 'Dupliquer la valeur, attribuer une autre valeur.',
      'date_format': 'JJ.MM.AAAA',
      'filterbymap': 'Filtre avec la carte',
      'frommeters': 'De mètres',
      'tometers': 'Jusqu\'à mètres',
      'frommillimeters': 'De millimètres',
      'original_name': "Nom original",
      'public_name': 'Nom public',
      'kind': 'Type de forage',
      'project_name': 'Nom du projet',
      'restriction': 'Restreint',
      'restriction_until': 'Date de restriction',
      'coordinates': 'Détails',
      'location_x': 'East Coordinate',
      'location_y': 'North Coordinate',
      'srs': 'SRS',
      'qt_location': 'Qualité coordonnée',
      'elevation_z': 'Altitude (msl)',
      'hrs': 'HRS',
      'qt_elevation': 'Qualité d\'élévation',
      'country': 'Pays',
      'canton': 'Canton',
      'city': 'Ville',
      'address': 'Adresse',
      'landuse': 'Utilisation du sol',
      'method': 'Méthodologie de forage',
      'drilling_date': 'Date de fin de forage',
      'cuttings': 'Cut',
      'purpose': 'Objet',
      'drill_diameter': 'Diamètre de perforation (mm)',
      'status': "Etat de forage",
      'bore_inc': 'Inclinaison (°)',
      'bore_inc_dir': 'Direction d\'inclinaison(°)',
      'qt_bore_inc_dir': 'Qualité Inclin./Direction ',
      'length': 'Profondeur totale (m)',
      'qt_length': 'Qualité de profondeur',
      'top_bedrock': 'Substrat supérieur (m)',
      'qt_top_bedrock': 'Substrat supérieur QC',
      'groundwater': 'Eau souterraine',
      'yes': 'oui',
      'no': 'no',
      'lit_pet_top_bedrock': 'Substrat Top Lit / Pet ',
      'lit_str_top_bedrock': 'Litstrati top substrato',
      'chro_str_top_bedrock': 'Chronostrates du substrat supérieur',
      'processing_status': 'État de transformation',
      'national_relevance': 'Pertinence nationale',
      //'attributes_to_edit':  'Attributs à modifier',
      'mistakes': 'Erreur',
      'remarks': 'Observations',
      'stratigraphy_name': 'Nom / Version'
    },
    layer_form: {
      'attention': 'Attention',
      'deletelayerconfirmation': 'Vous êtes sur le point de supprimer ce niveau, comment voulez-vous procéder?',
      'deletelayer': 'Supprimer cette couche',
      'extendupper': 'Étendre la couche supérieure à la couche inférieure',
      'extendlower': 'Étendre la couche inférieure jusqu\'au sommet',
      'setmanually': 'Régler manuellement',
      'Niveaux': 'Niveaux',
      'loading_fetch': 'Niveaux de chargement en cours ..',
      'creation_fetch': 'Créer un nouveau niveau ..',
      'depth': 'Profondeur',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Niveau de description',
      'geology': 'Description géologique',
      'last': 'Fin de forage',
      'qt_description': "Qualité de description",
      'lithology': "Lithologie / Pétrologie",
      'lithostratigraphy': 'Litho-stratigraphie',
      'chronostratigraphy': 'Chrono-stratigraphie',
      'tectonic_unit': 'Unités tectoniques',
      'symbol': 'Symbole',
      'color': 'Couleur',
      'plasticity': 'Plasticité',
      'humidity': 'Humidité',
      'consistance': 'Cohérence',
      'alteration': 'Modification',
      'compactness': 'Compact',
      'jointing': 'Connexion',
      'soil_state': 'État du sol',
      'organic_component': 'Composants organiques',
      'striae': 'Striae',
      'grain_size_1': 'Taille de grain 1',
      'grain_size_2': 'Taille de grain 2',
      'grain_shape': 'Forme du blé',
      'grain_granularity': 'Corniness du blé',
      'cohesion': 'Cohésion',
      'further_properties': "Autres paramètres",
      'uscs_1': "USCS 1",
      'uscs_2': "USCS 2",
      'uscs_3': "USCS 3",
      'uscs_original': 'Original USCS',
      'uscs_determination': 'Détermination USCS',
      'unconrocks': 'Classe du sol (KT GE)',
      'debris': 'Débris',
      'lit_pet_deb': 'Débris de Litho / Petro',
      'lithok': 'Litho',
      'kirost': 'Kiros',
      'remarks': 'Observations'
    },
    search: {
      'reset': 'réinitialiser',
      'identifier': 'Code d\'identification',
      'last_update': 'Dernière modification',
      'creation': 'Date de création',
      'completness': 'Filtrer par complétude',
      'all': 'Tous',
      'complete': 'Terminé',
      'incomplete': 'Incomplet',
      'empty': 'Vide'
    },
    grid: {
      'legend': "Légende de la carte",
      'attribute_filter': 'Filtre',
      'spatial_filter': 'Filtre spatial'
    },
    version: {
      '0': 'Terminé',
      'EDIT': 'Changement',
      'CONTROL': 'Contrôle scientifique',
      'VALID': 'Validation',
      'PUBLIC': 'Publiquer'
    }
  }
};

i18n
  .use(LanguageDetector)
  .init({
    resources: resources,
    fallbackLng: {
      'en': ['en-US'],
      'default': ['en']
    },
    whitelist: ['en', 'it', 'de', 'fr'],
    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false, 
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });

export default i18n;
