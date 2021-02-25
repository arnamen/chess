import React, { Component, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import Tile, { TileIndex } from '../../components/Tile';
import ChessPiece from '../../components/ChessPiece';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK, ChessPieceType, SelectedPiece, chessboardMakeMove } from '../../redux/reducers/chessboardReducer/types';
import { RootState } from '../../redux/index';
import Chessboard from '../../components/Chessboard';
import Spinner from '../../components/Spinner';

import { getPossibleMoves } from '../../utils/moves-logic-helper';

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
    currentPlayerTurn: 'white' | 'black',
    selectedPiece: SelectedPiece,
    possibleMoves: TileIndex[]
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
            currentPlayerTurn: 'white',
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
            let possibleMoves:TileIndex[] = [];
            if(chessboard)
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
        if(this.state.selectedPiece?.tileIndex){
        this.props.chessboardMakeMove(this.state.selectedPiece?.tileIndex, tileIndex);
        this.setState({
            selectedPiece: null,
            possibleMoves: [],
            currentPlayerTurn: this.state.currentPlayerTurn === 'white' ? 'black' : 'white'
        })
        }
    }

    render() {
        let chessboard: ReactElement = <Spinner />
        if (this.props.chessboard !== null) chessboard = <Chessboard
            chessboardData={this.props.chessboard}
            currentPlayerTurn={this.state.currentPlayerTurn}
            onSelectPiece={this.setSelectedPiece.bind(this)} 
            selectedPiece={this.state.selectedPiece}
            highlightedTiles={this.state.possibleMoves}
            onMovePiece={this.onMovePiece.bind(this)}/>;

        return (
            chessboard
        )
    }
}

export default connector(GameManager)