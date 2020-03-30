import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import AppHeader from './components/navigation/AppHeader';
import AppNavbar from './components/navigation/AppNavbar';
import FeatureCards from './components/public/FeatureCards';
import ContactUs from './components/public/ContactUs';
import AboutUs from './components/public/AboutUs';
import AppFooter from './components/navigation/AppFooter';
import SignIn from './components/navigation/SignIn';
import Customers from './components/protected/Customers';
import Inventory from './components/protected/Inventory';
import Orders from './components/protected/Orders';
import Products from './components/protected/Products';

import { userLogin, userLogout, fetchProfile } from './redux/users/ActionCreators';
import { fetchCustomers } from './redux/customers/ActionCreators';
import { fetchInventory } from './redux/inventory/ActionCreators';
import { fetchOrders } from './redux/orders/ActionCreators';
import { fetchProducts } from './redux/products/ActionCreators';

const mapStateToProps = state => {
  return {
    customers: state.customers,
    features: state.features,
    inventory: state.inventory,
    orders: state.orders,
    products: state.products,
    users: state.users,
  };
};

const mapDispatchToProps = {
  fetchCustomers: () => (fetchCustomers()),
  fetchInventory: () => (fetchInventory()),
  fetchOrders: () => (fetchOrders()),
  fetchProducts: () => (fetchProducts()),
  userLogin: (username, password) => (userLogin(username, password)),
  userLogout: () => (userLogout()),
  fetchProfile: () => (fetchProfile()),
}

const NavBar = (props) => {
  const location = useLocation();

  return <AppNavbar currentUser={props.currentUser} userLogout={props.userLogout} location={location.pathname} />;
}

class App extends Component {

  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    return (
      <React.Fragment>
        <AppHeader currentUser={this.props.users.currentUser} />
        <NavBar currentUser={this.props.users.currentUser} userLogout={this.props.userLogout} />
        <Switch>
          <Route path="/home" render={() => <FeatureCards features={this.props.features} />} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/about" component={AboutUs} />
          <Route path="/signin" render={() => <SignIn users={this.props.users} userLogin={this.props.userLogin} history={this.props.history} />} />

          <Route path="/customer" render={() => <Customers currentUser={this.props.users.currentUser} customers={this.props.customers} fetchCustomers={this.props.fetchCustomers} />} />
          <Route path="/inventory" render={() => <Inventory currentUser={this.props.users.currentUser} inventory={this.props.inventory} fetchInventory={this.props.fetchInventory} />} />
          <Route path="/order" render={() => <Orders currentUser={this.props.users.currentUser} orders={this.props.orders} fetchOrders={this.props.fetchOrders} />} />
          <Route path="/product" render={() => <Products currentUser={this.props.users.currentUser} products={this.props.products} fetchProducts={this.props.fetchProducts} />} />

          <Redirect to="/home" />
        </Switch>
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
