import React, { Component } from 'react';
import { Table } from 'reactstrap';
import BadgeIcon from '../common/BadgeIcon';

const CustomerRow = ({customer}) => {
        const rowSelected = (e) => {
            console.log("Row:",customer);
        }

        return (
                      <tr onClick={rowSelected}>
                          <th scope="row">{customer.id}</th>
                          <td>{customer.name}</td>
                          <td>{customer.address.line1}, {customer.address.city}, {customer.address.state} {customer.address.zip}</td>
                          <td><BadgeIcon icon="fa-pencil" badge="17" /></td>
                      </tr>
                    )
 }

const CustomerList = ({customers}) => {

 
        return (

        <Table hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.customers.map(customer => { return <CustomerRow key={customer._id} customer={customer} />  })}
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