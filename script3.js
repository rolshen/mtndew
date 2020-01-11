$(document).ready(() => {
    $(".multiple-items .slick").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
    });
});

var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500,
    states: {
        "default-state": {
            gradients: [
                ['#abfbff', '#12FFF7'],
                ['#abbdff', '#abfbff'],
                ['#1A2980', '#26D0CE']
            ],
            transitionSpeed: 10000
        },
        "violet-state": {
            gradients: [
                ['#9D50BB', '#6E48AA'],
                ['#4776E6', '#8E54E9']
            ],
            transitionSpeed: 2000
        },
        "orange-state": {
            gradients: [
                ['#FF4E50', '#F9D423']
            ],
            loop: false
        }
    }
});

$('#default-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('default-state');
    setClass('#default-state-cta')
});
$('#violet-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('violet-state');
    setClass('#violet-state-cta')
});
$('#orange-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('orange-state');
    setClass('#orange-state-cta')
});

function setClass(element) {
    $('.canvas-interactive-wrapper a').removeClass('active');
    $(element).addClass('active');
};

document.getElementById("ddlMusclelist").onchange = function() {fnProcessddl()};

function fnProcessddl() {
  $(".nameOrig").text("");
  $(".descrip").html("");
  $(".icon1").empty();
  $(".icon2").empty();
  
  var e = document.getElementById("ddlMusclelist");
  var intExercises = e.options[e.selectedIndex].value;
  var txtExercises = e.options[e.selectedIndex].text;
  var arrintExercises = intExercises.split(',');
  

 fnCallExerciseAPI(arrintExercises[0],1);
 fnImages(arrintExercises[0],txtExercises,1);
 fnCallExerciseAPI(arrintExercises[1],2);
 fnImages(arrintExercises[1],txtExercises,2);
}

function fnCallExerciseAPI(intExercise,counter){

  try {
    if (intExercise > 0 ) {
      var APIKey = "ef95716d82b313d31a4d83f8ece0eb7e82bf5708";

      var queryURL = "https://wger.de/api/v2/exercise/" + intExercise + "/?=" + APIKey;
      var nameOrig = ".nameOrig" + counter;
      var descrip = ".descrip" + counter;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(queryURL);
    
        console.log(response);

        $(nameOrig).text("Exercise Name: " + response.name_original);
        $(descrip).html("Exercise Description: " + response.description);     

        console.log("Exercise Name: " + response.name_original);
        console.log("Exercise Description: " + response.description);

      })

    }
  } catch (error) {
    
  }
};

function fnImages(intExercise,txtExercises,counter){

  var img1 = '<img src="images/' + txtExercises + intExercise + '-1.png" />'
  var img2 = '<img src="images/' + txtExercises + intExercise + '-2.png" />'
  var icon = ".icon" + counter;
  $(icon).prepend(img1);
  $(icon).prepend(img2); 
};
