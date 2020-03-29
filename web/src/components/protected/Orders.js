import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Orders extends Component {
    componentDidMount() {
        if(this.props.currentUser &&
            this.props.currentUser.name &&
            this.props.orders.orders.length === 0) this.props.fetchOrders();
      }

        render() {
            if(!this.props.currentUser || !this.props.currentUser.name) {
                return <Redirect to={{pathname: '/signin', state: {from: this.location}}} />
            }
    
            return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12"><h2>Orders</h2><hr /></div>
                    <div className="row row-content">
                    <div className="col-12">
                        {JSON.stringify(this.props.orders.orders)}
                    </div>
                        </div></div></div>
        );
    }
}

export default Orders;