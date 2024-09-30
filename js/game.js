const container = document.getElementById("square");

//insert cells
for (let i = 0; i < 9; i++) {
    let lildiv = document.createElement("div");
    container.appendChild(lildiv);
    for (let j = 0; j < 9; j++) {
        let smallestdiv = document.createElement("div");
        lildiv.appendChild(smallestdiv);
    }
}

const cells = [];
for (let i = 0; i < 9; i++) {
    cells.push(container.children[i].getElementsByTagName("div"));
}

