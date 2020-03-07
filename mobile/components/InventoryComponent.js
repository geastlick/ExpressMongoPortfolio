import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { fetchInventory } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        inventory: state.inventory,
    }
}

const mapDispatchToProps = {
    fetchInventory: () => (fetchInventory())
}

class Inventory extends Component {
    static navigationOptions = {
        title: 'Inventory'
    }

    componentDidMount() {
        this.props.fetchInventory();
    }

    render() {
        return <View><Text>{JSON.stringify(this.props.inventory.inventory)}</Text></View>;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);