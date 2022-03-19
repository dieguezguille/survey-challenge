import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum';
import { WalletContext } from '../../context/wallet.context';

const ForbiddenView: React.FC = () => {
    const { isConnected, isInvalidChain } = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isConnected && !isInvalidChain) {
            navigate(RoutesEnum.BASE, { replace: true });
        }
    }, [isConnected, isInvalidChain, navigate]);

    return (
        <Container>
            <Stack alignItems="center">
                <h1>Sorry!</h1>
                <h2>You do not have access to the dApp.</h2>
                <div>
                    Connect your wallet to continue and make sure to use Ropsten
                    Network.
                </div>
            </Stack>
        </Container>
    );
};

export default ForbiddenView;
