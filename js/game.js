const container = document.getElementById("square");
let booly = true;

let numclick = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//insert cells
for (let i = 0; i < 9; i++) {
    let lildiv = document.createElement("div");
    container.appendChild(lildiv);
    for (let j = 0; j < 9; j++) {
        let smallestdiv = document.createElement("div");
        smallestdiv.addEventListener("click", function () { btnClick(i) });
        lildiv.appendChild(smallestdiv);
    }
}

const cells = [];
for (let i = 0; i < 9; i++) {
    cells.push(container.children[i].getElementsByTagName("div"));
}


function btnClick(localSquareNumber) {
    if (this.textContent != "") return
    numclick[localSquareNumber]++;
    if (booly) this.textContent = 'X'
    else this.textContent = 'O'
    checkLocalWin(cells[i])

    booly = !booly;
    setTimeout(() => (
        alert(this.textContent + " won")
    ), 100)

}
function reset() {
    booly = !booly; //victor starts
    for (let i = 0; i < numclick.length; i++) {
        numclick[i] = 0;
    }
    cells.forEach(x => {
        x.forEach(y => {
            y.textContent = "";
        }
        )
    });
}


function checkLocalWin(localSquare) {
    if (won(localSquare, "X")) {
        claimLocalSquare(localSquare, "X");
        checkGlobalWin();
    }
    else if (won(localSquare, "O")) {
        claimLocalSquare(localSquare, "O");
        checkGlobalWin()
    }
    //check tie
    // else if ()
}

function won(localSquare, sign) {
    if (
        //row wins
        (localSquare[0] === sign && localSquare[1] === sign && localSquare[2] === sign)
        || (localSquare[3] === sign && localSquare[4] === sign && localSquare[5] === sign)
        || (localSquare[6] === sign && localSquare[7] === sign && localSquare[8] === sign)
        // column win
        || (localSquare[0] === sign && localSquare[3] === sign && localSquare[6] === sign)
        || (localSquare[1] === sign && localSquare[4] === sign && localSquare[7] === sign)
        || (localSquare[2] === sign && localSquare[5] === sign && localSquare[8] === sign)
        // axis win
        || (localSquare[0] === sign && localSquare[4] === sign && localSquare[8] === sign)
        || (localSquare[2] === sign && localSquare[4] === sign && localSquare[6] === sign)
    ) return true;
    return false;
}

function claimLocalSquare(localSquare, sign) {
    //erase all little squares
    while (localSquare.firstChild)
        localSquare.removeChild(localSquare.lastChild);
    localSquare.innerText = sign;
    booly = !booly;
}

function checkGlobalWin() { }