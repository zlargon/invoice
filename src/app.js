import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/RaisedButton';
import Invoice from '../invoice.json';
import InvoiceMap from '../lib/InvoiceMap';
import './app.less';

const KEY_CODE = {
  ZERO:  48,
  ONE:   49,
  TWO:   50,
  THREE: 51,
  FOUR:  52,
  FIVE:  53,
  SIX:   54,
  SEVEN: 55,
  EIGHT: 56,
  NINE:  57,
  C:     67,
  LEFT:  37,
  SHIFT: 16
};

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

const winningMessage = (info) => <div style={{lineHeight: 1.5}}>{
  info.map(prize => [
    <div>{prize.period}</div>,
    <div>{prize.award} <span style={{color: 'red'}}>{prize.number}</span></div>,
    <div>{prize.message}</div>
  ])
}</div>;

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
      showAppBar: false,
      showDialog: false,
      newInvoice: true,
      oldInvoice: false,
      dialogMessage: '',
      tipMessage: '請輸入發票後三碼'
    };

    this.oldMap = InvoiceMap(Invoice.old);
    this.newMap = InvoiceMap(Invoice.new);

    window.addEventListener('keyup', (e) => {
      this.keyBoardHandler(e.keyCode);
    }, false);
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

  keyBoardHandler (code) {
    let numbers;
    switch (code) {
      // 0 - 9
      case KEY_CODE.ZERO:  case KEY_CODE.ONE:   case KEY_CODE.TWO:
      case KEY_CODE.THREE: case KEY_CODE.FOUR:  case KEY_CODE.FIVE:
      case KEY_CODE.SIX:   case KEY_CODE.SEVEN: case KEY_CODE.EIGHT:
      case KEY_CODE.NINE:
        numbers = (this.state.numbers.length >= 3 ? '' : this.state.numbers) + (code - 48);
        break;

      // C
      case KEY_CODE.C:
        numbers = '';
        break;

      // ←
      case KEY_CODE.LEFT:
        numbers = this.state.numbers.slice(0, -1);
        break;

      // shift
      case KEY_CODE.SHIFT:
        this.setState({showAppBar: !this.state.showAppBar});

      default:
        return;
    }

    if (numbers.length === 0) {
      this.setState({
        numbers,
        tipMessage: '請輸入發票後三碼'
      });
      return;
    }

    if (numbers.length === 3) {
      const greetings = (
        <div
          style={{color: 'red', cursor: 'pointer'}}
          onTouchTap={() => this.setState({showDialog: true})}
        >
          恭喜中獎！
        </div>
      );

      if (this.state.newInvoice && this.newMap.hasOwnProperty(numbers)) {
        this.setState({
          numbers,
          showDialog: true,
          dialogMessage: winningMessage(this.newMap[numbers]),
          tipMessage: greetings
        });
      } else if (this.state.oldInvoice && this.oldMap.hasOwnProperty(numbers)) {
        this.setState({
          numbers,
          showDialog: true,
          dialogMessage: winningMessage(this.oldMap[numbers]),
          tipMessage: greetings
        });
      } else {
        this.setState({
          numbers,
          tipMessage: '沒中'
        });
      }
      return;
    }

    this.setState({
      numbers,
      tipMessage: ''
    });
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          open={this.state.showAppBar}
          onRequestChange={(showAppBar) => this.setState({showAppBar})}
        >
          <AppBar iconElementLeft={<div></div>}/>
          <List>
            <ListItem
              primaryText={Invoice.new.title}
              primaryTogglesNestedList={true}
              initiallyOpen={true}
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
              primaryText={'更新時間：' + window.updated_time}
            />
          </List>
        </Drawer>

        <div className="invoice-main">

          <div className='invoice-monitor'>
            <div className='numbers'>{this.state.numbers}</div>
            <div className='tip-message'>{this.state.tipMessage}</div>
          </div>

          <div className='invoice-keyboard'>
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.ONE)}
              label="1"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.TWO)}
              label="2"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.THREE)}
              label="3"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.FOUR)}
              label="4"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.FIVE)}
              label="5"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.SIX)}
              label="6"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.SEVEN)}
              label="7"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.EIGHT)}
              label="8"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.NINE)}
              label="9"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.C)}
              label="c" primary={true}
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.ZERO)}
              label="0"
            />
            <Button
              labelStyle={styles.keyBoardLable}
              style={styles.keyBoard}
              onTouchTap={() => this.keyBoardHandler(KEY_CODE.LEFT)}
              label="←" primary={true}
            />
          </div>
        </div>

        <Dialog
          title='恭喜中獎！'
          actions={
            <Button
              label='OK'
              primary={true}
              onTouchTap={() => this.setState({showDialog: false})}
            />
          }
          modal={false}
          open={this.state.showDialog}
          onRequestClose={() => this.setState({showDialog: false})}
        >
          {this.state.dialogMessage}
        </Dialog>

        <AppBar
          iconElementRight={
            <IconButton
              iconClassName="muidocs-icon-custom-github"
              href="https://github.com/zlargon/invoice"
            >
            </IconButton>
          }
          showMenuIconButton={true}
          title={this.getTitle()}
          titleStyle={{
            textAlign: 'center'
          }}
          style={{
            position: 'fixed',
            top: 0
          }}
          zDepth={0}
          onLeftIconButtonTouchTap={() => this.setState({showAppBar: true})}
        />
      </div>
    );
  }
}
