import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import { TextInput } from '../common/FormikFields';
import * as Yup from 'yup';

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
        this.setState({mode: "edit"});
      }
      handleAdd = () => {
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
        const fieldsetStyle = {
            "margin": "8px",
            "border": "1px solid silver",
            "padding": "8px",    
            "borderRadius": "4px"
        };
        const legendStyle = {
            "padding": "2px"    
        };

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
                <Formik
                    initialValues={this.props.customers.customers.filter(customer => customer._id === this.state.selection.customerId)[0]}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(5, 'Must be between 5 and 30 characters')
                            .max(30, 'Must be between 5 and 30 characters')
                            .required('Required'),
                        address: Yup.object({
                            line1: Yup.string()
                                .required('Required'),
                            line2: Yup.string(),
                            city: Yup.string()
                                .required('Required'),
                            state: Yup.string()
                                .required('Required'),
                            zip: Yup.string()
                                .required('Required')
                        })
                    })}
                    onSubmit={(values, { setSubmitting }) => {

                    }}
                >
                {formik => (
                    <Form>
                        <div className="row row-content mt-3" >
                            <div className="col-8">
                                <FormGroup row>
                                    <TextInput labelwidth="3" label="Customer Name" inputwidth="9" name="name" readOnly={this.state.mode === "read"} />
                                </FormGroup>
                            </div>
                            <div className="offset-2 col-2">
                                <Button outline color="primary" onClick={this.handleEdit} className="mr-2" aria-label="Edit"><i className="far fa-edit fa-lg"></i></Button>
                                <Button outline color="warning" aria-label="Delete" className="mr-2"><i className="far fa-trash-alt fa-lg"></i></Button>
                                <Button outline color="primary" onClick={this.handleAdd}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button>
                            </div>
                        </div>
                        <div className="row">
                            <fieldset style={fieldsetStyle}><legend style={legendStyle}>Address</legend>
                                <FormGroup row>
                                    <TextInput labelwidth="1" label="Line 1" inputwidth="11" name="address.line1" readOnly={this.state.mode === "read"} />
                                    <TextInput labelwidth="1" label="Line 2" inputwidth="11" name="address.line2" readOnly={this.state.mode === "read"} />
                                    <TextInput labelwidth="1" label="City" inputwidth="6" name="address.city" readOnly={this.state.mode === "read"} />
                                    <TextInput labelwidth="1" label="State" inputwidth="1" name="address.state" readOnly={this.state.mode === "read"} />
                                    <TextInput labelwidth="1" label="Zip Code" inputwidth="2" name="address.zip" readOnly={this.state.mode === "read"} />
                                </FormGroup>
                            </fieldset>
                            <div>{JSON.stringify(formik.values, null, 2)}</div>
                        </div>
                    </Form>
                )}
                </Formik>
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