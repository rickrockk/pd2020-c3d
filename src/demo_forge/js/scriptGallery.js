var docId1 =
  "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZXdyZXdyZXcvcmFjX2Jhc2ljX3NhbXBsZV9wcm9qZWN0LnJ2dA"; //house
var docId2 = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bWVyaW4vbWVyaW4uU1RFUA"; //болид
var docId5 =
  "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZW5naW5uZW53dy9lbmdpbmUuU1RFUA"; //engine2
var docId4 =
  "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amV0ZW5naW5lL2pldGVuZ2luZS5zdGVw"; //getengine
var docId3 =
  "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGVsaWNvcHRlci9oZWxpY29wdGVyLlNURVA"; //вертолет

$(document).ready(function() {
  $("#1").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    loadViewer(1);
  });

  $("#2").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    loadViewer(2);
  });

  $("#3").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    loadViewer(3);
  });

  $("#4").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    loadViewer(4);
  });

  $("#5").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    loadViewer(5);
  });
});
