var idDocForge;
var nouploading = true;

function changeBucketkey(inpt) {
  if (!inpt) inpt = document.getElementById("bucketInput");
  bucketKey = String(inpt.value);
  console.log(`bucketKey: ${bucketKey}`);
}

function changefile(input) {
  file = input.files[0];
  console.log(`Файл: ${file}`); // например, my.png
  console.log(file); // например, my.png

  let reader = new FileReader();
  console.log(`${file.name} из ${input.name} читается, подождите`); // например, my.png
  $("#readstatus").css({ color: "black" });
  $("#readstatus").text("Чтение файла");
  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
    fileData = reader.result;
    console.log("файл прочитан");
    $("#readstatus").text(`Файл ${file.name} прочитан`);
  };
  reader.onerror = function() {
    console.log(reader.error);
  };
}

function loadViewer50() {
  setTimeout(function() {
    loadViewer(idDocForge, false);
  }, 50);
}

$(document).ready(function() {
  $("#fileSection").hide();

  $("#full").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    $("#viewerSection").css({
      position: "absolute",
      left: "0",
      transition: "0.5s",
      width: "100%"
    });
    loadViewer50();
  });

  $("#unfull").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    $("#viewerSection").css({
      position: "absolute",
      left: "50%",
      transition: "0.5s",
      width: "50%"
    });
    loadViewer50();
  });

  $("#upload").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    if (fileData && nouploading) {
      messenging = true;
      createBucket(uploadFile, postJobSvf);
      nouploading = false;
    }
  });

  $("#show").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    idDocForge = urnUser;
    loadViewer50();
  });

  $("#manifest").click(function() {
    // задаем функцию при нажатиии на элемент <div>
    getManifest();
  });
});
