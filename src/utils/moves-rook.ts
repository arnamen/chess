import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_ROOK = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {

    if (!selectedPiece ||
        (selectedPiece.piece.type !== 'BISHOP' &&
            selectedPiece.piece.type !== 'QUEEN')
    ) return [];

    const possibleMoves: TileIndex[] = [];

    function getPossibleMoves_ROOK_up(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] {
        if (!selectedPiece) return [];

        const possibleMoves: TileIndex[] = [];

        let { x, y } = selectedPiece.tileIndex;
        y--; //move index so we won't check tile on which selected piece is located
        while (chessboard[y] &&
            chessboard[y][x].side !== selectedPiece.piece.side) {
            possibleMoves.push({ x, y });
            //end moves check if there is an opponent piece on tile
            if (chessboard[y][x].side !== 'NONE') return possibleMoves;
            y--;
        }

        return possibleMoves;

    }

    function getPossibleMoves_ROOK_down(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] {
        if (!selectedPiece) return [];

        const possibleMoves: TileIndex[] = [];

        let { x, y } = selectedPiece.tileIndex;
        y++;
        while (chessboard[y] &&
            chessboard[y][x].side !== selectedPiece.piece.side) {
            possibleMoves.push({ x, y });
            //end moves check if there is an opponent piece on tile
            if (chessboard[y][x].side !== 'NONE') return possibleMoves;
            y++;
        }

        return possibleMoves;

    }

    function getPossibleMoves_ROOK_left(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] {
        if (!selectedPiece) return [];

        const possibleMoves: TileIndex[] = [];

        let { x, y } = selectedPiece.tileIndex;
        x--;
        while (chessboard[y][x] &&
            chessboard[y][x].side !== selectedPiece.piece.side) {
            possibleMoves.push({ x, y });
            //end moves check if there is an opponent piece on tile
            if (chessboard[y][x].side !== 'NONE') return possibleMoves;
            x--;
        }

        return possibleMoves;

    }

    function getPossibleMoves_ROOK_right(chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] {
        if (!selectedPiece) return [];

        const possibleMoves: TileIndex[] = [];

        let { x, y } = selectedPiece.tileIndex;
        x++;
        while (chessboard[y][x] &&
            chessboard[y][x].side !== selectedPiece.piece.side) {
            possibleMoves.push({ x, y });
            //end moves check if there is an opponent piece on tile
            if (chessboard[y][x].side !== 'NONE') return possibleMoves;
            x++;
        }

        return possibleMoves;

    }

    const movesLeft = getPossibleMoves_ROOK_left(chessboard, selectedPiece);
    const movesRight = getPossibleMoves_ROOK_right(chessboard, selectedPiece);
    const movesUp = getPossibleMoves_ROOK_up(chessboard, selectedPiece);
    const movesDown = getPossibleMoves_ROOK_down(chessboard, selectedPiece);

    possibleMoves.push(...movesLeft, ...movesRight, ...movesUp, ...movesDown);
    return possibleMoves;
}
