# List of all changes

## What's new in web-bdms 1.0.2

### New features

 - **Editor are prompted to confirm when deleting boreholes**

    - A modal window is displayed asking the ditor to confirm the deletion of a borehole.

 - **Borehole identifiers multilanguage**

    - In the settings pages the admin user can define identifiers in each supported language.

 - **Login screen customization**

    - In the settings pages the admin user can customize the title and the welcome message using markdown.

 - **Added link to strati.ch**

    - In the Litostratigraphies window a link to the official https://strati.ch/ is added. 

### Minor fixes

 - fixed to wide hidden feedback link in header
 - updated hardcoded DEV mode default password
 - updated table in editor mode and viewer to include translations

## What's new in web-bdms 1.0.1

### New features

 - **Terms of service**: 
   
   - On login users have to agree to the terms of service (only once).
   - In the settings, the terms can be updated, and the users
   are propted again.
   - Terms are formatted according to the "Markdown" markup language.

 - **Login as guest**: 
   
   Added "*Login as guest*" button in the login panel.

 - **Download**:

   CSVs, PDFs and ShapeFiles download take into account also the
   new dynamic identifiers columns. 

 - **Simple Import with CSV**:
   
   As editor, importing new data using csv now handles more fields. In particular you can import easily a list of boreholes using this columns descriptors:

   - **location_east** (*numeric*): **mandatory**
   - **location_north** (*numeric*): **mandatory**
   - **public_name** (*text*): **mandatory**
   - location_z (*numeric*): *optional*
   - original_name (*text*): optional
   - project_name (*text*): optional
   - drilling_date (*text*): optional
   - total_depth (*numeric*): optional
   - top_bedrock (*numeric*): optional
   - remarks (*text*): optional

   Note: The column order can be exchanged.

 - **Attachments**: 
   
   You can now upload multiple files for each borehole adding a description and define if it is visible for VIERWERs
