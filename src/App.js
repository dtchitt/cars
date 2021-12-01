import { Component } from "react";
import BoardView from "./components/BoardView.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.onBoardUpdate = this.onBoardUpdate.bind(this);
        props.cars.setRedrawCallback(this.onBoardUpdate);
    }

    onBoardUpdate(counter) {
        this.setState({counter: counter});
    }

    render() {
        const data = {
            counter: this.state.counter,
            cars: this.props.cars
        };

        return ( <BoardView {...data} /> );
    }
}

export default App;