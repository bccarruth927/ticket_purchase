/*
		Your Name: Brenden Carruth
		Last Modified Date: 04/19/2023
		File: event_registration.js
		File Description: This file is intended to provide the functions for the ticket form as well as
		the countdown timer
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

//Variable declarations for form input fields
const submitBtn = document.getElementById('submit');
const ticketNumber = document.getElementById('numTickets');
const totalCost = document.getElementById('totalCost');
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const contactBlock = document.getElementById('contactInformation');

//Variable declarations for input error message
const nameError = document.getElementById('msgname');
const emailError = document.getElementById('msgemail');
const ticketsError = document.getElementById('msgTickets');

//Variable declarations for the regular expressions
const lettersRegEx = /^[A-Za-z\s]+$/;
const emailRegEx = /^\S+@\S+(\.)\S+$/;

//Countdown timer
let timer;
let minute = 9;
let second = 60;

timer = setInterval( function(){
	if (minute == 0 && second == 1) {
		document.getElementById('timer').innerHTML = '00:00';
		alert('Sorry your time has expired! Please try again if you still wish to purchase tickets!');
		location.href;
	} else {
		second--;
		if (second == 0) {
			minute--;
			second = 60;
			if (minute == 0) {
				minute = minute;
			}
		}

		document.getElementById('timer').innerHTML = `${minute}:${second}`;
	}
}, 1000)

//Function to calculate the total cost of tickets; set to change the price of the total based on the change in the ticket number
const calculateTotal = () => {

	const ticketPrice = costPerTicket + ticketSurcharge;

	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	switch (true) {
		case (isNaN(ticketNumber.value)):
			ticketNumber.style.backgroundColor = 'goldenrod';
			ticketsError.innerHTML = 'Please enter a valid number!';
			ticketNumber.focus();
			totalCost.value = '$0.00';
			contactBlock.style.display = 'none';
			break;
		case (ticketNumber.value < minTickets || ticketNumber.value > maxTickets):
			ticketNumber.style.backgroundColor = 'goldenrod';
			ticketsError.innerHTML = 'Please enter a number between 1 and 3!';
			ticketNumber.focus();
			totalCost.value = '$0.00';
			contactBlock.style.display = 'none';
			break;
		case (ticketNumber.value == 1):
			ticketNumber.style.background = '#efefef';
			ticketsError.innerHTML = "";
			totalCost.value = USDollar.format(ticketPrice);
			contactBlock.style.display = 'block';
			break;
		case (ticketNumber.value == 2):
			ticketNumber.style.background = '#efefef';
			ticketsError.innerHTML = "";
			totalCost.value = USDollar.format(ticketPrice * 2);
			contactBlock.style.display = 'block';
			break;
		case (ticketNumber.value == 3):
			ticketNumber.style.background = '#efefef';
			ticketsError.innerHTML = "";
			totalCost.value = USDollar.format(ticketPrice * 3);
			contactBlock.style.display = 'block';
			break;
	};
};

//Function to validate the name and email address inputs and complete the purchase of the tickets

const completePurchase = (e) => {
	//Validation for the name and email inputs
	if (!userName.value.match(lettersRegEx)) {
		userName.focus();
		nameError.innerHTML = 'Please enter a valid name!';
		e.preventDefault();
		return false;
	} else if (!userEmail.value.match(emailRegEx)) {
		userEmail.focus();
		emailError.innerHTML = 'Please enter a valid email';
		e.preventDefault();
		return false;
	} 
	//Alert to tell the user that their ticket purchase was successful
	else { 
		alert(`Thank you for your purchase! Your total cost is ${totalCost.value}! Please wait roughly 24hrs for your confirmation email!`)
		clearInterval(timer);
	}
};

//Event listener for the submit button on the form
submitBtn.addEventListener('click', completePurchase);

