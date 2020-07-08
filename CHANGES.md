# List of all changes

## What's new in web-bdms 1.0.1-RC1

### New features

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
