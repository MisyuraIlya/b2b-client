"use client";
import { IAction } from '@/types/store';
import { ICatalogContext, InitialCatalogState } from '@/types/store/catalog';
const emptyState: InitialCatalogState = {
  someState: '',
  expandedCategories: {},
  listView: null
}
export const initialContext: ICatalogContext = {
  ...emptyState,
  setExpandedCategories: () => { },
  setListView: () => { }
}
export const initialState: InitialCatalogState = {
  ...emptyState
}
const catalogReducer = (state: InitialCatalogState, action: IAction) => {
  switch (action.type) {
    case "SET_SOME_STATE":
      console.log("SET_SOME_STATE", action.payload);
      return {
        ...state,
        someState: action.payload.data
      };
    case "SET_EXPANDED_CATEGORIES":
      return {
        ...state,
        expandedCategories: {
          ...state.expandedCategories,
          [action.payload.id]: action.payload.expanded
        }
      }
    case "SET_LIST_VIEW":
      return {
        ...state,
        listView: action.payload
      }
    default:
      throw new Error(`No case for type ${action.type} found in catalogReducer.`);
  }
}
export default catalogReducer