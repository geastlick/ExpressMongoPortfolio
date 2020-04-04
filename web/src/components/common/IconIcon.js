import React, { Component } from 'react';

const iconIconStyle = {
    "fontSize": "0.5em",
    "display": "block",
    "position": "absolute",
    "top": "-1em",
    "right": "-1em",
    "width": "2em",
    "height": "2em",
    "lineHeight": "2em",
    "borderRadius": "50%",
    "textAlign": "center",

    "color": "#fff",
    "background": "rgba(0,0,0,0.5)"
}

const iconStyle = {
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

class IconIcon extends Component {
    render() {
        const iconIconClass=`fa ${this.props.iconIcon} fa-lg fa-border`;
        const iconClass=`fa ${this.props.icon} fa-lg fa-border`;
        return <i className={iconClass} style={iconStyle}><i className={iconIconClass} style={iconIconStyle}></i></i>;
    }
}

export default IconIcon;