import React, {Component} from 'react';

class YouWon extends Component{
    render() {
        const myStyle = {
            width: 'fit-content',
            padding: 10,
            background: '#e1f5fe',
            borderWidth: 2,
            borderColor: '#29b6f6',
            borderStyle: 'solid',
            position: 'absolute',
            top: this.props.cy / 1.5,
            left: this.props.cx / 2.2,
        };

        return ( 
            <div style = {myStyle}>
                <p>
                You Won!<br></br>
                Moves Taken: {this.props.cars.getNumMoves()}<br></br>
                Highscore: {this.props.cars.getBestNumMoves()}
                </p>
            </div>
        );
    }
}

export default YouWon