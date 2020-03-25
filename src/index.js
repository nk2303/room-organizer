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

function fetchUser(userId) {
  return fetch(`${endPoint}/${userId}`)
      .then(res => res.json())
      .catch(console.error);
}

function renderRoom(rootContainer, roomObj) {
  const roomContainer = renderDivElement(rootContainer, ['container']);
  renderDivElement(roomContainer, ['row'], roomObj.name);
  const storageListContainer = renderDivElement(roomContainer, ['row']);

  for (let storage of roomObj.storages) {
    renderStorage(storageListContainer, storage);
  }
}

function renderStorage(listContainer, storageObj) {
  const storageContainer = renderDivElement(listContainer, ['col-4']);
  const storageCard = renderDivElement(storageContainer, ['card']);
  const storageBody = renderDivElement(storageCard, ['card-body']);
  renderElement(storageBody, 'h5', ['card-title'], storageObj.name);

  for (let item of storageObj.items) {
    renderItem(storageBody, item);
  }
}

function renderItem(storageContainer, itemObj) {
  renderElement(storageContainer, 'p', ['card-text'], itemObj.name);
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