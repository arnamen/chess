import React from 'react'
import styled from 'styled-components';

import woodenBorder from '../../../assets/chessboard/borders/textures/wood-seamless.jpg';

const BorderColumnRight = styled.div`
    position: absolute;
    top: 1vw;
    right: 0;
    padding-top: 0.5vw;
    width: 1vw;
    height: calc(100% - 2vw);
    display: flex;
    flex-direction: column;
    background: URL(${woodenBorder}) center center/cover repeat;
`

export default function CheessboardBorderRight({children}: {children?: React.ReactNode}) {
    return (
        <React.Fragment>
            <BorderColumnRight>{children}</BorderColumnRight>
        </React.Fragment>
    )
}
