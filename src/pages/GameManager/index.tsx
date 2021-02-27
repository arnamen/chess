import React, { Component, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import Tile, { TileIndex } from '../../components/Tile';
import ChessPiece from '../../components/ChessPiece';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK, ChessPieceType, SelectedPiece, chessboardMakeMove } from '../../redux/reducers/chessboardReducer/types';
import { RootState } from '../../redux/index';
import Chessboard from '../../components/Chessboard';
import Spinner from '../../components/Spinner';

import { getPossibleMoves, isCheck, CheckInfo } from '../../utils/moves-logic-helper';

const mapStateToProps = (state: RootState) => ({
    chessboard: state.chessboard.chessboard,
})

const mapDispatchToProps = {
    updateChessboard, updateChessboardOneTile, createChessboard, chessboardMakeMove
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {

}
interface State {
    currentPlayerTurn: 'WHITE' | 'BLACK',
    selectedPiece: SelectedPiece,
    possibleMoves: TileIndex[],
    checkInfo: CheckInfo | null
}

//white - "+", black - "-"
//pawn - ±1 point
//knight - ±10 points
//bishop - ±10 points
//rook - ±10 points
//queen - ±100 points
//king - ±1000 points

class GameManager extends Component<Props, State> {

    componentDidMount() {
        this.props.createChessboard();
        this.setState({
            currentPlayerTurn: 'WHITE',
            selectedPiece: null,
            possibleMoves: []
        });

    }

    componentDidUpdate() {

    }

    setSelectedPiece(selectedPiece: SelectedPiece) {

        if (selectedPiece) {
            const piece = selectedPiece.piece;
            const tileIndex = selectedPiece.tileIndex;
            const chessboard = this.props.chessboard;
            let possibleMoves: TileIndex[] = [];
            if (chessboard)
                possibleMoves = getPossibleMoves(chessboard, selectedPiece)

            this.setState({
                selectedPiece: {
                    piece, tileIndex
                },
                possibleMoves
            });
        }

    }

    onMovePiece(tileIndex: TileIndex) {
        if (this.state.selectedPiece?.tileIndex && this.props.chessboard) {
            //if there is check to the king. 
            //Will return null if there is no check, else will return detailed data
            const checkInfo = isCheck(this.props.chessboard, this.state.currentPlayerTurn);
            if (checkInfo) {
                this.setState({
                    checkInfo: checkInfo
                })
            }
            else {
                this.props.chessboardMakeMove(this.state.selectedPiece?.tileIndex, tileIndex);
                this.setState({
                    selectedPiece: null,
                    possibleMoves: [],
                    currentPlayerTurn: this.state.currentPlayerTurn === 'WHITE' ? 'BLACK' : 'WHITE'
                })
            }
        }
    }

    render() {
        let chessboard: ReactElement = <Spinner />
        if (this.props.chessboard !== null) chessboard = <Chessboard
            chessboardData={this.props.chessboard} //current state of chessboard
            currentPlayerTurn={this.state.currentPlayerTurn}
            onSelectPiece={this.setSelectedPiece.bind(this)} //when player clicked on piece
            selectedPiece={this.state.selectedPiece} //Piece, selected py player
            highlightedTiles={this.state.possibleMoves} //tiles on which player able to move piece (calculated after piece is selected)
            checkInfo={this.state.checkInfo} //pass info about if there is check to the king
            onMovePiece={this.onMovePiece.bind(this)} //when player clicked on highlighted tile

        />;

        return (
            chessboard
        )
    }
}

export default connector(GameManager)