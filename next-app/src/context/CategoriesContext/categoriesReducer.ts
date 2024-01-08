"use client";
import { IAction } from '@/types/store';
import { CategoriesContext, InitialCategoriesState } from '@/types/store/categories';

const emptyState = {
  someState: ''
}

export const initialContext: CategoriesContext = {
  ...emptyState,
  categories: []
}

export const initialState: InitialCategoriesState = {
  ...emptyState
}

const categoriesReducer = (state: InitialCategoriesState, action: IAction) => {
  switch (action.type) {
    case "SET_SOME_STATE":
      console.log("SET_SOME_STATE", action.payload);
      return {
        ...state,
        someState: action.payload.data
      };

    default:
      throw new Error(`No case for type ${action.type} found in categoriesReducer.`);
  }
}
export default categoriesReducer