
const myForm = document.getElementById('myForm')
const items = document.getElementById('items')
myForm.addEventListener('submit',onSumbit)
items.addEventListener('click',onDelete)

function onSumbit(e){
    e.preventDefault();
    const expenseAmount = document.getElementById("expenseAmount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const userData = {expenseAmount,description,category}
    axios.post("https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user",userData)
    .then((res)=>showOutput(res.data))
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
    newLi.appendChild(document.createTextNode(`${user._id} ${user.expenseAmount} ${user.description} ${user.category}`))
    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.innerHTML = 'Delete'
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerHTML = 'Edit'
    newLi.appendChild(editBtn)
    newLi.appendChild(delBtn)
    items.appendChild(newLi)
}
function onDelete(e){
    if(e.target.classList.contains('delete')){
    const li = e.target.parentElement;
    const data = li.textContent.split(" ")

    axios.delete(`https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user/${data[0]}`)
    .then(res=>items.removeChild(li)).catch(err=>console.log(err))
    }
    if(e.target.classList.contains('edit')){
        const li = e.target.parentElement;
        const data = li.textContent.split(" ")
        axios.get(`https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user/${data[0]}`)
        .then(res=>{
            const expenseAmount = document.getElementById("expenseAmount");
            expenseAmount.value = res.data.expenseAmount
            const description = document.getElementById("description");
            description.value = res.data.description
            const category = document.getElementById("category").value;
            category.value = res.data.category
            axios.delete(`https://crudcrud.com/api/31d769a06b2a483495145273fdfab0de/user/${res.data._id}`)
            .then(res=>items.removeChild(li)).catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
}