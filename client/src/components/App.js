import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectToBlockchain } from '../actions/BlockchainActions';
import Block from './Block';

const App = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch( connectToBlockchain() )
      return () => {}
    },
    []
  );

  const blocks = useSelector(state => state.blockchain.blocks);
  return (
    <div className="app">
      { blocks.map( block => <Block {...block} key={block.hash} />) }
    </div>
  );
}

export default App;
