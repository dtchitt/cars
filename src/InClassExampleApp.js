import { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.bumpCount = this.bumpCount.bind(this);
    }

    bumpCount() {
        let next = this.state.counter + 1;
        this.setState({counter:next});
    }

    render() {
        return(
            <div>
                <div onClick={this.bumpCount}>Click Me</div>
                <p>Count is {this.state.counter}</p>
            </div>
        )
    }
}

export default App;