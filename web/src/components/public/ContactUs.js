import React, { Component } from 'react';
import { Label, Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const validEmail = val => !val || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validPhone = val => !val || /^([+]1 |1 )?([(][0-9]{3}[)]|[0-9]{3})( *| *- *)[0-9]{3}( *| *- *)[0-9]{4}$/.test(val);

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
    }

    render() {
        const cardHeaderStyle = { backgroundColor: "#e3f2fd" }

        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12 mt-5 pt-5">
                        <Card>
                            <CardHeader className="border-bottom border-primary text-center" style={cardHeaderStyle}>Contact Us</CardHeader>
                            <CardBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" className="col-2">Name</Label>
                                <Col className="col-10">
                                    <Control.text model=".name" id="name" name="name" required className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(50)
                                        }}
                                     />
                                        <Errors className="text-danger" model=".name" show="touched" component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be no more than 50 characters'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="company" className="col-sm-2">Company</Label>
                                <Col className="col-sm-10">
                                    <Control.text model=".company" id="company" name="company" className="form-control"
                                        validators={{
                                            maxLength: maxLength(50)
                                        }}
                                     />
                                        <Errors className="text-danger" model=".company" show="touched" component="div"
                                            messages={{
                                                maxLength: 'Must be no more than 50 characters'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" className="col-sm-2">Email address</Label>
                                <Col>
                                    <Control.text type="email" model=".email" id="email" name="email" aria-describedby="emailHelp" className="form-control" 
                                        validators={{
                                            validEmail
                                        }}
                                    />
                                        <Errors className="text-danger" model=".email" show="touched" component="div"
                                            messages={{
                                                validEmail: 'Invalid email address'
                                            }}
                                        />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email or phone number with anyone
                                    else.</small>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phone" className="col-sm-2">Phone</Label>
                                <Col>
                                    <Control.text type="tel" model=".phone" id="phone" name="phone" className="form-control"
                                        validators={{
                                            validPhone
                                        }}
                                     />
                                        <Errors className="text-danger" model=".phone" show="touched" component="div"
                                            messages={{
                                                validPhone: 'Invalid phone number address'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="col-sm-2">Preferred Contact</Label>
                                <Col>
                                    <div className="form-check form-check-inline">
                                        <Label check>
                                            <Control.radio model=".preferredContact" name="preferredContact"
                                                id="preferredContactEmail" value="email" defaultValue="email" /> Email
                                    </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Label check>
                                            <Control.radio model=".preferredContact" name="preferredContact"
                                                id="preferredContactPhone" value="phone" /> Phone
                                    </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="contactReason" className="col-sm-2">Contact Reason</Label>
                                <Col>
                                    <Control.select model=".contactReason" id="contactReason" name="contactReason" className="form-control" defaultValue="Info">
                                        <option value="Info">More Information</option>
                                        <option value="Demo">Demo</option>
                                        <option value="Feedback">Feedback</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comments" className="col-sm-2">Comments</Label>
                                <Col>
                                    <Control.textarea model=".comments" id="comments" name="comments" rows="5" className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(20),
                                            maxLength: maxLength(2000)
                                        }}
                                     />
                                        <Errors className="text-danger" model=".comments" show="touched" component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 20 characters',
                                                maxLength: 'Must be no more than 2000 characters'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="offset-sm-2">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </CardBody></Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs;