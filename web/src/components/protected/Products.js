import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Products extends Component {
    componentDidMount() {
        if(this.props.currentUser &&
            this.props.currentUser.name &&
            this.props.products.products.length === 0) this.props.fetchProducts();
      }

        render() {
            if(!this.props.currentUser || !this.props.currentUser.name) {
                return <Redirect to={{pathname: '/signin', state: {from: this.location}}} />
            }
    
            return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12"><h2>Products</h2><hr /></div>
                    <div className="row row-content">
                    <div className="col-12">
                        {JSON.stringify(this.props.products.products)}
                    </div>
                        </div></div></div>
        );
    }
}

export default Products;