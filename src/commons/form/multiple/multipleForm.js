import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import DomainDropdown from '../domain/dropdown/domainDropdown';
import DateField from '../dateField';
import MunicipalityDropdown from '../municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../cantons/dropdown/cantonDropdown';

import {
  Header,
  Input,
  Button,
  Form
} from 'semantic-ui-react';

import {
  patchBoreholes
} from '@ist-supsi/bmsjs';

class MultipleForm extends React.Component {

  constructor(props) {
    super(props);
    this.getToggle = this.getToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.save = this.save.bind(this);
    this.isActive = this.isActive.bind(this);
    this.state = {
      fields: [],
      data: {
        kind: null,
        project_name: '',
        restriction: null,
        restriction_until: null,
        canton: null,
        city: null,
        address: '',
        landuse: null,
        method: null,
        drilling_date: null,
        cuttings: null,
        purpose: null,
        drill_diameter: '',
        status: null,
        bore_inc: '',
        bore_inc_dir: '',
        qt_bore_inc_dir: null,
        length: '',
        qt_length: null,
        top_bedrock: '',
        qt_top_bedrock: null,
        groundwater: null,
        lit_pet_top_bedrock: null,
        lit_str_top_bedrock: null,
        chro_str_top_bedrock: null,
      }
    };
  }

  isActive(field){
    return _.indexOf(this.state.fields, field) >= 0;
  }

  toggle(field){
    let idx = _.indexOf(this.state.fields, field);
    const fields = [...this.state.fields];
    if (idx>=0){
      fields.splice(idx, 1);
    } else {
      fields.push(field);
    }
    this.setState({
      fields: fields
    });
  }

  save(){
    const {
      undo
    } = this.props;
    const voca = {
      'project_name': 'custom.project_name',
      'canton': 'custom.canton',
      'city': 'custom.city',
      'address': 'custom.address',
      'landuse': 'custom.landuse',
      'method': 'extended.method',
      'cuttings': 'custom.cuttings',
      'purpose': 'extended.purpose',
      'drill_diameter': 'custom.drill_diameter',
      'status': 'extended.status',
      'qt_bore_inc_dir': 'custom.qt_bore_inc_dir',
      'qt_length': 'custom.qt_length',
      'top_bedrock': 'extended.top_bedrock',
      'qt_top_bedrock': 'custom.qt_top_bedrock',
      'groundwater': 'extended.groundwater',
      'lit_pet_top_bedrock': 'custom.lit_pet_top_bedrock',
      'lit_str_top_bedrock': 'custom.lit_str_top_bedrock',
      'chro_str_top_bedrock': 'custom.chro_str_top_bedrock'
    };
    const fields = this.state.fields.map(field => ([
      voca.hasOwnProperty(field)? voca[field]: field,
      this.state.data[field]
    ]));
    if (this.isActive('restriction')){
      fields.push([
        'restriction_until',
        this.state.data['restriction_until']
      ]);
    }
    patchBoreholes(
      this.props.selected, fields
    ).then((response)=>{
      undo();
    }).catch(function (error) {
      console.error(error);
    });
  }

  getToggle(field){
    const {
      t
    } = this.props;
    return (
      <Button
        active={this.isActive(field)}
        onClick={(e)=>{
          this.toggle(field);
        }}
        size='mini'
        toggle
      >
        {t(field)}
      </Button>
    );
  }

  getDomain(field, schema=null){
    const {
      t
    } = this.props;
    if (!this.isActive(field)){
      return null;
    }
    return (
      <Form.Field>
        <label>{t(field)}</label>
        <DomainDropdown
          onSelected={(selected)=>{
            let tmp = {};
            tmp[field] = selected.id;
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                ...tmp
              }
            });
          }}
          schema={schema===null? field: schema}
          selected={this.state.data[field]}
        />
      </Form.Field>
    );
  }

  getInput(field, type='text'){
    const {
      t
    } = this.props;
    if (!this.isActive(field)){
      return null;
    }
    return (
      <Form.Field>
        <label>{t(field)}</label>
        <Input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={(e)=>{
            let tmp = {};
            if (type==='number'){
              tmp[field] =  e.target.value === ''?
                null: _.toNumber(e.target.value);

            } else {
              tmp[field] =  e.target.value;
            }
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                ...tmp
              }
            });
          }}
          spellCheck="false"
          type={type}
          value={this.state.data[field]}
        />
      </Form.Field>
    );
  }

  render() {
    const {
      t
    } = this.props;
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header>
          Bulk modification
        </Header>
        <div
          style={{
            marginBottom: '1em',
            lineHeight: '2.5em'
          }}
        >
          {this.getToggle('kind')}
          {this.getToggle('project_name')}
          {this.getToggle('restriction')}
          {this.getToggle('canton')}
          {this.getToggle('city')}
          {this.getToggle('address')}
          {this.getToggle('landuse')}
          {this.getToggle('method')}
          {this.getToggle('drilling_date')}
          {this.getToggle('cuttings')}
          {this.getToggle('purpose')}
          {this.getToggle('drill_diameter')}
          {this.getToggle('status')}
          {this.getToggle('bore_inc')}
          {this.getToggle('bore_inc_dir')}
          {this.getToggle('qt_bore_inc_dir')}
          {this.getToggle('length')}
          {this.getToggle('qt_length')}
          {this.getToggle('top_bedrock')}
          {this.getToggle('qt_top_bedrock')}
          {this.getToggle('groundwater')}
          {this.getToggle('lit_pet_top_bedrock')}
          {this.getToggle('lit_str_top_bedrock')}
          {this.getToggle('chro_str_top_bedrock')}
        </div>
        <div
          style={{
            flex: 1,
            maxHeight: '450px',
            minHeight: '250px',
            overflowY: 'auto',
            padding: '0.5em'
          }}
        >
          {
            this.state.fields.length===0?
              'Please Select the Fields to Edit': null
          }
          <Form
            autoComplete="off"
            error
          >
            {this.getDomain('kind')}
            {this.getInput('project_name')}
            {
              this.isActive('restriction')?
                <Form.Group widths='equal'>
                  {this.getDomain('restriction')}
                  <Form.Field
                    required={this.state.data.restriction === 29}>
                    <label>{t('restriction_until')}</label>
                    <DateField
                      date={this.state.data.restriction_until}
                      onChange={(selected)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            'restriction_until': selected
                          }
                        });
                      }} />
                  </Form.Field>
                </Form.Group>: null
            }
            {
              this.isActive('canton')?
                <Form.Group widths='equal'>
                  <Form.Field
                    required
                  >
                    <label>{t('canton')}</label>
                    <CantonDropdown
                      onSelected={(selected)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            'canton': selected.id,
                            'city': null
                          }
                        });
                      }}
                      selected={this.state.data.canton}
                    />
                  </Form.Field>
                </Form.Group>: null
            }
            {
              this.isActive('city')?
                <Form.Group widths='equal'>
                  <Form.Field
                    required
                  >
                    <label>{t('city')}</label>
                    <MunicipalityDropdown
                      canton={this.state.data.canton}
                      disabled={this.state.data.canton===null}
                      onSelected={(selected)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            'city': selected.id
                          }
                        });
                      }}
                      selected={this.state.data.city}
                    />
                  </Form.Field>
                </Form.Group>: null
            }
            {this.getInput('address')}
            {this.getDomain('landuse', 'custom.landuse')}
            <Form.Group widths='equal'>
              {this.getDomain('method', 'extended.method')}
              {
                this.isActive('drilling_date')?
                  <Form.Field>
                    <label>{t('drilling_date')}</label>
                    <DateField
                      date={this.state.data.drilling_date}
                      onChange={(selected)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            drilling_date: selected
                          }
                        });
                      }} />
                  </Form.Field>: null
              }
            </Form.Group>
            <Form.Group widths='equal'>
              {this.getDomain('cuttings', 'custom.cuttings')}
              {this.getDomain('purpose', 'extended.purpose')}
            </Form.Group>
            <Form.Group widths='equal'>
              {this.getInput('drill_diameter', 'number')}
              {this.getDomain('status', 'extended.status')}
            </Form.Group>
            <Form.Group widths='equal'>
              {this.getInput('bore_inc', 'number')}
              {this.getInput('bore_inc_dir', 'number')}
              {this.getDomain('qt_bore_inc_dir', 'custom.qt_bore_inc_dir')}
            </Form.Group>
            <Form.Group widths='equal'>
              {this.getInput('length', 'number')}
              {this.getDomain('qt_length', 'custom.qt_length')}
            </Form.Group>
            <Form.Group widths='equal'>
              {this.getInput('top_bedrock', 'number')}
              {this.getDomain('qt_top_bedrock', 'custom.qt_top_bedrock')}
            </Form.Group>
            {
              this.isActive('groundwater')?
                <Form.Field
                  required
                >
                  <label>{t('groundwater')}</label>
                  <Form.Group inline>
                    <Form.Radio
                      checked={this.state.data.groundwater === true}
                      label={t('common:yes')}
                      onChange={(e, d)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            groundwater: true
                          }
                        });
                      }}
                    />
                    <Form.Radio
                      checked={this.state.data.groundwater === false}
                      label={t('common:no')}
                      onChange={(e, d)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            groundwater: false
                          }
                        });
                      }}
                    />
                    <Form.Radio
                      checked={this.state.data.groundwater === null}
                      label={t('common:np')}
                      onChange={(e, d)=>{
                        this.setState({
                          ...this.state,
                          data: {
                            ...this.state.data,
                            groundwater: null
                          }
                        });
                      }}
                    />
                  </Form.Group>
                </Form.Field>: null
            }
            {this.getDomain('lit_pet_top_bedrock', 'custom.lit_pet_top_bedrock')}
            {this.getDomain('lit_str_top_bedrock', 'custom.lit_str_top_bedrock')}
            {this.getDomain('chro_str_top_bedrock', 'custom.chro_str_top_bedrock')}
          </Form>
        </div>
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Button
            negative  
            onClick={()=>{
              this.props.undo();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={()=>{
              this.save();
            }}  
            positive
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

MultipleForm.propTypes = {
  selected: PropTypes.array,
  undo: PropTypes.func
};

MultipleForm.defaultProps = {
  selected: []
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    undo: () => {
      dispatch({
        type: 'EDITOR_MULTIPLE_SELECTED',
        selection: null
      });
    },
    // patchBoreholes: (ids, fields) => {
    //   dispatch(patchBoreholes(ids, fields));
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((
   withTranslation(['common'])(MultipleForm)
));
