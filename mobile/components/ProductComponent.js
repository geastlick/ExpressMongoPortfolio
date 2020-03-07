import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        products: state.products,
    }
}

const mapDispatchToProps = {
    fetchProducts: () => (fetchProducts())
}

class Product extends Component {
    static navigationOptions = {
        title: 'Products'
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return <View><Text>{JSON.stringify(this.props.products.products)}</Text></View>;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Product);