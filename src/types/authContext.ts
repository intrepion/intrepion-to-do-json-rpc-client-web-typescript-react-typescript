import { JsonRpcResponseType, NewToDoListParamsType } from "./apiTypes";

export type LoginType = {
  username: string;
  password: string;
};

export interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  login: (data: LoginType) => Promise<JsonRpcResponseType>;
  logout: () => void;
  allToDoLists: () => Promise<JsonRpcResponseType>;
  newToDoList: (data: NewToDoListParamsType) => Promise<JsonRpcResponseType>;
}
