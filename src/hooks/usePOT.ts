import { POT } from "@/contracts/tokens/POT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract } from "wagmi";

export function stake({
    POT,
    PT,
    YT,
    SYAmount,
    lockupDays,
    
}:{
    POT:Currency,
    PT:Currency,
    YT:Currency,
    SYAmount:string,
    lockupDays:number,
}) {

    const account = useAccount();
    const {writeContract} = useWriteContract();

    writeContract({
        abi: POTAbi,
        address: (POT as Token).address,
        functionName: 'stake',
        args: [
            BigInt(SYAmount),
            BigInt(lockupDays),
            account.address,
            (PT as Token).address,
            (YT as Token).address,
        ]
    })

    // if (account.address) {
    //     const {request} = await publicClient?.simulateContract({
    //         address: POT.address,
    //         abi: POTAbi,
    //         functionName: 'stake',
    //         args: [
    //             BigInt(SYAmount.toFixed(18)),
    //             BigInt(lockupDays),
    //             account.address,
    //             (PT as Token).address,
    //             (YT as Token).address,
    //         ]
    //     })
    //     await publicClient.writeContract(request)
    // }
    
    
}