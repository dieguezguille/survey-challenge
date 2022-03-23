import { WalletContextType } from '../../contexts/wallet.context';

export const walletContext: WalletContextType = {
    isConnected: false,
    setIsConnected: jest.fn(),
    address: undefined,
    setAddress: jest.fn(),
    provider: undefined,
    setProvider: jest.fn(),
    isInvalidChain: false,
    setIsInvalidChain: jest.fn(),
    requestChainSwitch: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
};
