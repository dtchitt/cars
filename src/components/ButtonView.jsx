import React, {Component} from 'react';
import {HGT, GRID} from '../utils/constants.js';

class ButtonView extends Component{
    render() {
        const myStyle = {
            position: 'absolute',
            top: HGT*GRID,
            left: this.props.y,
            padding: 15,
        };

        return ( 
            <div style = {myStyle}>
                <button type="button" onClick={this.props.onClick}>{this.props.name}</button>
            </div>
        );
    }
}

export default ButtonView