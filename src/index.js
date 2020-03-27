const userEndPoint = "http://localhost:3000/api/v1/users";
const itemEndPoint = "http://localhost:3000/api/v1/items";
const storageEndPoint = "http://localhost:3000/api/v1/storages";
const roomEndPoint = "http://localhost:3000/api/v1/rooms";

let currentUser;

document.addEventListener('DOMContentLoaded', () => {

  const roomList = document.querySelector('#room-list');

  let usersArray = [];
  fetchUsers(usersArray);

  const login = document.getElementById("login");
  const loginForm = document.getElementById("loginForm");
  const logout = document.getElementById('logout');

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (usersArray.find(element => element.name == event.target.username.value)) {
      currentUser = usersArray.find(element => element.name == event.target.username.value);
      if (currentUser.rooms) {
        for (let room of currentUser.rooms) {
          renderRoom(roomList, room);
        }
      }
    } else {
      post(userEndPoint, {name: event.target.username.value});
      fetchUsers(usersArray);
      currentUser = usersArray.find(element => element.name == event.target.username.value);
    }

    login.hidden = true;
    loginForm.hidden = true;
    logout.hidden = false;

    let greetingLocation = document.querySelector("#topbar #greeting");
    let greeting = document.createElement("p");
    greeting.innerText = `Welcome home, ${event.target.username.value}.`
    greetingLocation.appendChild(greeting);

    const roomButton = renderElement(roomList, 'button', ['row', 'btn', 'btn-light'], '+ Add Room');
    roomList.setAttribute('data-user-id', currentUser.id)
    roomButton.addEventListener('click', function() {

      fetchUsers(usersArray);
      currentUser = usersArray.find(element => element.name == event.target.username.value);

      renderEntityText(roomEndPoint, "room", roomList, roomButton);
      roomButton.style.display = "none";
      
    });
  })

  logout.addEventListener("click", (event) => {
    event.preventDefault();

    login.hidden = false;
    loginForm.hidden = false;
    logout.hidden = true;

    currentUser = null;
    let mainPage = document.getElementsByClassName("container-fluid row");
    mainPage.innerHTML = "";

  })

});

function deleteItem(itemId) {
  fetch(`${itemEndPoint}/${itemId}`, {method: "DELETE"})
  .then(console.log)
  .catch(console.error);
}

function fetchUsers(array) {
    return fetch(userEndPoint)
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
        data.map(function(user) {
          array.push(user);
        });
        return array;
        })
        .catch(console.error);     
}

function fetchUser(userId) {
    return fetch(`${userEndPoint}/${userId}`)
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
        })
        .catch(console.error)
}

function post(endPoint, entity) {
  fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(entity)
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data)
      if (!data.id) {
        console.log("SOMETHING WENT WRONG", data);
      }
    })
    .catch(console.error);
}

function renderRoom(rootContainer, roomObj) {
  const roomContainer = renderDivElement(rootContainer, ['container']);
  renderDivElement(roomContainer, ['row', 'font-size-16'], roomObj.name);
  const storageListContainer = renderDivElement(roomContainer, ['row']);
  storageListContainer.setAttribute('data-room-id', roomObj.id);

  const storageButtonWrapper = renderDivElement(storageListContainer, ['col-3']);
  const storageButton = renderElement(storageButtonWrapper, 'button', ['btn', 'btn-light'], '+ Add Storage');
  storageButton.addEventListener('click', function() {
    renderEntityText(storageEndPoint, "storage", storageListContainer, storageButton);
    // storageListContainer.removeChild(divE1);
  });
  for (let storage of roomObj.storages) {
    renderStorage(storageListContainer, storage);
  }
}

function renderStorage(listContainer, storageObj) {
  const storageContainer = renderDivElement(listContainer, ['col-3']);
  const storageCard = renderDivElement(storageContainer, ['card']);
  const storageBody = renderDivElement(storageCard, ['card-body']);
  storageBody.setAttribute('data-storage-id', storageObj.id);
  renderElement(storageBody, 'h5', ['card-title'], storageObj.name);
  for (let item of storageObj.items) {
    renderItem(storageBody, item);
  }

  const itemButton = renderElement(storageBody, 'button', ['btn', 'btn-light'], '+ Add Item');
  itemButton.addEventListener('click', function() {
    renderEntityText(itemEndPoint, "item", storageBody, itemButton);
    storageBody.removeChild(itemButton);
  });
}

function renderItem(storageContainer, itemObj) {
  const itemElement = renderElement(storageContainer, 'span', ['card-text', 'font-size-14'], itemObj.name);
  itemElement.addEventListener("click", function(e){ 
    let popUpForm = document.querySelector("#pop-up-body form")
    console.log(popUpForm)
    openPopUp();
    if (!popUpForm){
   //Kim: add this line in
    console.log("oh hey!") // Kim: Inspect the frontend, open console, see it's returning oh hey!
    const editItemFormTag = document.createElement('form');

    const editItemInput = document.createElement("input");
    editItemInput.placeholder = `Edit item name`;
    editItemInput.type = "text";
    editItemInput.name = "targetName";

    const editItemCategory = document.createElement("input"); 
    editItemCategory.type = "text"; 
    editItemCategory.name = "targetName"; 

    const editItemQuant = document.createElement("input");
    editItemQuant.type = "number"; 
    editItemQuant.name = "targetName";

    const editItemDesc = document.createElement("input");
    editItemDesc.type = "textarea";
    editItemDesc.type = "targetName";

    const inputEditItemBtn = document.createElement("button");

    editItemFormTag.appendChild(editItemInput);
    editItemFormTag.appendChild(inputEditItemBtn);
    console.log(inputEditItemBtn)
    let popUpBody = document.getElementById("pop-up-body");

    popUpBody.appendChild(editItemFormTag);

    let popUp = document.getElementById("pop-up-windows")

    //end of pop up 
    }
  });

  itemElement.setAttribute('data-toggle', "modal");
  itemElement.setAttribute('data-target', "#exampleModalLive");
  itemElement.addEventListener("click", function(e){ //Kim: add this line in
    console.log("oh hey!") // Kim: Inspect the frontend, open console, see it's returning oh hey!
  });
  const deleteItemButton = document.createElement("button");
  const divE = document.createElement('div');
  deleteItemButton.textContent = "x";
  deleteItemButton.className = "deleteItem";
  deleteItemButton.classList.add("close");
  deleteItemButton.classList.add("font-size-14")
  deleteItemButton.setAttribute('data-value', itemObj.id);
  deleteItemButton.addEventListener("click", function(e){
    deleteItem(e.target.dataset.value);
    storageContainer.removeChild(divE);
  })
  divE.appendChild(deleteItemButton);
  divE.appendChild(itemElement);
  storageContainer.appendChild(divE);
}

function renderDivElement(container, classList, labelText) {
  return renderElement(container, 'div', classList, labelText);
}

function renderElement(parentElement, htmlTag, classList, innerText) {
  const element = document.createElement(htmlTag);
  if (innerText) {
    element.innerText = innerText;
  }
  if (classList) {
    classList.forEach(className => element.classList.add(className));
  }
  parentElement.appendChild(element);
  return element;
}

function renderEntityText(endPoint, entity, list, button) {
  const formtag = document.createElement('form');
  const inputE = document.createElement("input");
  inputE.placeholder = `Enter new ${entity}'s name...`;
  inputE.type = "text";
  inputE.name = "targetName";
  inputE.className = "font-size-14";
  const inputBtn = document.createElement("input");
  inputBtn.type = "submit"; // default
  inputBtn.class = "btn-outline-secondary";
  formtag.addEventListener("submit", function(event) {
      event.preventDefault();
      formtag.style.display = "none";
      const newName = event.target.targetName.value;
      switch(entity) {
        case "room":
          renderRoom(list, {name: newName, storages: []});
          post(roomEndPoint, {name: newName, user_id: list.dataset["userId"]});
          break;
        case "storage":
          renderStorage(list, {name: newName, items: []});
          post(storageEndPoint, {name: newName, room_id: list.dataset["roomId"]});
          break;
        case "item":
          renderItem(list, {name: newName});
          post(itemEndPoint, {name: newName, storage_id: list.dataset["storageId"]});
      }
      list.appendChild(button);
  });
  formtag.appendChild(inputE);
  formtag.appendChild(inputBtn);
  list.appendChild(formtag);
}

function openPopUp(){
  let popUpDiv = document.getElementById("pop-up-main-div");
  
  let exitMenu = document.getElementById("exitMenu")
  exitMenu.addEventListener("click", function(){
    closePopUp()
  })
  popUpDiv.style.display = "block";
}

function closePopUp(){
  let popUpDiv = document.getElementById("pop-up-main-div");
  popUpDiv.style.display = "none";
}