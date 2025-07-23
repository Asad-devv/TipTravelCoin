import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import {arbitrum} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// export const config = createConfig(
//   getDefaultConfig({
//     // Your dApps chains
//     chains: [bscTestnet],
//     transports: {
//       // RPC URL for each chain
//       [bscTestnet.id]: http(),
//     },

//     // Required API Keys
//     walletConnectProjectId: "7f1bcdcff8bf7c76f76a212523508821",

//     // Required App Info
//     appName: "360A Token",

//     // Optional App Info
//     appDescription: "Your App Description",
//     appUrl: "", // your app's url
//     appIcon: "", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   }),
// );
const queryClient = new QueryClient()
const projectId= "7f1bcdcff8bf7c76f76a212523508821"
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [arbitrum]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}