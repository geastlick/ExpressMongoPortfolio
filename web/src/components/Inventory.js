import React, { Component } from 'react';

class Inventory extends Component {
    componentDidMount() {
        if(this.props.inventory.inventory.length === 0) this.props.fetchInventory();
      }

        render() {
        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12"><h2>Inventory</h2><hr /></div>
                    <div className="row row-content">
                    <div className="col-12">
                        {JSON.stringify(this.props.inventory.inventory)}
                    </div>
                        </div></div></div>
        );
    }
}

export default Inventory;