
const myForm = document.getElementById('myForm')
const items = document.getElementById('items')
myForm.addEventListener('submit',onSumbit)

function onSumbit(e){
    e.preventDefault();
    const expenseAmount = document.getElementById("expenseAmount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const userData = {expenseAmount,description,category}
    axios.post("https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user",userData)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))  
}

document.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user")
    .then(res=>{
        for(var i=0;i<res.data.length;i++){
            showOutput(res.data[i])
        }
    })
    .catch(err=>console.log(err))
})
function showOutput(user){
    
    const newLi = document.createElement('li')
    newLi.appendChild(document.createTextNode(`${user.expenseAmount} ${user.description} ${user.category}`))
    const delBtn = document.createElement('button')
    delBtn.innerHTML = 'Delete'
    const editBtn = document.createElement('edit')
    editBtn.innerHTML = 'Edit'
    newLi.appendChild(editBtn)
    newLi.appendChild(delBtn)
    items.appendChild(newLi)
}