import React from 'react'
import styled from 'styled-components';

interface StyledTileProps {
    width?: number,
    height?: number
};

const BorderTile = styled.div<StyledTileProps>`
    width: ${props => props.width ? '90%' : '5vw'};
    height: ${props => props.height ? '90%' : '5vw'};
    max-width: 70px;
    max-height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    align-items: center;
    box-sizing:border-box;
    position: relative;
    @media (max-width: 650px) {
        width: ${props => props.width ? '90%' : '6.25vh'};
        height: ${props => props.height ? '90%' : '6.25vh'};
        max-width: 11.25vw;
        max-height: 11.25vw;
    }
`;

export default function CheessboardBorderTile({children, width, height}: {children?: React.ReactNode} & StyledTileProps) {
    return (
        <React.Fragment>
            <BorderTile width={width} height={height}>{children}</BorderTile>
        </React.Fragment>
    )
}
