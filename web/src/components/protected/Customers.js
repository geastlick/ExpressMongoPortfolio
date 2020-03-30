import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

const CustomerDetail = ({customer, mode}) => {
    const fieldsetStyle = {
        "margin": "8px",
        "border": "1px solid silver",
        "padding": "8px",    
        "borderRadius": "4px"
    };
    const legendStyle = {
        "padding": "2px"    
    };

    return (
        <React.Fragment>
            <fieldset style={fieldsetStyle}><legend style={legendStyle}>Address</legend>
                <FormGroup row>
                    <Label for="line1" sm={1}>Line 1</Label>
                    <Col sm={11}>
                        <Input id="line1" type="text" readOnly={mode === "read"} value={customer.address.line1} />
                    </Col>
                    <Label for="line2" sm={1}>Line 2</Label>
                    <Col sm={11}>
                        <Input id="line2" type="text" readOnly={mode === "read"} value={customer.address.line2} />
                    </Col>
                    <Label for="city" sm={1}>City</Label>
                    <Col sm={6}>
                        <Input id="city" type="text" readOnly={mode === "read"} value={customer.address.city} />
                    </Col>
                    <Label for="state" sm={1}>State</Label>
                    <Col sm={1}>
                        <Input id="state" type="text" readOnly={mode === "read"} value={customer.address.state} />
                    </Col>
                    <Label for="zip" sm={1}>Zip Code</Label>
                    <Col sm={2}>
                        <Input id="zip" type="text" readOnly={mode === "read"} value={customer.address.zip} />
                    </Col>
                </FormGroup>
            </fieldset>
<div>{JSON.stringify(customer)}</div>
        </React.Fragment>
    );
}

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "read",
            selectionType: "Customer",
            selection: {}
        }
    }
    componentDidMount() {
        if(this.props.currentUser &&
            this.props.currentUser.name &&
            this.props.customers.customers.length === 0) {
             this.props.fetchCustomers();
        }
      }

      selectionMade = (selected) => {
          this.setState({selection: selected[0]});
      }

      changeSelectionType = (e) => {
          this.setState({
              selectionType: e.target.value
          });
      }

      handleEdit = () => {
          console.log('Editing')
        this.setState({mode: "edit"});
      }
      handleAdd = () => {
          console.log('Adding')
        this.setState({mode: "add"});
      }
      handleCancel = () => {
          this.setState({mode: "read"});
      }

      render() {
        if(!this.props.currentUser || !this.props.currentUser.name) {
            return <Redirect to={{pathname: '/signin', state: {from: this.location}}} />
        }
        const customerSearchOptions = this.props.customers.customers.map(customer => {
            return {customerId: customer._id, customerName: customer.name};
        });
        const contactSearchOptions = [].concat.apply([],this.props.customers.customers.map(customer => {
            return customer.contacts.map(contact => {
                return {customerId: customer._id, customerName: customer.name, contactName: contact.name};
            });
        }));

        const Controls = () => {
            if(this.state.mode === "read") {
                if(this.state.selectionType === "Customer") {
                    return (
                        <React.Fragment>
                            <div className="col-5">
                                <Typeahead
                                    id="Customer Selection"
                                    options={customerSearchOptions}
                                    labelKey="customerName"
                                    placeholder="Choose a customer..."
                                    onChange={this.selectionMade}
                                />
                            </div>
                            <div className="col-3">
                                <Input type="select" name="select" id="selectionType" onChange={this.changeSelectionType} value={this.state.selectionType}>
                                    <option value="Customer">Search by Customer</option>
                                    <option value="Contact">Search by Contact</option>
                                </Input>
                            </div>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment>
                         <div className="col-5">
                                <Typeahead
                                    id="Contact Selection"
                                    options={contactSearchOptions}
                                    labelKey="contactName"
                                    placeholder="Choose a contact..."
                                    onChange={this.selectionMade}
                                />
                            </div>
                            <div className="col-3">
                                <Input type="select" name="select" id="selectionType" onChange={this.changeSelectionType} value={this.state.selectionType}>
                                    <option value="Customer">Search by Customer</option>
                                    <option value="Contact">Search by Contact</option>
                                </Input>
                            </div>
                        </React.Fragment>
                    );
                }
            } else if(this.state.mode === "edit" || this.state.mode === "add") {
                return (
                    <React.Fragment>
                        <div className="offset-6 col-1"><Button onClick={this.handleCancel} color="secondary">Cancel</Button></div>
                        <div className="col-1"><Button color="primary">Save</Button></div>
                    </React.Fragment>
                );
            }
        }

        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-4"><h2>Customers</h2></div>
                    <Controls />
                    <hr />
                </div>
                {this.state.selection && Object.keys(this.state.selection).length !== 0 ?
                <Form>
                    <div className="row row-content mt-3" >
                        <div className="col-8">
                            <FormGroup row>
                                <Label for="customerName" sm={3}>Customer Name</Label>
                                <Col sm={9}>
                                    <Input id="customerName" type="text" readOnly={this.state.mode === "read"} value={this.state.selection.customerName} />
                                </Col>
                            </FormGroup>
                        </div>
                        <div className="offset-2 col-2">
                            <Button outline color="primary" onClick={this.handleEdit} className="mr-2" aria-label="Edit"><i className="far fa-edit fa-lg"></i></Button>
                            <Button outline color="warning" aria-label="Delete" className="mr-2"><i className="far fa-trash-alt fa-lg"></i></Button>
                            <Button outline color="primary" onClick={this.handleAdd}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button>
                        </div>
                    </div>
                    <div className="row">
                        <CustomerDetail
                            customer={this.props.customers.customers.filter(customer => customer._id === this.state.selection.customerId)[0]}
                            mode={this.state.mode}
                         />
                    </div>
                </Form>
                :
                <React.Fragment>
                    <div className="row row-content mt-3">
                        <div className="col-10">No customer selected.</div>
                        <div className="col-2"><Button outline color="primary" onClick={this.handleAdd}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button></div>
                    </div>
                </React.Fragment>
                }
            </div>
        );
    }
}

export default Customers;