import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
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

const styles = {
  keyBoard: {
    width: 100,
    height: 67,
    margin: 3
  },
  keyBoardLable: {
    fontSize: 22
  }
};

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      numbers: '789',
      open: false,
      newInvoice: true,
      oldInvoice: false
    };
  }

  selectMonth (invoice, value) {
    if (!value && (this.state.newInvoice ^ this.state.oldInvoice)) {
      return;
    }

    this.setState({
      [invoice + 'Invoice']: value
    });
  }

  getTitle () {
    if (this.state.newInvoice && this.state.oldInvoice) {
      return Invoice[1]['月份'].slice(0, -3) + Invoice[0]['月份'].slice(-3);
    }

    return this.state.newInvoice ? Invoice[0]['月份'] : Invoice[1]['月份'];
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
                <Checkbox
                  checked={this.state.newInvoice}
                  onCheck={(e, v) => this.selectMonth('new', v)}
                />
              }
              nestedItems={[
                <ListItem key="new" primaryText={invoiceInfo(Invoice[0])}/>
              ]}
            />

            <ListItem
              primaryText={Invoice[1]['月份']}
              primaryTogglesNestedList={true}
              leftCheckbox={
                <Checkbox
                  checked={this.state.oldInvoice}
                  onCheck={(e, v) => this.selectMonth('old', v)}
                />
              }
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

        <div className="invoice-main">

          <div className='invoice-monitor'>
            <div className='numbers'>{this.state.numbers}</div>
            <div className='message'>請輸入發票後三碼</div>
          </div>

          <div className='invoice-keyboard'>
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="1" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="2" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="3" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="4" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="5" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="6" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="7" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="8" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="9" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="Clear" primary={true} />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="0" />
            <RaisedButton labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="Del" primary={true} />
          </div>
        </div>

        <AppBar
          title={this.getTitle()}
          titleStyle={{
            textAlign: 'center'
          }}
          style={{
            position: 'fixed',
            top: 0
          }}
          zDepth={0}
          onLeftIconButtonTouchTap={() => this.setState({open: true})}
        />
      </div>
    );
  }
}
