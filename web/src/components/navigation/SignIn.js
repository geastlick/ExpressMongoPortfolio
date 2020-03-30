import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Label, Row, Button, Form, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            redirectToReferrer: false,
            username: '',
            loginPassword: ''
        }
    }

    usernameChanged = (e) => {
        this.setState({username: e.target.value});
    };
    passwordChanged = (e) => {
        this.setState({loginPassword: e.target.value});
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.userLogin(this.state.username, this.state.loginPassword).then((data) => {
            if (this.props.users.currentUser.name) {
                this.setState({
                    redirectToReferrer: true
                });
            }
            return data;
        });
    };

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
                                <Form onSubmit={this.handleSubmit}>
                                    <Row className="form-group">
                                        <Label className="sr-only" htmlFor="username">Username</Label>
                                        <Input id="username" name="username" placeholder="Username" className="form-control" onChange={this.usernameChanged}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Label className="sr-only" htmlFor="loginPassword">Password</Label>
                                        <Input type="password" id="loginPassword" name="loginPassword" placeholder="Password" className="form-control" onChange={this.passwordChanged}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <div className="form-check">
                                            <Label check>
                                                <Input type="checkbox" name="rememberMe" className="form-check-input" /> Remember me</Label>
                                        </div>
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">Sign in</Button>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </div></div></div>
        );
    }
}

export default SignIn;