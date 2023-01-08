import { ToDoListType } from "./ToDoTypes";

export type AllToDoListsParamsType = {};

export type AllToDoListsResultType = {
  to_do_lists: ToDoListType[];
};

export type JsonRpc = JsonRpcRequestType | JsonRpcResponseType;

export type JsonRpcErrorType = {
  code: number;
  message: string;
  data: any;
};

export type JsonRpcRequestType = {
  id: string;
  jsonrpc: string;
  method: string;
  params: LoginParamsType | RegisterParamsType;
};

export type JsonRpcResponseType = {
  id: null | string;
  jsonrpc: string;
  result: null | LoginResultType | RegisterResultType;
  error: null | JsonRpcErrorType;
};

export type LoginParamsType = {
  username: string;
  password: string;
};

export type LoginResultType = {
  access_token: string;
  refresh_token: string;
  user: {
    guid: string;
    username: string;
  };
};

export type NewToDoListParamsType = {
  title: string;
};

export type NewToDoListResultType = {
  guid: string;
  title: string;
};

export type RegisterParamsType = {
  confirm: string;
  email: string;
  password: string;
  username: string;
};

export type RegisterResultType = {};
