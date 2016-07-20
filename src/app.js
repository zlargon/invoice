import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/RaisedButton';
import Invoice from '../invoice.json';
import './app.less';

const invoiceInfo = item => ['super', 'special', 'first', 'addition'].map((value, index) =>
  <div
    key={value}
    style={{fontFamily: 'monospace'}}
  >
    {index !== 0 ? <br/> : null}
    <div>{item[value].name}：</div>
    {
      item[value].numbers.map(num =>
        <div key={num}>
          <span>{num.slice(0, -3)}</span>
          <span style={{color: 'red'}}>{num.slice(-3)}</span>
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
      return Invoice.old.title.slice(0, -3) + Invoice.new.title.slice(-3);
    }

    return this.state.newInvoice ? Invoice.new.title : Invoice.old.title;
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
              primaryText={Invoice.new.title}
              primaryTogglesNestedList={true}
              leftCheckbox={
                <Checkbox
                  checked={this.state.newInvoice}
                  onCheck={(e, v) => this.selectMonth('new', v)}
                />
              }
              nestedItems={[
                <ListItem key="new" primaryText={invoiceInfo(Invoice.new)}/>
              ]}
            />

            <ListItem
              primaryText={Invoice.old.title}
              primaryTogglesNestedList={true}
              leftCheckbox={
                <Checkbox
                  checked={this.state.oldInvoice}
                  onCheck={(e, v) => this.selectMonth('old', v)}
                />
              }
              nestedItems={[
                <ListItem key="old" primaryText={invoiceInfo(Invoice.old)}/>
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
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="1" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="2" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="3" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="4" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="5" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="6" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="7" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="8" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="9" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="Clear" primary={true} />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="0" />
            <Button labelStyle={styles.keyBoardLable} style={styles.keyBoard} label="Del" primary={true} />
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
