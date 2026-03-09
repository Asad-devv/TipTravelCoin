import React, { useState, useMemo } from 'react';
import { DollarSign, ArrowRight, Sparkles, Zap, Shield, ChevronDown, Wallet, Coins, CheckCircle2 } from 'lucide-react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { contractABI } from '../abi/ABI';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import SuccessModal from '../Elements/Modal';
import Loader from "../Elements/Loader";
import toast from "react-hot-toast";

const contractAddress = '0xb6742608E867268b44a412cd61dc298D61EB009B';

function App() {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [actionLabel, setActionLabel] = useState('');
  const [purchasedTokens, setPurchasedTokens] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const { data: walletClient } = useWalletClient();
  const signer = walletClient
    ? new ethers.providers.Web3Provider(walletClient.transport).getSigner()
    : null;

  const { data: nativeBalance } = useBalance({ address });

  // ── Contract reads ───────────────────────────────────────────────

  const { data: tokensSold } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalTokensSold',
  });

  const { data: totalSupplyRaw } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalSupply',
  });

  // User's total tokens bought from this presale
  const { data: userTokensBoughtRaw, refetch: refetchUserTokens } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'tokensBought',
    args: [address],
    query: { enabled: !!address },
  });

  // Parse amount to wei for the contract preview call
  const parsedAmountWei = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return undefined;
    try {
      return BigInt(ethers.utils.parseEther(parseFloat(amount).toString()).toString());
    } catch {
      return undefined;
    }
  }, [amount]);

  // previewBuyWithETH — uses exact same math as the contract, no client-side Chainlink call needed
  const { data: previewData, isError: previewError, isLoading: previewLoading } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'previewBuyWithETH',
    args: [parsedAmountWei ?? 0n],
    query: { enabled: !!parsedAmountWei },
  });

  // ── Derived display values ───────────────────────────────────────

  const presaleProgress = tokensSold && totalSupplyRaw && BigInt(totalSupplyRaw) > 0n
    ? Math.min(Number((BigInt(tokensSold) * 10000n) / BigInt(totalSupplyRaw)) / 100, 100)
    : 0;

  const tokensSoldDisplay = tokensSold
    ? (Number(BigInt(tokensSold)) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 0 })
    : '0';

  // previewData is [tokenAmount (bigint), enoughTokensLeft (bool), enoughTokensInContract (bool)]
  const previewTokenAmount  = previewData?.[0] ?? previewData?.tokenAmount;
  const enoughTokensLeft    = previewData?.[1] ?? previewData?.enoughTokensLeft;
  const enoughInContract    = previewData?.[2] ?? previewData?.enoughTokensInContract;

  const displayTokens = useMemo(() => {
    if (!previewTokenAmount) return '0';
    return (Number(BigInt(previewTokenAmount)) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 4 });
  }, [previewTokenAmount]);

  const userTokensDisplay = userTokensBoughtRaw && BigInt(userTokensBoughtRaw) > 0n
    ? (Number(BigInt(userTokensBoughtRaw)) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 })
    : null;

  const ethBalance = nativeBalance
    ? parseFloat(ethers.utils.formatEther(nativeBalance.value)).toFixed(4)
    : '—';

  // ── Validation warnings ──────────────────────────────────────────

  const showNotEnoughLeft     = parsedAmountWei && previewData && !enoughTokensLeft;
  const showNotEnoughContract = parsedAmountWei && previewData && !enoughInContract;
  const showPriceError        = parsedAmountWei && previewError;
  const buyDisabled           = loading || !amount || !signer || showNotEnoughLeft || showNotEnoughContract;

  // ── Buy handler ──────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signer) {
      toast.error('Please connect your wallet first.');
      return;
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error('Enter a valid ETH amount.');
      return;
    }
    if (showNotEnoughLeft) {
      toast.error('Not enough tokens left in the presale.');
      return;
    }
    if (showNotEnoughContract) {
      toast.error('Not enough tokens in contract. Contact support.');
      return;
    }
    try {
      setLoading(true);
      setActionLabel('Processing transaction...');
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.buyTokenWithETH({
        value: ethers.utils.parseEther(parseFloat(amount).toString()),
      });
      await tx.wait();
      // Show the token amount we previewed (contract math)
      setPurchasedTokens(displayTokens);
      setAmount('');
      refetchUserTokens();
      toast.success('Token purchase complete!');
    } catch (error) {
      const reason = error?.reason || error?.data?.message || '';
      if (reason.includes('Stale price feed')) {
        toast.error('Price feed is temporarily unavailable. Try again shortly.');
      } else if (reason.includes('Not enough tokens')) {
        toast.error('Not enough tokens left in the presale.');
      } else {
        toast.error('Transaction failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setActionLabel('');
    }
  };

  return (
    <div className="presale-root min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
      <div className="presale-bg-base" />
      <div className="presale-bg-glow-top" />
      <div className="presale-bg-glow-left" />
      <div className="presale-bg-glow-right" />
      <div className="presale-grid-overlay" />

      <SuccessModal tokensBought={purchasedTokens} onClose={() => setPurchasedTokens(null)} />
      {loading && <Loader label={actionLabel} />}

      <div className="relative z-10 w-full max-w-lg px-4">

        {/* Live badge */}
        <div className="flex justify-center mb-5">
          <div className="presale-badge">
            <span className="presale-badge-dot" />
            <span>Phase 1 Presale — Live Now</span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <p className="presale-eyebrow">TIP Nation Ecosystem</p>
          <h1 className="presale-title">TipTravelCoin</h1>
          <div className="presale-ticker-row">
            <span className="presale-ticker">$TIP</span>
          </div>
          <p className="presale-subtitle">
            Travel. Earn. Empower Communities.<br />
            <span className="presale-subtitle-highlight">Enter the decentralized travel economy.</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Token Price', value: '$0.01', sub: 'Phase 1' },
            { label: 'Total Supply', value: '50M',  sub: '$TIP'   },
            { label: 'Sale',        value: 'Open',  sub: 'No Limit' },
          ].map((stat, i) => (
            <div key={i} className="presale-stat-card">
              <p className="presale-stat-label">{stat.label}</p>
              <p className="presale-stat-value">{stat.value}</p>
              <p className="presale-stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="presale-card">

          {/* Card header */}
          <div className="presale-card-header">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Secure your $TIP tokens</span>
          </div>

          {/* Presale Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="presale-progress-label">Phase 1 Progress</span>
              <span className="presale-progress-pct">
                {presaleProgress.toFixed(2)}% Sold
              </span>
            </div>
            <div className="presale-progress-track">
              <div
                className="presale-progress-fill"
                style={{ width: `${Math.max(presaleProgress, 0.5)}%` }}
              >
                <div className="presale-progress-shine" />
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="presale-progress-end">{tokensSoldDisplay} sold</span>
              <span className="presale-progress-end">50,000,000 $TIP</span>
            </div>
          </div>

          {/* ETH amount input */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2.5">
              <label className="presale-label">You Pay</label>
              <span className="presale-balance-label">
                Balance:&nbsp;
                <span className="presale-balance-value">{ethBalance} ETH</span>
              </span>
            </div>
            <div className="presale-input-wrap">
              <div className="presale-input-icon">
                <DollarSign className="h-4 w-4 text-amber-400" />
              </div>
              <input
                type="number"
                placeholder="0.00"
                className="presale-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.0001"
              />
              <div className="presale-input-currency">ETH</div>
              <button
                type="button"
                onClick={() => nativeBalance && setAmount(ethers.utils.formatEther(nativeBalance.value))}
                className="presale-input-max"
              >
                MAX
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">Min. purchase: 0.0001 ETH</p>
            {showNotEnoughLeft && (
              <p className="mt-1.5 text-[11px] text-red-400">Not enough tokens left in the presale.</p>
            )}
            {showNotEnoughContract && (
              <p className="mt-1.5 text-[11px] text-red-400">Presale contract is out of tokens. Contact support.</p>
            )}
            {showPriceError && (
              <p className="mt-1.5 text-[11px] text-yellow-500">Price feed unavailable. Preview may be delayed.</p>
            )}
          </div>

          {/* You receive */}
          <div className="presale-receive-box mb-6">
            <div className="presale-receive-label">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>You Receive</span>
            </div>
            <div className="presale-receive-value">
              <span className="presale-receive-amount">
                {previewLoading && parsedAmountWei ? '...' : displayTokens}
              </span>
              <span className="presale-receive-symbol">$TIP</span>
            </div>
          </div>

          {/* How It Works */}
          <div className="presale-hiw-wrap mb-5">
            <button
              type="button"
              onClick={() => setShowHowItWorks(v => !v)}
              className="presale-hiw-toggle"
            >
              <span>How It Works</span>
              <ChevronDown className={`h-3.5 w-3.5 presale-hiw-chevron ${showHowItWorks ? 'presale-hiw-chevron--open' : ''}`} />
            </button>
            {showHowItWorks && (
              <div className="presale-hiw-body">
                {[
                  { icon: <Wallet className="h-4 w-4" />, step: '01', title: 'Connect Wallet', desc: 'Use MetaMask or any Web3 wallet on Arbitrum.' },
                  { icon: <Coins className="h-4 w-4" />, step: '02', title: 'Buy $TIP', desc: 'Enter an ETH amount and confirm the transaction.' },
                  { icon: <CheckCircle2 className="h-4 w-4" />, step: '03', title: 'Tokens Delivered', desc: 'Your $TIP lands in your wallet instantly.' },
                ].map((item, i) => (
                  <div key={i} className="presale-hiw-step">
                    <div className="presale-hiw-icon">{item.icon}</div>
                    <div className="presale-hiw-text">
                      <span className="presale-hiw-step-num">{item.step}</span>
                      <span className="presale-hiw-step-title">{item.title}</span>
                      <span className="presale-hiw-step-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buy button */}
          <button
            onClick={handleSubmit}
            disabled={buyDisabled}
            className="presale-buy-btn"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{actionLabel}</span>
              </>
            ) : !signer ? (
              <span>Connect Wallet to Buy</span>
            ) : (
              <>
                <span>Buy $TIP with ETH</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* User's total purchased — shown only when they've bought tokens */}
          {userTokensDisplay && (
            <p className="text-center text-[11px] text-slate-500 mt-3">
              Your total: <span className="text-amber-400 font-semibold">{userTokensDisplay} $TIP</span> purchased
            </p>
          )}

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 mt-5">
            <div className="presale-trust-item">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Audited Contract</span>
            </div>
            <div className="presale-trust-divider" />
            <div className="presale-trust-item">
              <Shield className="h-3.5 w-3.5 text-sky-400" />
              <span>Non-Custodial</span>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-600 mt-5 px-4 leading-relaxed">
          By proceeding you agree to our Terms of Service and confirm eligibility to participate.
        </p>
      </div>
    </div>
  );
}

export default App;
