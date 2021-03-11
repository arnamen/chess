import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_KING = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {

    if (!selectedPiece || selectedPiece.piece.type !== 'KING') return [];

    const possibleMoves: TileIndex[] = [];
    const { x, y } = selectedPiece.tileIndex;

    if (chessboard[y - 1] &&
        chessboard[y - 1][x].side !== selectedPiece.piece.side)
        possibleMoves.push({ x, y: y - 1 })

    if (chessboard[y - 1] &&
        chessboard[y - 1][x - 1] &&
        chessboard[y - 1][x - 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x - 1, y: y - 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x - 1] &&
        chessboard[y + 1][x - 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x - 1, y: y + 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x].side !== selectedPiece.piece.side)
        possibleMoves.push({ x, y: y + 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x + 1] &&
        chessboard[y + 1][x + 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x + 1, y: y + 1 })

    if (chessboard[y][x + 1] &&
        chessboard[y][x + 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ x: x + 1, y });
        //castling check
        const castlingMove = ((x: number, y: number) => {
            for (let i = x; i < 8; i++) {
                console.log(i, chessboard[y][i])
                if (chessboard[y][i].side === 'NONE') continue;
                if (chessboard[y][i].type !== 'ROOK') return;
                if (chessboard[y][i].side !== selectedPiece.piece.side) return;
                if (chessboard[y][i].side === selectedPiece.piece.side &&
                    chessboard[y][i].type === 'ROOK' &&
                    chessboard[y][i].isFirstMove &&
                    chessboard[selectedPiece.tileIndex.y][selectedPiece.tileIndex.x].isFirstMove) return { x: i, y };
                    
            }
        })(x + 1, y)

        if (castlingMove) possibleMoves.push(castlingMove);

    }

    if (chessboard[y][x - 1] &&
        chessboard[y][x - 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ x: x - 1, y });
        //castling check
        const castlingMove = ((x: number, y: number) => {
            for (let i = x; i >= 0; i--) {
                if (chessboard[y][i].side === 'NONE') continue;
                if (chessboard[y][i].type !== 'ROOK') return;
                if (chessboard[y][i].side !== selectedPiece.piece.side) return;
                if (chessboard[y][i].side === selectedPiece.piece.side &&
                    chessboard[y][i].type === 'ROOK' &&
                    chessboard[y][i].isFirstMove &&
                    chessboard[selectedPiece.tileIndex.y][selectedPiece.tileIndex.x].isFirstMove) return { x: i, y };
                    
            }
        })(x - 1, y)

        if (castlingMove) possibleMoves.push(castlingMove);
        //
    }

    if (chessboard[y - 1] &&
        chessboard[y - 1][x + 1] &&
        chessboard[y - 1][x + 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x + 1, y: y - 1 })
    return possibleMoves;

}