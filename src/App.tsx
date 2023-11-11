import { useAccount, useContractRead, useDisconnect } from "wagmi";
import { Account } from "./components";
import ContratoABI from "./contractAbi.json";
import { BigNumber } from "ethers";
import { writeUserData, readUserData } from "./FireBaseConfig";
import "./App.css";

export function App() {
  const { address, isConnected } = useAccount();
  const contractRead = useContractRead({
    address: "0x18145188f281c3e0E8E0f566b2CB692Ac3576892",
    abi: ContratoABI,
    functionName: "balanceOf",
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

  const handleButtonClick = () => {
    writeUserData("0x2275e8a5e69be437c45a611ec818a2b650cecbea");
    readUserData("0x2275e8a5e69be437c45a611ec818a2b650cecbea");
    console.log("Botão clicado! Realizando alguma ação...");
  };

  return (
    <>
      <h1 className="title">Pi Projeto Vending Machine</h1>
      <div className="button-container">
        {/* Adicione um botão e atribua o manipulador de evento onClick */}
        <button onClick={handleButtonClick}>Clique para fazer algo</button>
      </div>
      <div className="button-container">
        <w3m-button />
      </div>
      {isConnected && <Account />}

      {contractRead.data && (
        <div className={`message ${approved ? "success" : "error"}`}>
          <div>{approved ? "SUCESSO: Possui item digital" : "ERROR: Não Possui o item digital"}</div>
          <div>Quantidade: {qntd}</div>
        </div>
      )}
    </>
  );
}
