import React, { useState } from 'react';
import { Web3Button } from '@web3modal/react';
import { useAccount, useContractRead, useDisconnect } from 'wagmi';
import { Account } from './components';
import ContratoABI from './contractAbi.json';
import { BigNumber } from 'ethers';
import { writeUserData, readUserData } from './FireBaseConfig';
import './App.css';

export function App() {
  const { address, isConnected } = useAccount();
  const contractRead = useContractRead({
    address: '0x35a1543D4e4DCb5D2882661F0d439bbA1b97272F',
    abi: ContratoABI,
    functionName: 'balanceOf',
    args: [address],
  });

  let qntd = 0;
  if (BigNumber.isBigNumber(contractRead.data)) {
    qntd = contractRead.data.toNumber();
  }
  const approved = qntd > 0;
  if (approved) {
    writeUserData(address);
    readUserData(address);
  }
  const { disconnect } = useDisconnect();

  const SleepToDisconnect = () => {
    setTimeout(() => {
      disconnect();
    }, 3000);
  };


  return (
    <>
      <h1 className="title">Pi Projeto Vending Machine</h1>
      <div className="button-container">
        {}
      </div>
      <div className="button-container">
        <Web3Button />
      </div>
      {isConnected && <Account />}

      {contractRead.data && (
        <div className={`message ${approved ? 'success' : 'error'}`}>
          <div>{approved ? 'SUCESSO: Você possui o ticket do refrigerante' : 'ERROR: Não Possui o ticket do refrigerante'}</div>
          <div>Quantidade: {qntd}</div>
        </div>
      )}
    </>
  );
}