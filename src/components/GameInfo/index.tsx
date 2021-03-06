import React, { ReactElement } from 'react'
import styled from 'styled-components';

const GameInfo = styled.div`
    display: inline-block;
    width: 20vw;
    max-width: 240px;
    height: 42vw;
    max-height: 504px;
`
interface Props {
}

export default function index({}: Props): ReactElement {
    return (
        <GameInfo>
            
        </GameInfo>
    )
}
