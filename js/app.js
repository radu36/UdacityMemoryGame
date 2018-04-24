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


	shuffle(cards);
 	for (var item in items) {
 		if (item <= 15) {
			items[item].children[0].classList.add(cards[item]);
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
		 	setTimeout(function() {
		 		card.parentElement.classList.remove("open","show");
		 	}, 1200);
		 	openCard(card);

	 }



	 // The main counter for total clicks
	 function totalClicks() {

	 	clicks += 1;
	 	document.querySelector('.moves').innerHTML = clicks;
	 }


	 // This function compares if the two opened cards have the same drawing
	 function openCard(evt) {

		if (nClick == 1) {
			 	card1 = evt;
			 	card1.parentElement.id = "card1";
			 	setTimeout(function() {
		 			card1.parentElement.removeAttribute("id");
		 		}, 1200);
		 }

		else if (nClick == 2) {
			 	card2 = evt;
			 	card2.parentElement.id = "card2";
			 	setTimeout(function() {
		 			card2.parentElement.removeAttribute("id");
		 		}, 1200);



			 	// Still for debugging purposes I try to verify if the cards are different by passing a different ID for eachother
				if ((card1.classList.value == card2.classList.value) && (card1.parentElement.id != card2.parentElement.id)) {

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



	function beatTheGame() {

		setTimeout(function() {
			alert('You beat the game in ' + clicks + ' clicks!');
		}, 600);

	}


		 
	function restart() {

		var res = deck.querySelectorAll("li");
		for (var att in res) {
			if (att <= 15) {
				res[att].removeAttribute("class");
				res[att].classList.add("card");
			}
		}

		clicks = -1;
		totalClicks();
	}


	document.querySelector('.deck').addEventListener('click', clicked);
	document.querySelector('.restart').addEventListener('click', restart);












