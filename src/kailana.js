// delete storage function

function deleteStorage(storageId) {
    fetch(`${storageEndPoint}/${storageId}`, {method: "DELETE"})
    .then(console.log)
    .catch(console.error);
  }





//delete button 



let itemId = itemEndPoint.id

//const itemP = 

let deleteItemButton = document.createElement("button")

deleteItemButton.textContent = "x";
deleteItemButton.className = "deleteItem";
deleteItemButton.addEventListener("click", function(){
    deleteItemP(itemP);
    deleteItem(itemId);
})

function deleteItem(itemId){
    fetch(`${itemEndPoint}/${itemId}`,{
        method: "DELETE"
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
    })
}

function deleteItemP(p){
    parentCard = div.querySelector("card-body")
    parentCard.removeChild(p);
}


//edit item form 



const editItemFormTag = document.createElement('form');
const editItemInput = document.createElement("input");
editItemInput.placeholder = `Edit name`;
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


const inputEditItemBtn = document.createElement("input");

editItemFormTag.appendChild(editItemInput);
editItemFormTag.appendChild(inputEditItemBtn);

{/* <form method="post">
<input type="hidden" name="_method" value="put" />
<ul class="drop-down closed"> */}

{/* 
<div class="form-group">
<label for="exampleFormControlSelect2">Item Categories</label>
<select multiple class="form-control" id="itemCat">
  <option>Clothes</option>
  <option>Paper</option>
  <option></option>
  <option>4</option>
  <option>5</option>
</select>
</div> */}


