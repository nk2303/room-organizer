//  Login
function loginForm() {
    let loginForm = document.getElementById() // assign id
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let user = { name: event.target.name.value }
        fetchUser(user);
    })
}

function fetchUser(userId) {    
    return fetch(`${endPoint}/${userId}`) 
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data){
            console.log(data)
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