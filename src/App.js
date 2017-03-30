import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  tick = () => {
    this.setState({ date: new Date() });
  }
  
  componentDidMount() {
    this.timerMethod = setInterval(
      () => this.tick(),
    1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerMethod);
  }

  render() {
    return (
      <div>
        <p>Hello, world!</p>
        <h2>It is { this.state.date.toLocaleTimeString() }.</h2>
      </div>
    );
  }
};

ReactDOM.render(
  <Clock />,
  document.getElementById("reactid2")
);


function LoginButton(props) {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.loggedIn ? "Logout":"Login"}
      </button>
      <h1>{props.loggedIn ? "Welcome Back!": "Please Sign Up you asshole"}</h1>
    </div>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,

    }
    //this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  handleLoginClick = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  render() {
    return (
      <div>
        <LoginButton loggedIn={this.state.isLoggedIn} onClick={this.handleLoginClick} />
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl isLoggedIn={false}/>,
  document.getElementById("loginid")
);




class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log(this.state);
    console.log(target);
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input name="isGoing" type="checkbox"
            checked={this.state.isGoing} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input name="numberOfGuests" type="number"
            value={this.state.numberOfGuests} onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById("form2-id")
);




/*
TableApp
 |___ Filters
 |___ TableContainer
      |___Table
      |___Table
*/
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Tennis Balls'},
  {category: 'Sporting Goods', price: '$19.99', stocked: true, name: 'Soccer Ball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'Nexus 8'},
  {category: 'Electronics', price: '$499.99', stocked: true, name: 'Nexus 9'},
  {category: 'Electronics', price: '$599.99', stocked: false, name: 'Galaxy Note 7'}
];
class Table extends React.Component {

  filterProduct = () => {
    const checkboxValue = this.props.checkboxValue;
    var products = this.props.products.filter(product => product.category === this.props.category);
    if(checkboxValue) {
      products = products.filter(product => product.stocked === checkboxValue);
    }
    return products;
  }
  renderTable = (products) => { return products.map(product => 
      <tr key={product.name} style={{color: (product.stocked ? "black" : "red")}}>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>);
  }

  render() {
    const category = this.props.category;
    const filteredProducts = this.filterProduct(category);

    return (
        <table>
          <tbody>
            <tr><td><b>{category}</b></td></tr>
            {this.renderTable(filteredProducts)}
          </tbody>
        </table>
    );
  }
}

class TableContainer extends React.Component {
  render() {

    const checkboxValue = this.props.checkboxValue;

    return (
      <div>
        <Table category="Electronics" products={PRODUCTS} checkboxValue={checkboxValue}/>
        <Table category="Sporting Goods" products={PRODUCTS} checkboxValue={checkboxValue}/>
      </div>
    );
  }
}
class Filters extends React.Component {

  filterEvent = (event) => {
    const checkboxValue = event.target.checked;
    this.props.sendCheckToParent(checkboxValue);
  }

  render() {
    return (
      <form>
        <label>Available</label>
        <input type="checkbox" onChange={this.filterEvent} />
      </form>
    );
  }
}
class TableApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  // callback function from Filter component
  getCheckFromParent = (checkboxValue) => {
    this.setState({
      checked: checkboxValue
    });
  }

  render() {
    const checkboxValue = this.state.checked;

    return (
      <div>
        <Filters sendCheckToParent={this.getCheckFromParent} />
        <TableContainer checkboxValue={checkboxValue} />
      </div>
    );
  }
}

ReactDOM.render(
  <TableApp />,
  document.getElementById('table-id')
);

// in parent component
//    define callback function (callBack(varFromParent))
//    define prop in child component ex. callbackFromParent = {this.callBack}
// in child component
//    define callback with event
//    this.props.callbackFromParent(variable to pass to parent)


Clock.propTypes = {
  txt: React.PropTypes.string.isRequired
};
Clock.defaultProps = {
  txt: "this is the default text"
};

