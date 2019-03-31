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
	var img     =   $( "<img>" );
	
	divBody.addClass ( "card-body m-auto" );
	
	img.attr     ( "src",          item.images.fixed_width_still.url );
	img.attr     ( "data-still",   item.images.fixed_width_still.url );
	img.attr     ( "data-animate", item.images.fixed_width.url       );
	img.attr     ( "data-state",   "still" );
	img.addClass ( "gifs" );
	divBody.append   ( img );
	return divBody;
};

function processCardHeader ( item ) {
	var divHeader = $("<div>");
	divHeader.addClass ( "card-header bg-transparent border-success" );
	divHeader.text ( item.title );
	return divHeader;
};

function processCard (item) {
	var divCard =    $( "<div>" );
	divCard.addClass  ( "card border-success m-3" );
	divCard.attr      ( "style", "width: 18rem;" );
	divCard.append    ( processCardHeader ( item ) );   // Card header
	divCard.append    ( processCardBody   ( item ) );   // Card body (image)
	divCard.append    ( processFooter     ( item ) );   // card footer
	$("#row2").prepend ( divCard ); 
};

function processInfo (data) {
  console.log (data);	
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
	  b.addClass ( "btn btn-outline-primary btn-sm m-1" );
	  b.attr ( "id", "topicBtn" );
	  b.attr ( "data-topic", arrTopics [ct] );
	  b.text ( arrTopics [ct] );
      r.append ( b );
	  $("#topicInput").val ( "" );
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
						
	$("#row2").on ( "click", 					 // clic to play or stop the GIF
	                ".gifs",
					function () {
						if ( $(this).attr ("data-state") === "still" ) {
							$(this).attr ("src",        $(this).attr ("data-animate") );
							$(this).attr ("data-state", "animate");
						  } else {
							$(this).attr ("src",        $(this).attr ("data-still") );
							$(this).attr ("data-state", "still");
						  }

					});
					   
}); // document.ready
