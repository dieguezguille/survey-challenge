import CircularProgress from '@mui/material/CircularProgress';

import useApp from '../../../hooks/use-app.hook';
import { StyledBackdrop } from './loader.styles';

const Loader: React.FC = () => {
    const { isLoading } = useApp();

    return (
        <StyledBackdrop open={isLoading}>
            <CircularProgress />
        </StyledBackdrop>
    );
};

export default Loader;
