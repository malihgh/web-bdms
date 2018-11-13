import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tab, Menu, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import DomainText from './domainText'

class DomainTabs extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getActiveIndex = this.getActiveIndex.bind(this);
    this.state = {
      activeIndex: this.getActiveIndex(this.props.selected)
    };
  }

  getActiveIndex(selected){
    const {
      domains,
      schema
    } = this.props;
    let activeIndex = _.findIndex(
      domains.data[schema], { 'id': selected }
    );
    return activeIndex >= 1? activeIndex: 1;
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (_.isNil(nextProps.selected)){
  //     return {activeIndex: 0}
  //   }else if (nextProps.selected !== prevState.select){
  //     return {activeIndex: this.getActiveIndex(nextProps.selected)}
  //   }
  //   return null
  // }

  componentDidMount(){
    const {
      domains,
      schema,
      onSelected
    } = this.props;
    if(_.isFunction(onSelected)){
      onSelected(domains.data[schema][this.state.activeIndex-1].id);
    }
  }

  handleChange(activeIndex) {
    const {
      domains,
      schema,
      onSelected,
      onAdd
    } = this.props;
    if(activeIndex === 0){
      if(_.isFunction(onAdd)){
        onAdd();
      }
      this.setState({ activeIndex: 1});
    }else if(_.isFunction(onSelected)){
      onSelected(domains.data[schema][activeIndex-1].id);
      this.setState({ activeIndex: activeIndex});
    }
  }

  render() {
    const {
      domains,
      schema
    } = this.props;
    console.log('this.state.activeIndex', this.state.activeIndex);
    if(_.isUndefined(schema)){
      return 'Error: schema not given';
    }
    if(!_.has(domains.data, schema)){
      if(domains.isFetching === true){
        return 'loading...';
      }
      return '';
    }
    const panes = [{
      menuItem: (
        <Menu.Item icon
          key={'lkd-btn-n'}
        >
          <Icon name='add' />
        </Menu.Item>
      ),
      render: () => null
    }];
    domains.data[schema].map((kind, idx)=>{
      panes.push({
        menuItem: (
          <Menu.Item key={'lkd-btn-' + idx}>
            <DomainText
              schema={schema}
              id={kind.id}/>
          </Menu.Item>
        ),
        render: () => null
      });
    });
    return (
      <Tab
        menu={{
          secondary: true,
          color: 'blue'
        }}
        panes={panes}
        onTabChange={(e, data) => {
          this.handleChange(data.activeIndex)
        }}
        activeIndex={this.state.activeIndex}
      />
    )
  }
}

DomainTabs.propTypes = {
  addText: PropTypes.string,
  onAdd: PropTypes.func,
  onSelected: PropTypes.func,
  selected: PropTypes.number,
  schema: PropTypes.string
};

DomainTabs.defaultProps = {
  addText: 'Add'
};

const mapStateToProps = (state, ownProps) => {
  return {
    domains: state.core_domain_list
  }
};

export default connect(
  mapStateToProps,
  null
)(DomainTabs);
