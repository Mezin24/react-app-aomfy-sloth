import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';
import filter_reducer from '../reducers/filter_reducer';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  const { sort, filtered_products, all_products } = state;

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    let sortedProducts;

    if (sort === 'price-lowest') {
      sortedProducts = [...filtered_products].sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      sortedProducts = [...filtered_products].sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      sortedProducts = [...filtered_products].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === 'name-z') {
      sortedProducts = [...filtered_products].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    dispatch({ type: SORT_PRODUCTS, payload: sortedProducts });
  }, [all_products, sort]);

  return (
    <FilterContext.Provider
      value={{ ...state, updateSort, setGridView, setListView }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
