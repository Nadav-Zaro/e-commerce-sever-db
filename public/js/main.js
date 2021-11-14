// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

let catList;

function showCategory(cat, div) {
    axios.get(`/products/${cat}`)
        .then((res) => {
            catList = res.data;
            catList.forEach((element, index) => {
                div.innerHTML += `<div class="card">
            <div class="picHolder">
            <img class="cardPic firstPic" src="${element.pictures[0]}">
            <img class="cardPic secondPic" src="${element.pictures[1]}">
            </div>
            <div class="furInfo">
            <p style="text-align:center;"><i style="height:100%;" class="fa fa-camera"></i>
            <button class="chnagePic" onclick="changePic(${index})">1 </button>/ <button class="chnagePic1" onclick="changePic1(${index})">2</button></p>
            <p style="text-align:center;font-weight: 600;">"${element.furName}"</p>
            <p class="cardText">Description: ${element.description}</p>
            <p class="cardText">Category: ${element.category}</p>
            <p class="cardText">Price: ${element.price}$</p>
            <div style="display:flex;justify-content:space-around;">
            <button class="btn" type="button" onclick="addProdToCart(${index})"><i class="fa fa-shopping-cart"></i></button>
            <button class="btn" type="button" onclick="upDocs(${index})"><i class="fa fa-pencil"></i></button>
            <button class="btn" type="button" onclick="deleteProdById(${index})"><i class="fa fa-minus"></i></button>
            </div>
            </div>
            </div>`;
            });
        })
        .catch(err => console.log(err))
};

function upDocs(i) {
    upDoc.style.visibility = "visible";
    document.getElementById("furName").value = catList[i].furName;
    document.getElementById("price").value = catList[i].price;
    document.getElementById("description").value = catList[i].description;
    document.getElementById("category").value = catList[i].category;
    document.getElementById("picture1").value = catList[i].pictures[0];
    document.getElementById("picture2").value = catList[i].pictures[1];
    console.log(catList[i]);
    prodContainer.innerHTML = `<img src="${catList[i].pictures[0]}" style="width:85%;height: 50%;border-radius:5px;" id="img";>
    <h2 id="name">${catList[i].furName}</h2>
    <p id="id">Description:${catList[i].description}</p>
    <p id="Category">Category:${catList[i].category}</p>
    <p id="Price">Price:${catList[i].price}$</p><br>
    <p id="upd"></p>
    `;
    document.getElementById("updateProduct").addEventListener("submit", update);
    function update(e) {
        e.preventDefault()
        const furName = document.getElementById("furName").value
        const price = document.getElementById("price").value
        const description = document.getElementById("description").value
        const category = document.getElementById("category").value
        const picture1 = document.getElementById("picture1").value
        const picture2 = document.getElementById("picture2").value
        axios
            .patch(`/products/${catList[i]._id}`, {
                 furName:furName, price:price, description:description, category:category, pictures: [picture1, picture2]
            })
            .then(function (response) {
                console.log(response);
                document.getElementById("upd").innerText = "Product updated";
                setTimeout(() => {
                    document.getElementById("upd").innerText = "";
                }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

function exit() {
    document.getElementById("close").addEventListener("click", () => {
        upDoc.style.visibility = "hidden";
    })
}

function mediaQueryNav() {
    var queryBtn = document.getElementById("queryBtn");
    var queryLinks = document.getElementById("queryLinks");
    var closeNav = document.getElementById("closeNav");
    queryBtn.addEventListener("mouseenter", () => { queryLinks.style.visibility = "visible" })
    closeNav.addEventListener("click", () => { queryLinks.style.visibility = "hidden" })
}
mediaQueryNav()

const firstPic = document.getElementsByClassName("firstPic");
const secondPic = document.getElementsByClassName("secondPic");
function changePic(i) {
    firstPic[i].style.opacity = 1;
    secondPic[i].style.opacity = 0;
}
function changePic1(i) {
    firstPic[i].style.opacity = 0;
    secondPic[i].style.opacity = 1;
}

function deleteProdById(i) {
    axios.delete(`/products/${catList[i].id}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err
        })
}

let cartId = 0;
function addProdToCart(i) {
    console.log(catList[i]);
    axios.patch(`/cart/update`, {
        cartId: cartId, id: catList[i].id, furName: catList[i].furName, description: catList[i].description, category: catList[i].category, price: catList[i].price, pictures: catList[i].pictures[0]
    })
        .then(res => { console.log(res); })
        .catch(err => console.log(err))
}

let cart, sum = 0;
function showCart() {
    axios.get("/cart")
        .then((res) => {
            cart = res.data[0].cart;
            cart.forEach((element, index) => {
                console.log(element);
                sum += element.price
                table.innerHTML += `                
            <tr class="row" id="${element.id}">
            <td class="item">
                <div class="furInfo">
                    <div class="furImg">
                        <img src="${element.pictures}">
                    </div>
                    <div class="furDetail">
                        <h3>"${element.furName}"</h3>
                        <p>${element.description}</p>
                        <p>${element.category}</p>
                        <div class="options"> 
                            <select>
                                <option>Color</option>
                                <option>Black</option>
                                <option>White</option>
                                <option>Peach</option>
                            </select>
                            <select>
                                <option>Quantity</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select><br>
                        </div><br>
                        Remove: <button onclick= "removeFromCart(${index})" class="removeItem" type="button""><i class="fa fa-minus"></i></button>
                    </div>
                    <div class="furPrice"><h3>${element.price}$</h3></div>
                </div>
            </td>
            </tr>`;
            });
            summary.innerText = `${sum}$`;
            totalItems.innerText = cart.length;
            if (cart.length == 0) {
                delivery.innerText = `0$`;
                summary2.innerText = `0$`;
            }
            else { delivery.innerText = `150$`; summary2.innerText = `${sum + 150}$`; };

        })
        .catch(err => { throw err })
}

function removeFromCart(i) {
    console.log(cart[i].cartId);
    axios.patch(`/cart/delete`, { cartId: cart[i].cartId })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err
        })
}


function newOrder() {
    formContainer.style.visibility = "visible"
    document.getElementById("form").addEventListener("submit", sendOrder)
    function sendOrder(e) {
        e.preventDefault()
        const firstName = document.getElementById("firstName").value
        const LastName = document.getElementById("LastName").value
        const email = document.getElementById("email").value
        const tel = document.getElementById("tel").value
        const date = document.getElementById("date").value
        const time = document.getElementById("time").value
        const creditCard = document.getElementById("number").value
        if (creditCard == undefined || creditCard.length == 0) {
            return error;
        }
        axios
            .post(`/orders`, {
                firstName: firstName, LastName: LastName, email: email, tel: tel, date: date, time: time, creditCard: creditCard
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

function exitForm() {
    document.getElementById("exitForm").addEventListener("click", () => {
        formContainer.style.visibility = "hidden";
    })
}

function removeAllItems() {
    document.getElementById("removeOrders").addEventListener("click", () => {
        axios.patch(`/cart/deleteAll`, {})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                throw err
            })
    })
}

function orderSent() {
    const submit = document.getElementById("send");
    const orderSent = document.getElementById("orderSent");

    submit.onclick = () => {
        orderSent.style.visibility = "visible";
        orderSent.style.transform = "scale(1)";
        setTimeout(() => {
            orderSent.style.visibility = "hidden";
            orderSent.style.transform = "scale(.1)";
        }, 1500);
    }
}
