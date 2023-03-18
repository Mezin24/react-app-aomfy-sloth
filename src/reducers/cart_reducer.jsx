import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = payload;
      const tempItem = state.cart.find((i) => i.id === id + color);

      if (tempItem) {
        const newCart = state.cart.map((cartItem) =>
          cartItem.id === id + color
            ? {
                ...cartItem,
                amount:
                  cartItem.amount + amount > cartItem.max
                    ? cartItem.max
                    : cartItem.amount + amount,
              }
            : cartItem
        );
        return { ...state, cart: newCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0]?.url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }

    case REMOVE_CART_ITEM:
      const newCart = state.cart.filter((cartItem) => cartItem.id !== payload);
      return { ...state, cart: newCart };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT:
      let tempCart = [...state.cart];

      if (payload.value === 'inc') {
        tempCart = tempCart.map((cartItem) =>
          cartItem.id === payload.id
            ? {
                ...cartItem,
                amount:
                  cartItem.amount + 1 > cartItem.max
                    ? cartItem.max
                    : cartItem.amount + 1,
              }
            : cartItem
        );
      }
      if (payload.value === 'dec') {
        tempCart = tempCart.map((cartItem) =>
          cartItem.id === payload.id
            ? {
                ...cartItem,
                amount: cartItem.amount - 1 < 1 ? 1 : cartItem.amount - 1,
              }
            : cartItem
        );
      }
      return { ...state, cart: tempCart };

    case COUNT_CART_TOTALS:
      if (state.cart.length === 0) {
        return { ...state, total_items: 0, total_amount: 0 };
      }
      const totalAmount = state.cart.reduce(
        (acc, cartItem) => acc + cartItem.amount * cartItem.price,
        0
      );
      const totalItems = state.cart.reduce(
        (acc, cartItem) => acc + cartItem.amount
      );
      return { ...state, total_items: totalItems, total_amount: totalAmount };
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
