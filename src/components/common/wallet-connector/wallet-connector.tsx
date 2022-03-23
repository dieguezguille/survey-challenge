import { ChangeCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import useStringUtils from '../../../hooks/string-utils.hook';
import useWallet from '../../../hooks/use-wallet.hook';
import OnlineIndicator from '../online-indicator/online-indicator';

const { REACT_APP_CHAIN_NAME } = process.env;

const WalletConnector: React.FC = () => {
    const {
        isConnected,
        isInvalidChain,
        address,
        requestChainSwitch,
        switchConnection,
    } = useWallet();

    const { getDottedSubstring } = useStringUtils();

    return !isInvalidChain ? (
        <Button onClick={switchConnection}>
            <Stack direction="row" alignItems="center">
                <OnlineIndicator isOnline={isConnected} />
                <div>
                    {isConnected
                        ? getDottedSubstring(6, 38, address)
                        : 'Connect Wallet'}
                </div>
            </Stack>
        </Button>
    ) : (
        <Button startIcon={<ChangeCircle />} onClick={requestChainSwitch}>
            Switch to {REACT_APP_CHAIN_NAME}
        </Button>
    );
};

export default WalletConnector;
