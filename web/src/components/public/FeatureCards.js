import React, { Component } from 'react';
import FeatureCard from './FeatureCard';

class FeatureCards extends Component {

    render() {
        const cards = this.props.features.map((f, i) => {
            return (
                <FeatureCard key={i} feature={f} imageSide={(i % 2 === 0 ? "left": "right")} />
            );
        });

        return (
            <div id="content" className="container homeHighlights">
                {cards}
            </div>
        );
    }
}

export default FeatureCards;
