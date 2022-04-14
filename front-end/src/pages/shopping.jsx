import React, { Component } from "react";
import Products from "./browseProducts";
import ShoppingCart from "./shoppingCart";
import { Container, Tab, Tabs } from "react-bootstrap";
import { getProducts, getProductsById } from "../services/products";
import emptyCart from "../components/emptyCart";

class Shopping extends Component {
  state = {
    products: [],
    productPurchasing: null,
    ifPurchasing: false,
    shoppingCartItems: [],
    orderConfirmVisible: false,
    emptyCartVisibility: false,
  };

  componentDidMount() {
    this.setState({
      products: getProducts(),
    });
  }

  onPurchase = (product) => {
    const ifPurchasing = true;
    this.setState({ productPurchasing: product, ifPurchasing });
  };

  onCancelPurchase = () => {
    const ifPurchasing = false;
    this.setState({ productPurchasing: null, ifPurchasing });
  };

  onMakePurchase = (quantity, product) => {
    let shoppingCartItems = [...this.state.shoppingCartItems];
    const index = shoppingCartItems.findIndex((item) => {
      return product._id == item._id;
    });
    if (index == -1) {
      let item = {
        quantity: quantity,
        _id: product._id,
        image: product.image,
        description: product.description,
        name: product.name,
        price: product.price,
      };
      shoppingCartItems.push(item);
      this.setState({
        shoppingCartItems,
        productPurchasing: null,
        ifPurchasing: false,
      });
    } else {
      shoppingCartItems[index].quantity += parseInt(quantity);
      this.setState({
        shoppingCartItems,
        productPurchasing: null,
        ifPurchasing: false,
      });
    }
  };

  onDelete = (item) => {
    const shoppingCartItems = this.state.shoppingCartItems.filter(
      (i) => i._id != item._id
    );
    this.setState({ shoppingCartItems });
  };

  onClear = () => {
    const shoppingCartItems = [];
    this.setState({ shoppingCartItems });
  };

  onAddOne = (item) => {
    let shoppingCartItems = [...this.state.shoppingCartItems];
    let index = shoppingCartItems.findIndex((shoppingCartItem) => {
      return shoppingCartItem._id == item._id;
    });
    shoppingCartItems[index].quantity += 1;
    this.setState({ shoppingCartItems });
  };

  onRemoveOne = (item) => {
    let shoppingCartItems = [...this.state.shoppingCartItems];
    let index = shoppingCartItems.findIndex((shoppingCartItem) => {
      return shoppingCartItem._id == item._id;
    });
    shoppingCartItems[index].quantity -= 1;
    if (shoppingCartItems[index].quantity > 0) {
      this.setState({ shoppingCartItems });
    } else {
      shoppingCartItems.splice(index, 1);
      this.setState({ shoppingCartItems });
    }
  };

  calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  calculateSubTotal = (item) => {
    let subTotal = 0;
    subTotal = item.price * item.quantity;
    return subTotal;
  };

  handleOrderConfirmClose = () => {
    this.setState({ orderConfirmVisible: false });
  };

  handleOrderConfirmOpen = () => {
    if (this.state.shoppingCartItems.length === 0) {
      console.log(this.state.shoppingCartItems.length);
      this.setState({ emptyCartVisibility: true });
    } else {
      this.setState({ orderConfirmVisible: true });
    }
    console.log(this.state.emptyCartVisibility);
  };

  handleOrderConfirm = () => {
    const shoppingCartItems = [];
    this.setState({ shoppingCartItems });
    this.setState({ orderConfirmVisible: false });
  };

  handleCloseEmptyCart = () => {
    this.setState({ emptyCartVisibility: false });
  };

  render() {
    let {
      products,
      productPurchasing,
      ifPurchasing,
      shoppingCartItems,
      orderConfirmVisible,
      emptyCartVisibility,
    } = this.state;
    return (
      <div>
        <Container className="mt-3">
          <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="products" title="Products">
              <Products
                products={products}
                onPurchase={this.onPurchase}
                productPurchasing={productPurchasing}
                ifPurchasing={ifPurchasing}
                onCancelPurchase={this.onCancelPurchase}
                onMakePurchase={this.onMakePurchase}
                shoppingCartItems={shoppingCartItems}
              />
            </Tab>
            <Tab eventKey="shoppingCart" title="Shopping Cart">
              <ShoppingCart
                shoppingCartItems={shoppingCartItems}
                calculateTotal={this.calculateTotal}
                calculateSubTotal={this.calculateSubTotal}
                onDelete={this.onDelete}
                onClear={this.onClear}
                onAddOne={this.onAddOne}
                onRemoveOne={this.onRemoveOne}
                orderConfirmVisible={orderConfirmVisible}
                onOrderConfirmClose={this.handleOrderConfirmClose}
                onOrderConfirmOpen={this.handleOrderConfirmOpen}
                onOrderConfirm={this.handleOrderConfirm}
                emptyCartVisibility={emptyCartVisibility}
                onCloseEmptyCart={this.handleCloseEmptyCart}
              />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default Shopping;