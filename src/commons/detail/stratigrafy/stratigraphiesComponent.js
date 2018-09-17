import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Tab, Menu } from 'semantic-ui-react'
import DomainText from '../../form/domain/domainText'
import ProfileContainer from './profile/profileContainer'

class StratigraphiesComponent extends React.Component {
  render() {
    const {
      stratigraphies
    } = this.props
    const tmp = stratigraphies.map((item, idx)=>(
      {
        menuItem: (
          <Menu.Item key={'str-tb-' + idx}>
            <DomainText
              schema='layer_kind'
              id={item.kind}/>
          </Menu.Item>
        ),
        render: () => <div>
          <ProfileContainer
            id={item.id}/>
        </div>
      }
    ))
    return (
      <div style={{
          flex: "1 1 0%",
          overflowY: 'auto',
          padding: '0px 1em'
        }}>
        {
          stratigraphies.length > 0?
          <Tab
            menu={{ secondary: true }}
            panes={tmp}
          />: <span>n/p</span>
        }
      </div>
    )
  }
}

StratigraphiesComponent.propTypes = {
    stratigraphies: PropTypes.array
}

export default translate('borehole_form')(StratigraphiesComponent)
