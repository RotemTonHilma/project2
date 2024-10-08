const container = document.getElementById("square");
let booly = true;

let cells = [];

let numclick = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const element = document.getElementById("myBtn");
element.addEventListener("click", reset);

reset();

function btnClick(localSquareNumber, smallSquareNumber) {

    localSquare = cells[localSquareNumber];
    smallSquare = localSquare[smallSquareNumber];
    if (smallSquare.value != "") return;

    numclick[localSquareNumber]++;
    if (booly) smallSquare.value = 'X'
    else smallSquare.value = 'O'
    checkLocalWin(localSquareNumber, smallSquareNumber);


    if (!gameEnd) {
        booly = !booly;

        //disable squares outside of next local square

        let nextLocalSquare = smallSquareNumber;
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].disabled = false;
                if (
                    !openAll
                    && !container.children[nextLocalSquare].classList.contains("taken")
                    && cells[i][j].value === ''
                    && i !== nextLocalSquare) {
                    cells[i][j].disabled = true;
                }

            }
        }

    }
    else {
        //tie
        if (isTie)
            setTimeout(() => (
                alert("It's a tie")
            ), 100);
        //someone won
        else {
            if (booly) //x won
                setTimeout(() => (
                    alert("X Won")
                ), 100);
            else
                setTimeout(() => (
                    alert("O Won")
                ), 100);
        }
    }
    openAll = false;

}

function reset() {

    for (let i = 0; i < numclick.length; i++) {
        numclick[i] = 0;
    }
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

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

    gameEnd = false;
    isTie = false;
    openAll = false;
    cells = [];
    for (let i = 0; i < 9; i++) {
        cells.push(container.children[i].getElementsByTagName("input"));
    }

}


function checkLocalWin(localSquareNumber, smallSquareNumber) {

    if (wonLocal(localSquareNumber, "X")) {
        if (localSquareNumber === smallSquareNumber) openAll = true;
        claimLocalSquare(localSquareNumber, "X");
        checkGlobalWin();
    }
    else if (wonLocal(localSquareNumber, "O")) {
        if (localSquareNumber === smallSquareNumber) openAll = true;
        claimLocalSquare(localSquareNumber, "O");
        checkGlobalWin();
    }
    //check tie
    else if (numclick[localSquareNumber] === 9) {
        if (localSquareNumber === smallSquareNumber) openAll = true;
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
    localSquare.style.backgroundColor = "gray";
    localSquare.classList.add("taken");
}

function checkGlobalWin() {
    //for tie segment  
    let flag = true;
    for (let i = 0; i < container.children.length; i++) {
        if (!container.children[i].classList.contains("taken")) flag = false;
    }

    if (wonGlobal("X")) {
        //color
        //X win message
        gameEnd = true;
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
        //disable all cells
        cells.forEach(local => {
            local.disabled = true;
        });
    }
    //tie

    else if (flag) {
        //tie message
        gameEnd = true;
        isTie = true;
        //disable all cells
        cells.forEach(local => {
            local.disabled = true;
        });
    }
}

function wonGlobal(sign) {
    if (container.children[0].innerText === sign && container.children[1].innerText === sign && container.children[2].innerText === sign) {
        colorWin(0, 1, 2, sign);
        return true;
    }
    if (container.children[3].innerText === sign && container.children[4].innerText === sign && container.children[5].innerText === sign) {
        colorWin(3, 4, 5, sign);
        return true;
    }
    if (container.children[6].innerText === sign && container.children[7].innerText === sign && container.children[8].innerText === sign) {
        colorWin(6, 7, 8, sign);
        return true;
    }
    // column win
    if (container.children[0].innerText === sign && container.children[3].innerText === sign && container.children[6].innerText === sign) {
        colorWin(0, 3, 6, sign);
        return true;
    }
    if (container.children[1].innerText === sign && container.children[4].innerText === sign && container.children[7].innerText === sign) {
        colorWin(1, 4, 7, sign);
        return true;
    }
    if (container.children[2].innerText === sign && container.children[5].innerText === sign && container.children[8].innerText === sign) {
        colorWin(2, 5, 8, sign);
        return true;
    }
    // axis win
    if (container.children[0].innerText === sign && container.children[4].innerText === sign && container.children[8].innerText === sign) {
        colorWin(0, 4, 8, sign);
        return true;
    }
    if (container.children[2].innerText === sign && container.children[4].innerText === sign && container.children[6].innerText === sign) {
        colorWin(2, 4, 6, sign);
        return true;
    }
    return false;
}

function colorWin(idx1, idx2, idx3, sign) {
    let color;
    if (sign === "X") color = "rgb(180, 41, 83)";
    else color = "rgb(56, 103, 189)";

    container.children[idx1].style.color = color;
    container.children[idx2].style.color = color;
    container.children[idx3].style.color = color;


}


//cat audio
function meow(audioFile) {
    new Audio(audioFile).play();
}

