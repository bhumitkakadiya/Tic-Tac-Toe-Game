let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#rstbtn");
let newGamebtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

let arrPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true; 
    }
};

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false; 
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for(let pattern of arrPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                winnerFound = true;
                return;
            }
        }
    }

    // Check for draw
    let filledCount = 0;
    for(let box of boxes){
        if(box.innerText !== ""){
            filledCount++;
        }
    }

    if(filledCount === 9 && !winnerFound){
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }
};

newGamebtn.addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame);
