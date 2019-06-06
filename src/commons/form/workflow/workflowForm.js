import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';

import {
  Button,
  Icon
} from 'semantic-ui-react';

import {
  loadWorkflows,
  patchWorkflow,
  updateWorkflow
} from '@ist-supsi/bmsjs';

import CommentArea from './commentArea';
import DateText from '../dateText';


class WorkflowForm extends React.Component {

  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateAttributeDelay = false;
    this.state = {
      "expanded": false,
      "id": props.id
    };
  }

  componentDidMount() {
    this.load(this.state.id);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.id !== null
      && this.props.id !== prevProps.id
    ) {
      this.setState({
        "id": this.props.id
      }, ()=>{
        this.load(this.state.id);
      });
    }
  }

  load(id) {
    if (_.isInteger(id)) {
      this.setState({
        "expanded": false
      }, () => {
        this.props.loadWorkflows(id);
      });
    }
  }

  handleChange(value) {

    // if (
    //   this.props.borehole.data.lock === null
    //   || this.props.borehole.data.lock.username !== this.props.user.data.username
    // ){
    //   alert("Borehole not locked");
    //   return;
    // }

    this.props.updateWorkflow(value);
    if (
      this.updateAttributeDelay !== false
    ) {
      clearTimeout(this.updateAttributeDelay);
      this.updateAttributeDelay = false;
    }
    this.updateAttributeDelay = setTimeout(() => {
      this.props.patchWorkflow( 
        this.props.workflow.data.id, value
      );
    }, 500);
  }

  render() {
    const {
      id, t, workflow, workflows
    } = this.props;

    if (_.isNil(id)) {
      return null;
    }

    const filtered = workflows.data.filter(
      flow => flow.finished !== null 
    );

    return (
      <div
        style={{
          display: 'flex',
          flex: '1 1 100%',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%'
        }}
      >
        <div
          className='link'
          onClick={(e)=>{
            this.setState({
              expanded: !this.state.expanded
            });
          }}
          style={{
            fontSize: '0.8em',
            paddingBottom: '1em'
          }}
        >
          {
            this.state.expanded === false?
              '+ show history': '- hide history'
          }
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 100%'
          }}
        >
          <div
            style={{
              overflowX: 'hidden',
              overflowY: 'auto',
              flex: '1 1 100%'
            }}
          >
            {
              filtered.map((flow, idx)=>(
                <div
                  key={'wff-cmt-' + idx}
                  style={{
                    borderBottom: (idx + 1) < filtered.length?
                      'thin solid rgba(0, 0, 0, 0.15)': null,
                    display: (idx + 1) < filtered.length
                      && this.state.expanded === false?
                      'none': null,
                    marginBottom: '1em',
                    padding: '0px 0.5em 0.5em 0.5em'
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    {flow.author.name} {
                      flow.author.username === this.props.user.data.username?
                        <span
                          style={{
                            color: '#787878',
                          }}
                        >
                          ({t('common:you')})
                        </span>: null
                    }
                  </div>
                  <div
                    style={{
                      color: '#787878',
                      fontSize: '0.8em'
                    }}
                  >
                    <DateText
                      date={flow.finished}
                      fromnow
                    /> - <DateText
                      date={flow.finished}
                      hours
                    />
                  </div>
                  <div
                    style={{
                      padding: '0.5em 0px'
                    }}
                  >
                    <CommentArea
                      height={100}
                      readOnly
                      value={flow.notes}
                    />
                  </div>
                </div>
              ))
            }
            {
              workflow.data === null?
                null:
                <div>
                  <span>
                    Your comments:
                  </span>
                  <CommentArea
                    onChange={this.handleChange}
                    value={workflow.data.notes}
                  />
                  {
                    workflow.isPatching === true?
                      <div>
                        <Icon
                          loading
                          name='spinner'
                          size='small'
                        /> {t('common:saving')}
                      </div>: null
                  }
                </div>
            }
          </div>
        </div>
        <div>
          <Button
            fluid
            secondary
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

WorkflowForm.propTypes = {
  id: PropTypes.number,
  loadWorkflows: PropTypes.func,
  patchWorkflow: PropTypes.func,
  t: PropTypes.func,
  updateWorkflow: PropTypes.func,
  user: PropTypes.object,
  workflow: PropTypes.object,
  workflows: PropTypes.object,
};

WorkflowForm.defaultProps = {
  id: undefined
};

const mapStateToProps = (state) => {
  return {
    workflow: state.core_workflow,
    workflows: state.core_workflows,
    user: state.core_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    loadWorkflows: (id) => {
      dispatch(loadWorkflows(id));
    },
    patchWorkflow: (id, value) => {
      dispatch(patchWorkflow(id, 'notes', value));
    },
    updateWorkflow: (value) => {
      dispatch(updateWorkflow('notes', value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['common'])(WorkflowForm));
