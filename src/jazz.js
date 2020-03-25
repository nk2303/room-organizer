//  Login
function loginForm() {
    let loginForm = document.getElementById('login-form') // assign form.id
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let user = { name: event.target.name.value}
        fetchUser(user);
    })
}

function fetchUser(userId) {    
    return fetch(`${endPoint}/${userId}`) 
        .then(function(data){
            console.log(data)
        })    
        .catch(console.error)  
  }

//  Sign Up
//  Need to locate proper elements
function eventSignUp() {
    const signUpButton = document.getElementById('sign-up-button')
    signUpButton.addEventListener('click', function(event) {
        signUpForm()
    })
}

function signUpForm() {
    const signUpForm = document.getElementById('sign-up-form')
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
        .then(function(data) {
            // console.log(data);
           let currentUser = data;
        })
        .catch(console.error);  
}