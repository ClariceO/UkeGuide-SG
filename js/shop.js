// if document is still getting loaded
if (document.readyState == 'loading') {
  // listen to this event and call ready()
  document.addEventListener('DOMContentLoaded', ready)
} else {
  // if it is done loading call ready()
  ready()
}

// works only when page is loaded 
function ready() {
  // var stores the remove button
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  // Number input not less than 1 and change total
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }


  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


  // Add selected class to the current control button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("filter");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("selected");
      current[0].className = current[0].className.replace("selected", "");
      this.className += " selected";
    });
  }


}


function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  // remove child one by one through a while loop
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

// click event passed in as object
function removeCartItem(event) {
  // event has a property "target" = when button is clicked
  var buttonClicked = event.target
  // Remove product row
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

// when quantity is changed
function quantityChanged(event) {
  // target of event is the input
  var input = event.target
  // the value is NaN or not a -ve
  if (isNaN(input.value) || input.value <= 0) {
    // change/set input to back to 1
    input.value = 1
  }
  // call
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  // div
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  addItemToCart(title, price)
  updateCartTotal()
}

function addItemToCart(title, price) {
  // creates a div as cart row
  var cartRow = document.createElement('div')
  // cart-row class added to style
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  // name of item in cart
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    // name has alrd been added to cart
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      // exit this function straight away
      return
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
  // setting the inner HTML of cart row the code above
  cartRow.innerHTML = cartRowContents
  // adding the cart row to the cart items div
  cartItems.append(cartRow)
  // call event for the new element
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  // div class = cart-item, [0] = getting the first one only
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  // div class = cart-row 
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  // loop all cart-row
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  // getting the first innerText of the cartTotalPrice and update it to the total with $ added
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
// End of addToCart js





// Filter
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

// Show filtered elements
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


