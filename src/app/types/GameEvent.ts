export interface GameEvent<T = any> {
  name: string;
  data: T;
}
