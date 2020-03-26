





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