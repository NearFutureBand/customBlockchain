import React from 'react';
import styled from 'styled-components';

const Transaction = (props) => {
  const Trx = styled.div`
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding-left: 1rem;
  `;
  const Id = styled.span`
    font-weight: 700;
  `;
  return (
    <Trx>
      <Id>trx_id: {props.trx_id} </Id>
      <span>from: {props.from}, to: {props.to}, amount: {props.amount}</span>
    </Trx>
  );
};

export default Transaction;