/* eslint-disable @typescript-eslint/no-explicit-any */
import MetamaskError from '../types/metamask-error.type';

type MetamaskErrorReturnType = {
    isMetamaskError: (error: any) => error is MetamaskError;
};

const useMetamaskUtils = (): MetamaskErrorReturnType => {
    const isMetamaskError = (error: any): error is MetamaskError =>
        'code' in error && 'message' in error && 'stack' in error;
    return { isMetamaskError };
};

export default useMetamaskUtils;
