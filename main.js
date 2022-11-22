let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
//
let createButton = document.getElementById("create")
let title = document.getElementById("title")
let count = document.getElementById("count")
let category = document.getElementById("category")
let tableBody = document.querySelector("table tbody")
    price.oninput = function () {
        getTotal()
    }
        discount.oninput = function () {
            getTotal()
        }
        ads.oninput = function () {
            getTotal()
        }
        taxes.oninput = function () {
            getTotal()
        }    
function getTotal () {
    if (price.value != '') {
        total.innerHTML = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.parentElement.classList.add("green")
    }else {
        total.parentElement.classList.remove("green")
        ads.value = ''
        discount.value = ''
        taxes.value = ''
        total.innerHTML = ''
    }
}
let products;
if (window.localStorage.getItem(`products`)) {
    products = JSON.parse(window.localStorage.getItem(`products`))
}else {
    products = [];
}
createButton.onclick = function () {
    createProduct()
    // tableBody.innerHTML = ''
    appending()
    total.parentElement.classList.remove("green")
}
function createProduct () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 500 && count.value >= 1) {
        
        for (let i=0;i<count.value;i++) {
            
            products.push(newProduct)
            window.localStorage.setItem(`products` , JSON.stringify(products))   
        }  
        clearDate()     
        location.reload()
    
    }else {
        let spans = document.querySelectorAll(".problems span")
        spans.forEach((span)=>{
            span.classList.remove("active")
        })
        if (title.value == '' ) {
            document.querySelector(".problems span:first-child").classList.add("active")
        }else if (price.value == '') {
            document.querySelector(".problems span:nth-child(2)").classList.add("active")
        }else if (count.value > 500 || count.value < 1) {
            document.querySelector(".problems span:nth-child(3)").classList.add("active")
        }else if (category.value == '') {
            document.querySelector(".problems span:nth-child(4)").classList.add("active")
        }
    }
}
function clearDate() {
    title.value = ''
    price.value = ''
    discount.value = ''
    ads.value = ''
    total.innerHTML = ''
    count.value = ''
    taxes.value = ''
    category.value = ''
}
appending()
function appending() {
    tableBody.innerHTML = ''
for (let i=0 ; i< products.length; i++) {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.appendChild(document.createTextNode(i + 1))
        tr.appendChild(td1)
        let td2 = document.createElement("td")
        td2.appendChild(document.createTextNode(products[i].title))
        tr.appendChild(td2)
        let td3 = document.createElement("td")
        td3.appendChild(document.createTextNode(products[i].price))
        tr.appendChild(td3)
        let td4 = document.createElement("td")
        td4.appendChild(document.createTextNode(products[i].taxes))
        tr.appendChild(td4)
        let td5 = document.createElement("td")
        td5.appendChild(document.createTextNode(products[i].ads))
        tr.appendChild(td5)
        let td6 = document.createElement("td")
        td6.appendChild(document.createTextNode(products[i].discount))
        tr.appendChild(td6)
        let td7 = document.createElement("td")
        td7.appendChild(document.createTextNode(products[i].total))
        tr.appendChild(td7)
        let td8 = document.createElement("td")
        td8.appendChild(document.createTextNode(products[i].category))
        tr.appendChild(td8)
        let td9 = document.createElement("td")
        td9.appendChild(document.createTextNode("Update"))
        td9.id = "update"
        tr.appendChild(td9)
        td9.setAttribute("onclick", `updating(${i})`)
        let td10 = document.createElement("td")
        td10.appendChild(document.createTextNode("Delete"))
        td10.setAttribute("onclick" , `deleteDate(${i})`)
        td10.id = "delete"
        tr.appendChild(td10)
        
        tableBody.appendChild(tr)
    }    
}
let deletButton = document.getElementById("delete")
function deleteDate(I) {
    products.splice(I,1)
    appending()
    window.localStorage.setItem(`products` , JSON.stringify(products))   
    window.location.reload()
}
let productsContent = document.querySelector(".product-management .product-content")
    if (products.length > 0) {
        
        let deleteAll = document.createElement("button")
        deleteAll.className = "deleteAll"
        deleteAll.appendChild(document.createTextNode(`Delete All(${products.length})`))
        productsContent.appendChild(deleteAll)
        deleteAll.onclick = function () {
            for (let i=0;i<products.length;i++) {
                // products = ''
                products.splice(0)
                appending()
                window.localStorage.removeItem("products")
            }
            deleteAll.remove()
        }
    }
let ubdateButton = document.getElementById("update")
function updating(I) {
    for (let i=0;i<products.length;i++) {
        if (i === I) {
            window.scrollTo({
                behavior: "smooth",
                top: 0
            })
            title.value = products[I].title
            price.value = products[I].price
            taxes.value = products[I].taxes
            ads.value = products[I].ads
            discount.value = products[I].discount
            category.value = products[I].category
            count.style.display = "none"
            createButton.value = "update"
            getTotal()
        }
        createButton.onclick = function () {
                products[I].title = title.value
                products[I].price = price.value
                products[I].taxes = taxes.value
                products[I].ads = ads.value 
                products[I].discount = discount.value
                products[I].category = category.value
                products[I].total = total.innerHTML
                appending()
                window.localStorage.setItem(`products` , JSON.stringify(products))
                createButton.value = "create"
                count.style.display = "block"
                title.value = ''
                price.value = ''
                taxes.value = ''
                ads.value = ''
                discount.value = ''
                category.value = ''
                total.parentElement.classList.remove("green")
                total.innerHTML = ''
                location.reload()
        }
    }
}
let searchMood = 'title';
let search = document.getElementById("search")
let searchTitle = document.getElementById('searchTitle')
let searchCategory = document.getElementById('searchCategory')
searchTitle.onclick = function () {
    searchMood = 'title';
    search.focus()
    search.value = ''
    appending()
    search.placeholder = 'Search By title'
}
searchCategory.onclick = function () {
    searchMood = 'category';
    search.focus()
    search.value = ''
    appending()
    search.placeholder = 'Search By Category'
}
    search.onkeyup = function () {
        tableBody.innerHTML = ''
        if (searchMood == 'title') {
            
            for (let i=0;i<products.length;i++) {
                if ((products[i].title.toLowerCase()).includes(this.value.toLowerCase())) {
                    let tr = document.createElement("tr")
                    let td1 = document.createElement("td")
                    td1.appendChild(document.createTextNode(i + 1))
                    tr.appendChild(td1)
                    let td2 = document.createElement("td")
                    td2.appendChild(document.createTextNode(products[i].title))
                    tr.appendChild(td2)
                    let td3 = document.createElement("td")
                    td3.appendChild(document.createTextNode(products[i].price))
                    tr.appendChild(td3)
                    let td4 = document.createElement("td")
                    td4.appendChild(document.createTextNode(products[i].taxes))
                    tr.appendChild(td4)
                    let td5 = document.createElement("td")
                    td5.appendChild(document.createTextNode(products[i].ads))
                    tr.appendChild(td5)
                    let td6 = document.createElement("td")
                    td6.appendChild(document.createTextNode(products[i].discount))
                    tr.appendChild(td6)
                    let td7 = document.createElement("td")
                    td7.appendChild(document.createTextNode(products[i].total))
                    tr.appendChild(td7)
                    let td8 = document.createElement("td")
                    td8.appendChild(document.createTextNode(products[i].category))
                    tr.appendChild(td8)
                    let td9 = document.createElement("td")
                    td9.appendChild(document.createTextNode("Update"))
                    td9.id = "update"
                    tr.appendChild(td9)
                    td9.setAttribute("onclick", `updating(${i})`)
                    let td10 = document.createElement("td")
                    td10.appendChild(document.createTextNode("Delete"))
                    td10.setAttribute("onclick" , `deleteDate(${i})`)
                    td10.id = "delete"
                    tr.appendChild(td10)
                    tableBody.appendChild(tr)
                }
            }            
        }else {
            tableBody.innerHTML = ''
            for (let i=0;i<products.length;i++) {
                if ((products[i].category.toLowerCase()).includes(this.value.toLowerCase())) {
                    let tr = document.createElement("tr")
                    let td1 = document.createElement("td")
                    td1.appendChild(document.createTextNode(i + 1))
                    tr.appendChild(td1)
                    let td2 = document.createElement("td")
                    td2.appendChild(document.createTextNode(products[i].title))
                    tr.appendChild(td2)
                    let td3 = document.createElement("td")
                    td3.appendChild(document.createTextNode(products[i].price))
                    tr.appendChild(td3)
                    let td4 = document.createElement("td")
                    td4.appendChild(document.createTextNode(products[i].taxes))
                    tr.appendChild(td4)
                    let td5 = document.createElement("td")
                    td5.appendChild(document.createTextNode(products[i].ads))
                    tr.appendChild(td5)
                    let td6 = document.createElement("td")
                    td6.appendChild(document.createTextNode(products[i].discount))
                    tr.appendChild(td6)
                    let td7 = document.createElement("td")
                    td7.appendChild(document.createTextNode(products[i].total))
                    tr.appendChild(td7)
                    let td8 = document.createElement("td")
                    td8.appendChild(document.createTextNode(products[i].category))
                    tr.appendChild(td8)
                    let td9 = document.createElement("td")
                    td9.appendChild(document.createTextNode("Update"))
                    td9.id = "update"
                    tr.appendChild(td9)
                    td9.setAttribute("onclick", `updating(${i})`)
                    let td10 = document.createElement("td")
                    td10.appendChild(document.createTextNode("Delete"))
                    td10.setAttribute("onclick" , `deleteDate(${i})`)
                    td10.id = "delete"
                    tr.appendChild(td10)
                    tableBody.appendChild(tr)
                }
            }  
        }
}

