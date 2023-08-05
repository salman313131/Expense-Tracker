const myForm = document.getElementById('myForm')
const items = document.getElementById('items')
items.addEventListener('click',removeAndEdit)
myForm.addEventListener('submit',onSumbit)
function loadExpensesFromLocalStorage(){
    const item = document.getElementById('items')
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const expense = JSON.parse(localStorage.getItem(key));
        const newLi = document.createElement('li')
        for(let j in expense){
            const newLiText = document.createTextNode(`${j}:${expense[j]} `)
            newLi.appendChild(newLiText)
        }
        const delBtn = document.createElement('button')
        delBtn.classList.add('onDelete')
        delBtn.appendChild(document.createTextNode('delete'))
        newLi.appendChild(delBtn)
        const edBtn = document.createElement('button')
        edBtn.classList.add('onEdit')
        edBtn.appendChild(document.createTextNode('edit'))
        newLi.appendChild(edBtn)
        item.appendChild(newLi)
        }
}
function onSumbit(e){
    const expenseAmount = document.getElementById("expenseAmount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const item = document.getElementById('items')
    const newLi = document.createElement('li')
    newLi.classList.add('list-group-item')
    const newLiText = document.createTextNode(`Expense Amount:${expenseAmount} Category:${category}
     Description:${description} `)
    newLi.appendChild(newLiText)
    const delBtn = document.createElement('button')
    delBtn.classList.add('onDelete')
    delBtn.appendChild(document.createTextNode('delete'))
    newLi.appendChild(delBtn)
    const edBtn = document.createElement('button')
    edBtn.classList.add('onEdit')
    edBtn.appendChild(document.createTextNode('edit'))
    newLi.appendChild(edBtn)
    item.appendChild(newLi)
    const storage = JSON.stringify({expenseAmount,category,description})
    localStorage.setItem(description,storage)
}
function removeAndEdit(e){
    if (e.target.classList.contains('onDelete')){
        const li = e.target.parentElement;
        const listLi = li.textContent.split(" ");
        const rem = listLi[2].split(':')
        items.removeChild(li)
        localStorage.removeItem(rem[1])
    }
    if (e.target.classList.contains('onEdit')){
        const li = e.target.parentElement;
        const listLi = li.textContent.split(" ");
        const expenseAmount = document.getElementById("expenseAmount");
        const rem1 = listLi[0].split(':')
        expenseAmount.value = parseInt(rem1[1])
        const description = document.getElementById("description");
        const rem = listLi[2].split(':')
        description.value = rem[1]
        items.removeChild(li)
        localStorage.removeItem(rem[1])
        const category = document.getElementById("category");
        const rem3 = listLi[1].split(':')
        category.value = rem3[1]
    }
}
loadExpensesFromLocalStorage();