import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import Transaction from './Transaction';

const Block = (props) => {
  const Wrapper = styled.div`
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 1rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 1px 1px 10px rgba(100,100,100,0.3);
  `;
  const Transactions = styled.div`
    width: 100%;
    padding: 0.2rem;
    background-color: rgba(200,200,200,0.3);
  `;
  return (
    <Wrapper>
      <span> hash: {props.hash}</span>
      <span> prev hash: {props.previousHash}</span>
      <span> time: {moment(props.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
      <span> nonce: {props.nonce}</span>
      <Transactions>Transactions: </Transactions>
      <div>
        {
          _.values(props.transactions)
            .map( trx => <Transaction {...trx} key={trx.trx_id} /> )
        }
      </div>
    </Wrapper>
  );
};

export default Block;