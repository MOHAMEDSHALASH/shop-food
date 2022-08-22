// loading store in sessionStorage
let loading=document.getElementById('loading');
if(sessionStorage.loading!=null){
    loading.classList.add(sessionStorage.loading)
}
setTimeout(()=>{
    loading.classList.add('loading-close')
    sessionStorage.setItem("loading","loading-close")
},2500)
let temp;
// open cart when click icon cart in header and sessionStorage
let btnOpenCart=document.getElementById("cart");
let btnCloseCart=document.getElementById("close-cart");
let cartPage=document.querySelector(".cart-page");
if(sessionStorage.openCart!=null){
    cartPage.classList.add(sessionStorage.openCart)
}
btnOpenCart.onclick=function(){
    cartPage.classList.add("cart-page-open")
    sessionStorage.setItem("openCart","cart-page-open")
}
btnCloseCart.onclick=function(){
    cartPage.classList.remove("cart-page-open")
    sessionStorage.removeItem("openCart")
}

// in click value in input num in section box
let inputBox=document.querySelectorAll(".dishes-box section input")
inputBox.forEach((eo)=>{
    eo.addEventListener("input",(e)=>{
        let price=e.target.parentElement.parentElement.querySelector(".price");
        let countItems=e.target.parentElement.parentElement.querySelector("input");
        let price2=e.target.parentElement.parentElement.querySelector(".price span");
        price2.innerHTML=price.dataset.price*countItems.value
    })
})

// make items 
let btnAddToCart=document.querySelectorAll(".dishes-box section button")
// condition if local
let arrData;
if(localStorage.product!=null){
    arrData=JSON.parse(localStorage.product)
}else{
    arrData=[];
}
btnAddToCart.forEach((eo)=>{
    eo.addEventListener("click",(e)=>{
        let title=e.target.parentElement.querySelector("#title");
        let img=e.target.parentElement.querySelector("img");
        let price=e.target.parentElement.querySelector(".price span")
        let countItems=e.target.parentElement.querySelector("input")
        let objectData={
            title:title.innerHTML,
            img:img.src,
            price:+price.innerHTML,
            countItems:countItems.value
        }
        arrData.unshift(objectData)
        // localStorage
        localStorage.setItem("product", JSON.stringify(arrData))
        showData()
        NumItems()
        inputCart()
        total()
        let msgAdd=document.createElement("div")
        msgAdd.className="msg-add"
        msgAdd.innerHTML="Successfuly Added"
        let body=document.getElementById('body')
        body.appendChild(msgAdd)
        setTimeout(()=>{
            msgAdd.remove()
        },800)
    })
})

// function show data in page
function showData(){
    let table='';
    for(i=0;i<arrData.length;i++){
        table +=`
        <section>
        <h3>- ${arrData[i].title}</h3>
        <div class="count-items">
        <input id="in1" type="number" max="10" min="1" value="${arrData[i].countItems}">
        <h2 ><span data-price="${arrData[i].price/arrData[i].countItems}" id="price-in-cart">${arrData[i].price}</span> $</h2>
        </div>
        <img src="${arrData[i].img}" alt="">
        <div onclick="deleteItems(${i})" class="delete"><i class="fa-solid fa-trash-can"></i></div>
        </section>
        `
    }
    let cardPage=document.getElementById("cart-items")
    cardPage.innerHTML=table;
}
showData()

// function number items    and not found items   and total price
function NumItems(){
    let numItems=document.getElementById("count-cart");
    let noItems=document.getElementById("null");
    let totalData=document.querySelector(".total");
    if(arrData.length>0){
        numItems.innerHTML=arrData.length;
        numItems.style.display="flex"
        noItems.style.display="none"
        totalData.style.display="block"
    }
    else{
        numItems.style.display="none"
        noItems.style.display="flex"
        totalData.style.display="none"
    }
}
NumItems()

// function delete items
function deleteItems(i){
    console.log(i)
    arrData.splice(i,1)
    localStorage.product=JSON.stringify(arrData)
    showData()
    NumItems()
    total()
    let msgAdd=document.createElement("div")
    msgAdd.className="msg-add"
    msgAdd.innerHTML="Delete Successfuly "
    cartPage.appendChild(msgAdd)
    setTimeout(()=>{
        msgAdd.remove()
    },800)
}

// function when change value of count in cart
function inputCart(){
    let inputcart=document.querySelectorAll("#in1")
    inputcart.forEach((eo)=>{
    eo.addEventListener("input",(e)=>{
        let newPrice=e.target.parentElement.querySelector("h2 span");
        let newPrice2=e.target.parentElement.querySelector("h2 span").dataset.price;
        newPrice.innerHTML=e.target.value*newPrice2
        let objectData={
            price:newPrice.innerHTML,
        }
        arrData[i]=objectData
        total()
    })
})
}
inputCart()
// total price
function total(){
    let totalData=document.getElementById("totalData");
    let sum=0;
    for(let i=0;i<arrData.length;i++){
        sum+= +arrData[i].price;
    }
    totalData.innerHTML=sum
}
total()

// scroll
let dishes=document.getElementById('dishes')
let about=document.getElementById('about')

window.onscroll=function(){
    if(scrollY <= 500){
        a1.classList.add("active")
        a2.classList.remove("active")
        a3.classList.remove("active")
    }
    if(scrollY >= dishes.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.add("active")
        a3.classList.remove("active")
    }
    if(scrollY >= about.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.remove("active")
        a3.classList.add("active")
    }
}