import React from 'react'
import styled from 'styled-components';

interface StyledTileProps {
    width?: number,
    height?: number
};

const BorderTile = styled.div<StyledTileProps>`
    width: ${props => props.width ? props.width : 5}vw;
    height: ${props => props.height ? props.height : 5}vw;
    max-width: 70px;
    max-height: 70px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    align-items: center;
    box-sizing:border-box;
    position: relative;
`;

export default function CheessboardBorderTile({children, width, height}: {children?: React.ReactNode} & StyledTileProps) {
    return (
        <React.Fragment>
            <BorderTile width={width} height={height}>{children}</BorderTile>
        </React.Fragment>
    )
}
