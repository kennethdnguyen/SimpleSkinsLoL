import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class SplashArts extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      curVersion: "",
      skinArr: []
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.location.state.name,
      curVersion: this.props.location.state.curVersion
    });
  }

  render() {
    const championURL = `http://ddragon.leagueoflegends.com/cdn/${
      this.state.curVersion
    }/data/en_US/champion/${this.state.name}.json`;

    /*
        TEMPORARY WORK AROUND USING eval(), this can be dangerous
        The string that eval() is used on is accessing the json data of the particular champion

   */
    if (this.state.name && this.state.curVersion) {
      fetch(championURL)
        .then(blob => blob.json())
        .then(data =>
          this.setState({ skinArr: eval(`data.data.${this.state.name}.skins`) })
        );
    }

    const numOfSkins = [];
    for (let x = 0; x < this.state.skinArr.length; x++) {
      numOfSkins.push(this.state.skinArr[x].num);
    }
    console.log(numOfSkins);

    return (
      <div className="page">
        <Link to="/">
          <button type="button" className="btn btn-primary">
            Back
          </button>
        </Link>
        <ul className="champions">
          {numOfSkins.map((num, index) => (
            <li className="champions__item" key={index}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                  this.state.name
                }_${num}.jpg`}
                alt={this.state.name}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SplashArts;
