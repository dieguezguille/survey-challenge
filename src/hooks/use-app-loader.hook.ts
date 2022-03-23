import { useContext } from 'react';

import { AppContext } from '../contexts/app.context';

const useAppLoader = () => {
    const { isLoading, setIsLoading } = useContext(AppContext);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    return {
        isLoading,
        showLoader,
        hideLoader,
    };
};

export default useAppLoader;
