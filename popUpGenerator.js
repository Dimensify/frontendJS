  

 
  var popupWindowGen = document.getElementById("popup-window-generate");
  var popupBtn = document.getElementById("btnGenerate");
  popupBtn.addEventListener("click", function(event) {
    // popupWindow.style.display = "block";
    popupWindowGen.style.display = 'flex';
  });

  var popupBrowse=document.getElementById("popup-window-browse");
  var uploadBtn = document.getElementById("btnUpload");
  uploadBtn.addEventListener("click",function(event){
    popupBrowse.style.display='flex';
  });


  var closeButtonGen = document.getElementById("close-button-gen");

  closeButtonGen.addEventListener("click", function() {
    popupWindowGen.style.display = "none";
  });



  var closeButtonBro = document.getElementById("close-button-bro");

  closeButtonBro.addEventListener("click", function() {
    popupBrowse.style.display = "none";
  });



  const dragArea = document.querySelector('.drag-area');

  const dragText = document.querySelector('.drag-drop-header');


  dragArea.addEventListener('dragover',function(event){
    event.preventDefault();
    console.log("file dragged");
    dragText.textContent="Release to upload";
    dragArea.classList.add('active');
  });

  dragArea.addEventListener('dragleave',function(event){
    dragText.textContent="Drag & Drop";
    dragArea.classList.remove('active');
  });


  dragArea.addEventListener('drop',function(event){
    event.preventDefault();
    console.log('file is dropped inside');
    file = event.dataTransfer.files[0];
    displayImage();
  });

  function displayImage(){
    let filetype = file.type;
    // console.log(file);
    let validExtensions =['image/jpeg','image/png','image/jpg'];

    if(validExtensions.includes(filetype)){
      let fileReader = new FileReader();


      fileReader.onload = ()=>{
        let fileURL = fileReader.result;
        console.log("URL:"+fileURL);
        let imageTag = `<img src="${fileURL}" alt="">`;
        dragArea.innerHTML= imageTag;
      };

      fileReader.readAsDataURL(file);
    }else{
      alert('This file is not an image!');
      dragArea.classList.remove("active");
    }
  }

  let browseBtn =   document.querySelector('#browse-button');
  let fileInput = document.querySelector('.file-input');

  browseBtn.addEventListener('click',function(){
    dragArea.classList.add('active');
    fileInput.click();
  });

  fileInput.addEventListener('change',function(){
    file = this.files[0];
    displayImage();
  });

  inputField = document.getElementById("input_desc");

  /*inputField.addEventListener('focus' , function(){
    inputField.style.border="1px solid red";
  
  });*/


