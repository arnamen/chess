import React from 'react'
import styled from 'styled-components';

import woodenBorder from '../../../assets/chessboard/borders/textures/wood-seamless.jpg';

interface StyledBorderCornerProps {
    topLeft?: boolean,
    topRight?: boolean,
    bottomLeft?: boolean,
    bottomRight?: boolean,
};

const BorderCorner = styled.div<StyledBorderCornerProps>`
    position: absolute;
    top: ${props => props.topLeft || props.topRight ? '0px' : 'auto'};
    bottom: ${props => props.bottomLeft || props.bottomRight ? '0px' : 'auto'};
    left: ${props => props.topLeft || props.bottomLeft ? '0px' : 'auto'};
    right: ${props => props.topRight || props.bottomRight ? '0px' : 'auto'};
    background: URL(${woodenBorder}) center center/cover no-repeat;
    width: 1vw;
    height: 1vw;
    min-height: 15px;
    min-width: 15px;
    max-width: 70px;
    max-height: 70px;
    box-sizing:border-box;
`;

export default function CheessboardCorner({children, topLeft, topRight, bottomLeft, bottomRight}: {children?: React.ReactNode} & StyledBorderCornerProps) {
    return (
        <React.Fragment>
            <BorderCorner topLeft={topLeft} 
            topRight={topRight} 
            bottomLeft={bottomLeft} 
            bottomRight={bottomRight}>{children}</BorderCorner>
        </React.Fragment>
    )
}
