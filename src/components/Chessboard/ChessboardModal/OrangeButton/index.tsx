import React, { ReactElement } from 'react'
import styled from 'styled-components';

const OrangeButton = styled.button`
    display: inline-block;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin-top: 20px;
    line-height: min(6vw, 55px);
    font-size: min(35px, 3.5vw);
    border: none;
    color: #fff;
    text-align: center;
    opacity: .6;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: pointer;
    background-color: #f0a830;
    font-family: teletoon;
    &:hover {
        opacity: 1;
    }
    &:focus {
        border: none;
        outline: none;
    }
`

interface Props {
    children?: React.ReactNode,
    onClick: (event: React.SyntheticEvent) => void
}

export default function index({onClick, children}: Props): ReactElement {
    return (
        <React.Fragment>
            <OrangeButton onClick={onClick}>
                {children}
            </OrangeButton>
        </React.Fragment>
    )
}
