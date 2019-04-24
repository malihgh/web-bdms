import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Tab, Menu } from 'semantic-ui-react';
import DomainText from '../../form/domain/domainText';
import ProfileContainer from './profile/profileContainer';

class StratigraphiesComponent extends React.Component {
  render() {
    const {
      stratigraphies
    } = this.props;
    const tmp = stratigraphies.map((item, idx)=>(
      {
        menuItem: (
          <Menu.Item
            key={'str-tb-' + idx}
            style={{
              textAlign: 'center'
            }}
          >
            <DomainText
              schema='layer_kind'
              id={item.kind}/>
              {/*&nbsp;
            <span
              style={{
                fontSize: '0.7em',
                color: '#787878'
              }}
            >
              (<DateText
                date={item.date}
              />)
              </span>*/}
          </Menu.Item>
        ),
        render: () => <div
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            height: '100%',
            border: 'thin solid #cecece'
          }}
        >
          <ProfileContainer
            id={item.id}/>
        </div>
      }
    ))
    return (
      <div style={{
          // flex: "1 1 100%",
          flexGrow: 1,
          overflow: 'hidden',
          height: '100%',
          padding: '0px 1em 0px 0.5em',
        }}>
        {
          stratigraphies.length > 0?
          <Tab
            menu={{
              secondary: true,
              pointing: true
            }}
            panes={tmp}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
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
