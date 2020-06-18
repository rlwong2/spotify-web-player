import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import styled from "styled-components";

import "./Player.css";

const Player = props => {
  const backgroundStyles = {
    backgroundImage:`url(${props.item.album.images[0].url})`,
  };
  
  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  const PlayPause = styled.button`
    color: white;
    font-size: 2.5em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    display: inline;
    margin: 0;
    padding: 0;
    &:hover {
      color: #333333;
    }
  `
  
  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} alt="Album Art" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
              {!props.is_playing && (<PlayPause><MdPauseCircleFilled /></PlayPause>)}
              {props.is_playing && (<PlayPause><MdPlayCircleFilled /></PlayPause>)}
          </div>
          <div className="progress">
            <div
              className="progress__bar"
              style={progressBarStyles}
            />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}
export default Player;