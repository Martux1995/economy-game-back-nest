export type AppResponse<T = object> = {
  [k in keyof T]: any;
} & {
  ok: boolean;
  msg: string;
};
