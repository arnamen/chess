import { ChessPieceType, WHITE, BLACK } from '../redux/reducers/chessboardReducer/types';

export default function createPiece(pieceType: ChessPieceType) {
    switch (pieceType.side) {
        case 'WHITE':
            switch (pieceType.type) {
                case 'PAWN': return Object.assign({}, WHITE.PAWN);
                case 'BISHOP': return Object.assign({}, WHITE.BISHOP);
                case 'KING': return Object.assign({}, WHITE.KING);
                case 'KNIGHT': return Object.assign({}, WHITE.KNIGHT);
                case 'QUEEN': return Object.assign({}, WHITE.QUEEN);
                case 'ROOK': return Object.assign({}, WHITE.ROOK);
                default: return Object.assign({}, WHITE.EMPTY);
            }
        case 'BLACK':
            switch (pieceType.type) {
                case 'PAWN': return Object.assign({}, BLACK.PAWN);
                case 'BISHOP': return Object.assign({}, BLACK.BISHOP);
                case 'KING': return Object.assign({}, BLACK.KING);
                case 'KNIGHT': return Object.assign({}, BLACK.KNIGHT);
                case 'QUEEN': return Object.assign({}, BLACK.QUEEN);
                case 'ROOK': return Object.assign({}, BLACK.ROOK);
                default: return Object.assign({}, BLACK.EMPTY);
            }
        default: return Object.assign({}, BLACK.EMPTY);
    }
}