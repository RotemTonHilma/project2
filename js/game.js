const container = document.getElementById("square");
let booly = true;
let gameEnd = false;

let numclick = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//insert cells
for (let i = 0; i < 9; i++) {
    let lildiv = document.createElement("div");
    container.appendChild(lildiv);
    for (let j = 0; j < 9; j++) {
        let smallestbtn = document.createElement("input");
        smallestbtn.setAttribute("type", "text");
        smallestbtn.setAttribute("readonly", "");
        smallestbtn.addEventListener("click", function () { btnClick(i, j) });
        lildiv.appendChild(smallestbtn);
    }
}

const cells = [];
for (let i = 0; i < 9; i++) {
    cells.push(container.children[i].getElementsByTagName("input"));
}


function btnClick(localSquareNumber, smallSquareNumber) {

    localSquare = cells[localSquareNumber];
    smallSquare = localSquare[smallSquareNumber];
    if (smallSquare.value != "") return;

    numclick[localSquareNumber]++;
    if (booly) smallSquare.value = 'X'
    else smallSquare.value = 'O'
    checkLocalWin(localSquareNumber);


    if (!gameEnd) {
        booly = !booly;

        //disable squares outside of next local square

        let nextLocalSquare = smallSquareNumber;
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].disabled = false;
                if (
                    !container.children[nextLocalSquare].classList.contains("taken") &&
                    cells[i][j].value === ''
                    && i !== nextLocalSquare)
                    cells[i][j].disabled = true;
            }
        }
    }

    // setTimeout(() => (
    //     alert(this.value + " won")
    // ), 100)

}
function reset() {
    booly = !booly; //victor starts
    for (let i = 0; i < numclick.length; i++) {
        numclick[i] = 0;
    }
    cells.forEach(x => {
        x.forEach(y => {
            y.value = "";
        }
        )
    });
}


function checkLocalWin(localSquareNumber) {
    if (wonLocal(localSquareNumber, "X")) {
        claimLocalSquare(localSquareNumber, "X");
        checkGlobalWin();
    }
    else if (wonLocal(localSquareNumber, "O")) {
        claimLocalSquare(localSquareNumber, "O");
        checkGlobalWin();
    }
    //check tie
    else if (numclick[localSquareNumber] === 9) {
        setLocalTie(localSquareNumber);
        checkGlobalWin();
    }
}

function wonLocal(localSquareNumber, sign) {
    localSquare = container.children[localSquareNumber];
    if (
        //row wins
        (localSquare.children[0].value === sign && localSquare.children[1].value === sign && localSquare.children[2].value === sign)
        || (localSquare.children[3].value === sign && localSquare.children[4].value === sign && localSquare.children[5].value === sign)
        || (localSquare.children[6].value === sign && localSquare.children[7].value === sign && localSquare.children[8].value === sign)
        // column win
        || (localSquare.children[0].value === sign && localSquare.children[3].value === sign && localSquare.children[6].value === sign)
        || (localSquare.children[1].value === sign && localSquare.children[4].value === sign && localSquare.children[7].value === sign)
        || (localSquare.children[2].value === sign && localSquare.children[5].value === sign && localSquare.children[8].value === sign)
        // axis win
        || (localSquare.children[0].value === sign && localSquare.children[4].value === sign && localSquare.children[8].value === sign)
        || (localSquare.children[2].value === sign && localSquare.children[4].value === sign && localSquare.children[6].value === sign)
    ) return true;
    return false;
}

function claimLocalSquare(localSquareNumber, sign) {
    localSquare = container.children[localSquareNumber];
    //erase all little squares
    while (localSquare.firstChild)
        localSquare.removeChild(localSquare.lastChild);
    localSquare.style.display = "block";
    localSquare.style.textAlign = "center";
    localSquare.style.fontSize = "7em";
    localSquare.innerText = sign;
    localSquare.classList.add("taken");
}

function setLocalTie(localSquareNumber) {
    localSquare = container.children[localSquareNumber];
    //erase all little squares
    while (localSquare.firstChild)
        localSquare.removeChild(localSquare.lastChild);
    localSquare.style.display = "block";
    localSquare.style.textAlign = "center";
    localSquare.style.fontSize = "7em";
    localStorage.style.backgroundColor = "gray";
    localSquare.classList.add("taken");
    booly = !booly;
}

function checkGlobalWin() {
    if (wonGlobal("X")) {
        //color
        //X win message
        gameEnd = true;
        alert("X won");
        //disable all cells
        cells.forEach(local => {
            local.disabled = true;
        });
        //add to wins counter in local storage
        const users = JSON.parse(localStorage.users);
        for (let user of users) {
            if (user.username === localStorage.currentUser)
                user.wins++;
        }
        localStorage.users = JSON.stringify(users);
    }
    else if (wonGlobal("O")) {
        //color
        //O win message
        gameEnd = true;
        alert("O won");
        //disable all cells
        cells.forEach(local => {
            local.disabled = true;
        });
    }
    //tie
    else if (numclick.every(x => x === 9)) {
        //tie message
        gameEnd = true;
        alert("tie");
        //disable all cells
        cells.forEach(local => {
            local.disabled = true;
        });
    }
}

function wonGlobal(sign) {
    if (
        //row wins
        (container.children[0].innerText === sign && container.children[1].innerText === sign && container.children[2].innerText === sign)
        || (container.children[3].innerText === sign && container.children[4].innerText === sign && container.children[5].innerText === sign)
        || (container.children[6].innerText === sign && container.children[7].innerText === sign && container.children[8].innerText === sign)
        // column win
        || (container.children[0].innerText === sign && container.children[3].innerText === sign && container.children[6].innerText === sign)
        || (container.children[1].innerText === sign && container.children[4].innerText === sign && container.children[7].innerText === sign)
        || (container.children[2].innerText === sign && container.children[5].innerText === sign && container.children[8].innerText === sign)
        // axis win
        || (container.children[0].innerText === sign && container.children[4].innerText === sign && container.children[8].innerText === sign)
        || (container.children[2].innerText === sign && container.children[4].innerText === sign && container.children[6].innerText === sign)
    ) return true;
    return false;
}