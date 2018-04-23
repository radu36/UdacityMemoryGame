/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var deck = document.querySelector('.deck');
var items = deck.children;
var nClick = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


	shuffle(cards);
 	for (var item in items) {
 		if (item <= 15) {
			items[item].children[0].classList.add(cards[item % 8]);
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

	 function clicked(evt) {

		 	var card = evt.target;
		 	card.parentElement.classList.add("open","show");
		 	openCard(card);

	 }




	 function openCard(evt) {

		 if (nClick == 0) {

			 	nClick += 1;
			 	card1 = evt;
			 	card1.parentElement.classList.add("open","show");

		 } else {

			 	nClick += 1;
			 	card2 = evt;
			 	card2.parentElement.classList.add("open","show");

		 }

		 if (nClick == 2) {

				 if (card1.classList == card2.classList) {

					 	// matchCards(card1, card2);
					 	card1.parentElement.classList.remove("open");
					 	card2.parentElement.classList.remove("open");
		 				card1.parentElement.classList.add("match");
		 				card2.parentElement.classList.add("match");

				 } else {

					 	// reverseCards(card1, card2);
					 	setTimeout(function() {
					 		card1.parentElement.classList.remove("open","show");
					 	}, 1000);
					 	setTimeout(function() {
					 		card2.parentElement.classList.remove("open","show");
					 	}, 1000);
					 	nClick = 0;

				 }

		}

		console.log(nClick);
	 }

	 


	document.querySelector('.deck').addEventListener('click', clicked);
















