import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';

const Loader: React.FC = () => {
    const { isLoading } = useContext(AppContext);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;
