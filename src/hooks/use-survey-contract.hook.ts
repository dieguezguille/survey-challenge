import { ContractTransaction, ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { useCallback, useContext, useEffect } from 'react';

import abi from '../abis/survey-contract.json';
import { SurveyContractContext } from '../contexts/survey-contract.context';
import { ITransferEvent } from '../models/transfer-event.model';
import useApp from './use-app.hook';
import useWallet from './use-wallet.hook';

const { REACT_APP_CONTRACT_ADDRESS } = process.env;

const useSurveyContract = () => {
    const { balance, setBalance, contract, setContract } = useContext(
        SurveyContractContext
    );
    const { showLoader, hideLoader, surveyResult } = useApp();
    const { address, provider } = useWallet();
    const { enqueueSnackbar } = useSnackbar();

    const loadContract = useCallback(async () => {
        showLoader();
        try {
            if (REACT_APP_CONTRACT_ADDRESS) {
                setContract(
                    await new ethers.Contract(
                        REACT_APP_CONTRACT_ADDRESS,
                        abi,
                        provider?.getSigner()
                    )
                );
            } else {
                enqueueSnackbar('No contract address detected.', {
                    variant: 'error',
                });
            }
        } catch (error) {
            enqueueSnackbar(
                'Load contract operation failed. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            hideLoader();
        }
    }, [enqueueSnackbar, hideLoader, provider, setContract, showLoader]);

    const getBalance = useCallback(async () => {
        showLoader();
        try {
            if (contract && address) {
                const result = await contract.balanceOf(address);
                const newBalance = ethers.utils.formatUnits(result, 18);
                setBalance(parseFloat(newBalance));
            }
        } catch (error) {
            enqueueSnackbar(
                'Error getting token balance. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            hideLoader();
        }
    }, [
        address,
        contract,
        enqueueSnackbar,
        hideLoader,
        setBalance,
        showLoader,
    ]);

    const handleTransactionReceipt = async (
        transactionReceipt: ethers.ContractReceipt
    ) => {
        const transferEvent = transactionReceipt.events?.find(
            (event) => event.event === 'Transfer'
        );

        if (transferEvent && transferEvent.args) {
            const eventArgs: ITransferEvent = {
                from: transferEvent.args['from'],
                to: transferEvent.args['to'],
                value: transferEvent.args['value'],
            };

            if (eventArgs.from === ethers.constants.AddressZero) {
                const tokensReceived = parseInt(
                    ethers.utils.formatUnits(eventArgs.value)
                );
                enqueueSnackbar(
                    `Received ${tokensReceived} ${
                        tokensReceived > 1 ? 'tokens' : 'token'
                    }!`,
                    {
                        variant: 'success',
                    }
                );
                await getBalance();
            }
        }
    };

    const submitSurvey = async () => {
        showLoader();
        try {
            if (contract && surveyResult) {
                const transaction: ContractTransaction = await contract.submit(
                    surveyResult.surveyId,
                    surveyResult.answerIds
                );
                const transactionReceipt = await transaction.wait();
                handleTransactionReceipt(transactionReceipt);
            }
        } catch (error) {
            enqueueSnackbar(
                'Error submitting survey. See console for details.',
                {
                    variant: 'error',
                }
            );
            console.log(error);
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        if (!contract) {
            loadContract();
        } else {
            getBalance();
        }
    }, [contract, enqueueSnackbar, getBalance, loadContract]);

    useEffect(() => {
        if (address && contract) {
            getBalance();
        }
    }, [address, contract, getBalance]);

    return { balance, submitSurvey };
};

export default useSurveyContract;
