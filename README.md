# Carbon Credit Tokenization Dashboard

A web-based dashboard for managing, minting, and trading tokenized carbon credits on blockchain.

## Overview

The Carbon Credit Tokenization Dashboard is a web application that allows users to create, manage, mint, trade, and redeem tokenized carbon credits. The platform bridges traditional carbon credit registries with blockchain technology, creating a more liquid, transparent, and accessible market for carbon offset trading.

## Demo 
[![Watch the video](https://img.youtube.com/vi/tvpCcdSoAGY/0.jpg)](https://www.youtube.com/watch?v=tvpCcdSoAGY)


## Features

### Admin Features

- Configure carbon credit registry endpoints
- Create and deploy new carbon credit tokens
- Manage the whitelist of addresses allowed to mint tokens

### Minter Features

- Mint new carbon credit tokens against verified carbon credits
- View mint history and status

### Trader Features

- Swap carbon credit tokens for other cryptocurrencies
- Redeem carbon credit tokens for the underlying carbon credits
- View redemption history

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Ethers.js for Web3 wallet integration
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or another Web3 wallet browser extension

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/carbon_admin.git
cd carbon_admin
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. Connect your Web3 wallet using the button at the bottom of the sidebar.
2. Navigate through the different sections using the sidebar navigation.
3. Admin users can configure registry endpoints, create tokens, and manage whitelists.
4. Minters can mint new tokens and view mint history.
5. Traders can swap and redeem tokens.

## Project Structure

```
carbon_admin/
├── public/                # Static files
├── src/                   # Source files
│   ├── components/        # React components
│   │   ├── admin/         # Admin section components
│   │   ├── common/        # Common UI components
│   │   ├── layout/        # Layout components
│   │   ├── minter/        # Minter section components
│   │   └── trader/        # Trader section components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

## Building for Production

```bash
npm run build
```

This creates a `build` directory with a production build of the application.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages. Follow these steps to deploy:

1. Update the `homepage` field in `package.json` with your GitHub username:

```json
"homepage": "https://YOURUSERNAME.github.io/carbon_admin"
```

2. Deploy the application to GitHub Pages:

```bash
npm run deploy
```

This will build the application and push it to the `gh-pages` branch of your repository.

3. Alternatively, you can push your changes to the `main` branch, and the GitHub Actions workflow will automatically deploy the application to GitHub Pages.

4. Once deployed, your application will be available at `https://YOURUSERNAME.github.io/carbon_admin`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
