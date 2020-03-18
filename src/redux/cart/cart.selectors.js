import { createSelector } from 'reselect';

const selectCart = state => state.cart;

// createSelector makes this selector a memoize selector
export const selectCartItems = createSelector(
  // collection of input
  [selectCart],
  // function that will return the value we want out of the selector
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => 
  cartItems.reduce(
      (accumulatedTotal, cartItem) =>
      accumulatedTotal + (cartItem.quantity * cartItem.price),
      0
    )
)
