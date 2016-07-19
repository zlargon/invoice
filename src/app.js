import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Invoice from '../data.json';
import './app.less';

const invoiceInfo = item => ['特別獎', '特獎', '頭獎', '增開六獎'].map((value, index) =>
  <div
    key={value}
    style={{fontFamily: 'monospace'}}
  >
    {index !== 0 ? <br/> : null}
    <div>{value}：</div>
    {
      item[value].map(s =>
        <div key={s}>
          <span>{s.slice(0, -3)}</span>
          <span style={{color: 'red'}}>{s.slice(-3)}</span>
        </div>
      )
    }
  </div>
);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar iconElementLeft={<div></div>}/>
          <List>
            <ListItem
              primaryText={Invoice[0]['月份']}
              primaryTogglesNestedList={true}
              leftCheckbox={
                <Checkbox defaultChecked={true}/>
              }
              nestedItems={[
                <ListItem key="new" primaryText={invoiceInfo(Invoice[0])}/>
              ]}
            />

            <ListItem
              primaryText={Invoice[1]['月份']}
              primaryTogglesNestedList={true}
              leftCheckbox={<Checkbox />}
              nestedItems={[
                <ListItem key="old" primaryText={invoiceInfo(Invoice[1])}/>
              ]}
            />
            <ListItem
              primaryText='財政部稅務入口網'
              onTouchTap={() => location.href = 'http://invoice.etax.nat.gov.tw/'}
            />
          </List>
        </Drawer>

        <AppBar
          title="Title"
          onLeftIconButtonTouchTap={() => this.setState({open: true})}
        />
      </div>
    );
  }
}
