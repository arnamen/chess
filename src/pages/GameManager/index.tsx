import React, { Component, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { v4 } from 'uuid';

import Tile, { TileIndex } from '../../components/Tile';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK, ChessPieceType, SelectedPiece, chessboardMakeMove } from '../../redux/reducers/chessboardReducer/types';
import { makeTempMove } from '../../utils/moves-test-move';
import { RootState } from '../../redux/index';
import Chessboard from '../../components/Chessboard';
import Spinner from '../../components/Spinner';
import OrangeButton from '../../components/Chessboard/ChessboardModal/OrangeButton';

import { findPieceOnBoard } from '../../utils/find-piece-on-board';
import { getPossibleMoves } from '../../utils/moves-logic-helper';
import { isCheck, CheckInfo, isCheckmate } from '../../utils/checkmate-helper';
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
    checkInfo: CheckInfo | null,
    message?: string;
}

//white - "+", black - "-"
//pawn - ±1 point
//knight - ±10 points
//bishop - ±10 points
//rook - ±10 points
//queen - ±100 points
//king - ±1000 points

class GameManager extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currentPlayerTurn: 'WHITE',
            selectedPiece: null,
            possibleMoves: [],
            checkInfo: null,
        };
    }

    componentDidMount() {
        this.props.createChessboard();
    }

    componentDidUpdate() {
        // console.log('player side: ' + this.state.currentPlayerTurn);
        let checkmateInfo = null;
        if (this.props.chessboard) {
            const enemyKing = this.state.currentPlayerTurn === 'WHITE' ? WHITE.KING : BLACK.KING;
            const [enemyKingData] = findPieceOnBoard(this.props.chessboard, enemyKing);
            checkmateInfo = isCheckmate(this.props.chessboard, enemyKingData);
            if (checkmateInfo) console.log(checkmateInfo)
        }

    }

    setSelectedPiece(selectedPiece: SelectedPiece) {

        if (selectedPiece) {
            const piece = selectedPiece.piece;
            const tileIndex = selectedPiece.tileIndex;
            const chessboard = this.props.chessboard;
            let possibleMoves: TileIndex[] = [];
            if (chessboard)
                possibleMoves = getPossibleMoves(chessboard, selectedPiece, this.state.currentPlayerTurn)

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
                const tempChessboard = makeTempMove(this.props.chessboard, this.state.selectedPiece?.tileIndex, tileIndex);
                //check if check remains after palyer makes move
                const tempCheckInfo = isCheck(tempChessboard, this.state.currentPlayerTurn);
                //if check remains notify player about check
                if (tempCheckInfo !== null) {
                    this.setState({
                        checkInfo: checkInfo
                    })
                    return;
                }
            }
            this.props.chessboardMakeMove(this.state.selectedPiece?.tileIndex, tileIndex);
            this.setState({
                selectedPiece: null,
                possibleMoves: [],
                currentPlayerTurn: this.state.currentPlayerTurn === 'WHITE' ? 'BLACK' : 'WHITE',
                checkInfo: null
            })

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
            onMovePiece={this.onMovePiece.bind(this)}
            message={this.state.message}
            onClearMessage={() => this.setState({message: undefined})}>
            <OrangeButton onClick={() => { }}>
                <span>Player VS Player</span>
             </OrangeButton>
             <OrangeButton onClick={() => this.setState({message: 'This mode currently unavailable'})}>
                <span>Player VS AI</span>
             </OrangeButton>
        </Chessboard>;

        return (
            chessboard
        )
    }
}

export default connector(GameManager)