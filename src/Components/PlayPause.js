import React, { useState, useEffect } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import styled from "styled-components";

const Button = styled.button`
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

const PlayPause = props => {
    const [ is_playing, setPlay ] = useState(false);
    
    useEffect(() => {
        setPlay(props.is_playing);
    });

    return (
        <Button onClick={(e) => props.togglePlay(e)}>
            {!is_playing ? (<MdPlayCircleFilled />) : (<MdPauseCircleFilled />)} 
        </Button>
    )
}

export default PlayPause;