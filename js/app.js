/*
		Your Name: Brenden Carruth
		Last Modified Date: 04/18/2023
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

//Import statement for the helper functions from helper-functions.js
import { changeBackgroundColor, revealContactBlock } from '../modules/helper-functions.js';

//Import statement for the objects from object.js
import { formInputs, regExpressions } from '../modules/object.js';

//Countdown timer

//Variable declarations for the countdown timer
let timer;
let minute = 9;
let second = 60;

//Timer function controlling the countdown from 10 minutes
timer = setInterval( function(){
	//Conditional for if the countdown timer reaches 00:00 resets the webpage after alerting the user
	if (minute == 0 && second == 1) {
		document.getElementById('timer').innerHTML = '00:00';
		alert('Sorry your time has expired! Please try again if you still wish to purchase tickets!');
		window.location.reload(true);
	//Countdown timer functionality
	} else {
		//Decrease the timer by 1 second each interval
		second--;
		//Conditional for if the second variable reaches 0 reduce minute by 1 and reset second variable to 60
		if (second == 0) {
			minute--;
			second = 59;
			//Conditional for if the minute reaches 0 the minute variable changes
			if (minute == 0) {
				minute = minute;
			}
		}
		//The change in the HTML based on the interval adjustments
		if (second < 10) {
			document.getElementById('timer').innerHTML = `${minute}:0${second}`;
		} else {
			document.getElementById('timer').innerHTML = `${minute}:${second}`;
		}
	}
}, 1000);

//Function to calculate the total cost of tickets; set to change the price of the total based on the change in the ticket number
const calculateTotal = () => {

	//Variable declaration adding together the ticket cost and the surcharge into one variable
	const ticketPrice = costPerTicket + ticketSurcharge;

	//Variable containing the contructed currency format to convert a number into US currency
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	/*Switch statement validating the inputs entered into the ticket number input while also 
	adjusting total cost and revealing contact block if inputs are valid*/
	switch (true) {
		case (isNaN(formInputs.tickets.number.value)):
			formInputs.tickets.error.innerHTML = 'Please enter a valid number!';
			formInputs.cost.value = '$0.00';
			break;
		case (formInputs.tickets.number.value < minTickets || formInputs.tickets.number.value > maxTickets):
			formInputs.tickets.error.innerHTML = 'Please enter a number between 1 and 3!';
			formInputs.cost.value = '$0.00';
			break;
		case (formInputs.tickets.number.value == 1):
			formInputs.tickets.error.innerHTML = "";
			formInputs.cost.value = USDollar.format(ticketPrice);
			break;
		case (formInputs.tickets.number.value == 2):
			formInputs.tickets.error.innerHTML = "";
			formInputs.cost.value = USDollar.format(ticketPrice * 2);
			break;
		case (formInputs.tickets.number.value == 3):
			formInputs.tickets.error.innerHTML = "";
			formInputs.cost.value = USDollar.format(ticketPrice * 3);
			break;
	};

	//Function to change the background color based on if there is an error message
	changeBackgroundColor(formInputs.tickets.error, formInputs.tickets.number);

	//Function to change the display of the contact block based on if there is an error message
	revealContactBlock(formInputs.tickets.error, formInputs.contact);
};

//Event listener for the onchange event
formInputs.tickets.number.addEventListener('change', calculateTotal);

//Function to validate the name and email address inputs and complete the purchase of the tickets

const completePurchase = (e) => {
	//Validation for the name and email inputs
	if (!formInputs.name.id.value.match(regExpressions.letters)) {
		formInputs.name.id.focus();
		formInputs.name.error.innerHTML = 'Please enter a valid name!';
		e.preventDefault();
		return false;
	} else if (!formInputs.email.id.value.match(regExpressions.email)) {
		formInputs.email.id.focus();
		formInputs.email.error.innerHTML = 'Please enter a valid email';
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
formInputs.submit.addEventListener('click', completePurchase);

