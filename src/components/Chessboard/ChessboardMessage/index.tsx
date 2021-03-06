import React, { ReactElement } from 'react'
import styled from 'styled-components';

import GreenButton from '../ChessboardModal/GreenButton';

import '../animations.css';

const MessageBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
    z-index: 999;
`

const MessageBox = styled.div`
    padding-top: 15px;
    fonst-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 300px;
    max-height: 50%;
    overflow: auto;
    background-color: white;
    border: black;
    text-align: center;
`

const Message = styled.span`
    font-size: 20px;
`

interface Props {
    message?: string,
    className?: string[],
    onClose: () => any
}



export default function ChessboardMessage({ message, onClose, className }: Props): ReactElement {
    return (
        <MessageBackdrop>
            <MessageBox className={className?.join(' ')}>
                <Message>{message}</Message>
                <GreenButton onClick={onClose}><span>OK</span></GreenButton>
            </MessageBox>
        </MessageBackdrop>
    )
}
