const endPoint = "http://localhost:3000/api/v1/users"
let currentUser = null
//  Login
function loginForm() {
    let loginForm = document.getElementById() // assign id
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let userId = { name: event.target.name.value } // find by user name, get id, 
        fetchUser(userId);
    })
}

function fetchUser(userId) {  
    return fetch(`${endPoint}/${userId}`) 
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data){
            currentUser = data
        })    
        .catch(console.error)  
  }

//  Sign Up
function eventSignUp() {
    const signUpButton = document.getElementById() // assign id
    signUpButton.addEventListener('click', function(event) {
        signUpForm()
    })
}

function signUpForm() {
    const signUpForm = document.getElementById() // assign id
    signUpForm.addEventListener('submit', function(event){
        event.preventDefault();
        let user = {name: event.target.name.value}
        postUesr(user);
    })
}

function postUser(user) {
    fetch(endPoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
           let currentUser = data;
        })
        .catch(console.error);  
}