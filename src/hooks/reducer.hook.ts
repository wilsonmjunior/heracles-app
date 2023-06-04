import { useReducer } from "react"

export type FieldState = {
  value: string;
  error: string;
}

type State = {
  [key: string]: FieldState;
}

type Action = {
  type: string;
  field: string;
  value: string;
  error?: string;
}

export function useReducerController<T extends State>(initialState: T) {
  function reducer(state: T, action: Action): T {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { 
          ...state, 
          [action.field]: { 
            value: action.value, 
            error: '', 
          } 
        };
      case 'SET_ERROR':
        return { 
          ...state, 
          [action.field]: { 
            ...state[action.field], 
            error: action.error, 
          }
        };
      default:
        return state;
    }
  }

  return useReducer(reducer, initialState);
}