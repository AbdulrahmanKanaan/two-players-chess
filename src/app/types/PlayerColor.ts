import { PlayerColors } from '../constants';

export type PlayerColor = (typeof PlayerColors)[keyof typeof PlayerColors];
