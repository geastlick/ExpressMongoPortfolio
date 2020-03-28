import React, { Component } from 'react';
import { Jumbotron, Media } from 'reactstrap';

class FeatureCard extends Component {
    highlights(list,i=0) {
        return (
            <ul key={this.props.feature.highlights+i}>
            {
                list.map((item,index) => {
                    if(Array.isArray(item)) {
                        return this.highlights(item,i+1);
                    } else {
                        return <li key={index}>{item}</li>;
                    }
                })
            }
            </ul>
        );
    }

    render() {
        const image = (img,alt) => {
            return (
                <img src={img} alt={alt} className="w-25 img-thumbnail card-img-left d-none d-lg-inline" />
            );
        }

        const rowStyle = {"backgroundColor": (this.props.imageSide === "left" ? "#FFFAF0" : "#FFF2E8")}
        const jumboStyle = {"backgroundColor": (this.props.imageSide === "left" ? "#FFFAF0" : "#FFF2E8"), "marginBottom": 0}

        return (
            <div className="row row-content" style={rowStyle}>
                <div className="col-12">
                    <Jumbotron fluid style={jumboStyle}>
                    <Media className="mx-3">
                        {(this.props.imageSide === "left" ? image(this.props.feature.image,this.props.feature.imageAlt): "")}
                        <Media body className="align-self-center">
                            <h3 className="text-center mb-4">{this.props.feature.title}</h3>
                            {this.highlights(this.props.feature.highlights)}
                        </Media>
                        {(this.props.imageSide === "right" ? image(this.props.feature.image,this.props.feature.imageAlt): "")}
                    </Media>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default FeatureCard;
