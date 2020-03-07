import React, { Component } from 'react';
import { Jumbotron, NavbarBrand, Row, Col } from 'reactstrap';

class AppHeader extends Component {
    render() {
        if (!this.props.currentUser.name) {
            return (
                <Jumbotron fluid className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-2 align-self-center">
                                <NavbarBrand href="#"><img src="images/EElogo.png" alt="Logo" className="img-fluid" /></NavbarBrand>
                            </div>
                            <div className="col-8 mx-auto">
                                <h1 className="display-4">Sign Rental Management</h1>
                                <p className="lead text-right">Eastlick Enterprises, LLC &copy;</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            );
        } else {
            return (
                <div className="header">
                    <div className="container">
                        <Row>
                            <Col xs="9"><img src="images/EElogo.png" alt="Logo" className="img-fluid" height="50" width="50" />&nbsp;&nbsp;<h2 style={{"display": "inline"}}>Sign Rental Management</h2></Col>
                            <Col xs="3" className="text-right"><h4>{this.props.currentUser.name}</h4></Col>
                        </Row>
                    </div>
                    </div>
            );
        }
    }
}

export default AppHeader;