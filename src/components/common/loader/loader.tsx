import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';

import { AppContext } from '../../../contexts/app.context';
import { StyledBackdrop } from './loader.styles';

const Loader: React.FC = () => {
    const { isLoading } = useContext(AppContext);

    return (
        <StyledBackdrop aria-label="loader" open={isLoading}>
            <CircularProgress />
        </StyledBackdrop>
    );
};

export default Loader;
