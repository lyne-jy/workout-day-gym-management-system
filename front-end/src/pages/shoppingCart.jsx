import React, { Component } from "react";
import { getProducts, getProductsById } from "../services/products";
import { getShoppingCart } from "../services/shoppingCart";
import { Button, Container } from "react-bootstrap";
import ShoppingCartCard from "../components/shoppingCartCard";
import OrderConfirm from "../components/orderConfirm";

const ShoppingCart = ({
  shoppingCartItems,
  calculateTotal,
  calculateSubTotal,
  onDelete,
  onClear,
  onAddOne,
  onRemoveOne,
  orderConfirmVisible,
  onOrderConfirmOpen,
  onOrderConfirm,
  onOrderConfirmClose,
}) => {
  return (
    <div className="d-flex">
      <div className="d-flex align-items-start flex-column container-fluid">
        <Container>
          {shoppingCartItems.map((item) => (
            <ShoppingCartCard
              key={item._id}
              item={item}
              calculateSubTotal={calculateSubTotal}
              onDelete={onDelete}
              onClear={onClear}
              onAddOne={onAddOne}
              onRemoveOne={onRemoveOne}
            />
          ))}
        </Container>
        <div className="container-fluid d-flex justify-content-center">
          <p>Total: {calculateTotal(shoppingCartItems)}</p>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <Button
            variant="primary"
            className="mx-2"
            onClick={onOrderConfirmOpen}
          >
            Place the order
          </Button>
          <Button variant="warning" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
      <OrderConfirm
        onClose={onOrderConfirmClose}
        onConfirm={onOrderConfirm}
        ifVisible={orderConfirmVisible}
      />
    </div>
  );
};

export default ShoppingCart;
