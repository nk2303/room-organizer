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
        .then(res => res.json())    
        .catch(console.error);  
  }
  
//  Sign Up
//  Need to locate proper elents
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
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
           let currentUser = data
        })
        .catch(console.error);  
}