// src/components/Square.jsx
import React, {Component} from 'react';
import {GRID} from '../utils/constants.js';

//This component expects the props:
// x, y -- upper left corner of the component
class Sqaure extends Component {
    render() {
        const myStyle = {
            top: this.props.y,
            left: this.props.x,
            width: GRID -2,
            height: GRID -2,
            background: '#DDDDDD',
            borderWidth: 1,
            borderColor: '#666666',
            borderStyle: 'solid',
            position: 'absolute'
        };

        return ( <div style = {myStyle}></div> );
    }
};

export default Sqaure;