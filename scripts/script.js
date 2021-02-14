// Script.js
const myStorage = window.localStorage
let objArray;
let count = 0;
let cart = [];
if (myStorage.getItem('cart') === null){
  myStorage.setItem('cart', cart);
}
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (myStorage.getItem('array') === null){
      myStorage.setItem('array', JSON.stringify(data));
      console.log(myStorage.getItem('array'));
    }
    const itemData = myStorage.getItem('array');
    objArray = [...JSON.parse(itemData)];
    console.log(objArray);
    updatePageByCart();
    console.log(cart);
    objArray.forEach(obj => {
      const productItem = document.createElement('product-item');
      productItem.setAttribute('id', obj.id);
      if (cart.includes(productItem.getAttribute('id'))){
        productItem.shadowRoot.querySelector('button').textContent = 'Remove from Cart';
      }
      productItem.setAttribute('img', obj.image);
      productItem.setAttribute('img-alt', obj.title);
      productItem.setAttribute('item-title', obj.title);
      productItem.setAttribute('price', obj.price);
      document.getElementById('product-list').appendChild(productItem);
    }
    )
  });
});

const onClick = e => {
  e.preventDefault();
  if (e.target.textContent === 'Add to Cart'){
    alert('Added to cart!');
    e.target.textContent = 'Remove from Cart';
    e.target.parentElement.setAttribute('inCart', 'true');
    count++;
    cart.push(e.target.parentElement.getAttribute('id'));
    console.log(e.target.parentElement.getAttribute('id'));
  } else {
    alert('Removed from cart!');
    e.target.textContent = 'Add to Cart';
    e.target.parentElement.setAttribute('inCart', 'false');
    count--;
    cart = cart.filter(item => item !== e.target.parentElement.getAttribute('id'));
  }
  updateCart();
}

const updatePageByCart = () => {
  if(myStorage.getItem('cart').length != 0){
    cart = myStorage.getItem('cart').split(',');
  }
  console.log(cart);
  // const Items = document.querySelectorAll('product-item');
  // console.log(Items);
  // Items.forEach(item => {
  //   console.log(item.getAttribute('id'));
  //   if (cart.includes(item.getAttribute('id'))){
  //     item.querySelector('button').textContent = 'Remove from Cart';
  //   }
  // })
  count = cart.length;
  document.getElementById('cart-count').textContent = count;
}

const updateCart = () => {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = count;
  myStorage.setItem('cart', cart);
  console.log(myStorage.getItem('cart'));
}