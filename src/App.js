import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  // keep track of latest block nr
  const [blockNumber, setBlockNumber] = useState();
  // keep track of 1 txn on latest block
  const [latestTXN, setLatestTXN] = useState();
  const [toTXN, setToTXN] = useState();
  const [fromTXN, setFromTXN] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  });

  useEffect(() => {
    async function getBlockTransaction() {
      let response = await alchemy.core.getBlockWithTransactions(blockNumber);
      setLatestTXN(response.transactions[0].hash);
    }
    getBlockTransaction();
  });

  useEffect(() => {
    async function getTXNdetails() {
      let response = await alchemy.core.getTransactionReceipt(latestTXN);
      console.log(response);
      setToTXN(response.to);
      setFromTXN(response.from);
      
    }
    getTXNdetails();
  });

  return( 
    <div>
      <div className="App">Block Number: {blockNumber}</div>;
      <div className="App">Latest Transaction: {latestTXN}</div>;
      <div className="App">TXN was sent from: {fromTXN}</div>;
      <div className="App">TXN was sent to: {toTXN}</div>; 
    </div>
  )
  
}

export default App;
