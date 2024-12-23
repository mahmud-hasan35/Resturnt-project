// .......helper function........

let activeFoodItems = [];
let activeCartItems = [
//   {
//   "id": 27,
//   "category_id": "16",
//   "image": "https://course.divinecoder.com/images/1727075607.jpeg",
//   "name": "chicken Fry",
//   "price": "894",
//   "rating": "42",
//   "rating_count": "35",
//   "facilities": "best food",
//   "category_name": "Chicken Fry"
// },
// {
//   "id": 42,
//   "category_id": "16",
//   "image": "https://course.divinecoder.com/images/1727082896.jpg",
//   "name": "chicken Fry",
//   "price": "343",
//   "rating": "23",
//   "rating_count": "21",
//   "facilities": "food",
//   "category_name": "Chicken Fry"
// },
// {
//   "id": 23,
//   "category_id": "13",
//   "image": "https://course.divinecoder.com/images/1727028132.jpg",
//   "name": "Burger",
//   "price": "99",
//   "rating": "40",
//   "rating_count": "60",
//   "facilities": "50",
//   "category_name": "Burger"
// },
// {
//   "id": 34,
//   "category_id": "44",
//   "image": "https://course.divinecoder.com/images/1727082034.jpg",
//   "name": "spring rools",
//   "price": "543",
//   "rating": "58",
//   "rating_count": "55",
//   "facilities": "best food",
//   "category_name": "Spring rools"
// },
// {
//   "id": 24,
//   "category_id": "13",
//   "image": "https://course.divinecoder.com/images/1727030408.jpg",
//   "name": "Cheese Burger",
//   "price": "199",
//   "rating": "5",
//   "rating_count": "470",
//   "facilities": "Sed voluptatum cumqu",
//   "category_name": "Burger"
// },
// {
//   "id": 53,
//   "category_id": "13",
//   "image": "https://course.divinecoder.com/images/1727084159.jpg",
//   "name": "burger",
//   "price": "321",
//   "rating": "32",
//   "rating_count": "34",
//   "facilities": "best food",
//   "category_name": "Burger"
// }
];




let menuToggle = document.getElementById('menu-toggle');
let menuList = document.getElementById('menu-list');

menuToggle.addEventListener('click', function() {
  menuList.classList.toggle('active');
  
})
// function menu_responsive() {
//   let menuToggle = document.getElementById('menu-toggle');
//   let menuList = document.getElementById('menu-list');

//   menuToggle.addEventListener('click', function() {
//       menuList.classList.toggle('active');    
//   });
// }


FoodCategories();
appendFoodItemsToHtml("https://course.divinecoder.com/food/random/6");
cartItemCount();
removeItemFromCart();
quantityHandler();
clearCartHandler();





function foodCart (food){
  let facilities = food.facilities.split(', ').map(item => {
    return `<li class="position-relative">${item}</li>`;
  });


  return `<div class="col-lg-4 mb-4">
              <div class="food-cart-item">
                <div class="img position-relative">
                <img class="img-fluid w-100" src="${food.image}" alt="image">
                <div class="overlay position-absolute d-flex align-items-center">
                  <span>price: ${food.price}/=</span>
                  <i class="fa-solid fa-star"></i>
                  <span> ${food.rating} (${food.rating_count})</span>
                </div>
              </div>
              <div class="text">
                <h4 class="pb-2">${food.name}</h4>
                <ul class="list-unstyled d-flex flex-wrap">
                ${facilities.join(' ')}
                  
                </ul>
              </div>
              <a href="#" data-id="${food.id}" class="${food.isAddedToCart ? "active": ''}  add-to-cart d-flex justify-content-center align-items-center text-decoration-none">
                <i class="fa-solid fa-cart-plus"></i>
              <span class="d-inline-block">${food.isAddedToCart ? "Added to cart" : 'Add to cart'}</span>
            </a>
            </div>
            </div>`
          }

async function appendFoodItemsToHtml(link,callback = () =>{}) {
  try {

    let response = await fetch(link);
    let data = await response.json();
    document.getElementById('food-gallery').innerHTML = '';

    data = Array.isArray(data) ? data: data.data;

    activeFoodItems = data.map(item =>{

    let checkActivity = activeCartItems.some(activeItem => activeItem.id == item.id);
    return {
      ...item,
      isAddedToCart: checkActivity,
    };
  });
  
  console.log(activeFoodItems);
  

    document.getElementById('food-gallery').innerHTML = activeFoodItems.map(food => foodCart(food)).join('');

  callback();
  addTocartHandler();

    // let fainalOutput  {


  }catch (error){
    console.log(error);
    
  }

}

async function FoodCategories() {
  FoodCategories();

async function FoodCategories(){
  
    
    try {
        let response = await fetch('https://course.divinecoder.com/food-categories');
        let data = await response.json();
        console.log(data);
        
        document.getElementById('category_list').innerHTML = '';
        document.getElementById('category_list').innerHTML = data.map(item => `<li data-id="${item.id}"><a class="text-decoration-none d-inline-block text-uppercase" href="#">${item.name}</a></li>`).join('');
        
        // data.forEach ((item) => {
        //     document.getElementById('category_list').innerHTML += 
        // })

        foodItemsByCategory();
        

    } catch (error) {
      console.log(error);
      
  }
  
}

}


//  function randomFoods (){
//   appendFoodItemsToHtml('https://course.divinecoder.com/food/random/6');
  
// }

async function foodItemsByCategory(){
  
  let lis = document.querySelectorAll('#category_list li');
  
let finalLiList = Array.from(lis).map(li => {
  li.addEventListener('click', function(event){
    event.preventDefault();
    let categoryId = li.getAttribute('data-id')
    li.classList.add('active');

    appendFoodItemsToHtml(`https://course.divinecoder.com/food/by-category/${categoryId}/6`,() =>{
      li.classList.remove('active');

    });
    
    
  })
  
})

}

function cartItemCount() {
  let cartItemElement = document.querySelectorAll('.cart_item_count');
  let count = activeCartItems.length;
  count = count > 9 ? count : '0' + count;
  Array.from(cartItemElement).forEach(element => {
    if(count > 0) {
      element.classList.remove('d-none')
    } else {
      element.classList.add('d-none')
    }
    element.textContent = count;
  })
  
}

function addTocartHandler() {
  let addToCartBtns = document.querySelectorAll('.add-to-cart');
  Array.from(addToCartBtns).forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      let id = btn.getAttribute('data-id');
      let cartItem = activeFoodItems.find(item => {
        return item.id ==id;
      })
      let checkActivity = activeCartItems.some(item => item.id == id);
      if (checkActivity == false) {
        activeCartItems.push({
          id: cartItem.id,
          image: cartItem.image,
          price: Number(cartItem.price),
          name: cartItem.name,
          quantity: 1,
          total: Number(cartItem.price),
        })
      }
      
      cartItemCount();
      appendCartPopup();
      changeButtonDesign(id)
      totalCount();

      
    })
  })
  
}
function appendCartPopup() {
  let cartHtml = (food) => {
    return `<tr>
                    <td>
                        <img src="${food.image}" alt="img">
                    </td>
                    <td>
                        <span class="title">${food.name}</span>
                    </td>
                    <td>
                        <span class="price">TK: ${food.price}</span>
                    </td>
                    <td>
                        <div class="quantity-area d-flex align-items-center">
                            <span class="quantity d-block mr-2">${food.quantity}</span>
                            <div class="plus-minus">
                                <ul class="d-flex list-unstyled m-0">
                                    <li data-id="${food.id}" class=" quantity-decrement d-flex justify-content-center align-items-center"><i class="fa-solid fa-minus"></i></li>
                                    <li data-id="${food.id}" class=" quantity-increment d-flex justify-content-center align-items-center"><i class="fa-solid fa-plus"></i></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="total">TK: ${food.total}</span>
                    </td>
                    <td>
                        <span class="action">
                            <i data-id="${food.id}"  class=" delete-cart-item fa-solid fa-trash-can"></i>
                        </span>
                    </td>
                  </tr>`;
  }
  let cartItemLooping = activeCartItems.map(food => {
    return cartHtml(food);
  })
  document.getElementById('cart_Item_Table').innerHTML = cartItemLooping.join('');
}

function changeButtonDesign(id){
  let myButton = document.querySelector(`.add-to-cart[data-id="${id}"]`)
  myButton.classList.toggle('active');

  if (myButton.classList.contains('active')) {
    myButton.querySelector('span').textContent = 'added to cart';
  }else {
    myButton.querySelector('span').textContent = 'Add to cart';
  }
};



function removeItemFromCart() {
  let cartTable = document.getElementById('cart_Item_Table');
  cartTable.addEventListener('click', function(event) {
    let checkElement = event.target;
    if(event.target.classList.contains('delete-cart-item')) {
      let id = event.target.getAttribute('data-id');

      activeCartItems = activeCartItems.filter(function(item){
        return item.id != id;
      });

      cartItemCount();
      appendCartPopup();
      changeButtonDesign(id);
      totalCount();

      
    }
  })
   
}


function totalCount(){
  let count = activeCartItems.reduce((total, runningItem) => {
    return (total + runningItem.total);
  }, 0)
  let totalText = `Total Amount: ${count} Tk`;
  document.getElementById('total-count-element').innerHTML = totalText;
}


function quantityHandler() {
  let cartTable = document.getElementById('cart_Item_Table');
  cartTable.addEventListener('click', function(event) {
    let activeTag = event.target;
    // event.target.classList.contains('quantity-decrement')
    if(event.target.closest('.quantity-increment')){
      let id = event.target.closest('.quantity-increment').getAttribute('data-id');
      let targetItem = activeCartItems.find(item => item.id == id);
      if(targetItem.quantity <= 5) {
        targetItem = {
          ...targetItem,
          quantity: targetItem.quantity + 1,
          total: targetItem.total + targetItem.price,
        }


      }

      activeCartItems = activeCartItems.map(item => {
        if(item.id == id) {
          return targetItem;
        } else {
          return item;
        }
      })

      appendCartPopup();
      totalCount();

    }
    if(event.target.closest('.quantity-decrement')){
      let id = event.target.closest('.quantity-decrement').getAttribute('data-id');
      let targetItem = activeCartItems.find(item => item.id == id);
      if(targetItem.quantity > 1) {
        targetItem = {
          ...targetItem,
          quantity: targetItem.quantity - 1,
          total: targetItem.total - targetItem.price,
        }


      }

      activeCartItems = activeCartItems.map(item => {
        if(item.id == id) {
          return targetItem;
        } else {
          return item;
        }
      })

      appendCartPopup();
      totalCount();

    }

    
    
  })
}



function clearCartHandler() {
  let clearCartBtn = document.getElementById('clear-cart');

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function (event) {
      event.preventDefault();
      activeCartItems = [];
      cartItemCount(); 
      appendCartPopup(); 
      totalCount();

      console.log('Cart has been cleared.');
    });
  } else {
    console.error('Clear Cart button not found.');
  }
}




