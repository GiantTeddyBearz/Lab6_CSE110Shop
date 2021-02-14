// product-item.js

// <li class="product">
//     <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
//     <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
//     <p class="price">$109.95</p>
//     <button onclick="alert('Added to Cart!')">Add to Cart</button>
// </li>
class ProductItem extends HTMLElement {
  constructor () {
    super(); //always call super?
    
    //create shadow dom
    const shadow = this.attachShadow({mode: 'open'});

    //CREATE NEEDED ELEMENTS
    //List
    const liElem = document.createElement('li');
    liElem.setAttribute('class','product');

    //Img
    const imgElem = document.createElement('img');
    imgElem.setAttribute('width', '200');

    //Title
    const pElem1 = document.createElement('p');
    pElem1.setAttribute('class', 'title');
    
    //Price
    const pElem2 = document.createElement('p');
    pElem2.setAttribute('class', 'price');

    
    //Button
    const buttonElem = document.createElement('button');
    buttonElem.textContent = 'Add to Cart';
    buttonElem.setAttribute('onClick','onClick(event)');

    const style = document.createElement('style');
    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    `
    shadow.appendChild(style);
    shadow.appendChild(liElem);
    liElem.appendChild(imgElem);
    liElem.appendChild(pElem1);
    liElem.appendChild(pElem2);
    liElem.appendChild(buttonElem);

  }
  connectedCallback() {
    fill(this);
  }
}

customElements.define('product-item', ProductItem);

function fill(elem) { // this was painful to figure out... like why...
  //filling in elements
  //img
  console.log('using fill')
  const shadow = elem.shadowRoot;
  let imgElem = shadow.querySelector('img');
  let pElem1 = shadow.querySelector('.title');
  let pElem2 = shadow.querySelector('.price');
  let liElem = shadow.querySelector('li');

  const imgUrl = elem.getAttribute('img');
  const imgAlt = elem.getAttribute('img-alt')
  imgElem.src = imgUrl;
  imgElem.alt = imgAlt;

  //pElem1 - title
  const text = elem.getAttribute('item-title');
  pElem1.textContent = text;

  //pElem2 - price
  const price = '$' + elem.getAttribute('price');
  pElem2.textContent = price;

  liElem.setAttribute('id', elem.getAttribute('id'));
}