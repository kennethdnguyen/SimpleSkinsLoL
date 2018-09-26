import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class SplashArts extends Component {
  render() {
    const { skinArr, names } = this.props.location.state;

    return (
      <div className="page">
        <Link to="/">
          <button type="button" className="btn btn-primary">
            Back
          </button>
        </Link>
        <ul className="champions">
          {skinArr.map((num, index) => (
            <li className="champions__item" key={index}>
              <img
                src={require(`./skinLoading/${names}_${num}.jpg`)}
                alt={names}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SplashArts;
