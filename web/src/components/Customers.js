import React, { Component } from 'react';
import { Table } from 'reactstrap';
import BadgeIcon from './BadgeIcon';

const CustomerList = ({customers}) => {

    return (
        <Table striped hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.customers.map(customer => {
                    return (
                      <tr key={customer.id}>
                          <th scope="row">{customer.id}</th>
                          <td>{customer.name}</td>
                          <td>{customer.address.line1}<br />{customer.address.city}, {customer.address.state} {customer.address.zip}</td>
                          <td><BadgeIcon icon="fa-pencil" badge="17" /></td>
                      </tr>
                    );
                    })}
            </tbody>
        </Table>
    );
  }

class Customers extends Component {
    componentDidMount() {
        if(this.props.customers.customers.length === 0) this.props.fetchCustomers();
      }


      render() {
        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12"><h2>Customers</h2><hr /></div>
                    <div className="row row-content">
                    <div className="col-12">
                        <CustomerList customers={this.props.customers} />
                    </div>
                        </div></div></div>
        );
    }
}

export default Customers;