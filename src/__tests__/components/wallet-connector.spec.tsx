import { render, screen } from '@testing-library/react';

import { walletContext } from '../__mocks__/contexts/wallet.context';
import WalletConnector from '../components/common/wallet-connector/wallet-connector';
import { WalletContext } from '../contexts/wallet.context';

const Consumer = () => {
    return (
        <WalletContext.Provider value={walletContext}>
            <WalletConnector />
        </WalletContext.Provider>
    );
};

describe('Wallet Connector', () => {
    it('should render switch button when chain is not valid', () => {
        walletContext.isInvalidChain = true;
        render(<Consumer />);

        const switchButton = screen.getByRole('button');

        expect(switchButton).toBeInTheDocument();
        expect(switchButton.innerHTML).toContain('Switch');
    });

    it('should render connect button when chain is valid', () => {
        walletContext.isInvalidChain = false;
        render(<Consumer />);

        const connectButton = screen.getByRole('button');

        expect(connectButton).toBeInTheDocument();
        expect(connectButton.innerHTML).toContain('Connect');
    });
});
