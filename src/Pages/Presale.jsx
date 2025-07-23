  import React, { useState } from 'react';
  import { DollarSign, Wallet, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
  import { useAccount, useWriteContract, useReadContract,useBalance  } from 'wagmi';
  import { contractABI } from '../abi/ABI';
  import { erc20Abi } from 'viem';
  import { useWalletClient } from 'wagmi';
  import { ethers } from 'ethers';
  import SuccessModal from '../Elements/Modal';
  import Loader from "../Elements/Loader"
  import toast from "react-hot-toast"
  const contractAddress = '0x10956d053f466fc5293813605A5E1813Ecbf9E44'; // Your token contract address
  const USDTAddress = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'; // USDT contract address (mainnet)


  const wagmiContractConfig = {
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT contract address
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: 'supply', type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'allowance',
        stateMutability: 'view',
        inputs: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' }
        ],
        outputs: [{ type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ type: 'bool' }],
      },
    ],
  };

  function App() {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('ETH');
    const [totalTokens, setTotalTokens] = useState(0);
    const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const [actionLabel, setActionLabel] = useState('');
    const [tokensBought, setTokensBought] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
React.useEffect(() => {
  const updateTokens = async () => {
    const tokens = await calculateTokens();
    setTotalTokens(tokens);
  };

  if (amount && !isNaN(parseFloat(amount))) {
    updateTokens();
  } else {
    setTotalTokens('0');
  }
}, [amount, paymentMethod]);
    const { data: walletClient } = useWalletClient();
    const signer = walletClient ? new ethers.providers.Web3Provider(walletClient.transport).getSigner() : null;

    const {     isPending,
      writeContract } = useWriteContract();
    const { data: balance } = useReadContract({
      ...wagmiContractConfig,
      functionName: 'balanceOf',
      args: [address],
    });

    const { data: allowance } = useReadContract({
      ...wagmiContractConfig,
      functionName: 'allowance',
      args: [address, contractAddress],
    });
    const { data: nativeBalance } = useBalance({
      address: address, // your user's wallet address
    });

  const calculateTokens = async () => {
    if (!amount || isNaN(parseFloat(amount))) return '0';
    const amt = parseFloat(amount);

    if (paymentMethod === 'ETH') {
    const provider = walletClient ? new ethers.providers.Web3Provider(walletClient.transport) : null;
      const priceFeed = new ethers.Contract(
        '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
        [
          {
            inputs: [],
            name: 'latestRoundData',
            outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        provider
      );

      const roundData = await priceFeed.latestRoundData();
      const ethPrice = Number(roundData.answer) / 1e8; // ETH price in USD
      const tokenPrice = 0.18;
      const tokensPerETH = ethPrice / tokenPrice;

      return (amt * tokensPerETH).toLocaleString();
    } else {
      const tokenPrice = 0.18;
      return (amt / tokenPrice).toLocaleString(); // USDT amount / price per token
    }
  };

    

    const buyTokenWithETH = async () => {
      if (!signer) return;
      try {
        setLoading(true);
        setActionLabel('Processing ETH transaction...');
    
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contract.buyTokenWithETH({
          value: ethers.utils.parseEther(amount.toString())
        });
        await tx.wait();
        const tokens = await calculateTokens();
        setTokensBought(tokens);
        setShowSuccessModal(true);
        console.log('ETH Transaction confirmed');
      } catch (error) {
        toast.error('Error buying token with ETH:', error);
      } finally {
        setLoading(false);
      }
    };
    
    
    const approveUSDT = async () => {
      if (!signer) return;
      try {
        setLoading(true);
        setActionLabel('Approving USDT...');
    
        const usdtContract = new ethers.Contract(USDTAddress, erc20Abi, signer);
        const tokenAmount = ethers.utils.parseUnits(await calculateTokens(), 18); // assuming USDT has 18 decimals
        const tx = await usdtContract.approve(contractAddress, tokenAmount);
        await tx.wait();
        toast.success("Approval Transaction Done! Now Purchasing Tokens")

        console.log('USDT Approved');
      } catch (error) {
        toast.error('Error approving USDT:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const buyTokenWithUSDT = async () => {
      if (!signer) return;
      try {
        setLoading(true);
        setActionLabel('Processing USDT transaction...');
    
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const tokenAmount = ethers.utils.parseUnits(await calculateTokens(), 18);
        const tx = await contract.buyToken(tokenAmount);
        await tx.wait();
        const tokens = calculateTokens();
        setTokensBought(tokens);
        setShowSuccessModal(true);
        console.log('USDT Transaction confirmed');
      } catch (error) {
        toast.error('Error buying token with USDT:', error);
      } finally {
        setLoading(false);
      }
    };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!amount) return;
    try {
      if (paymentMethod === 'ETH') {
        await buyTokenWithETH();
      } else {
        const tokenAmount = parseFloat(calculateTokens());
        if (parseFloat(allowance) < tokenAmount) {
          await approveUSDT();
          await buyTokenWithUSDT();
        } else {
          await buyTokenWithUSDT();
        }
      }
      toast.success("Token Purchase Done")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Error during the transaction:", error);
    }
  };


    return (
  <div className="h-[120%] pt-6  bg-[#3B1C08] flex items-center justify-center p-4 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="starfield opacity-50"></div>
      <div className="inset-0 bg-gradient-to-t from-transparent via-gray-900/50 to-[#3B1C08]"></div>
    </div>
    <SuccessModal
    tokensBought={tokensBought}
    onClose={() => setTokensBought(null)}
  />

    {loading && <Loader label={actionLabel} />}

    <div className="max-w-md mt-20 w-full bg-[#3B1C08] backdrop-blur-xl rounded-xl p-4 border border-orange-500/20 shadow-xl relative z-10 hover:border-orange-500/30 transition-all duration-500">
      <div className="absolute -inset-px bg-gradient-to-r from-gray-500 via-red-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

      <div className="relative pt-10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="h-5 w-5 text-orange-400 animate-pulse" />
          </div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-gray-400 mb-2">
            DEM(Democracy) Token Presale
          </h1>
          <p className="text-orange-200 text-xs">Secure your tokens at the best price</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
          { label: 'Time Left', value: '35 days', icon: <Clock className="h-4 w-4 text-orange-400" /> },
          { label: 'Token Price', value: '0.18 USD', icon: <Clock className="h-4 w-4 text-orange-400" /> },
        ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <p className="text-xs text-orange-200">{stat.label}</p>
              </div>
              <p className="text-md font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-orange-500/20">
            <label className="block text-xs font-medium text-orange-200 mb-2">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              {['ETH', 'USDT'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`py-2 rounded-md text-xs font-medium transition-all duration-300 ${paymentMethod === method
                      ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-md shadow-orange-500/20'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/80 border border-orange-500/20'
                    }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4 border border-orange-500/20">
            <label htmlFor="amount" className="block text-xs font-medium text-orange-200 mb-2">
              Amount ({paymentMethod})
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-orange-400" />
              </div>
              <input
                type="number"
                id="amount"
                placeholder={`Enter amount in ${paymentMethod}`}
                className="w-full pl-9 pr-3 py-2 bg-gray-900/50 border border-orange-500/30 rounded-md text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.1"
              />
            </div>
            <p className="mt-1 text-xs text-orange-200">
              Min. purchase: {paymentMethod === 'ETH' ? '0.0001 ETH' : '1 USDT'}
            </p>
            {paymentMethod === 'ETH' && (
              <p className="mt-1 text-xs text-orange-200">
                Your ETH Balance: {nativeBalance ? nativeBalance.formatted : 'Loading...'} ETH
              </p>
            )}
            {paymentMethod === 'USDT' && (
              <p className="mt-1 text-xs text-orange-200">
                Your USDT Balance: {balance ? (Number(balance) / 1e18).toLocaleString() : 'Loading...'} USDT
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-900/50 to-purple-900/50 rounded-lg p-4 border border-orange-500/30">
            <div className="flex justify-between items-center">
              <span className="text-xs text-orange-200">You'll receive:</span>
              <span className="text-md font-bold text-white">{totalTokens} $DEM</span>
            </div>
          </div>
          <button
    onClick={handleSubmit}
    disabled={loading}
    className={`w-full flex justify-center items-center gap-2 py-2 px-4 text-sm font-semibold text-white rounded-md transition duration-300
      ${loading
        ? 'bg-gray-700 cursor-not-allowed'
        : 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-purple-700'}
    `}
  >
    {loading ? (
      <>
        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {actionLabel}
      </>
    ) : (
      <>
        <ArrowRight className="h-4 w-4" />
        Buy with {paymentMethod}
      </>
    )}
  </button>


          <p className="text-center text-xs text-orange-200/80">
            By proceeding, you agree to our Terms of Service and confirm that you are eligible to participate.
          </p>
        </form>
      </div>
    </div>
  </div>

    );
  }

  export default App;
