import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { fetchOrders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        orders: state.orders,
    }
}

const mapDispatchToProps = {
    fetchOrders: () => (fetchOrders())
}

class Order extends Component {
    static navigationOptions = {
        title: 'Orders'
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        return <View><Text>{JSON.stringify(this.props.orders.orders)}</Text></View>;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);