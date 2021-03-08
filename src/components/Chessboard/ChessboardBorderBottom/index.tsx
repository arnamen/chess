import React from 'react'
import styled from 'styled-components';

import woodenBorder from '../../../assets/chessboard/borders/textures/wood-seamless.jpg';

const BorderRowBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 1vw;
    height: 1vw;
    width: calc(100% - 2vw);
    min-width: 15px;
    min-height: 15px;
    display: flex;
    justify-content: center;
    background: URL(${woodenBorder}) center center/cover repeat;
`

export default function CheessboardBorderBottom({children}: {children?: React.ReactNode}) {
    return (
        <React.Fragment>
            <BorderRowBottom>{children}</BorderRowBottom>
        </React.Fragment>
    )
}
