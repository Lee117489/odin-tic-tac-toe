const Player = (sign) => {
    const getSign = () => sign;
    
    return {getSign};
};


const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    const setCell = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getCell = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        };
    };
        

    return {setCell, getCell, reset};

})();

const displayController = (() => {
    const cellElements = document.querySelectorAll('.cell');
    const messageElement = document.querySelector('.message');
    const restartButton = document.querySelector('#restart');

    cellElements.forEach((field) => {
        field.addEventListener('click', (e) => {
            gameController.playRound(e.target.dataset.index);
            updateGameBoard();
        });
    });

    restartButton.addEventListener('click', () => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
        setMessageElement("Player X turn");
    })

    const updateGameBoard = () => {
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].textContent = gameBoard.getCell(i);
        }
    }

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }


    return {setMessageElement};
    

})();


const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let gameOver = false;

    const playRound = (cellNumber) => {
        gameBoard.setCell(cellNumber, getCurrentPlayerSign());
        round++;
        displayController.setMessageElement(`Player ${getCurrentPlayerSign()} turn`);
    };

    const getCurrentPlayerSign = () => round % 2 === 0 ? playerO.getSign() : playerX.getSign();

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return {playRound, reset};

    

})();