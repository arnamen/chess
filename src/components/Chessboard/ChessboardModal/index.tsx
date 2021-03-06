import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
`

const Modal = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

export default function ChessboardModal({children}: {children?: React.ReactNode}): ReactElement {
    //hide modal if there is nothing to show
    if(React.Children.toArray(children).length === 0) return <React.Fragment/>
    return (
        <ModalBackdrop>
            <Modal>
                {children}
            </Modal>
        </ModalBackdrop>
    )
}
