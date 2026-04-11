import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";

function CartGrid() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="untree_co-section before-footer-section">
        <div className="container text-center py-5">
          <h4 className="text-muted mb-4">Your cart is empty.</h4>
          <NavLink to="/shop" className="btn btn-primary">
            Browse Products
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      product={item}
                      onRemove={removeFromCart}
                      onUpdateQty={updateQuantity}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-6">
                <NavLink to="/shop" className="btn btn-outline-black btn-sm w-100">
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 ps-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-end border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-end">
                    <strong className="text-black">${cartTotal.toFixed(2)}</strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-end">
                    <strong className="text-black">${cartTotal.toFixed(2)}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <NavLink
                      className="btn btn-black btn-lg py-3 w-100"
                      to="/checkout"
                    >
                      Proceed To Checkout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CartItem = ({ product, onRemove, onUpdateQty }) => {
  return (
    <tr>
      <td className="product-thumbnail">
        <img src={product.image} className="img-fluid" alt={product.name} />
      </td>
      <td className="product-name">
        <h2 className="h5 text-black">{product.name}</h2>
      </td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        <div
          className="input-group mb-3 d-flex align-items-center quantity-container"
          style={{ maxWidth: "120px" }}
        >
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-black decrease"
              type="button"
              onClick={() => onUpdateQty(product.id, product.quantity - 1)}
            >
              &minus;
            </button>
          </div>
          <input
            type="text"
            className="form-control text-center quantity-amount"
            value={product.quantity}
            readOnly
            aria-label="Quantity"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-black increase"
              type="button"
              onClick={() => onUpdateQty(product.id, product.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td>${(product.price * product.quantity).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-black btn-sm"
          onClick={() => onRemove(product.id)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default CartGrid;
