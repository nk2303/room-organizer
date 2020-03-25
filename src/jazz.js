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
  