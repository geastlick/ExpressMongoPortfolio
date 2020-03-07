import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { fetchCustomers } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        customers: state.customers,
    }
}

const mapDispatchToProps = {
    fetchCustomers: () => (fetchCustomers())
}

class Customer extends Component {
    static navigationOptions = {
        title: 'Customers'
    }

    componentDidMount() {
        this.props.fetchCustomers();
    }

    render() {
        return <View><Text>{JSON.stringify(this.props.customers.customers)}</Text></View>;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Customer);