import React, { Component } from "react";
import Player from "./Components/Player";
import "./App.css";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import axios from "axios";

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms:0,
    },

    is_playing: "Paused",
    progress_ms: 0

    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then((res) => {
        // console.log(res)
        if (res !== undefined) {
          
          this.setState({
            item: res.data.item,
            is_playing: res.data.is_playing,
            progress_ms: res.data.progress_ms,
          });
        }
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  togglePlay(e) {
    console.log('toggling play/pause')
    e.preventDefault();
    const headers = {
      'Authorization': 'Bearer ' + this.state.token
    };
    const url = this.state.is_playing ? 'https://api.spotify.com/v1/me/player/pause': "https://api.spotify.com/v1/me/player/play";

    axios.put(url, null, {headers})
      .then((res) => {
        // console.log(res)
        this.setState({
          is_playing: !this.state.is_playing,
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          <Player
            item={this.state.item}
            is_playing={this.state.is_playing}
            progress_ms={this.state.progress_ms}
            togglePlay={this.togglePlay}
          />
        )}
        </header>
      </div>
    );
  }
}

export default App;