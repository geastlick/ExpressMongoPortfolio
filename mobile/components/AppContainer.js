import React, { Component } from "react";
import * as SecureStore from 'expo-secure-store';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {
    ScrollView, StyleSheet, Text, View,
    Image, ActivityIndicator, Alert, TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

import Customer from './CustomerComponent';
import Login from './LoginComponent';
import Inventory from './InventoryComponent';
import Order from './OrderComponent';
import Product from './ProductComponent';

import { connect } from "react-redux";
import { userLogout } from '../redux/ActionCreators'

const mapDispatchToProps = {
    userLogout
}

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomerNavigator = createStackNavigator(
    {
        Customers: { screen: Customer }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='users'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
const OrderNavigator = createStackNavigator(
    {
        Order: { screen: Order }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
const InventoryNavigator = createStackNavigator(
    {
        Inventory: { screen: Inventory }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
const ProductNavigator = createStackNavigator(
    {
        Product: { screen: Product }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomAuthDrawerContentComponent = props => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={require('./images/EElogo.png')} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Sign Rental Management</Text>
            </View>
        </View>
        <DrawerItems {...props} />
    </ScrollView>
);

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() =>
                Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                        {
                            text: 'Cancel', onPress: () => {
                                this.props.navigation.closeDrawer();
                                return null;
                            }
                        },
                        {
                            text: 'Confirm', onPress: () => {
                                this.props.userLogout();
                                this.props.navigation.navigate('Auth');
                            }
                        },
                    ],
                    { cancelable: false }
                )
            }>
                <View style={{ flexDirection: 'row', height: 50, padding: 0, margin: 0, alignItems: 'center' }}>
                    <Icon name='sign-out'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={() => navigation.toggleDrawer()}
                    /><Text style={{ marginLeft: 30, fontWeight: 'bold' }}>Logout</Text></View>
            </TouchableOpacity>
        );
    }
}
const LogoutContainer = connect(null, mapDispatchToProps)(Logout);

const CustomAppDrawerContentComponent = props => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={require('./images/EElogo.png')} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Sign Rental Management</Text>
            </View>
        </View>
        <DrawerItems {...props} />
        <LogoutContainer {...props} />
    </ScrollView>
);

const AuthStack = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: 'Login',
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomAuthDrawerContentComponent
    }
);




const AppStack = createDrawerNavigator(
    {
        Customers: {
            screen: CustomerNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='users'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Products: {
            screen: ProductNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='tags'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Orders: {
            screen: OrderNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='shopping-cart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Inventory: {
            screen: InventoryNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='barcode'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: 'Customers',
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomAppDrawerContentComponent
    }
);

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await SecureStore.getItemAsync("token");

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View styles={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}

const Routes = createSwitchNavigator({
    AuthLoading: Main,
    App: AppStack,
    Auth: AuthStack,
}, {
    initialRouteName: 'AuthLoading',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    stackIcon: {
        marginLeft: 20,
        color: '#fff',
        fontSize: 24
    },
    drawerImage: {
        height: 50,
        width: 50
    }
});

export const AppContainer = createAppContainer(Routes);
export default (Main);
