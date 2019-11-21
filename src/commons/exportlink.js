import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const ExportLink = props => {

  if (props.id.lenght === 0) {
    return null;
  }

  let frmt = [];
  if (props.pdf === true) {
    frmt.push("pdf");
  }
  if (props.shp === true) {
    frmt.push("shape");
  }
  if (props.csv === true) {
    frmt.push("csv");
  }
  if (props.fullcsv === true) {
    frmt.push("fullcsv");
  }
  const href = (
    (
      process.env.NODE_ENV === 'development'?
        'http://localhost:8888': process.env.PUBLIC_URL
    )
    + '/api/v1/borehole/download?lang=' + props.i18n.language + '&format='
    + frmt.join(',') + "&id="
    + props.id.join(',')
  );

  return (
    <a
      className='link'
      href={href}
      style={{
        ...props.style
      }}
      target='export'
    >
      Download
    </a>
  );
};

ExportLink.propTypes = {
  csv: PropTypes.bool,
  fullcsv: PropTypes.bool,
  id: PropTypes.array,
  pdf: PropTypes.bool,
  shp: PropTypes.bool,
  style: PropTypes.object
};

ExportLink.defaultProps = {
  id: [],
  pdf: true,
  shape: false,
  csv: false,
  fullcsv: false
};

export default translate()(ExportLink);
