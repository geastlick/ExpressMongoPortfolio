import React, { Component } from 'react';
import { Button, Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
        this.handleSignout = this.handleSignout.bind(this);
    }

    handleSignout() {
        this.props.userLogout();
    }

    render() {
        const toggleNav = () => this.setState({ isNavOpen: !this.state.isNavOpen });

        if (!this.props.currentUser.name) {
            return (
                <React.Fragment>
                    <Navbar expand="md" light className="border-bottom border-primary">
                        <NavbarToggler onClick={toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <div className="container">
                                <Nav className="navbar-nav mr-auto mt-2 mt-lg-0" navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <i className="fa fa-home fa-lg" /> Home
                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/contact">
                                            <i className="fa fa-envelope fa-lg" /> Contact
                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/about">
                                            <i className="fa fa-question-circle fa-lg" /> About Us
                                </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav>
                                    {this.props.location === "/signin" ? null :
                                        <NavLink to="/signin" ><Button color="primary" className="my-2 my-sm-0"><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In</Button></NavLink>
                                    }
                                </Nav>
                            </div>
                        </Collapse>
                    </Navbar>

                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Navbar expand="md" light className="border-bottom border-primary">
                        <NavbarToggler onClick={toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <div className="container">
                                <Nav className="navbar-nav mr-auto mt-2 mt-lg-0" navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/customer">
                                            <i className="fa fa-users fa-lg" /> Customers
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/product">
                                            <i className="fa fa-tags fa-lg" /> Products
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/order">
                                            <i className="fa fa-shopping-cart fa-lg" /> Orders
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/inventory">
                                            <i className="fa fa-barcode fa-lg" /> Inventory
                                                </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav>
                                    <Button color="primary" className="my-2 my-sm-0" onClick={this.handleSignout}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Sign Out</Button>
                                </Nav>
                            </div>
                        </Collapse>
                    </Navbar>

                </React.Fragment>
            );
        }
    }
}

export default AppNavbar;