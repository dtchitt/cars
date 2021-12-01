// src/components/BoardView.jsx
import React, {Component} from 'react';
import {WID, HGT, GRID, WALL} from '../utils/constants.js';
import Square from './Square.jsx';
import CarView from "../components/CarView.jsx";

class BoardView extends Component{
    render() {
        const bWid = WID * GRID;
        const bHgt = HGT * GRID;
        const bStyle = {
            top: WALL,
            left: WALL,
            width: bWid,
            height: bHgt,
            position: 'absolute'
        };

        let list = [];
        let key = 1;

        for (let x = 0; x < WID; x++) {
            let cx = x * GRID;

            for (let y = 0; y < HGT; y++) {
                let cy = y * GRID;
                list.push(<Square key={key++} x={cx} y={cy}/>);
            }
            
        }

        const cars = this.props.cars;
        const num = cars.getNumCars();
        
        for (let i = 0; i < num; i++) {
            const {id, x, y, ncols, nrows, color} = cars.getCar(i);
            list.push(
                    <CarView
                        key={key++}
                        x={x*GRID}
                        y={y*GRID}
                        wid={ncols*GRID}
                        hgt={nrows*GRID}
                        color={color}
                        idNum={id}
                        cars={this.props.cars}
                    />);
        }

        return ( 
            <div style={bStyle}>
                {list}
            </div> 
        );
    }
}

export default BoardView;