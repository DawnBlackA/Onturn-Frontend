'use client';

import React, { useEffect, useState } from 'react'
import { ArrowUpDown, Link, Star, TrendingUp, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LiquidStakingCard from "@/components/LiquidStakingCard"
import { useMarkets } from '@/hooks/useMarkets';
import { useRouter } from 'next/navigation';
import { Currency, Token } from '@/packages/core';
import { CurrencySelectListType } from '@/contracts/currencys';

export default function EnhancedMarketPage() {

  const { 
    marketsData 
  } = useMarkets();

  const [selectedMarket, setSelectedMarket] = useState(null);
  // const [ token,setToken ] = useState("");
  const router = useRouter();

  // const handleMarketClick = (currencySelectList : CurrencySelectListType) => {
  //   const data = encodeURIComponent(JSON.stringify(currencySelectList))
  //   router.push(`/staking/liquidstaking?data=${data}`)
  // };

  const handleMarketClick = (tokenName : string) => {
    router.push(`/staking/liquidstaking?tokenName=${tokenName}`)
  };

  const handleClosePopup = () => {
    setSelectedMarket(null);
  };

  return (
    <div className="min-h-screen bg-[#030415] text-white p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-500/10 blur-3xl"></div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-[250px] text-gray-300">Name <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Liquidity <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Average Lock Time <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Currently Anchored APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketsData.map((item, index) => (
              <TableRow
                key={item.name}
                className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'} backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-gray-700/30 cursor-pointer`}
                onClick={() => handleMarketClick(item.name)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        {item.name}
                        <div className="ml-2 text-yellow-500 transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-180">
                          <Star className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{item.platform}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="transition-all duration-300 ease-in-out hover:scale-105">
                    ${item.liquidity}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="transition-all duration-300 ease-in-out hover:scale-105">
                    {item.averageLockTime}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 p-3 rounded-md inline-block min-w-[120px] shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                    <div className="text-lg font-bold flex items-center">
                      {item.currentlyAnchoredAPY}%
                      <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-sm text-gray-300">
          Showing all Blast pools (2 of 2).{' '}
          <Button
            variant="link"
            className="text-blue-400 hover:text-purple-300 transition-colors duration-300"
          >
            Refresh
          </Button>
        </div>
      </div>
      {selectedMarket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <LiquidStakingCard />
            <Button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
              variant="ghost"
              size="icon"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}