import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/RaisedButton';
import Invoice from '../invoice.json';
import InvoiceMap from '../lib/InvoiceMap';
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
      numbers: '',
      open: false,
      newInvoice: true,
      oldInvoice: false
    };

    this.oldMap = InvoiceMap(Invoice.old);
    this.newMap = InvoiceMap(Invoice.new);
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

  keyBoardHandler (value) {
    let numbers;
    switch (value) {
      case '1': case '2': case '3': case '4': case '5':
      case '6': case '7': case '8': case '9': case '0':
        numbers = this.state.numbers.length >= 3 ? value : this.state.numbers + value;
        break;

      case 'clear':
        numbers = '';
        break;

      case 'del':
        numbers = this.state.numbers.slice(0, -1);
        break;

      default:
        return;
    }

    this.setState({numbers});
    if (numbers.length < 3) {
      return;
    }

    if (this.state.newInvoice && this.newMap.hasOwnProperty(numbers)) {
      console.log('中獎！');
    } else if (this.state.oldInvoice && this.oldMap.hasOwnProperty(numbers)) {
      console.log('中獎！')
    } else {
      console.log('沒中！');
    }
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
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('1')}
              label="1"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('2')}
              label="2"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('3')}
              label="3"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('4')}
              label="4"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('5')}
              label="5"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('6')}
              label="6"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('7')}
              label="7"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('8')}
              label="8"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('9')}
              label="9"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('clear')}
              label="Clear" primary={true}
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('0')}
              label="0"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler('del')}
              label="Del" primary={true}
            />
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
