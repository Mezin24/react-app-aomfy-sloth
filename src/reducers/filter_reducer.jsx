import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PRODUCTS:
      const min_price = Math.min(...payload.map((product) => product.price));
      const max_price = Math.max(...payload.map((product) => product.price));
      return {
        ...state,
        filtered_products: [...payload],
        all_products: [...payload],
        filters: {
          ...state.filters,
          min_price,
          max_price,
          price: max_price,
        },
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let sortedProducts;
      if (sort === 'price-lowest') {
        sortedProducts = [...filtered_products].sort(
          (a, b) => a.price - b.price
        );
      }
      if (sort === 'price-highest') {
        sortedProducts = [...filtered_products].sort(
          (a, b) => b.price - a.price
        );
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
      return {
        ...state,
        filtered_products: sortedProducts,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case FILTER_PRODUCTS:
      const {
        all_products,
        filters: { text, company, category, color, price, shipping },
      } = state;
      let tempProducts = [...all_products];

      if (text !== '') {
        tempProducts = tempProducts.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter((item) => item.company === company);
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (item) => item.category === category
        );
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((item) =>
          item.colors.includes(color)
        );
      }

      if (shipping) {
        tempProducts = tempProducts.filter((item) => item.shipping);
      }

      tempProducts = tempProducts.filter((item) => item.price <= price);

      return {
        ...state,
        filtered_products: tempProducts,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: 0,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
