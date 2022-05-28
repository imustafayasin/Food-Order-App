let contentWrapper = document.querySelector("#app .content");
let appHead = document.querySelector("#app .head");
let productsWrapper = document.querySelector("#app .products");
let basketWrappper = document.querySelector("#app .basket");
let basketItemsWrapper = document.querySelector("#app .basket .basketItems");
let collectionsWrapper = document.querySelectorAll(".collections .collection");
let productPageWrapper = document.querySelector("#app .product-page");
let contentPageWrapper = document.querySelector("#app .content");


const basket = [];

contentWrapper.addEventListener('scroll', (e) => {
    e.target.scrollTop > appHead.clientHeight ? appHead.classList.add("scroll") : appHead.classList.remove("scroll");
});

productsWrapper.innerHTML = "<p class='loader'><span></span></p>";

fetch('products.json')
    .then(response => response.json())
    .then(products => {
        showProducts(products, "")



        /*Created Elements Events */

        selectedCategory(products)
        renderProduct(products);

    })

function showProducts(products, category) {
    productsWrapper.innerHTML = ""

    !category ? shuffle(products) : products
    products.map(p => {

        if (category != "" ? p.category == category : category == "" ? true : false) {
            productsWrapper.innerHTML += `<div  class="product">
    <div class="rating text-gray">${p.rate} <div class="star">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 511.98685 511">
                <path
                    d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                    fill="#ffc107" />
            </svg>
        </div>
    </div>
    <div  class="image"><img width="120" height="130"  class="go-product" data-handle="${p.id}" src="${p.img}" alt="${p.title}">
        <button data-id="${p.id}" class="add-basket"><svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 448" >
                <path
                    d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
            </svg></button>
    </div>
    <div data-handle="${p.id}" class="title go-product">${p.title}</div>
    <div class="price"><sup currency>$</sup>${p.price}</div>`;
        }



    });
    AddToBasket(products);
    renderProduct(products);
}
function AddToBasket(products) {

    const addToCartButtons = document.querySelectorAll(".add-basket");

    addToCartButtons.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let finded = products.find(x => x.id == this.dataset.id);
            Cart.add(finded);
        })
    })
};

function selectedCategory(product) {
    collectionsWrapper.forEach(collection => {
        collection.addEventListener('click', function (e) {
            productsWrapper.innerHTML = "<p class='loader'><span></span></p>";
            collectionsWrapper.forEach(c => {

                c.classList.remove("active");
            });
            this.classList.add("active");
            showProducts(product, this.dataset.name);

        });

    });

}


let Cart = {
    add: function (p) {
        let inBasket = basket.find(b => b.id == p.id);

        !inBasket ? (basket.push(p), p.qty = 1) : inBasket.qty >= 3 ? inBasket.qty = 0 : inBasket.qty += 1;

        basket.length > 3 ? basket.length = 0 : basket.length > 0 ? this.show() : this.hide();
    },
    remove: function (p) {

    },
    show: function () {
        basketWrappper.classList.add("active");
        basketItemsWrapper.innerHTML = "";
        basket.forEach(item => {
            basketItemsWrapper.innerHTML += `<div class="item"><img src="${item.img}"><span class="qty">${item.qty}</span></div>`;
        })
    },
    hide: function () {
        basketWrappper.classList.add("remove");
    }
};

function renderProduct(products) {
    let productsViewItems = document.querySelectorAll(".products .product .go-product");
    productsViewItems.forEach(p => {
        p.addEventListener('click', function () {
            let selectedProduct = products.find(pr => pr.id == this.dataset.handle);
            Product.render(selectedProduct);
        })

    });
    let backButton = document.querySelector("#app .head .go-back");
    backButton.addEventListener('click', function () {
        Product.back();
    })
}
let Product = {
    render: function (product) {
        productPageWrapper.innerHTML = `
        <div class="rate"> 
            <div class="star">${product.rate} <svg width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 511.98685 511"> <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107" /> </svg> </div></div>
        <div class="title">${product.title}</div>
        <img width="250" height="330" src="${product.img}">
        <div class="qty">
            <button onclick="this.nextElementSibling.stepDown()" class="less">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 124 124" xml:space="preserve"> <g> <path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z"/> </g> </svg>
            </button>
            <input min="0" max="9" type="number" disabled value="${product.qty ? product.qty : 1}" maxlength="1" id="qty-input">
            <button onclick="this.previousElementSibling.stepUp()" class="more"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"></path></svg>
            </button>

      </div>
      <div class="price"><sup currency>$</sup>${product.price}</div> 
      
      <p class="desc">See Description</p>`;

        this.show();
    },
    show: function () {
        contentPageWrapper.classList.add("hide");
        setTimeout(() => contentPageWrapper.setAttribute("hidden", ""), 250);
        productPageWrapper.classList.add("show");
        document.querySelector(".go-search-or-like").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -28 512.001 512" style="&#10;    width: 24px;&#10;    height: 24px;&#10;"><path d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/></svg>`;
        document.querySelector(".go-search-or-like").setAttribute("like", "");
    },
    back: function () {
        contentPageWrapper.classList.remove("hide");
        setTimeout(() => contentPageWrapper.removeAttribute("hidden", ""), 250);
        productPageWrapper.classList.remove("show");
        document.querySelector(".go-search-or-like").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="width: 24px;height:24px;enable-background:new 0 0 511.999 511.999;" xml:space="preserve"> <g> <g> <path d="M225.773,0.616C101.283,0.616,0,101.622,0,225.773s101.284,225.157,225.773,225.157s225.774-101.006,225.774-225.157    S350.263,0.616,225.773,0.616z M225.773,413.917c-104.084,0-188.761-84.406-188.761-188.145    c0-103.745,84.677-188.145,188.761-188.145s188.761,84.4,188.761,188.145C414.535,329.511,329.858,413.917,225.773,413.917z" /> </g> </g> <g> <g> <path d="M506.547,479.756L385.024,358.85c-7.248-7.205-18.963-7.174-26.174,0.068c-7.205,7.248-7.174,18.962,0.068,26.174    l121.523,120.906c3.615,3.59,8.328,5.385,13.053,5.385c4.756,0,9.506-1.82,13.121-5.453    C513.82,498.681,513.789,486.967,506.547,479.756z" /> </g> </g> </svg>`;
        document.querySelector(".go-search-or-like").removeAttribute("like");
    }
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;


    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}