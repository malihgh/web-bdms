import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import {
  Checkbox,
  Header,
  Table,
  Form
} from 'semantic-ui-react';

import {
  createUser,
  updateUser,
  createWorkgroup,
  setRole,
  listUsers,
  listWorkgroups
} from '@ist-supsi/bmsjs';


class AdminSettings extends React.Component {

  constructor(props) {
    super(props);
    this.setRole = this.setRole.bind(this);
    this.state = {
      "users": false,
      "workgroups": false,

      "roleUpdate": false,

      "user": null,
      "uId": null,
      "uUsername": "", 
      "uPassword": "", 
      "uFirstname": "", 
      "uLastname": "", 

      "workgroup": null,
      "wId": null,
      "wName": ""
    };
  }

  componentDidMount(){
    this.props.listUsers();
    this.props.listWorkgroups();
  }

  componentDidUpdate(prevProps){
    if (
      this.state.user !== null
      && prevProps.users.fcnt !== this.props.users.fcnt
    ) {
      for (let index = 0; index < this.props.users.data.length; index++) {
        const user = this.props.users.data[index];
        if (user.id === this.state.user.id){
          this.setState({
            user: user
          });
        }
      }
    }
  }

  setRole(uwg, workgroup, role){
    this.setState({
      roleUpdate: true
    }, () => {
      if (
        uwg !== undefined
        && uwg.roles.indexOf(role) >= 0
      ) {
        // Remove role
        setRole(
          this.state.user.id,
          workgroup.id,
          role,
          false
        ).then((response)=>{
          this.props.listUsers().then(
            ()=>{
              this.props.listWorkgroups();
            }
          );                                                
        });
      } else {
        setRole(
          this.state.user.id,
          workgroup.id,
          role
        ).then((response)=>{
          this.props.listUsers().then(
            ()=>{
              this.props.listWorkgroups();
            }
          );
        });
      }
    });
  }

  render() {
    return (
      <div
        style={{
          padding: '2em',
          flex: 1,
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            flex: '1 1 100%',
            marginRight: '0.5em'
          }}
        >
          <Header
            as='h3'
            // className='link'
            onClick={() => {
              this.setState({
                "users": !this.state.users
              });
            }}
          >
            Users
          </Header>
          <Form>
            <Form.Group
              widths='equal'
            >
              <Form.Input
                fluid
                label='Username'
                onChange={(e)=>{
                  this.setState({
                    uUsername: e.target.value
                  });
                }}
                placeholder='Use the email'
                value={this.state.uUsername}
              />
              <Form.Input
                autoComplete='new-password'
                fluid
                label='Password'
                onChange={(e)=>{
                  this.setState({
                    uPassword: e.target.value
                  });
                }}
                placeholder='Password'
                type='password'
                value={this.state.uPassword}
              />
              <Form.Input
                fluid
                label='First name'
                onChange={(e)=>{
                  this.setState({
                    uFirstname: e.target.value
                  });
                }}
                placeholder='First name'
                value={this.state.uFirstname}
              />
              <Form.Input
                autoComplete='off'
                fluid
                label='Last name'
                onChange={(e)=>{
                  this.setState({
                    uLastname: e.target.value
                  });
                }}
                placeholder='Last name'
                value={this.state.uLastname}
              />
            </Form.Group>
            <Form.Button
              onClick={()=>{
                if (this.state.uPassword === ''){
                  alert("Password empty");
                } else {
                  if (this.state.uId === null){
                    createUser(
                      this.state.uUsername,
                      this.state.uPassword,
                      this.state.uFirstname,
                      '',
                      this.state.uLastname
                    ).then(()=>{
                      this.props.listUsers();
                    });
                  } else {
                    updateUser(
                      this.state.uId,
                      this.state.uUsername,
                      this.state.uPassword,
                      this.state.uFirstname,
                      '',
                      this.state.uLastname
                    ).then(()=>{
                      this.props.listUsers();
                    });
                  }
                }
              }}
            >
              {
                this.state.uId !== null?
                  "Update": "Add"
              }
            </Form.Button>
          </Form>
          <div
            style={{
              marginTop: '1em',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            <Table
              celled
              compact
              selectable
              size='small'
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Firstname</Table.HeaderCell>
                  <Table.HeaderCell>Lastname</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  this.props.users.data.map((user, idx)=>(
                    <Table.Row
                      active={
                        this.state.uId === user.id
                      }
                      key={"stng-users-"+user.id}
                      onClick={()=>{
                        if (this.state.uId === user.id){
                          this.setState({
                            "user": null,
                            "uId": null,
                            "uUsername": "", 
                            "uPassword": "", 
                            "uFirstname": "", 
                            "uLastname":""
                          });
                        } else {
                          this.setState({
                            "user": user,
                            "uId": user.id,
                            "uUsername": user.username, 
                            "uPassword": "", 
                            "uFirstname": user.firstname, 
                            "uLastname": user.lastname
                          });
                        }
                      }}
                    >
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.firstname}</Table.Cell>
                      <Table.Cell>{user.lastname}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </div>

        </div>
        <div
          style={{
            flex: '1 1 100%',
            marginLeft: '0.5em'
          }}
        >
          {
            this.state.user !== null?
              <div> 
                <Header
                  as='h3'
                  className='link'
                  // onClick={() => {
                  //   this.setState({
                  //     "users": !this.state.users
                  //   });
                  // }}
                >
                  Workgroups
                </Header>
                <Form
                  autoComplete='off'
                >
                  <Form.Group
                    autoComplete='off'
                    widths='equal'
                  >
                    <Form.Input
                      fluid
                      label='Name'
                      onChange={(e)=>{
                        this.setState({
                          wName: e.target.value
                        });
                      }}
                      placeholder='Workgroup name'
                      value={this.state.wName}
                    />
                  </Form.Group>
                  <Form.Button
                    onClick={()=>{
                      createWorkgroup(
                        this.state.wName
                      ).then((response)=>{
                        this.props.listWorkgroups();
                      });
                    }}
                  >
                    Add
                  </Form.Button>
                </Form>
                <div
                  style={{
                    marginTop: '1em',
                    maxHeight: '400px',
                    overflowY: 'auto',
                  }}
                >
                  <Table
                    celled
                    compact
                    size='small'
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Workgroup</Table.HeaderCell>
                        <Table.HeaderCell>Roles</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {
                        this.props.workgroups.data.map((workgroup, idx)=>(
                          <Table.Row
                            key={"stng-users-"+workgroup.id}
                            // onClick={()=>{
                            //   this.setState({
                            //     "wId": workgroup.id,
                            //     "wName": workgroup.name
                            //   });
                            // }}
                          >
                            <Table.Cell>
                              {workgroup.name}
                            </Table.Cell>
                            <Table.Cell>
                              {(()=>{
                                const uwg = this.state.user.workgroups.find(
                                  w => w.id === workgroup.id
                                );
                                return (
                                  <Form>
                                    <Form.Group
                                      autoComplete='off'
                                      widths='equal'
                                    >
                                      <Form.Field>
                                        <Checkbox
                                          checked={
                                            uwg !== undefined
                                            && uwg.roles.indexOf('VIEW') >= 0
                                          }
                                          label='VIEWER'
                                          onChange={(e, d) => {
                                            this.setRole(uwg, workgroup, 'VIEW');
                                          }}
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <Checkbox
                                          checked={
                                            uwg !== undefined
                                            && uwg.roles.indexOf('EDIT') >= 0
                                          }
                                          label='EDITOR'
                                          onChange={(e, d) => {
                                            this.setRole(uwg, workgroup, 'EDIT');
                                          }}
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <Checkbox
                                          checked={
                                            uwg !== undefined
                                            && uwg.roles.indexOf('CONTROL') >= 0
                                          }
                                          label='CONTROLLER'
                                          onChange={(e, d) => {
                                            this.setRole(uwg, workgroup, 'CONTROL');
                                          }}
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <Checkbox
                                          checked={
                                            uwg !== undefined
                                            && uwg.roles.indexOf('VALID') >= 0
                                          }
                                          label='VALIDATOR'
                                          onChange={(e, d) => {
                                            this.setRole(uwg, workgroup, 'VALID');
                                          }}
                                        />
                                      </Form.Field>
                                      <Form.Field>
                                        <Checkbox
                                          checked={
                                            uwg !== undefined
                                            && uwg.roles.indexOf('PUBLIC') >= 0
                                          }
                                          label='PUBBLISHER'
                                          onChange={(e, d) => {
                                            this.setRole(uwg, workgroup, 'PUBLIC');
                                          }}
                                        />
                                      </Form.Field>
                                    </Form.Group>
                                  </Form>
                                );
                              })()}
                            </Table.Cell>
                          </Table.Row>
                        ))
                      }
                    </Table.Body>
                  </Table>
                </div>
              </div>: null
          }
        </div>
        
      </div>
    );
  }
};

AdminSettings.propTypes = {
  listUsers: PropTypes.func,
  listWorkgroups: PropTypes.func,
  t: PropTypes.func,
  users: PropTypes.object
};

// AdminSettings.defaultProps = {
// };

const mapStateToProps = (state) => {
  return {
    users: state.core_users,
    workgroups: state.core_workgroups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    listUsers: () => {
      return dispatch(listUsers());
    },
    listWorkgroups: () => {
      return dispatch(listWorkgroups());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate(['common'])(AdminSettings));
