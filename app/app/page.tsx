"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cog, Users, CreditCard, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-6 container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Carbon Credit Tokenization Dashboard
        </h1>
        <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-emerald-500 mt-2"></div>
      </header>

      <Card className="bg-[#1a2236] border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            Welcome to the Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#141c2f] p-6 rounded-lg text-white">
            <p className="mb-4">
              Welcome to the Carbon Credit Tokenization Dashboard. This platform
              allows you to create, manage, mint, trade, and redeem tokenized
              carbon credits on the blockchain.
            </p>
            <p>
              Use the sidebar navigation to access different sections of the
              dashboard or select one of the quick actions below.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Registry Endpoint Card */}
        <Card className="bg-[#1a2236] border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <div className="bg-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Cog className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Registry Endpoint</CardTitle>
            <CardDescription className="text-gray-400">
              Configure the connection to the carbon credit registry
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/admin/endpoints">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                Configure Endpoint
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Whitelist Management Card */}
        <Card className="bg-[#1a2236] border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">User identity</CardTitle>
            <CardDescription className="text-gray-400">
              Manage addresses allowed to mint tokens
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/admin/user-identity">
              <Button
                variant="outline"
                className="w-full border-gray-700 text-white hover:bg-gray-800"
              >
                User Identity
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Mint Tokens Card */}
        <Card className="bg-[#1a2236] border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <div className="bg-[#4263eb] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Mint Tokens</CardTitle>
            <CardDescription className="text-gray-400">
              Mint new carbon credit tokens against verified carbon credits
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/minter/mint-token">
              <Button className="w-full bg-[#4263eb] hover:bg-[#3b5bdb] text-white">
                Mint Tokens
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Mint History Card */}
        <Card className="bg-[#1a2236] border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <div className="bg-[#1a2236] border border-gray-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Mint History</CardTitle>
            <CardDescription className="text-gray-400">
              View history of all minting operations
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white">
              View History
            </Button>
          </CardFooter>
        </Card>

        {/* Redeem Tokens Card */}
        <Card className="bg-[#1a2236] border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <div className="bg-amber-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white">Retire Tokens</CardTitle>
            <CardDescription className="text-gray-400">
              Retire carbon credit tokens against verified carbon credits
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/trader/retire">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Retire Tokens
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
