import CircularProgress from '@mui/material/CircularProgress';

import useAppLoader from '../../../hooks/use-app-loader.hook';
import { StyledBackdrop } from './loader.styles';

const Loader: React.FC = () => {
    const { isLoading } = useAppLoader();

    return (
        <StyledBackdrop open={isLoading}>
            <CircularProgress />
        </StyledBackdrop>
    );
};

export default Loader;
