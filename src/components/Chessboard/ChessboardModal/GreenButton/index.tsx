import React, { ReactElement } from 'react'
import styled from 'styled-components';

const GreenButton = styled.button`
    display: inline-block;
    height: fit-content;
    margin-top: 20px;
    line-height: 7vh;
    font-size: 4vh;
    border: none;
    color: #fff;
    text-align: center;
    opacity: .6;
    transition: .3s;
    text-decoration: none;
    cursor: pointer;
    background-color: #0f0;
    font-family: teletoon;
    min-width: 150px;
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
            <GreenButton onClick={onClick}>
                {children}
            </GreenButton>
        </React.Fragment>
    )
}
