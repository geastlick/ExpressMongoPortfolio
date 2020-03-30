import React from 'react';
import { Label, Row, Col, Button, Card, CardHeader, CardBody, Form, Input } from 'reactstrap';
import { useFormik } from 'formik';

const ContactUs = () => {
        const cardHeaderStyle = { backgroundColor: "#e3f2fd" }
        const formik = useFormik({
            initialValues: {
                name: '',
                company: '',
                email: '',
                phone: '',
                preferredContact: 'email',
                contactReason: 'Info',
                comments: ''
            },
            onSubmit: values => {
                console.log("Current state is: " + JSON.stringify(values, null, 2));
            }
        })
        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12 mt-5 pt-5">
                        <Card>
                            <CardHeader className="border-bottom border-primary text-center" style={cardHeaderStyle}>Contact Us</CardHeader>
                            <CardBody>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="name" className="col-2">Name</Label>
                                <Col className="col-10">
                                    <Input id="name" name="name" required className="form-control" onChange={formik.handleChange} value={formik.values.name}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="company" className="col-sm-2">Company</Label>
                                <Col className="col-sm-10">
                                    <Input id="company" name="company" className="form-control" onChange={formik.handleChange} value={formik.values.company}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" className="col-sm-2">Email address</Label>
                                <Col>
                                    <Input type="email" id="email" name="email" aria-describedby="emailHelp" className="form-control"  onChange={formik.handleChange} value={formik.values.email}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email or phone number with anyone
                                    else.</small>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phone" className="col-sm-2">Phone</Label>
                                <Col>
                                    <Input type="tel" id="phone" name="phone" className="form-control" onChange={formik.handleChange} value={formik.values.phone}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="col-sm-2">Preferred Contact</Label>
                                <Col>
                                    <div className="form-check form-check-inline">
                                        <Label check>
                                            <Input type="radio" name="preferredContact" onChange={formik.handleChange} checked={formik.values.preferredContact==="email"}
                                                id="preferredContactEmail" value="email"  /> Email
                                    </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Label check>
                                            <Input type="radio" name="preferredContact" onChange={formik.handleChange} checked={formik.values.preferredContact==="phone"}
                                                id="preferredContactPhone" value="phone" /> Phone
                                    </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="contactReason" className="col-sm-2">Contact Reason</Label>
                                <Col>
                                    <Input type="select" id="contactReason" name="contactReason" className="form-control" onChange={formik.handleChange} value={formik.values.contactReason}>
                                        <option value="Info">More Information</option>
                                        <option value="Demo">Demo</option>
                                        <option value="Feedback">Feedback</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comments" className="col-sm-2">Comments</Label>
                                <Col>
                                    <Input type="textarea" id="comments" name="comments" rows="5" className="form-control" onChange={formik.handleChange} value={formik.values.comments}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="offset-sm-2">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                        </CardBody></Card>
                    </div>
                </div>
            </div>
        )
    }


export default ContactUs;