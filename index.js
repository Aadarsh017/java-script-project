let myLeads = []
let inputBtn = document.getElementById("input-btn")
let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("tab-btn")



const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


// console.log(tabs[0].url);


function render(leads) {
    let listItem = ""
    for (let i = 0; i < leads.length; i++) {
        listItem += `
        <li>
         <a target  = '_blank' href=' ${leads[i]}'>
         ${leads[i]} 
          </a>
        </li>`

    }
    ulEl.innerHTML = listItem
}


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)


})
