import { createContext, Dispatch, FC, useReducer } from "react";
import { InitialState } from "../model/model";
import { reducer } from "./reducer";

export const initialState: InitialState = {
  socket: undefined,
  quill: undefined,
  loading: true,
  error: "",
};

export const DataContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const SocketProvider: FC = ({ children }) => {
  const [state, dispatch]: [InitialState, Dispatch<any>] = useReducer(
    reducer,
    initialState
  );

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
