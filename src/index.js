const endPoint = "http://localhost:3000/api/v1/users"

document.addEventListener('DOMContentLoaded', () => {
  const roomList = document.querySelector('#room-list');
  fetchUser(1)
  .then(res => {
    for(let room of res[0].rooms) {
      renderRoom(roomList, room);
    }
    const roomButton = renderElement(roomList, 'button', ['row', 'btn', 'btn-light'], 'Add Room');
    roomButton.addEventListener('click', function(){
      renderNewRoomText(roomList);
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

function renderRoom(rootContainer, roomObj) {
  const roomContainer = renderDivElement(rootContainer, ['container']);
  renderDivElement(roomContainer, ['row'], roomObj.name);
  const storageListContainer = renderDivElement(roomContainer, ['row']);
  const storageButton = renderElement(storageListContainer, 'button', ['btn', 'btn-light', 'col-3'], 'Add Storage');
  storageButton.addEventListener('click', function(){
    renderStorageText(storageListContainer);
    storageButton.style.display = "none";
  });
  for (let storage of roomObj.storages) {
    renderStorage(storageListContainer, storage);
  }
}

function renderStorage(listContainer, storageObj) {
  const storageContainer = renderDivElement(listContainer, ['col-3']);
  const storageCard = renderDivElement(storageContainer, ['card']);
  const storageBody = renderDivElement(storageCard, ['card-body']);
  renderElement(storageBody, 'h5', ['card-title'], storageObj.name);
  for (let item of storageObj.items) {
    renderItem(storageBody, item);
  }

  const itemButton = renderElement(storageBody, 'button', ['btn', 'btn-light'], 'Add Item');
  itemButton.addEventListener('click', function(){
    renderItemTextArea(storageBody);
    itemButton.style.display = "none";
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

function renderItemTextArea(storageBody){
  const inputE = document.createElement('input');
  const buttnE = document.createElement('input');
  buttnE.type = "submit";
  buttnE.value = "Create";
  inputE.type = "text";
  inputE.placeholder = "Enter you new item's name here...";
  inputE.id = "new-item";
  storageBody.appendChild(inputE);
  storageBody.appendChild(buttnE);
}

function renderStorageText(storageListContainer){
  const inputE = document.createElement('input');
  const buttnE = document.createElement('input');
  buttnE.type = "submit";
  buttnE.value = "Create";
  inputE.type = "text";
  inputE.placeholder = "Enter you new storage's name here...";
  inputE.id = "new-item";
  storageListContainer.prepend(buttnE);
  storageListContainer.prepend(inputE);
  
}

function renderNewRoomText(roomList){
  const inputE = document.createElement('input');
  const buttnE = document.createElement('input');
  buttnE.type = "submit";
  buttnE.value = "Create";
  inputE.type = "text";
  inputE.placeholder = "Enter you new room's name here...";
  inputE.id = "new-room";
  roomList.appendChild(inputE);
  roomList.appendChild(buttnE);

};
