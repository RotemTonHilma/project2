// localStorage.clear();
//check if the page is opened for the first time
if (localStorage.getItem("users") === null) {
    let userArray = [];

    userArray.push({
        'username': 'guest',
        'password': '123'
    });


    localStorage.setItem("users", JSON.stringify(userArray));
}

localStorage.setItem("currentUser", "");

//show existing users
const users_container = document.getElementById("existing-users");
const savedUsers = JSON.parse(localStorage.users);

for (let i = 0; i < savedUsers.length; i++) {
    let userDiv = document.createElement("div");
    let userObj = savedUsers[i];

    userDiv.innerText = userObj["username"];
    userDiv.addEventListener("click", function () { showPasswordCheckSection(userDiv, userObj) });
    users_container.appendChild(userDiv);
}

function showPasswordCheckSection(user_div, userObject) {
    if (user_div.children.length === 0) {
        let passwordContainer = document.createElement("div");
        passwordContainer.innerText = "Enter Your Password:";
        let passwordForm = document.createElement("input");
        let entryBtn = document.createElement("button");

        entryBtn.setAttribute("id", "entry-btn")
        entryBtn.style.display = "none";
        entryBtn.innerText = "Enter";
        entryBtn.onclick = function () {
            localStorage["currentUser"] = userObject.username;
            location.href = "./html/game.html";
        };

        passwordForm.setAttribute("type", "password");
        passwordForm.setAttribute("name", "password");
        passwordForm.setAttribute("pattern", "/\w{6,16}/");
        passwordForm.setAttribute("value", "");
        passwordForm.addEventListener("change", function () { checkPassword(user_div, userObject.password, passwordForm.value) });

        passwordContainer.appendChild(passwordForm);
        passwordContainer.appendChild(entryBtn);
        user_div.appendChild(passwordContainer);
    }

}

function checkPassword(user_div, password, enteredPassword) {
    let wrongPassParagraph = document.createElement("p");
    wrongPassParagraph.innerText = "wrong password";
    wrongPassParagraph.style.display = "none";
    user_div.appendChild(wrongPassParagraph);

    if (password === enteredPassword) {
        document.getElementById("entry-btn").style.display = "block";
        wrongPassParagraph.style.display = "hidden";
    }
    else {
        wrongPassParagraph.style.display = "block";
    }
}

//sign up
const signUpBtn = document.getElementById("sign-up-btn");
signUpBtn.addEventListener("click", showSignUpSection);

const signUpSection = document.getElementById("sign-up-section");
signUpSection.style.display = "none";

function showSignUpSection() {
    signUpSection.style.display = "block";
}

const enterUserBtn = document.getElementById("enter-new-user");
enterUserBtn.addEventListener("click", addUser);

function addUser() {
    const newUser = {
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value
    }
    const userArray = JSON.parse(localStorage.users);
    console.log(userArray);
    userArray.push(newUser);
    console.log(userArray);
    localStorage.users = JSON.stringify(userArray);
}