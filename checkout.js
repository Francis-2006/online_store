

//toggling menu bar
let bars =document.querySelector('.fa-bars');
let menu = document.querySelector('.menulist');

bars.addEventListener('click',(e)=>{

menu.classList.toggle("menuToggle");

})

//  getting all the values in the form
const PlaceOrderBut = document.getElementById('order-btn');
PlaceOrderBut.addEventListener('click',(event)=>{
event.preventDefault();

let firstName=document.querySelector('.firstname').value;
let secondName=document.querySelector('.secondname').value;
let address=document.querySelector('.address').value;
let city=document.querySelector('.city').value;

let regionValue=document.getElementById('selectRegion').value;

let tel=document.querySelector('.tel').value;
let email=document.querySelector('.email').value;

let textMessage =document.getElementById('add-info').value;

const deliveryMode =document.getElementById('deliveryMode').value;

// console.log(deliveryMode);

// getting name and quantity from local storage

let quantity =localStorage.getItem('quantity');
let name =localStorage.getItem('name');

 // Create WhatsApp message content
let message = `Hello Asimav Vent, I would like to order: 
Product Name: ${name} 

Quantity: ${quantity} 

ORDER DETAILS
__________________ 
Name: ${firstName} ${secondName} 
House number/Street name: ${address} 
 
Town: ${city} 
Region: ${regionValue} 
Phone: ${tel} 
Email: ${email} 

Additional Info: ${textMessage} 
Delivery Type: ${deliveryMode}
Payment Status: PAID
`;

// validating the form
if (regionValue === "") {
alert("Please select a region.");
} else if (deliveryMode === "") {
alert("Please select a delivery mode.");
 ;
} else if (
!firstName ||
!secondName ||
!email ||
!tel ||
!address ||
!city
) {
alert("Please complete all the required fields in the form.");
} else {

    // calcilating the amount
    let price =localStorage.getItem('price');
    let quantity =localStorage.getItem('quantity');
    let amount = (price* quantity)*100;

    
    var handler = PaystackPop.setup({
        key: 'pk_test_f205ea96eec55f5ba434a42223657c97ccbdf449', // Your Paystack public key
        email: email, // Customer's email
        amount: amount, // Amount in kobo (₦100.00)
        currency: 'GHS', // Currency
        callback: function(response) {
            // This function is called after a successful payment
            alert('Payment successful! Reference: ' + response.reference);
            // You can send the response.reference to your server for verification


      

     // WhatsApp redirect
     const whatsappNumber = '+233534068811'; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Confirmation message
    alert('Your order has been submitted! You will now be redirected to WhatsApp to confirm your order.');

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;




   






        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe(); // Open the Paystack payment modal



}





})


function showCart(e) {
let name =localStorage.getItem('name');
let price =localStorage.getItem('price');
let quantity =localStorage.getItem('quantity');
let image =localStorage.getItem('Image');
// let size =localStorage.getItem('size');
let total =localStorage.getItem('total');

let tbody = document.querySelector('.tbody');

// retrieve image 
const row = document.createElement('tr')

const ImgCell = document.createElement('td');
const img = document.createElement('img');
img.src=image;
ImgCell.appendChild(img);
row.appendChild(ImgCell);

img.style.width='50px';



// retrieve name from local storage to table

const nameCell = document.createElement('td');
nameCell.textContent=name;

row.appendChild(nameCell);

// retrieve price from local storage to table
const priceCell = document.createElement('td');
priceCell.textContent=`GHS${price}`;

row.appendChild(priceCell);

// retrieve quantity from local storage to table
const quantityCell = document.createElement('td');
quantityCell.textContent=quantity;

row.appendChild(quantityCell);

// appending the row to the table
tbody.appendChild(row);

let overallTotal=document.querySelector('.total');
overallTotal.innerText=total;






}



window.onload=showCart();





