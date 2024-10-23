import { SYAbi } from "@/contracts/abis/SY";
import { SY, SYslisBNB } from "@/contracts/tokens/SY";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useEffect, useState } from "react";
import { PublicClient, formatUnits } from "viem";
import { useChainId, usePublicClient } from "wagmi";

export function useSY(token:Currency,publicClient:PublicClient,chainId:number) {
    
    // const publicClient = usePublicClient();
    // const chainId = useChainId();

    const [exchangeRate,setExchangeRate] = useState<Decimal>();
    const [totalSupply,settotalSupply] = useState<Decimal>();

    useEffect(() => {
        async function _exchangeRate() {

            if (token?.chainId == chainId) {
                const result = await publicClient?.readContract({
                    address: (token as Token)?.address,
                    abi: SYAbi,
                    functionName: 'exchangeRate',
                })
                if (result) {
                    return new Decimal(formatUnits(result, token?.decimals))
                }
            }
            
        }
        _exchangeRate().then(setExchangeRate)

        async function _totalSupply() {

            if (token?.chainId == chainId) {
                try {
                    const result = await publicClient?.readContract({
                        address: (token as Token)?.address,
                        abi: SYAbi,
                        functionName: 'totalSupply',
                    })
                    if (result) {
                        return new Decimal(formatUnits(result, token?.decimals))
                    }
                } catch{
                }
            }

        }
        _totalSupply().then(settotalSupply)
    },[token, chainId])

    return {
        SYView: {
            totalSupply,
            exchangeRate
        }
    }
}

export type useSY = ReturnType<typeof useSY>;