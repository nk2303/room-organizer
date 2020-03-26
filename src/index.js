const endPoint = "http://localhost:3000/api/v1/users"
const itemEndPoint = "http://localhost:3000/api/v1/items"
const storageEndPoint = "http://localhost:3000/api/v1/storages"
const roomEndPoint = "http://localhost:3000/api/v1/rooms"

document.addEventListener('DOMContentLoaded', () => {
  const roomList = document.querySelector('#room-list');
  fetchUser(1)
  .then(res => {
    for(let room of res[0].rooms) {
      renderRoom(roomList, room);
    }
    const roomButton = renderElement(roomList, 'button', ['row', 'btn', 'btn-light'], 'Add Room');
    roomList.setAttribute('data-user-id', res[0].id)
    roomButton.addEventListener('click', function(){
      renderNewRoomText(roomList, roomButton);
      roomButton.style.display = "none";
    });
  })
});

function fetchUser(userId) {
  // TODO: @nk2303 - Use user id to fetch data. Temporarily hard code using user 1.
  return fetch(`${endPoint}/`)
      .then(res => res.json())
      .catch(console.error);
}

function postItem(item){
  fetch(itemEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(item)
  })
    .then(function(res) {
      console.log(res);
      return res.json();
    })
    .then(function(data) {
      if (data.id) {
        console.log(data);
      } else {
        console.log("SOMETHING WENT WRONG", data);
      }
    })
    .catch(console.error);
} 

function postStorage(storage){
  fetch(storageEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(storage)
  })
    .then(function(res) {
      console.log(res);
      return res.json();
    })
    .then(function(data) {
      if (data.id) {
        console.log(data);
      } else {
        console.log("SOMETHING WENT WRONG", data);
      }
    })
    .catch(console.error);
} 

function postRoom(room){
  fetch(roomEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(room)
  })
    .then(function(res) {
      console.log(res);
      return res.json();
    })
    .then(function(data) {
      if (data.id) {
        console.log(data);
      } else {
        console.log("SOMETHING WENT WRONG", data);
      }
    })
    .catch(console.error);
} 

function renderRoom(rootContainer, roomObj) {
  const roomContainer = renderDivElement(rootContainer, ['container']);
  renderDivElement(roomContainer, ['row'], roomObj.name);
  const storageListContainer = renderDivElement(roomContainer, ['row']);
  storageListContainer.setAttribute('data-room-id', roomObj.id);

  const storageButton = renderElement(storageListContainer, 'button', ['btn', 'btn-light'], 'Add Storage');
  storageButton.addEventListener('click', function(){
    renderStorageText(storageListContainer, storageButton);
    // storageButton.style.display = "none";
    storageListContainer.removeChild(storageButton);
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

  const itemButton = renderElement(storageBody, 'button', ['btn', 'btn-light'], 'Add Item');
  itemButton.addEventListener('click', function(){
    renderItemTextArea(storageBody, itemButton);
    storageBody.removeChild(itemButton);
  });
}

function renderItem(storageContainer, itemObj) {
  renderElement(storageContainer, 'p', ['card-text'], itemObj.name);
  // const deleteItemButton = document.createElement("button") 
  // deleteItemButton.textContent = "x";
  // deleteItemButton.className = "deleteItem";
  // deleteItemButton.addEventListener("click", function(){
  //   console.log("");
  // })
  // storageContainer.appendChild(deleteItemButton);
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

function renderItemTextArea(storageBody, addItemButton){
  const formtag = document.createElement('form');
  const inputE = document.createElement("input");
  inputE.placeholder = "Enter you new item's name...";
  inputE.type = "text";
  inputE.name = "itemname";
  const inputBtn = document.createElement("input");
  inputBtn.type = "submit"; // default
  formtag.addEventListener("submit", function(event){
      event.preventDefault();
      const newItemName = event.target.itemname.value;
      console.log(event.target.itemname.value);
      formtag.style.display = "none";
      renderItem(storageBody, {name: newItemName});
      postItem({name: newItemName, storage_id: storageBody.dataset["storageId"]});
      storageBody.appendChild(addItemButton);
  });
  formtag.appendChild(inputE);
  formtag.appendChild(inputBtn);
  storageBody.appendChild(formtag);
}

function renderStorageText(storageListContainer, storageButton){
  const formtag = document.createElement('form');
  const inputE = document.createElement("input");
  inputE.placeholder = "Enter you new storage's name...";
  inputE.type = "text";
  inputE.name = "storagename";
  const inputBtn = document.createElement("input");
  inputBtn.type = "submit"; // default
  formtag.addEventListener("submit", function(event){
      event.preventDefault();
      formtag.style.display = "none";
      const newStorageName = event.target.storagename.value;
      console.log(event.target.storagename.value);
      renderStorage(storageListContainer, {name: newStorageName, items: []});
      postStorage({name: newStorageName, room_id: storageListContainer.dataset["roomId"]});
      storageListContainer.appendChild(storageButton);
  });
  formtag.appendChild(inputE);
  formtag.appendChild(inputBtn);
  storageListContainer.prepend(formtag);
  
}

function renderNewRoomText(roomList, roomButton){
  const formtag = document.createElement('form');
  const inputE = document.createElement("input");
  inputE.placeholder = "Enter you new room's name...";
  inputE.type = "text";
  inputE.name = "roomname";
  const inputBtn = document.createElement("input");
  inputBtn.type = "submit"; // default
  formtag.addEventListener("submit", function(event){
      event.preventDefault();
      formtag.style.display = "none";
      const newRoomName = event.target.roomname.value;
      console.log(event.target.roomname.value);
      renderRoom(roomList, {name: newRoomName, storages: []})
      postRoom({name: newRoomName, user_id: roomList.dataset["userId"]});
      roomList.appendChild(roomButton);
  });
  formtag.appendChild(inputE);
  formtag.appendChild(inputBtn);
  roomList.appendChild(formtag);
};
