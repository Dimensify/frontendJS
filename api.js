

// const url = "https://backend.dimensify.ai"




let gifPopUp = document.getElementById('popup-window-generate');

let prevImg;

function displayGif(xhr) {

    var toRemove = document.getElementById('uploadImg');
    if (toRemove)
        toRemove.parentNode.removeChild(toRemove);

    popupWindowGen.style.display = 'flex';

    const contentType = xhr.getResponseHeader('content-type');
    const blob = new Blob([xhr.response], { type: contentType });


    // Create an object URL for the Blob
    const blobUrl = window.URL.createObjectURL(blob);


    const image = document.createElement('img');
    prevImg = image;

    image.style.cssText = 'align-items:center; margin-top:0;margin-left:20%';

    image.src = blobUrl;

    gifPopUp.appendChild(image);


}


function readFile() {
    // Create an input element to allow the user to select a file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Add an event listener to the input element
    fileInput.addEventListener('change', function () {
        const selectedFile = fileInput.files[0]; // Get the selected file
        if (selectedFile) {
            readFile_(selectedFile);
        }
    });

    // Trigger a click on the input element to open the file selection dialog
    fileInput.click();

}

function readFile_(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContents = event.target.result; // Contains the file data

        // You can now use the fileContents as needed, e.g., display it on the page or process it further.
        console.log(fileContents);

        // var image = new Image();
        // const urlCreator = window.URL || window.webkitURL;
        // urlCreator.revokeObjectURL(gifUrl)
        // const gifBlob = new Blob([fileContents], { type: 'image/gif' });
        // let gifUrl = urlCreator.createObjectURL(gifBlob);
        //image.src = gifUrl;
        // alert(gifUrl);
        // document.body.appendChild(image);
        // image.one('load', (e) => { urlCreator.revokeObjectURL(gifUrl); });

        displayGif(fileContents);

    }

    reader.readAsText(file);

}


const btn_gen = document.getElementById('btnGenerate');



btn_gen.addEventListener('click', function () {
    var desc = document.getElementById('input_desc').value;

    generatetheModelFromText(desc);
    // dummy(desc);
  
});


let zipPath;

popUp_waiting = document.getElementById("popup-window_waitingBox");

let modelInCreation = false;



function generatetheModelFromImage(fileURL) {

    if(modelInCreation){
        alert('A model is in creation please try after sometime!')
        return;
    }
    if (fileURL) {
        modelInCreation = true;
        urlFromImage  = url_ +  '/upload-image-json/';
        let xhr = new XMLHttpRequest()
        xhr.open('POST', urlFromImage, true);
        xhr.setRequestHeader('accept', 'application/json');
        xhr.timeout=timeout;


        const formData = new FormData();
        formData.append('image', fileURL);

        xhr.send(formData);


        popUp_waiting.style.display = "flex";
        popupBrowse.style.display = 'none';
        let gifPath;
        xhr.onload = function () {
            alert("response arrived for process text")
              modelInCreation = false;
            if (xhr.status === 200) {
                popUp_waiting.style.display = "none";
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log("logging the reponse:" + jsonResponse['gif_path'], " + " + jsonResponse['zip_path']);
                gifPath = jsonResponse['gif_path'];
                zipPath = jsonResponse['zip_path'];
                console.log("Resposne is : " + gifPath + "," + zipPath);
                getGif(gifPath);
            }
        }

    } else {
        alert('Please upload an image');
    }
}


function generatetheModelFromText(desc) {
    if(modelInCreation){
        alert('A model is in creation please try after sometime!')
        return;
    }
    if (desc) {
        modelInCreation = true;
        const urlFromText = url_ + '/process-text-json/';
        let xhr = new XMLHttpRequest()
        xhr.open('POST', urlFromText, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.setRequestHeader('accept', 'application/json')
        xhr.timeout=timeout;
        console.log('Sending the request to :'+url_);
        xhr.send('text=' + desc);
  
        popUp_waiting.style.display = "flex";
        let gifPath;
        xhr.onload = function () {
            popUp_waiting.style.display = 'none';
            console.log("response arrived for process text");
            modelInCreation = false;
            if (xhr.status === 200) {
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log("logging the reponse:" + jsonResponse['gif_path'], " + " + jsonResponse['zip_path']);
                gifPath = jsonResponse['gif_path'];
                zipPath = jsonResponse['zip_path'];
                console.log("Resposne is : " + gifPath + "," + zipPath);
                getGif(gifPath);
            }
        }
    } else {
        alert('please describe how the model should look like!')
    }

}

function getGif(gifPath) {

    const urlGetGif =  url_ +'/render-gif/';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', urlGetGif, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('accept', 'application/json')
    xhr.responseType = 'arraybuffer';
    xhr.timeout=timeout;
    xhr.send('file_path=' + gifPath);

    xhr.onload = function () {

        if (xhr.status === 200) {
            console.log(xhr);
            displayGif(xhr);
        }
    }
}




function dummy(desc){


      const url = url_+ '/dummy_method/';
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.setRequestHeader('accept', 'application/json')
      xhr.timeout=timeout;
      xhr.send('text='+desc);
      console.log('sending request');
      xhr.onload = function () {
          if(xhr.status === 200) {
              alert(xhr.response);
              
              var jsonResponse = JSON.parse(xhr.responseText);
              console.log("logging the reponse:"+ jsonResponse['res']," + "+jsonResponse['done']);
  
               gifPath = jsonResponse['res'];
               zipPath = jsonResponse['done'];
             
          }
      }


}

