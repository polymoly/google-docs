import { InitialState } from "../model/model";
import { ACTIONS } from "./actions";
import { initialState } from "./context";

export const reducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.INIT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case ACTIONS.INIT_QUILL:
      return {
        ...state,
        quill: action.payload?.quill,
        loading: action.payload?.loading,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
