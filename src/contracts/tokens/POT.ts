import { POTAddressMap } from "../addressMap/POTAddressMap";
import { ChainId } from "../chains";

export type POT = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    name: string,
    symbol: string,
};

export const POTslisBNB: {[chainId: number]: POT} = {

    [ChainId.BSC_TESTNET]:{
        chainId: ChainId.BSC_TESTNET,
        address: POTAddressMap[ChainId.BSC_TESTNET].slisBNB,
        decimals: 18,
        name: 'SlisBNB Position Option Token',
        symbol: 'POT-slisBNB',
    },

}