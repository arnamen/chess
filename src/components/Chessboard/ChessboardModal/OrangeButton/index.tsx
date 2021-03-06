import React, { ReactElement } from 'react'
import styled from 'styled-components';

const OrangeButton = styled.button`
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
