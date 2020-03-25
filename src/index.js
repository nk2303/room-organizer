const endPoint = "http://localhost:3000/api/v1/users"

document.addEventListener('DOMContentLoaded', () => {
  const roomList = document.querySelector('#room-list');
  // TODO: @nk2303 - Use user id to fetch data. Temporarily hard code using user 1.
  fetchUser(1)
  .then(res => {
    for(let room of res.rooms) {
      renderRoom(roomList, room);
    }
  })
});

function renderRoom(rootContainer, roomObj) {
  const roomContainer = document.createElement('div');
  roomContainer.innerText = roomObj.name;
  for(let storage of roomObj.storages) {
    renderStorage(roomContainer, storage);
  }
  
  rootContainer.appendChild(roomContainer);
}

function renderStorage(roomContainer, storageObj) {
  const storageContainer = document.createElement('div');
  storageContainer.innerText = storageObj.name;
  for (let item of storageObj.items) {
    renderItem(storageContainer, item);
  }
  roomContainer.appendChild(storageContainer);
}

function renderItem(storageContainer, itemObj) {
  const itemContainer = document.createElement('p');
  itemContainer.innerHTML = itemObj.name;
  storageContainer.appendChild(itemContainer);
}

// Login
function loginForm() {
  let loginForm = document.getElementById('login-form') //assign html form.id 'login-form'
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let user = {name: event.target.name.value}
    fetchUser(user);
  })
}

function fetchUser(userId) {
  return fetch(`${endPoint}/${userId}`)
      .then(res => res.json())
      .catch(console.error);
}