import React, { ReactElement } from 'react'
import { v4 } from 'uuid';
import styled from 'styled-components';

import Tile, { TileIndex } from '../Tile';
import { ChessPieceType, SelectedPiece } from '../../redux/reducers/chessboardReducer/types';

import { CheckInfo } from '../../utils/moves-logic-helper';

import woodenBorder from '../../assets/chessboard/borders/textures/wood-seamless.jpg';

import classes from './Chessboard.module.css';

interface StyledTileProps {
    width?: number,
    height?: number
};

interface StyledBorderCornerProps {
    topLeft?: boolean,
    topRight?: boolean,
    bottomLeft?: boolean,
    bottomRight?: boolean,
};

const BorderTile = styled.div<StyledTileProps>`
    background: URL(${woodenBorder}) center center/cover no-repeat;
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

const BorderCorner = styled.div<StyledBorderCornerProps>`
    position: absolute;
    top: ${props => props.topLeft || props.topRight ? 0 : 'auto'}px;
    bottom: ${props => props.bottomLeft || props.bottomRight ? 0 : 'auto'}px;
    left: ${props => props.topLeft || props.bottomLeft ? 0 : 'auto'}px;
    right: ${props => props.topRight || props.bottomRight ? 0 : 'auto'}px;
    background: URL(${woodenBorder}) center center/cover no-repeat;
    width: 1vw;
    height: 1vw;
    max-width: 70px;
    max-height: 70px;
    box-sizing:border-box;
`;

const BorderRowTop = styled.div`
    position: absolute;
    top: 0;
    left: 1vw;
    width: calc(100% - 10vw);
    display: grid;
    grid-template-columns: repeat(8, 1fr);
`

const BorderRowBottom = styled.div`
position: absolute;
bottom: 0;
left: 1vw;
width: calc(100% - 10vw);
display: grid;
grid-template-columns: repeat(8, 1fr);
`

const BorderColumnLeft = styled.div`
    position: absolute;
    top: 1vw;
    left: 0;
    height: calc(100% - 10vw);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
`

const BorderColumnRight = styled.div`
    position: absolute;
    top: 1vw;
    right: 0;
    height: calc(100% - 10vw);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
`
interface Props {
    chessboardData: ChessPieceType[][],
    currentPlayerTurn: 'WHITE' | 'BLACK',
    highlightedTiles?: TileIndex[],
    selectedPiece?: SelectedPiece,
    onSelectPiece: (selectedPiece: SelectedPiece) => void,
    onMovePiece: (tileIndex: TileIndex) => void,
    checkInfo: CheckInfo | null

}

export default function Chessboard({ chessboardData, currentPlayerTurn, onSelectPiece, highlightedTiles, selectedPiece, onMovePiece, checkInfo }: Props): ReactElement {

    const borderLeft: any[] = [];
    const borderRight: any[] = [];
    const borderTop: any[] = [];
    const borderBottom: any[] = [];
    const letters = 'abcdefgh';
    for (let i = 0; i < 8; i++) {
        borderLeft.push(<BorderTile width={1} key={i}><span>{i}</span></BorderTile>);
        borderRight.push(<BorderTile width={1} key={i}/>);
        borderTop.push(<BorderTile height={1} key={i} />);
        borderBottom.push(<BorderTile height={1} key={i}><span>{letters.substr(i, 1)}</span></BorderTile>);
    }

    return (
        <div className={classes.Chessboard}>

            <BorderRowTop>{borderTop}</BorderRowTop>
            <BorderColumnLeft>{borderLeft}</BorderColumnLeft>
            <BorderColumnRight>{borderRight}</BorderColumnRight>
            <BorderRowBottom>{borderBottom}</BorderRowBottom>
            <BorderCorner topLeft/>
            <BorderCorner topRight/>
            <BorderCorner bottomLeft/>
            <BorderCorner bottomRight/>
            {chessboardData.map((chessboardLine, y) => {

                return chessboardLine.map((piece, x) => {

                    return <Tile
                        tileIndex={{ x, y }}
                        chessPieceType={piece}
                        isActive={currentPlayerTurn === piece.side}
                        isHighlighted={!!highlightedTiles?.find(highlightedTile => highlightedTile.x === x && highlightedTile.y === y)}
                        isSelected={selectedPiece?.tileIndex.x === x && selectedPiece.tileIndex.y === y}
                        isImportant={checkInfo?.king?.tileIndex.y === y && checkInfo?.king?.tileIndex.x === x}
                        isDanger={checkInfo?.threatingPiece?.tileIndex.y === y && checkInfo?.threatingPiece?.tileIndex.x === x}
                        onSelectPiece={onSelectPiece}
                        onMovePiece={onMovePiece}
                        key={`${y * 8 + x}_${piece.side}_${piece.type}`}
                    />
                })
            })}
        </div>
    )
}
