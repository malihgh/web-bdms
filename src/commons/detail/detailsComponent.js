import React from 'react'
import PropTypes from 'prop-types'
import {
  Header
} from 'semantic-ui-react'

class DetailsComponent extends React.Component {
  render() {
    const {
      data
    } = this.props
    return (
      <div style={{
          flex: "1 1 0%",
          overflowY: 'auto',
          padding: '1em'
        }}>
        <Header>
          Details of {data.name}
        </Header>
      </div>
    )
  }
}

DetailsComponent.propTypes = {
    data: PropTypes.object
}

export default DetailsComponent
