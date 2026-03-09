// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ─────────────────────────────────────────────
//  OpenZeppelin IERC20 (minimal — only what we use)
// ─────────────────────────────────────────────
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// ─────────────────────────────────────────────
//  Chainlink AggregatorV3Interface
// ─────────────────────────────────────────────
interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

// ─────────────────────────────────────────────
//  TipTravelCoin Presale — ETH only
// ─────────────────────────────────────────────
contract TokenICO {

    // ── Events ──────────────────────────────
    event TokensPurchased(
        address indexed buyer,
        uint256 tokenAmount,
        uint256 ethPaid,       // ETH sent (in wei)
        string  tokenSymbol
    );
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event TokensDeposited(uint256 amount);
    event TokenSalePriceUpdated(uint256 oldPrice, uint256 newPrice);

    // ── State ────────────────────────────────
    address public owner;
    IERC20  public token;

    uint256 public tokenSalePrice;   // price in USD with 18 decimals  (e.g. $0.01 → 1e16)
    uint256 public totalRaisedETH;   // cumulative ETH received (wei)
    uint256 public totalTokensSold;
    uint256 public totalSupply;      // presale allocation (with 18 decimals)

    string public constant tokenSymbol = "TTC";

    // Chainlink ETH/USD price feed (Arbitrum One: 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612)
    AggregatorV3Interface public ethUsdPriceFeed;

    // Max age of Chainlink answer before we consider it stale
    uint256 public constant PRICE_FEED_STALENESS = 1 hours;

    struct Purchase {
        address buyer;
        uint256 tokenAmount;
        uint256 ethPaid;    // ETH in wei
        string  tokenSymbol;
    }

    Purchase[]                   public purchaseRecords;
    mapping(address => uint256)  public tokensBought;

    // ── Modifiers ───────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // ── Constructor ──────────────────────────
    constructor(
        address _tokenAddress,
        uint256 _tokenSalePrice,
        uint256 _totalSupply,
        address _ethUsdPriceFeed,
        address _owner
    ) {
        require(_tokenAddress    != address(0), "Invalid token address");
        require(_ethUsdPriceFeed != address(0), "Invalid price feed address");
        require(_owner           != address(0), "Invalid owner address");
        require(_tokenSalePrice  >  0,          "Token price must be > 0");
        require(_totalSupply     >  0,          "Total supply must be > 0");

        owner            = _owner;
        token            = IERC20(_tokenAddress);
        tokenSalePrice   = _tokenSalePrice;
        totalSupply      = _totalSupply;
        ethUsdPriceFeed  = AggregatorV3Interface(_ethUsdPriceFeed);

        emit OwnershipTransferred(address(0), owner);
    }

    // ── Reject accidental direct ETH transfers ──
    receive() external payable {
        revert("Use buyTokenWithETH()");
    }

    // ── Buy with ETH ─────────────────────────
    function buyTokenWithETH() external payable {
        require(msg.value > 0,                  "Must send ETH");
        require(totalTokensSold < totalSupply,  "All tokens sold");

        uint256 ethPrice      = getLatestETHPrice();
        uint256 ethAmountInUsd = (msg.value * ethPrice) / 1e18;
        uint256 tokenAmount    = (ethAmountInUsd * 1e18) / tokenSalePrice;

        require(tokenAmount > 0,                                         "Amount too small");
        require(totalTokensSold + tokenAmount <= totalSupply,            "Not enough tokens left");
        require(token.balanceOf(address(this)) >= tokenAmount,          "Not enough TTC in contract");

        // Effects before interactions (CEI)
        tokensBought[msg.sender] += tokenAmount;
        totalTokensSold          += tokenAmount;
        totalRaisedETH           += msg.value;

        purchaseRecords.push(Purchase(msg.sender, tokenAmount, msg.value, tokenSymbol));

        // Interactions
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "ETH transfer to owner failed");

        emit TokensPurchased(msg.sender, tokenAmount, msg.value, tokenSymbol);
    }

    // ── Chainlink price (returns 18-decimal USD price of 1 ETH) ──
    function getLatestETHPrice() public view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = ethUsdPriceFeed.latestRoundData();
        require(price > 0,                                         "Invalid ETH price");
        require(block.timestamp - updatedAt <= PRICE_FEED_STALENESS, "Stale price feed");
        return uint256(price) * 1e10; // 8-decimal Chainlink answer → 18 decimals
    }

    // ── Owner functions ──────────────────────
    function depositTokens(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be > 0");
        require(token.transferFrom(msg.sender, address(this), _amount), "Deposit failed");
        emit TokensDeposited(_amount);
    }

    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        require(to     != address(0), "Invalid address");
        require(amount > 0,           "Amount must be > 0");
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens");
        require(token.transfer(to, amount), "Transfer failed");
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) external onlyOwner {
        require(_tokenSalePrice > 0, "Price must be > 0");
        emit TokenSalePriceUpdated(tokenSalePrice, _tokenSalePrice);
        tokenSalePrice = _tokenSalePrice;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // ── Views ────────────────────────────────
    function getRemainingTokens() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getPurchaseHistory() external view returns (Purchase[] memory) {
        return purchaseRecords;
    }

    // Estimate tokens for a given ETH amount (off-chain preview)
    function previewBuyWithETH(uint256 _ethAmount) external view returns (
        uint256 tokenAmount,
        bool    enoughTokensLeft,
        bool    enoughTokensInContract
    ) {
        uint256 ethPrice       = getLatestETHPrice();
        uint256 ethAmountInUsd = (_ethAmount * ethPrice) / 1e18;
        tokenAmount            = (ethAmountInUsd * 1e18) / tokenSalePrice;

        enoughTokensLeft       = (totalTokensSold + tokenAmount <= totalSupply);
        enoughTokensInContract = (token.balanceOf(address(this)) >= tokenAmount);
    }
}
