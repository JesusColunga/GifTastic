/* app.js                */
/* GifTastic: GIPHY API  */
/* 29/Mar/2019           */


// GLOBAL VARIABLES
// =======================================================================================
var arrTopics = ["music", "movies", "nature", "transportation", "celebrities"];
var apiKey = "NKYvGpX2mFhcJk3gVs22c2akoD0noBEo";
var queryGiphy = "https://api.giphy.com/v1/gifs/search?q=";
var myGiphyKey = "&api_key=NKYvGpX2mFhcJk3gVs22c2akoD0noBEo";


// OBJECTS
// =======================================================================================


// FUNCTIONS (Definition)
// =======================================================================================
function processFooter     ( item ) {
	var divFooter = $( "<div>"  );
	var sp1       = $( "<span>" );
	var sp2       = $( "<span>" );
	
	divFooter.addClass ( "card-footer bg-transparent border-success" );
	
	sp1.addClass ( "card-text text-success" );
	sp1.text     ( "Rating: " );
	divFooter.append ( sp1 );
	
	sp2.text     ( item.rating );
	divFooter.append ( sp2 );
	return divFooter;
};

function processCardBody   ( item ) {
	var divBody =   $( "<div>" );
	divBody.addClass ( "card-body" );
	divBody.append   ( "body" );
	return divBody;
};

function processCardHeader ( item ) {
	var divHeader = $("<div>");
	divHeader.addClass ( "card-header bg-transparent border-success" );
	divHeader.text ( item.title );
	return divHeader;
};

function processCard (item) {
	console.log ( "item", item);
	var divCard =    $( "<div>" );
	divCard.addClass  ( "card border-success m-3" );
	//divCard.attr      ( "style", "max-width: 18rem;" );
	divCard.attr      ( "style", "width: 18rem;" );
	divCard.append    ( processCardHeader ( item ) );   // Card header
	divCard.append    ( processCardBody   ( item ) );   // Card body (image)
	divCard.append    ( processFooter     ( item ) );   // card footer
	$("#row2").append ( divCard );
};

function processInfo (data) {
	for (ct = 0; ct < data.length; ct ++) {
		processCard ( data [ct] );
	};
};

function clicTopicBtn (topic) {
    var response; var textStatus;
	var queryURL = queryGiphy + topic + "&limit=10" + myGiphyKey;
    $.ajax ( {url   : queryURL,
              method: "GET"} )
		.then (
			function (response, textStatus) {
				// FALTA revisar: si no hay registros hay que mandar un mensaje especial al usuario
				// Puede faltar reducir ancho de la Card para moviles (18rem)
			if (textStatus == "success") {
				processInfo ( response.data );
			} else {
				alert ("Problem retrieving information from the web site.");
			}});
};

function showArrTopics () {
  var r = $("#r1Buttons");   // Row for Topic Buttons
  var b;                     // Each button
  r.empty ();
  for (ct = 0; ct < arrTopics.length; ct ++) {
	  b = $( "<button>" );
	  b.addClass ( "btn btn-outline-primary btn-sm mx-1" );
	  b.attr ( "id", "topicBtn" );
	  b.attr ( "data-topic", arrTopics [ct] );
	  b.text ( arrTopics [ct] );
      r.append ( b );
  }
};


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
    showArrTopics ();
	
	$("#r1Buttons").on ("click",                 // clic a Topic button to show information
	                    "#topicBtn", 
						function () {
							clicTopicBtn ( $(this).attr ("data-topic") );
						});
						
    $("#addTopic").on("click",                   // clic to add a new Topic button
						function(event) {
							event.preventDefault();
							var topic = $("#topicInput").val().trim();

							if (topic === "") {
								alert ("Type a Topic in the box");
							} else {
								arrTopics.push (topic);
								showArrTopics();
							}
						});
					   
}); // document.ready
