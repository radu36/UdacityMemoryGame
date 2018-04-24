/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var deck = document.querySelector('.deck');
var items = deck.children;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Everyday I'm shufflin' :))
function shuffleCards() {
	shuffle(cards);
 	for (var item in items) {
 		if (item <= 15) {
			items[item].children[0].classList.add(cards[item]);
	 	}
	 }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 // Initializing some 'global vars' I'll work with 
 let card1, card2;
 var nClick = 0;
 var clicks = 0;
 var matchingCards = 0;



 	// This function turns the card and hides it back after a while, for debugging purposes
 	function clicked(evt) {

	 		totalClicks();
		 	nClick +=1;
		 	var card = evt.target;
		 	card.parentElement.classList.add("open","show");

		 	// I'm flipping the cards back after 1.2 seconds, for a greater difficulty
		 	// and forcing the app to debug itself on the go :)
		 	setTimeout(function() {
		 		card.parentElement.classList.remove("open","show");
		 	}, 1200);
		 	openCard(card);

	 }



	 // The main counter for total clicks
	 function totalClicks() {

	 	clicks += 1;
	 	document.querySelector('.moves').innerHTML = clicks;


	 	// Deleting one star at a time if number of moves exceedes multiple by 20
	 	if (clicks % 20 == 0) {
	 		var stars = document.querySelector(".stars");
	 		stars.removeChild(stars.getElementsByTagName('li')[0]);
	 	}

	 }


	 	// Starting the timer
	 	var minutesLabel = document.getElementById("minutes");
		var secondsLabel = document.getElementById("seconds");
		var totalSeconds = 0;

		function setTime() {
		  ++totalSeconds;
		  secondsLabel.innerHTML = pad(totalSeconds % 60);
		  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
		}

		function pad(val) {
		  var valString = val + "";
		  if (valString.length < 2) {
		    return "0" + valString;
		  } else {
		    return valString;
		  }
		}


	 // This function compares if the two opened cards have the same drawing
	 function openCard(evt) {

	 	// If this is the first card flipped, I'n passing the first value in card1 variable
		if (nClick == 1) {
			 	card1 = evt;
			 	card1.parentElement.id = "card1";
			 	setTimeout(function() {
		 			card1.parentElement.removeAttribute("id");
		 		}, 1200);
		 }

		 // Passing the second value in card2 variable on the second flip
		else if (nClick == 2) {
			 	card2 = evt;
			 	card2.parentElement.id = "card2";
			 	setTimeout(function() {
		 			card2.parentElement.removeAttribute("id");
		 		}, 1200);



			 	// Still for debugging purposes I try to verify if the cards are different by passing a different ID for eachother and getting sure that we're not talking about something else
				if ((card1.classList.value == card2.classList.value) && (card1.parentElement.id != 'undefined') && (card2.parentElement.id != 'undefined') && (card1.parentElement.id != card2.parentElement.id)) {

					 	// matchCards(card1, card2);
					 	card1.parentElement.classList.remove("open", "show");
					 	card2.parentElement.classList.remove("open", "show");
					 	card1.parentElement.removeAttribute("id");
					 	card2.parentElement.removeAttribute("id");
		 				card1.parentElement.classList.add("match");
		 				card2.parentElement.classList.add("match");
		 				matchingCards += 2;
		 				nClick = 0;

						if (matchingCards == 16) {
							beatTheGame();
						}

				 } else {

					 	// reverseCards(card1, card2);
					 	setTimeout(function() {
					 		card1.parentElement.classList.remove("open","show");
					 	}, 1200);
					 	setTimeout(function() {
					 		card2.parentElement.classList.remove("open","show");
					 	}, 1200);
					 	card1.parentElement.removeAttribute("id");
					 	card2.parentElement.removeAttribute("id");

					 	// Resetting the card1, card2 holders
					 	// this will trigger an TypeError on Console.log()
					 	card1 = '';
					 	card2 = '';
					 	nClick = 0;
				 }

		}


		// For debugging purposes, I try to hide the cards if someone's trying to click them very fast :P
		else if ((nClick >= 2) || (nClick == 0)) {
				card1.parentElement.classList.remove("open","show");
				card2.parentElement.classList.remove("open","show");
				nClick = 0;
		}


	 }


	 // Creating an alert telling you the number of moves
	function beatTheGame() {

		setTimeout(function() {
			alert('You beat the game in ' + clicks + ' clicks!');
		}, 600);

	}


	// Resetting the values to 0 and shuffling a new deck
	function restart() {

		var res = deck.querySelectorAll("li");
		for (var att in res) {
			if (att <= 15) {
				// Resetting the cards
				res[att].removeAttribute("class");
				res[att].removeAttribute("id");
				res[att].classList.add("card");
				// Resetting the drawings on the cards
				res[att].children[0].removeAttribute("class");
				res[att].children[0].classList.add("fa");
			}
		}
		totalSeconds = 0;
		shuffleCards();
		clicks = -1;
		nClick = 0;
		card1 = '';
	 	card2 = '';
	 	matchingCards = 0;
		totalClicks();
	}

	// Starting the timer on click
	function startTimer() {
		// Start timer
	 	setInterval(setTime, 1000);
		document.querySelector('body').removeEventListener('click', startTimer);
	}


	// Adding an event listener to the cards
	document.querySelector('.deck').addEventListener('click', clicked);
	document.querySelector('body').addEventListener('click', startTimer);
	// Adding an event listener to the reset button
	document.querySelector('.restart').addEventListener('click', restart);
	// Initializing the cards
	shuffleCards();











