import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Inventory extends Component {
    componentDidMount() {
        if(this.props.currentUser &&
            this.props.currentUser.name &&
            this.props.inventory.inventory.length === 0) this.props.fetchInventory();
       }

        render() {
            if(!this.props.currentUser || !this.props.currentUser.name) {
                return <Redirect to={{pathname: '/signin', state: {from: this.location}}} />
            }
    
            return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12"><h2>Inventory</h2><hr /></div>
                    <div className="row row-content">
                    <div className="col-12">
                        {JSON.stringify(this.props.inventory.inventory, null, 2)}
                    </div>
                        </div></div></div>
        );
    }
}

export default Inventory;