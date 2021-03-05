import { ChessPieceType, SelectedPiece } from "../redux/reducers/chessboardReducer/types";

export const findPieceOnBoard = (chessboard: ChessPieceType[][], piece: ChessPieceType):SelectedPiece[] => {

    const mathedPieces:SelectedPiece[] = [];

    chessboard.forEach((chessboardRow, y) => chessboardRow.forEach((chessboardTile, x) => {
        if(chessboardTile.side === piece.side &&
            chessboardTile.type === piece.type) {
                mathedPieces.push({piece: chessboardTile, tileIndex: {x, y}})
            }
    }))
    
    return mathedPieces;
}