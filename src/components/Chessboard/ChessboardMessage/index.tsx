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
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    max-width: 80%;
    max-height: 50%;
    overflow-y: auto;
    background-color: white;
    border: black;
    text-align: center;
`

const Message = styled.span`
    font-size: 20px;
    padding: 0 5px;
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
