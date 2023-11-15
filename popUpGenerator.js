


var popupWindowGen = document.getElementById("popup-window-generate");
var popupBtn = document.getElementById("btnGenerate");
popupBtn.addEventListener("click", function (event) {
  // popupWindowGen.style.display = 'flex';
});

var inputField = document.getElementById("input_desc");
var popupBrowse = document.getElementById("popup-window-browse");
var uploadBtn = document.getElementById("btnUpload");
uploadBtn.addEventListener("click", function (event) {

  inputField.value = "";

  var toRemove = document.getElementById('uploadImg');
  if (toRemove) {
    toRemove.parentNode.removeChild(toRemove);
  }
  popupBrowse.style.display = 'flex';
});


var closeButtonGen = document.getElementById("close-button-gen");

closeButtonGen.addEventListener("click", function () {
  prevImg.remove();
  popupWindowGen.style.display = "none";
});



var closeButtonBro = document.getElementById("close-button-bro");

closeButtonBro.addEventListener("click", function () {
  popupBrowse.style.display = "none";
});

var closeButtonWait = document.getElementById("close-button-wait");

if(closeButtonWait){
closeButtonWait.addEventListener("click", function () {
  popUp_waiting.style.display = "none";
});}

const dragArea = document.querySelector('.drag-area');

const dragText = document.querySelector('.drag-drop-header');

let file;
dragArea.addEventListener('dragover', function (event) {
  event.preventDefault();
  console.log("file dragged");
  dragText.textContent = "Release to upload";
  dragArea.classList.add('active');
});

dragArea.addEventListener('dragleave', function (event) {
  dragText.textContent = "Drag & Drop";
  dragArea.classList.remove('active');
});


dragArea.addEventListener('drop', function (event) {
  event.preventDefault();
  console.log('file is dropped inside');
  file = event.dataTransfer.files[0];
  displayImage();
});

function displayImage() {
  let filetype = file.type;

  // console.log(file);
  let validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

  // generatetheModelFromImage(file);

  if (validExtensions.includes(filetype)) {
    let fileReader = new FileReader();


    fileReader.onload = () => {
      let fileURL = fileReader.result;
      console.log("URL:" + fileURL);
      let imageTagBro = `<img src="${fileURL}" alt="" id = 'uploadImg' style="width:300px;height:400px">`;
      dragArea.innerHTML = imageTagBro;
    };

    fileReader.readAsDataURL(file);
  } else {
    alert('This file is not an image!');
    dragArea.classList.remove("active");
  }
}

var btnGenImageBro = document.getElementById("btnGenerateBro");

if (btnGenImageBro)
  btnGenImageBro.addEventListener('click', function () {
if(testMode)
{
  dummy("dummy");
}else {
    if (file)
      generatetheModelFromImage(file);}
  });


let browseBtn = document.querySelector('#browse-button');
let fileInput = document.querySelector('.file-input');

browseBtn.addEventListener('click', function () {
  dragArea.classList.add('active');
  fileInput.click();
});

fileInput.addEventListener('change', function () {
  file = this.files[0];
  displayImage();
});



/*inputField.addEventListener('focus' , function(){
  inputField.style.border="1px solid red";
 
});*/


btnWizard = document.getElementById('btnWizard');

btnWizard.addEventListener('hover', function () {
  alert('click');
  let img_not = document.getElementById('img_not');
  img_not.src = "assets/wizard-fotor-meta.png";
});



