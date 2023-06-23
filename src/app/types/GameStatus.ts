import { GameStatuses } from '../constants';

export type GameStatus = (typeof GameStatuses)[keyof typeof GameStatuses];
