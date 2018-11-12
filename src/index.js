import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import SplashArts from "./SplashArts";
import { HashRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Champions extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      currentVersion: "",
      championList: {}
    };
  }

  handleSearch(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    var url = "https://ddragon.leagueoflegends.com/api/versions.json";

    var result = fetch(url, {
      method: "get"
    })
      .then(blob => {
        return blob.json(); // pass the data as promise to next then block
      })
      .then(data => {
        var latestVer = data[0];
        this.setState({ currentVersion: data[0] });

        return fetch(
          `http://ddragon.leagueoflegends.com/cdn/${latestVer}/data/en_US/champion.json`
        ); // make a 2nd request and return a promise
      })
      .then(blob => {
        return blob.json();
      })
      .catch(error => {
        console.log("Request failed", error);
      });

    result.then(data => {
      this.setState({ championList: data.data }); // 2nd request result
    });
  }

  render() {
    const championNames = Object.keys(this.state.championList);

    let filteredChampions = championNames.filter(champion => {
      return (
        champion.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    let champions = filteredChampions.map((champion, index) => {
      return (
        <li className="champions__item" key={index}>
          <Champion name={champion} version={this.state.currentVersion} />
        </li>
      );
    });

    return (
      <div className="page">
        <div>
          <input
            type="text"
            value={this.state.search}
            onChange={this.handleSearch.bind(this)}
            placeholder="Enter champion name"
          />
        </div>
        <ul className="champions">{champions}</ul>
      </div>
    );
  }
}

const Champion = ({ name, version }) => {
  return (
    <div className="champion">
      <Link
        to={{
          pathname: "/splashArts",
          state: {
            name: name,
            curVersion: version
          }
        }}
      >
        <button type="button" className="button">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`}
            alt={name}
          />
        </button>
      </Link>
      <p className="champion__name">{name}</p>
    </div>
  );
};

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Champions} />
      <Route path="/splashArts" component={SplashArts} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
registerServiceWorker();
