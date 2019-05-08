import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Tab, Menu } from 'semantic-ui-react';
import DomainText from '../../form/domain/domainText';
import ProfileContainer from './profile/profileContainer';
import MetaComponent from './../meta/metaComponent';
import Scroller from '../../scroller';

// class StratigraphiesComponent extends React.Component {
const StratigraphiesComponent = (props) => {

  const {
    data,
  } = props;
  const tmp = [
    {
      menuItem: (
        <Menu.Item
          key={'str-tb-data'}
          style={{
            textAlign: 'center'
          }}
        >
          Data
        </Menu.Item>
      ),
      render: () => (
        <Scroller
          style={{ height: '100%' }}
        >
          <MetaComponent
            data={data.borehole}
          />
        </Scroller>
      )
    },
    ...(
      data.stratigraphies.map((item, idx) => (
        {
          menuItem: (
            <Menu.Item
              key={'str-tb-' + idx}
              style={{
                textAlign: 'center'
              }}
            >
              <DomainText
                id={item.kind}
                schema='layer_kind'
              />
            </Menu.Item>
          ),
          render: () => (
            <div
              style={{
                flexGrow: 1,
                overflow: 'hidden',
                height: '100%',
                // border: 'thin solid #cecece'
              }}
            >
              <ProfileContainer
                id={item.id}
              />
            </div>
          )
        }
      ))
    )
  ];
  // const tmp = data.stratigraphies.map((item, idx) => (
  //   {
  //     menuItem: (
  //       <Menu.Item
  //         key={'str-tb-' + idx}
  //         style={{
  //           textAlign: 'center'
  //         }}
  //       >
  //         <DomainText
  //           id={item.kind}
  //           schema='layer_kind'
  //         />
  //       </Menu.Item>
  //     ),
  //     render: () => (
  //       <div
  //         style={{
  //           flexGrow: 1,
  //           overflow: 'hidden',
  //           height: '100%',
  //           border: 'thin solid #cecece'
  //         }}
  //       >
  //         <ProfileContainer
  //           id={item.id}
  //         />
  //       </div>
  //     )
  //   }
  // ));
  return (
    <div
      style={{
        // flex: "1 1 100%",
        flexGrow: 1,
        overflow: 'hidden',
        height: '100%',
        padding: '0px 1em 0px 0.5em',
      }}
    >
      {
        data.stratigraphies.length > 0 ?
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
          /> : <span>n/p</span>
      }
    </div>
  );
};

StratigraphiesComponent.propTypes = {
  data: PropTypes.object
};

export default translate('borehole_form')(StratigraphiesComponent);
