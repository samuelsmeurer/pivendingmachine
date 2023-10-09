import * as React from 'react'
import { usePrepareContractWrite, useContractWrite,useWaitForTransaction} from 'wagmi'
import ContratoABI from "../contractAbi.json"

export function MintNFT() {
  const { config,
    error: prepareError,
    isError: isPrepareError, 
  } = usePrepareContractWrite({
    address: '0xee3c94f80A311411c9C07DdcC3Ef6Eca17Bd3361',
    abi: ContratoABI,
    functionName: 'awardItem',
    args: ['0x6062121A191CDe02F645E62c63C5733e033de305', 'https://ipfs.io/ipfs/QmY2ySfGoX3LHAz133xoVsvrfYnH9B5ezorrXxPMZA4Fak/16'],
    })
    const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

return (
    <div>
       <button disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://polygonscan.com/tx/${data?.hash}`}>PolygonScan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}