import React, { Component } from 'react';

class AppFooter extends Component {
    render() {
        return (
            <div className="site-footer fixed-bottom border-top border-primary">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            Eastlick Enterprises, LLC &copy;
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppFooter;