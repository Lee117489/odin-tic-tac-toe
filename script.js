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
        

    return {setCell, getCell, reset, board};

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

    const setResultMessage = (winner) => {
        if (winner == 'draw') setMessageElement(`It's a tie`);
        else setMessageElement(`Player ${winner} wins!`);
    }


    return {setMessageElement, setResultMessage};
    

})();


const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let gameOver = false;

    const playRound = (cellNumber) => {
        if (gameOver || gameBoard.getCell(cellNumber) !== '') return;
        gameBoard.setCell(cellNumber, getCurrentPlayerSign());
        if (checkWinner(parseInt(cellNumber))) {
            gameOver = true;
            displayController.setResultMessage(getCurrentPlayerSign());
            return;
        }
        if (round === 9) {
            gameOver = true;
            displayController.setResultMessage('draw');
            return;
        }
        round++;
        displayController.setMessageElement(`Player ${getCurrentPlayerSign()} turn`);
    };

    const getCurrentPlayerSign = () => round % 2 === 0 ? playerO.getSign() : playerX.getSign();

    const checkWinner = (cellNumber) => {
        const luckyNumbers = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        return luckyNumbers
            .filter((combination) => combination.includes(cellNumber))
            .some((possibleCombination) => possibleCombination.every((index) => gameBoard.getCell(index) === getCurrentPlayerSign()));
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return {playRound, reset};

    

})();