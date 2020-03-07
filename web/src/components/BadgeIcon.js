import React, { Component } from 'react';

const badge = {
    "fontSize": "0.5em",
    "display": "block",
    "position": "absolute",
    "top": "-0.75em",
    "right": "-0.75em",
    "width": "2em",
    "height": "2em",
    "lineHeight": "2em",
    "borderRadius": "50%",
    "textAlign": "center",

    "color": "#fff",
    "background": "rgba(0,0,0,0.5)"
}

const badgeIcon = {
    "width": "40px",
    "height": "40px",
    "textAlign": "center",
    "verticalAlign": "middle",
    "position": "relative",

    "color": "grey",
    "borderWidth": "1px",
    "borderStyle": "solid",
    "borderColor": "lightGrey",
    "paddingTop": "10px",
    "borderRadius": "20%"
}

class BadgeIcon extends Component {
    render() {
        const classvar=`fa ${this.props.icon} fa-lg fa-border`;
        return <i className={classvar} style={badgeIcon}><span style={badge}>{this.props.badge}</span></i>;
    }
}

export default BadgeIcon;