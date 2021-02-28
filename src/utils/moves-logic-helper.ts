import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export interface CheckInfo {
    kingSide: 'WHITE' | 'BLACK',
    king: SelectedPiece | null,
    threatingPiece: SelectedPiece
}
//will be verified if there check for king of corresponding side
export const isCheck = (chessboard: ChessPieceType[][], playerSide: 'WHITE' | 'BLACK'): CheckInfo | null => {
    //find king position on board
    let king: SelectedPiece | null = null;
    //function wrapper for breaking from nested loop
    king = ((): SelectedPiece => {
        for (let y = 0; y < chessboard.length; y++) {
            for (let x = 0; x < chessboard[y].length; x++) {
                const currentPiece: SelectedPiece = { piece: Object.assign(chessboard[y][x]), tileIndex: { x, y } };
                if (currentPiece.piece.side === playerSide && currentPiece.piece.type === 'KING') return Object.assign({}, currentPiece);
            }
        }
        return null;
    })()
    if (!king) throw new Error(`${playerSide} king is not on board`);

    const checkPossibleMovesThreat = (opponentPossMoves: TileIndex[], kingPos: TileIndex) => {
        for (const move of opponentPossMoves) {
            if (move.x === king?.tileIndex.x && move.y === king.tileIndex.y) return true;
        }
        return false;
    }

    //get all possible moves of each opponent figure
    // and check if there is a check for the king
    for (let y = 0; y < chessboard.length; y++) {
        for (let x = 0; x < chessboard[y].length; x++) {

            const currentPiece: SelectedPiece = { piece: Object.assign(chessboard[y][x]), tileIndex: { x, y } };
            const opponentPiecePossibleMoves = getPossibleMoves(chessboard, currentPiece);

            if (checkPossibleMovesThreat(opponentPiecePossibleMoves, king.tileIndex)) {
                const checkInfo: CheckInfo = {
                    kingSide: playerSide,
                    king,
                    threatingPiece: currentPiece
                }
                return checkInfo;
            }
        }
    }

    return null;

}

export const getPossibleMoves = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece) return [];
    let possibleMoves: TileIndex[] = [];
    switch (selectedPiece?.piece.type) {
        case 'PAWN':
            possibleMoves = getPossibleMoves_PAWN(chessboard, selectedPiece);
            break;
        case 'BISHOP':
            possibleMoves = getPossibleMoves_BISHOP(chessboard, selectedPiece);
            break;
        case 'KNIGHT':
            possibleMoves = getPossibleMoves_KNIGHT(chessboard, selectedPiece);
            break;
        default:
            break;
    }
    return possibleMoves;
}

const getPossibleMoves_PAWN = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece || selectedPiece.piece.type !== 'PAWN') return [];

    const possibleMoves: TileIndex[] = [];
    const pieceXpos = selectedPiece.tileIndex.x;
    const pieceYpos = selectedPiece.tileIndex.y;
    switch (selectedPiece.piece.side) {
        case 'WHITE':

            if (chessboard[pieceYpos - 1][pieceXpos] && chessboard[pieceYpos - 1][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos - 1 });

            if (selectedPiece.piece.isFirstMove &&
                chessboard[pieceYpos - 2][pieceXpos] &&
                chessboard[pieceYpos - 2][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos - 2 });
            //attack check
            if (chessboard[pieceYpos - 1][pieceXpos - 1] &&
                chessboard[pieceYpos - 1][pieceXpos - 1].type !== 'EMPTY' &&
                chessboard[pieceYpos - 1][pieceXpos - 1].side !== 'WHITE')
                possibleMoves.push({ x: pieceXpos - 1, y: pieceYpos - 1 });

            if (chessboard[pieceYpos - 1][pieceXpos + 1] &&
                chessboard[pieceYpos - 1][pieceXpos + 1].type !== 'EMPTY' &&
                chessboard[pieceYpos - 1][pieceXpos + 1].side !== 'WHITE')
                possibleMoves.push({ x: pieceXpos + 1, y: pieceYpos - 1 });
            break;

        case 'BLACK':

            if (chessboard[pieceYpos + 1][pieceXpos] && chessboard[pieceYpos + 1][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos + 1 });

            if (selectedPiece.piece.isFirstMove &&
                chessboard[pieceYpos + 2][pieceXpos] &&
                chessboard[pieceYpos + 2][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos + 2 });
            //attack check
            if (chessboard[pieceYpos + 1][pieceXpos - 1] &&
                chessboard[pieceYpos + 1][pieceXpos - 1].type !== 'EMPTY' &&
                chessboard[pieceYpos + 1][pieceXpos - 1].side !== 'BLACK')
                possibleMoves.push({ x: pieceXpos - 1, y: pieceYpos + 1 });

            if (chessboard[pieceYpos + 1][pieceXpos + 1] &&
                chessboard[pieceYpos + 1][pieceXpos + 1].type !== 'EMPTY' &&
                chessboard[pieceYpos + 1][pieceXpos + 1].side !== 'BLACK')
                possibleMoves.push({ x: pieceXpos + 1, y: pieceYpos + 1 });
            break;
        default:
            break;
    }
    return possibleMoves;
}

const getPossibleMoves_BISHOP = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece || selectedPiece.piece.type !== 'BISHOP') return [];

    const possibleMoves: TileIndex[] = [];

    //to the upper left
    function getPossibleMoves_BISHOP_upperLeft(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece) {

        const possibleMoves: TileIndex[] = [];

        if (selectedPiece) {
            let { x, y } = selectedPiece.tileIndex;
            const piece = Object.assign({}, selectedPiece.piece);
            while (x >= 0 && y >= 0) {
                //skip first iteration
                //because it is tile with current figure on it
                if (x === selectedPiece.tileIndex.x &&
                    y === selectedPiece.tileIndex.y) {
                    x--; y--;
                    continue
                };

                if (chessboard[y][x].type === 'EMPTY') {
                    possibleMoves.push({ x, y });
                    x--; y--;
                } else if (
                    (chessboard[y][x].side === 'BLACK' && piece.side === 'WHITE') ||
                    (chessboard[y][x].side === 'WHITE' && piece.side === 'BLACK')) {
                    possibleMoves.push({ x, y });
                    return possibleMoves;
                }
                else if (chessboard[y][x].side === piece.side) {
                    return possibleMoves;
                }
            }
            return possibleMoves;
        }
    }

    function getPossibleMoves_BISHOP_upperRight(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece) {

        const possibleMoves: TileIndex[] = [];


        if (selectedPiece) {
            let { x, y } = selectedPiece.tileIndex;
            const piece = Object.assign({}, selectedPiece.piece);
            while (x < 8 && y >= 0) {
                //skip first iteration
                //because it is tile with current figure on it
                if (x === selectedPiece.tileIndex.x && y === selectedPiece.tileIndex.y) { 
                    x++; y--; 
                    continue 
                };

                if (chessboard[y][x].type === 'EMPTY') {
                    possibleMoves.push({ x, y });
                    x++; y--;
                } else if (
                    (chessboard[y][x].side === 'BLACK' && piece.side === 'WHITE') ||
                    (chessboard[y][x].side === 'WHITE' && piece.side === 'BLACK')) {
                    possibleMoves.push({ x, y });
                    return possibleMoves;
                }
                else if (chessboard[y][x].side === piece.side) {
                    return possibleMoves;
                }
            }
            return possibleMoves;
        }
    }

    function getPossibleMoves_BISHOP_lowerLeft(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece) {

        const possibleMoves: TileIndex[] = [];

        if (selectedPiece) {
            let { x, y } = selectedPiece.tileIndex;
            const piece = Object.assign({}, selectedPiece.piece);
            while (x >= 0 && y < 8) {

                //skip first iteration
                //because it is tile with current figure on it
                if (x === selectedPiece.tileIndex.x && y === selectedPiece.tileIndex.y) { 
                    x--; y++; 
                    continue; 
                };

                if (chessboard[y][x].type === 'EMPTY') {
                    possibleMoves.push({ x, y });
                    x--; y++;
                } else if (
                    (chessboard[y][x].side === 'BLACK' && piece.side === 'WHITE') ||
                    (chessboard[y][x].side === 'WHITE' && piece.side === 'BLACK')) {
                    possibleMoves.push({ x, y });
                    return possibleMoves;
                }
                else if (chessboard[y][x].side === piece.side) {
                    return possibleMoves;
                }
            }
            return possibleMoves;
        }
    }

    function getPossibleMoves_BISHOP_lowerRight(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece) {

        const possibleMoves: TileIndex[] = [];

        if (selectedPiece) {
            let { x, y } = selectedPiece.tileIndex;
            const piece = Object.assign({}, selectedPiece.piece);
            while (x < 8 && y < 8) {

                //skip first iteration
                //because it is tile with current figure on it
                if (x === selectedPiece.tileIndex.x && y === selectedPiece.tileIndex.y) { 
                    x++; y++; 
                    continue;
                 };

                if (chessboard[y][x].type === 'EMPTY') {
                    possibleMoves.push({ x, y });
                    x++; y++;
                } else if (
                    (chessboard[y][x].side === 'BLACK' && piece.side === 'WHITE') ||
                    (chessboard[y][x].side === 'WHITE' && piece.side === 'BLACK')) {
                    possibleMoves.push({ x, y });
                    return possibleMoves;
                }
                else if (chessboard[y][x].side === piece.side) {
                    return possibleMoves;
                }
            }
            return possibleMoves;
        }
    }

    const movesUpperLeft = getPossibleMoves_BISHOP_upperLeft(chessboard, selectedPiece);
    const movesUpperRight = getPossibleMoves_BISHOP_upperRight(chessboard, selectedPiece);
    const movesLowerLeft = getPossibleMoves_BISHOP_lowerLeft(chessboard, selectedPiece);
    const movesLowerRight = getPossibleMoves_BISHOP_lowerRight(chessboard, selectedPiece);

    if (movesUpperLeft) possibleMoves.push(...movesUpperLeft)
    if (movesUpperRight) possibleMoves.push(...movesUpperRight)
    if (movesLowerLeft) possibleMoves.push(...movesLowerLeft)
    if (movesLowerRight) possibleMoves.push(...movesLowerRight)

    console.log(possibleMoves)

    return possibleMoves;
}

const getPossibleMoves_KNIGHT = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {

    if (!selectedPiece || selectedPiece.piece.type !== 'KNIGHT') return [];

    const possibleMoves: TileIndex[] = [];
    const { x, y } = selectedPiece.tileIndex;
    //up
    if (chessboard[y - 2] &&
        chessboard[y - 2][x - 1] &&
        chessboard[y - 2][x - 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 2, x: x - 1 });
    }

    if (chessboard[y - 2] &&
        chessboard[y - 2][x + 1] &&
        chessboard[y - 2][x + 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 2, x: x + 1 });
    }
    //down
    if (chessboard[y + 2] &&
        chessboard[y + 2][x - 1] &&
        chessboard[y + 2][x - 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 2, x: x - 1 });
    }

    if (chessboard[y + 2] &&
        chessboard[y + 2][x + 1] &&
        chessboard[y + 2][x + 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 2, x: x + 1 });
    }
    //left
    if (chessboard[y + 1] &&
        chessboard[y + 1][x - 2] &&
        chessboard[y + 1][x - 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 1, x: x - 2 });
    }

    if (chessboard[y - 1] &&
        chessboard[y - 1][x - 2] &&
        chessboard[y - 1][x - 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 1, x: x - 2 });
    }
    //right
    if (chessboard[y + 1] &&
        chessboard[y + 1][x + 2] &&
        chessboard[y + 1][x + 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 1, x: x + 2 });
    }

    if (chessboard[y - 1] &&
        chessboard[y - 1][x + 2] &&
        chessboard[y - 1][x + 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 1, x: x + 2 });
    }

    return possibleMoves;
}