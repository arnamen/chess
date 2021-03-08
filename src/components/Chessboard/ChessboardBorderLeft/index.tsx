import React from 'react'
import styled from 'styled-components';

import woodenBorder from '../../../assets/chessboard/borders/textures/wood-seamless.jpg';

const BorderColumnLeft = styled.div`
    position: absolute;
    top: max(1vw , 15px);
    left: 0;
    padding-top: 0.5vw;
    width: 1vw;
    height: calc(100% - 2vw);
    min-width: 15px;
    min-height: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: URL(${woodenBorder}) center center/cover repeat;
    @media {
        padding-top: 1vw;
    }
`

export default function CheessboardBorderLeft({children}: {children?: React.ReactNode}) {
    return (
        <React.Fragment>
            <BorderColumnLeft>{children}</BorderColumnLeft>
        </React.Fragment>
    )
}
