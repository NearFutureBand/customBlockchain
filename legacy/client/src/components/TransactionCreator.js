import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { throws } from 'assert';

export default class TransactionCreator extends Component {
  constructor() {
    super();

    this.transactionTypes = [
      { key: 0, text: 'Transfer', value: 'transfer'},
      { key: 1, text: 'Create account', value: 'createAccount'}
    ];

    this.state = {
      inputs: [
        { name: 'type', value: '' },
        { name: 'from', value: '' },
        { name: 'privateKey', value: '' },
        { name: 'memo', value: '' }
      ]
    }
  }

  addInput = () => {
    this.setState({
      inputs: [ ...this.state.inputs, { name: '', value: '' }]
    })
  }

  removeInput = (i) => {
    let newInputs = [ ...this.state.inputs];
    newInputs.splice(i, 1);
    this.setState({
      inputs: newInputs
    })
  }

  changeValue = (event, i, key ) => {
    event.persist();
    let newInputs = [ ...this.state.inputs ];
    newInputs[i][key] = event.target.value;
    this.setState({ 
      inputs: newInputs 
    });
  }

  validate = () => {
    let data = {};

    this.state.inputs.forEach( el => {
      data[el.name] = el.value;
    })

    this.sendTransaction(data);
  }

  sendTransaction = (data) => {
    const socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => {
      console.log('socket opened');
      socket.send(
        JSON.stringify(data)
      );
      console.log('sended: ', data );
      socket.close();
    }
  }

  render() {
    const { inputs } = this.state;

    return (
      <div className="transaction-creator">
        <Form>
          {/*<Form.Group widths='equal'>
            <Form.Select fluid label='Type' options={this.transactionTypes} />
          </Form.Group>*/}
          {
            inputs.map( (el, i) => {
              return (
                <Form.Group key={i} widths='equal'>
                  <Form.Input fluid value={el.name} onChange={ (event) => this.changeValue(event, i, 'name') }/>
                  <Form.Input fluid value={el.value} onChange={ (event) => this.changeValue(event, i, 'value') }/>
                  <Button onClick={() => { this.removeInput(i)}}>
                    <Icon name="close" />
                  </Button>
                </Form.Group>
              )
            })
          }
          <Form.Button onClick={this.addInput}>Add</Form.Button>
          <Form.Button onClick={this.validate}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}