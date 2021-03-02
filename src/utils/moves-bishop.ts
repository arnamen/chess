import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_BISHOP = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece ||
        (selectedPiece.piece.type !== 'BISHOP' &&
            selectedPiece.piece.type !== 'QUEEN')
    ) return [];

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

    return possibleMoves;
}