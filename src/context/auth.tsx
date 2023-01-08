import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  JsonRpcErrorType,
  JsonRpcResponseType,
  LoginResultType,
  NewToDoListParamsType,
} from "../types/apiTypes";
import { AuthContextData, LoginType } from "../types/authContext";
import { api } from "../lib/api";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:access_token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const allToDoLists = async (): Promise<JsonRpcResponseType> => {
    try {
      const axiosResponse = await api.post<JsonRpcResponseType>("/", {
        id: v4(),
        jsonrpc: "2.0",
        method: "all_to_do_lists",
      });

      const jsonRpcResponse = axiosResponse.data as JsonRpcResponseType;

      return jsonRpcResponse;
    } catch (err) {
      console.error(err);

      const jsonResponseType = {
        error: {
          code: -1,
          message: "Failed to get all to do lists.",
          data: err,
        },
        id: null,
        jsonrpc: "2.0",
        result: null,
      };

      return jsonResponseType;
    }
  };

  const login = async (data: LoginType): Promise<JsonRpcResponseType> => {
    try {
      const axiosResponse = await api.post<JsonRpcResponseType>("/", {
        id: v4(),
        jsonrpc: "2.0",
        method: "login",
        params: { username: data.username, password: data.password },
      });

      const jsonRpcResponse = axiosResponse.data as JsonRpcResponseType;

      const jsonRpcError = jsonRpcResponse.error as JsonRpcErrorType;
      const loginResult = jsonRpcResponse.result as LoginResultType;

      if (jsonRpcError !== null || loginResult === null) {
        console.error(jsonRpcResponse.error);

        return jsonRpcResponse;
      }

      setUser(loginResult.user);

      localStorage.setItem("@Auth:access_token", loginResult.access_token);
      localStorage.setItem("@Auth:refresh_token", loginResult.refresh_token);
      localStorage.setItem("@Auth:user", JSON.stringify(loginResult.user));

      return jsonRpcResponse;
    } catch (err) {
      console.error(err);

      const jsonResponseType = {
        error: {
          code: -1,
          message: "Login failed.",
          data: err,
        },
        id: null,
        jsonrpc: "2.0",
        result: null,
      };

      return jsonResponseType;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const newToDoList = async (
    data: NewToDoListParamsType
  ): Promise<JsonRpcResponseType> => {
    try {
      const axiosResponse = await api.post<JsonRpcResponseType>("/", {
        id: v4(),
        jsonrpc: "2.0",
        method: "new_to_do_list",
        params: { title: data.title },
      });

      const jsonRpcResponse = axiosResponse.data as JsonRpcResponseType;

      return jsonRpcResponse;
    } catch (err) {
      console.error(err);

      const jsonResponseType = {
        error: {
          code: -1,
          message: "Failed to get all to do lists.",
          data: err,
        },
        id: null,
        jsonrpc: "2.0",
        result: null,
      };

      return jsonResponseType;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        login,
        logout,
        allToDoLists,
        newToDoList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
