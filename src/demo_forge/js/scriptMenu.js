$(document).ready(function() {
  $("#navMenu").show();
  $(".back").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    $("#firstmessage").hide();
    loadNav(0);
  });
  $("#mod1").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    $("#firstmessage").hide();
    loadNav(1);
  });
  $("#mod2").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    $("#firstmessage").hide();
    loadNav(2);
  });
});

function loadNav(key) {
  $("#fileSection").hide();
  $(".forgeViewer").hide();
  $("header nav,.forgeLock").hide();
  switch (key) {
    case 0:
      $("#navMenu").show();
      break;

    case 1:
      $("#navModels,.forgeLock").show();
      $("#viewerSection").css({
        transition: "0.5s",
        width: "100%",
        left: "0"
      });
      break;

    case 2:
      $("#viewerSection").css({
        transition: "0s",
        width: "100%",
        left: "0"
      });
      $("#navLoader,.forgeLock").show();
      setTimeout(function() {
        $("#viewerSection").css({
          position: "absolute",
          left: "50%",
          transition: "1s",
          width: "50%"
        });
        setTimeout(function() {
          loadViewer(idDocForge, false);
          $("#fileSection").show();
        }, 50);
      }, 10);
      break;

    default:
      break;
  }
}
