export interface Message<T = any> {
  action: string;
  data?: T;
}
