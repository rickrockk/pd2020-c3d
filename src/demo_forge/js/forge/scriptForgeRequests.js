var client_id = "QeUxCOrxv5gp3k9VLywLhDKWWEokzF0S";
var client_secret = "ZSknkgeAooUMHzYL";

//Token
var token = getToken();
function getToken() {
  var settingsT = {
    url: "https://developer.api.autodesk.com/authentication/v1/authenticate",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      grant_type: "client_credentials",
      client_id: client_id,
      client_secret: client_secret,
      scope: "data:read data:write data:create bucket:read bucket:create"
    }
  };

  $.ajax(settingsT).done(function(response) {
    //console.log("POST         !!!!");
    //console.log(response.access_token);
    token = response.access_token;
    return response.access_token;
  });
}

//bucket
var bucketKey;
function createBucket(funcAfter, funcAfterAfter) {
  changeBucketkey();
  let settingsB = {
    url: "https://developer.api.autodesk.com/oss/v2/buckets",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    data: `{\n    \"bucketKey\": \"${bucketKey}\",\n    \"permissions\":[\n    {\n      \"authId\":\"${client_id}\",\n      \"access\":\"full\"\n    }\n  ],\n    \"policyKey\": \"transient\"\n}`
  };
  console.log("bucket creation starts");
  $("#readstatus").text("Bucket creation starts");

  $.ajax(settingsB).always(function(response) {
    console.log("ответ на bucket");
    console.log(response);
    setTimeout(function() {
      funcAfter(funcAfterAfter);
      nouploading = true;
    }, 500);
    if (response.responseJSON.reason) {
      $("#readstatus").text(response.responseJSON.reason);
      $("#readstatus").append(" ");
    } else {
      $("#readstatus").text("Bucket created");
    }
  });
}

//upload
var file;
var fileData;
var fileURL;
function uploadFile(afterFunc) {
  let uploadComplete = false;
  fileURL =
    "https://developer.api.autodesk.com/oss/v2/buckets/" +
    bucketKey +
    "/objects/" +
    file.name;

  var settingsU = {
    url: fileURL,
    method: "PUT",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream"
    },
    data: fileData //-result of readAsDataURL
  };

  console.log("upload starts");
  $("#readstatus").text(" Upload starts");

  function uplProgr() {
    if (!uploadComplete) {
      $("#readstatus").text("upload inprogress ");
    }
    setTimeout(function() {
      if (!uploadComplete) {
        $("#readstatus").append(".");
      }
      setTimeout(function() {
        if (!uploadComplete) {
          $("#readstatus").append(".");
        }
        setTimeout(function() {
          if (!uploadComplete) {
            $("#readstatus").append(".");
          }
          setTimeout(function() {
            if (!uploadComplete) {
              uplProgr();
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
  setTimeout(uplProgr, 1500);

  $.ajax(settingsU)
    .done(function(response) {
      nouploading = true;
      uploadComplete = true;
      console.log("ответ на upload");
      console.log(response);
      $("#readstatus").text("Uploaded");

      let str = window.btoa(response.objectId);
      var re = /=/gi;
      urnUser = str.replace(re, "");

      console.log("urnUser " + urnUser);
      console.log("upload completed");

      setTimeout(afterFunc, 500);
    })
    .fail(function(response) {
      nouploading = true;
      uploadComplete = true;
      $("#readstatus").text("Upload failed");
      if (response.responseJSON.reason) {
        $("#readstatus").append("<br>");
        $("#readstatus").append(response.responseJSON.reason);
        $("#readstatus").append("<br>");
      }
    });
}

//post job svf
var urnUser;
let stopGetMan = true;
let messenging = false;
function postJobSvf() {
  var settingsJ = {
    url: "https://developer.api.autodesk.com/modelderivative/v2/designdata/job",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    data: `{\n    \"input\": {\n        \"urn\": \"${urnUser}\",\n        \"compressedUrn\": false,\n        \"rootFilename\": \"${file.name}\"\n    },\n    \"output\": {\n        \"destination\": {\n            \"region\": \"us\"\n        },\n        \"formats\": [\n        {\n            \"type\": \"svf\",\n            \"views\": [\"3d\", \"2d\"]\n        }]\n    }\n}`
  };
  console.log("Conversion to svf starts");
  $("#readstatus").text("Conversion to svf starts");

  $.ajax(settingsJ).done(function(response) {
    console.log("ответ на SVF");
    console.log(response);
    if ((messenging = true)) {
      stopGetMan = false;
      for (let time1 = 1000; time1 <= 90000; time1 = time1 + 1000) {
        timerForManifest(time1);
      }
    } else {
      setTimeout(function() {
        getManifest();
        idDocForge = urnUser;
        loadViewer50();
      }, 5550);
    }
    messenging = false;
  });
}

//getmanifest
function getManifest(alertbool = true) {
  let thisurl =
    "https://developer.api.autodesk.com/modelderivative/v2/designdata/" +
    urnUser +
    "/manifest";
  var settings = {
    url: thisurl,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (alertbool) {
      //alert(`progress: ${response.progress}   status: ${response.status}`);
      $("#readstatus").text(
        `progress: ${response.progress} status: ${response.status} (from gm button)`
      );
    } else {
      $("#readstatus").text(
        `progress: ${response.progress} status: ${response.status}`
      );
      if (response.progress == "complete") {
        if (!stopGetMan) {
          stopGetMan = true;
          idDocForge = urnUser;
          loadViewer50();
          getManifest(false);
        }
      }
    }
  });
  messenging = false;
}
function timerForManifest(ms) {
  setTimeout(function() {
    if (!stopGetMan) {
      getManifest(false);
      console.log(`manifest for ${ms} ms getted`);
    }
  }, ms);
}
