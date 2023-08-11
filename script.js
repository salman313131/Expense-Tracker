
const myForm = document.getElementById('myForm')
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

