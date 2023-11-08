



let gifPopUp = document.getElementById('popup-window-generate');

let prevImg;

function displayGif(xhr) {

    imageTagBro.remove();
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
    // if(responseArraived==false)
    // alert(desc);
    // else
    generatetheModelFromText(desc);
    // readFile();
    // getGif("output/anindiangirl.gif");
});


let zipPath;

popUp_waiting = document.getElementById("popup-window_waitingBox");

function generatetheModelFromImage(fileURL) {
    const url = 'http://dimensifynlb-2be116852e17ef5a.elb.us-east-1.amazonaws.com:8000/upload-image-json/';
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.setRequestHeader('accept', 'application/json')

    // let image = fileURL.substring(23);
    // alert(image);

    const formData = new FormData();
    formData.append('image', fileURL);

    xhr.send(formData);
    // alert("Estimated time for model creation is 6 minutes");


    popUp_waiting.style.display = "flex";
    popupBrowse.style.display='none';
    let gifPath;
    xhr.onload = function () {
        alert("response arrived for process text")
        // responseArraived=true;
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


}

function generatetheModelFromText(desc) {

    const url = 'http://dimensifynlb-2be116852e17ef5a.elb.us-east-1.amazonaws.com:8000/process-text-json/';
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('accept', 'application/json')
    xhr.send('text=' + desc);
    // alert("Estimated time for model creation is 6 minutes");
    popUp_waiting.style.display = "flex";
    let gifPath;
    xhr.onload = function () {
        popUp_waiting.style.display = 'none';
        console.log("response arrived for process text");
        // responseArraived=true;
        if (xhr.status === 200) {
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log("logging the reponse:" + jsonResponse['gif_path'], " + " + jsonResponse['zip_path']);
            gifPath = jsonResponse['gif_path'];
            zipPath = jsonResponse['zip_path'];
            console.log("Resposne is : " + gifPath + "," + zipPath);
            getGif(gifPath);
        }
    }

}

function getGif(gifPath) {

    const url = 'http://dimensifynlb-2be116852e17ef5a.elb.us-east-1.amazonaws.com:8000/render-gif/';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('accept', 'application/json')
    xhr.responseType = 'arraybuffer';
    xhr.send('file_path=' + gifPath);
    // displayGif(xhr.response);

    xhr.onload = function () {
        // alert("response arrived for render gif") //this method is called only when response arrives
        // responseArraived=true;
        if (xhr.status === 200) {
            console.log(xhr);
            displayGif(xhr);
        }
    }
}




