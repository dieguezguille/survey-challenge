import { BigNumber } from 'ethers';

export interface ITransferEvent {
    from: string;
    to: string;
    value: BigNumber;
}
