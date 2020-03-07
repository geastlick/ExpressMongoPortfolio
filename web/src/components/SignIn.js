import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Label, Row, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Redirect } from 'react-router-dom';

const required = val => val && val.length;

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            redirectToReferrer: false
        }
    }

    handleSubmit(values) {
        this.props.userLogin(values.username, values.loginPassword).then((data) => {
            if (this.props.users.currentUser.name) {
                this.setState({
                    redirectToReferrer: true
                });
            }
            return data;
        });
    }

    signinErrors = () => {
        if(this.props.users.errMess) {
            return <div style={{"color":"red", "fontWeight":"bold"}}>Invalid Username/Password</div>;
        }
    }

    render() {
        const cardHeaderStyle = { backgroundColor: "#e3f2fd" }

        if (this.state.redirectToReferrer === true) {
            return <Redirect to="/customer" />
        }

        console.log(this.props);
        return (
            <div id="content" className="container">
                <div className="row row-content">
                    <div className="col-12 mt-5 pt-5">
                        <Card>
                            <CardHeader className="border-bottom border-primary text-center" style={cardHeaderStyle}>
                                Login
                            </CardHeader>
                            <CardBody>
                                {this.signinErrors()}
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label className="sr-only" htmlFor="username">Username</Label>
                                        <Control.text model=".username" id="username" name="username" placeholder="Username" className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors className="text-danger" model=".username" show="touched" component="div"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Label className="sr-only" htmlFor="loginPassword">Password</Label>
                                        <Control.text type="password" model=".loginPassword" id="loginPassword" name="loginPassword" placeholder="Password" className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors className="text-danger" model=".loginPassword" show="touched" component="div"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <div className="form-check">
                                            <Label check>
                                                <Control.checkbox model=".rememberMe" name="rememberMe" className="form-check-input" /> Remember me</Label>
                                        </div>
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">Sign in</Button>
                                    </Row>
                                </LocalForm>
                            </CardBody>
                        </Card>
                    </div></div></div>
        );
    }
}

export default SignIn;