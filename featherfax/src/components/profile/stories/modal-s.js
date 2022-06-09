import React from 'react';

const modalS = ({show, close, children}) => {
    return (
        <div className="modal">
            <div className="modal-wrapper"
                 style={{
                     transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                     opacity: show ? '1' : '0'
                 }}>
                <div className="modal-header">
                    <p>featherfax stories
                        <span className="close-modal-btn" onClick={close}>X</span></p>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default modalS;
