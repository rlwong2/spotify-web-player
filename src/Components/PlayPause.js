import React, { useState, useEffect } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import styled from "styled-components";
import "./PlayPause.css";

const Button = styled.div`
    color: white;
    height: 60px;
    width: 60px;
    font-size: 2.5em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    display: inline;
    margin: 0;
    padding: 0;
    border-radius: 30px;
    transition: all 0.25s ease;
    &:focus: {
        border: none;
    }
`

const PlayPause = props => {
    return (
        <Button onClick={(e) => props.togglePlay(e)}>
            {!props.is_playing ? (<MdPlayCircleFilled />) : (<MdPauseCircleFilled />)} 
        </Button>
    )
}

export default PlayPause;