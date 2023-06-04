import { useReducer } from "react"

type Action = {
  type: string;
  field: string;
  value: string;
}

export function useReducerController<T>(initialState: T) {
  function reducer(state: T, action: Action): T {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value }
      default:
        return state
    }
  }  

  return useReducer(reducer, initialState)
}