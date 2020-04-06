import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, FormGroup, Button, Input, Table, Nav, NavItem, NavLink, TabPane, TabContent, Col, Row } from 'reactstrap';
import classnames from 'classnames';
import { Formik, FieldArray } from 'formik';
import { TextInput, Select } from '../common/FormikFields';
import * as Yup from 'yup';
import IconIcon from '../common/IconIcon';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "read",
            action: "read",
            selectionType: "Customer",
            selection: {},
            activeContactTab: ''
        }
    }
    componentDidMount() {
        if(this.props.currentUser &&
            this.props.currentUser.name &&
            this.props.customers.customers.length === 0) {
                this.props.fetchCustomers();
        }
    }

    emptyCustomer = () => {
        return {
            name: '',
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zip: ''
            },
            urls: [],
            emails: [],
            phones: [],
            contacts: []
        }
    }
    selectionMade = (selected, {formik}) => {
        this.setState({selection: selected[0]});
        const customer = this.props.customers.customers.filter(customer => customer._id === selected[0].customerId)[0];
        this.setState({activeContactTab: customer.contacts[0]._id});
        const initialValues = customer;
        formik.resetForm({values: initialValues});
    }

    changeSelectionType = (e) => {
        this.setState({
            selectionType: e.target.value
        });
    }

    handleEdit = (e, {formik}) => {
        this.setState({action: "edit", mode: "update"});
    }
    handleAdd = (e, {formik}) => {
        this.setState({action: "add", mode: "update"});
        const initialValues = this.emptyCustomer();
        formik.resetForm({values: initialValues});
    }
    handleDelete = (e, {formik}) => {
        this.setState({action: "delete", mode: "read"});
    }
    handleCancel = (e, {formik}) => {
        if(this.state.selection.customerId) {
            const customer = this.props.customers.customers.filter(customer => customer._id === this.state.selection.customerId)[0];
            this.setState({activeContactTab: customer.contacts[0]._id});
            const initialValues = customer;
            formik.resetForm({values: initialValues});
            this.setState({action: "read", mode: "read"});
        }
    }
    setActiveContactTab = (tab) => {
        if(this.state.activeContactTab !== tab) this.setState({activeContactTab: tab});
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
            "borderRadius": "4px",
            "width": "100%"
        };
        const legendStyle = {
            "padding": "2px"    
        };

        const SearchField = (props) => {
            if(this.state.action === "read") {
                if(this.state.selectionType === "Customer") {
                    return (
                        <Typeahead
                            id="Customer Selection"
                            options={customerSearchOptions}
                            labelKey="customerName"
                            placeholder="Choose a customer..."
                            onChange={(e) => {this.selectionMade(e,props)}}
                        />
                    );
                } else {
                    return (
                        <Typeahead
                            id="Contact Selection"
                            options={contactSearchOptions}
                            labelKey="contactName"
                            placeholder="Choose a contact..."
                            onChange={(e) => {this.selectionMade(e,props)}}
                        />
                    );
                }
            } else return <React.Fragment></React.Fragment>;
        }
        const SearchType = (props) => {
            if(this.state.action === "read") {
                return (
                    <Input type="select" name="select" id="selectionType" onChange={this.changeSelectionType} value={this.state.selectionType}>
                        <option value="Customer">Search by Customer</option>
                        <option value="Contact">Search by Contact</option>
                    </Input>
                );
            } else return <React.Fragment></React.Fragment>;
        }

        const Controls = (props) => {
            if(this.state.action === "read") {
                return (
                    <div className="offset-2 col-2">
                        <Button outline color="primary" onClick={(e) => this.handleEdit(e, props)} className="mr-2" aria-label="Edit"><i className="far fa-edit fa-lg"></i></Button>
                        <Button outline color="warning" onClick={(e) => this.handleDelete(e, props)} className="mr-2" aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                        <Button outline color="primary" onClick={(e) => this.handleAdd(e, props)}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button>
                    </div>
                );
            } else if(this.state.action === "edit" || this.state.action === "add") {
                return (
                    <React.Fragment>
                        <div className="offset-2 col-1"><Button onClick={(e) => this.handleCancel(e, props)} color="secondary">Cancel</Button></div>
                        <div className="col-1"><Button color="primary">Save</Button></div>
                    </React.Fragment>
                );
            } else if(this.state.action === "delete") {
                return (
                    <React.Fragment>
                        <div className="offset-2 col-1"><Button onClick={(e) => this.handleCancel(e, props)} color="secondary">Cancel</Button></div>
                        <div className="col-1"><Button color="danger">Confirm</Button></div>
                    </React.Fragment>
                )
            }
        }

        return (
            <div id="content" className="container">
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
                        <div className="row row-content">
                            <div className="col-4"><h2>Customers</h2></div>
                            <div className="col-5">
                                <SearchField formik={formik} />
                            </div>
                            <div className="col-3">
                                <SearchType formik={formik} />
                            </div>
                            <hr />
                        </div>
                        {this.state.selection && Object.keys(this.state.selection).length !== 0 ?
                            <React.Fragment>
                            <div className="row row-content mt-3" >
                                <div className="col-8">
                                    <FormGroup row>
                                        <TextInput labelwidth="3" label="Customer Name" inputwidth="9" name="name" readOnly={this.state.mode === "read"} />
                                    </FormGroup>
                                </div>
                                <Controls formik={formik} />
                            </div>
                            <div className="row">
                                <fieldset style={fieldsetStyle}><legend style={legendStyle}>Address</legend>
                                    <FormGroup row>
                                        <TextInput labelwidth="1" label="Line" inputwidth="11" name="address.line1" readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="Line" inputwidth="11" name="address.line2" readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="City" inputwidth="6" name="address.city" readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="State" inputwidth="1" name="address.state" readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="Zip Code" inputwidth="2" name="address.zip" readOnly={this.state.mode === "read"} />
                                    </FormGroup>

                                    <Table borderless >
                                        <thead><tr><th></th><th></th><th></th><th>
                                          {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                          <React.Fragment>
                                            <Button color="link" onClick={(e) => this.handlePhoneAdd(e, formik)}  aria-label="Add Phone"><IconIcon icon="fa-phone-alt" iconIcon="fa-plus" /></Button>
                                            <Button color="link" onClick={(e) => this.handleUrlAdd(e, formik)}  aria-label="Add URL"><IconIcon icon="fa-globe" iconIcon="fa-plus" /></Button>
                                            <Button color="link" onClick={(e) => this.handleEmailAdd(e, formik)}  aria-label="Add Email"><IconIcon icon="fa-envelope" iconIcon="fa-plus" /></Button>
                                          </React.Fragment>
                                        }
                                        </th></tr></thead>
                                        <tbody>
                                        <FieldArray
                                            name="urls"
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.urls?.map((url,index) => (
                                                        <tr key={`url${index}`}>
                                                            <td>URL</td>
                                                            <td colSpan="2">
                                                                <TextInput nolabel name={`urls.${index}`} readOnly={this.state.mode === "read"} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handleUrlDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        <FieldArray
                                            name="emails"
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.emails?.map((email,index) => (
                                                        <tr key={`email${index}`}>
                                                            <td>Email</td>
                                                            <td colSpan="2">
                                                                <TextInput nolabel name={`emails.${index}`} readOnly={this.state.mode === "read"} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handleEmailDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        <FieldArray
                                            name="phones"
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.phones?.map((phone,index) => (
                                                        <tr key={`phone${index}`}>
                                                            <td>Phone</td>
                                                            <td><Select nolabel name={`phones.${index}.phoneType`} readOnly={this.state.mode === "read"} style={{"width": "5em"}}>
                                                                <option>cell</option>
                                                                <option>line</option>
                                                                <option>fax</option>
                                                                </Select>
                                                            </td><td>
                                                                <TextInput nolabel name={`phones.${index}.phoneNumber`} readOnly={this.state.mode === "read"} style={{"width": "15em"}} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handlePhoneDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        </tbody>
                                    </Table>
                                </fieldset>
                            </div>
                            <div className="row">
                                <fieldset style={fieldsetStyle} className="pl-2 pr-4">
                                    <legend style={legendStyle}>
                                        Contacts&nbsp;&nbsp;
                                        {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                            <Button outline color="primary" onClick={(e) => this.handleContactAdd(e, formik)}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button>
                                        }
                                    </legend>
                                    <FieldArray
                                        name="contacts"
                                        render={arrayHelpers => (
                                            <div>
                                                <Row>
                                                    <Col sm={2}>
                                                <Nav tabs pills className="flex-column">
                                                    {formik.values.contacts?.map((contact,index) => (
                                                        <NavItem key={`contact${index}`}>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeContactTab === contact._id})}
                                                                onClick={() => this.setActiveContactTab(contact._id)}
                                                            >
                                                                {contact.name}
                                                            </NavLink>
                                                        </NavItem>
                                                    ))}
                                                </Nav>
                                                </Col>
                                                <Col sm={10}>
                                                <TabContent activeTab={this.state.activeContactTab}>
                                                    {formik.values.contacts?.map((contact,contactIndex) => (
                                                        <TabPane tabId={contact._id} key={`contact${contactIndex}`}>
                            <div className="row">
                                        <TextInput labelwidth="1" label="Line" inputwidth="11" name={`contacts.${contactIndex}.address.line1`} readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="Line" inputwidth="11" name={`contacts.${contactIndex}.address.line2`} readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="City" inputwidth="6" name={`contacts.${contactIndex}.address.city`} readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="State" inputwidth="1" name={`contacts.${contactIndex}.address.state`} readOnly={this.state.mode === "read"} />
                                        <TextInput labelwidth="1" label="Zip Code" inputwidth="2" name={`contacts.${contactIndex}.address.zip`} readOnly={this.state.mode === "read"} />

                                    <Table  borderless >
                                        <thead><tr><th></th><th></th><th></th><th>
                                          {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                          <React.Fragment>
                                            <Button color="link" onClick={(e) => this.handlePhoneAdd(e, formik)}  aria-label="Add Phone"><IconIcon icon="fa-phone-alt" iconIcon="fa-plus" /></Button>
                                            <Button color="link" onClick={(e) => this.handleUrlAdd(e, formik)}  aria-label="Add URL"><IconIcon icon="fa-globe" iconIcon="fa-plus" /></Button>
                                            <Button color="link" onClick={(e) => this.handleEmailAdd(e, formik)}  aria-label="Add Email"><IconIcon icon="fa-envelope" iconIcon="fa-plus" /></Button>
                                          </React.Fragment>
                                        }
                                        </th></tr></thead>
                                        <tbody>
                                        <FieldArray
                                            name={`contacts.${contactIndex}.urls`}
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.contacts[contactIndex].urls?.map((url,urlIndex) => (
                                                        <tr key={`url${urlIndex}`}>
                                                            <td>URL</td>
                                                            <td colSpan="2">
                                                                <TextInput nolabel name={`contacts.${contactIndex}.urls.${urlIndex}`} readOnly={this.state.mode === "read"} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handleUrlDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        <FieldArray
                                            name={`contacts.${contactIndex}.emails`}
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.contacts[contactIndex].emails?.map((email,emailIndex) => (
                                                        <tr key={`email${emailIndex}`}>
                                                            <td>Email</td>
                                                            <td colSpan="2">
                                                                <TextInput nolabel name={`contacts.${contactIndex}.emails.${emailIndex}`} readOnly={this.state.mode === "read"} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handleEmailDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        <FieldArray
                                            name={`contacts.${contactIndex}.phones`}
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    {formik.values.contacts[contactIndex].phones?.map((phone,phoneIndex) => (
                                                        <tr key={`phone${phoneIndex}`}>
                                                            <td>Phone</td>
                                                            <td><Select nolabel name={`contacts.${contactIndex}.phones.${phoneIndex}.phoneType`} readOnly={this.state.mode === "read"} style={{"width": "5em"}}>
                                                                <option>cell</option>
                                                                <option>line</option>
                                                                <option>fax</option>
                                                                </Select>
                                                            </td><td>
                                                                <TextInput nolabel name={`contacts.${contactIndex}.phones.${phoneIndex}.phoneNumber`} readOnly={this.state.mode === "read"} style={{"width": "15em"}} />
                                                            </td>
                                                            <td>
                                                            {this.state.mode === "read" ? <React.Fragment></React.Fragment> :
                                                                <Button outline color="warning" onClick={(e) => this.handlePhoneDelete(e, formik)} aria-label="Delete"><i className="far fa-trash-alt fa-lg"></i></Button>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        </tbody>
                                    </Table>
                            </div>

                                                        </TabPane>
                                                    ))}
                                                </TabContent>
                                                </Col></Row>
                                            </div>
                                        )}
                                    />
                                </fieldset>
                            </div>
                            <div>{JSON.stringify(formik.values, null, 2)}</div>
                            </React.Fragment>
                        :
                        <React.Fragment>
                            <div className="row row-content mt-3">
                                <div className="col-10">No customer selected.</div>
                                <div className="col-2"><Button outline color="primary" onClick={this.handleAdd}  aria-label="Add"><i className="fas fa-plus fa-lg"></i></Button></div>
                            </div>
                        </React.Fragment>
                        }
                    </Form>
                )}
                </Formik>
            </div>
        );
    }
}

export default Customers;