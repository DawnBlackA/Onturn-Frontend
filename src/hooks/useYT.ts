import { YTAbi } from "@/contracts/abis/YT";
import { YT } from "@/contracts/tokens/YT";
import Decimal from "decimal.js-light";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { usePublicClient, useChainId } from "wagmi";



export function useYT(token:YT) {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();

    const [totalSupply,setTotalSuppy] = useState<Decimal>();
    const [currentYields,setCurrentYields] = useState<Decimal>();

    useEffect(() => {

        async function _() {

            if (token?.chainId == chainId) {
                const result = await publicClient?.readContract({
                    address: token?.address,
                    abi: YTAbi,
                    functionName: 'totalSupply',
                })
                if (result) {
                    return new Decimal(formatUnits(result, token?.decimals))
                }
            }
        }
        _().then(setTotalSuppy)

        async function currentYields() {

            if (token?.chainId == chainId) {
                const result = await publicClient?.readContract({
                    address: token?.address,
                    abi: YTAbi,
                    functionName: 'currentYields',
                })
                if (result) {
                    return new Decimal(formatUnits(result, token?.decimals))
                }
            }
        }
        currentYields().then(setCurrentYields)
    },[token, chainId])

    return {
        SYView: {
            totalSupply,
            currentYields,
            
        }
    }
}
