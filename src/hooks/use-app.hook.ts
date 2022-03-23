import { useContext } from 'react';

import { AppContext } from '../components/context/app.context';

const useApp = () => {
    const { isLoading, setIsLoading } = useContext(AppContext);

    const showLoader = () => {
        setIsLoading(true);
    };

    const hideLoader = () => {
        setIsLoading(false);
    };

    return { isLoading, showLoader, hideLoader };
};

export default useApp;
