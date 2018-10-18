var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
import Todo from './Todo';

class App extends React.Component {
    render(){
        return(
           <Todo />
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)