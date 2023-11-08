 /*fetch(url, {
    method: 'post',
    body: 'file_path='+gifPath,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        
    },
    mode: 'no-cors',
    }).then((response) => {
        alert("response arrived for render gif: "+response.blob());
        // displayGif(response.json());
    return response.blob();
    }).then((res) => {
    if (res.status === 201) {
        console.log("Post successfully created!")
    }
    }).catch((error) => {
    console.log(error)
    })
  }*/


  const url = 'http://dimensifynlb-2be116852e17ef5a.elb.us-east-1.amazonaws.com:8000/dummy_method/';
  let xhr = new XMLHttpRequest()
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('accept', 'application/json')
  xhr.send('text='+desc);

  let gifPath;
  xhr.onload = function () {
      if(xhr.status === 200) {
          alert(xhr.response);
          
          var jsonResponse = JSON.parse(xhr.responseText);
          console.log("logging the reponse:"+ jsonResponse['res']," + "+jsonResponse['done']);

           gifPath = jsonResponse['res'];
           zipPath = jsonResponse['done'];
          // console.log("Post successfully created!") 
          console.log("Resposne is : "+ gifPath+"+"+zipPath);
      }
  }



/*function readFile() {
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

}*/

/*function readFile_(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContents = event.target.result; // Contains the file data

        // You can now use the fileContents as needed, e.g., display it on the page or process it further.
        console.log(fileContents);

        var image = new Image();
        const urlCreator = window.URL || window.webkitURL;
        // urlCreator.revokeObjectURL(gifUrl)
        const gifBlob = new Blob([fileContents], { type: 'image/gif' });
        let gifUrl = urlCreator.createObjectURL(gifBlob);
        image.src = gifUrl;
        // alert(gifUrl);
        document.body.appendChild(image);
        // image.one('load', (e) => { urlCreator.revokeObjectURL(gifUrl); });
    }

    reader.readAsText(file);

}*/


function dummy(){

      // responseArraived =false;

    /*    const url = 'http://dimensifynlb-2be116852e17ef5a.elb.us-east-1.amazonaws.com:8000/dummy_method/';
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.setRequestHeader('accept', 'application/json')
        xhr.send('text='+desc);
    
        let gifPath;
        xhr.onload = function () {
            if(xhr.status === 200) {
                alert(xhr.response);
                
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log("logging the reponse:"+ jsonResponse['res']," + "+jsonResponse['done']);
    
                 gifPath = jsonResponse['res'];
                 zipPath = jsonResponse['done'];
                // console.log("Post successfully created!") 
                console.log("Resposne is : "+ gifPath+"+"+zipPath);
            }
        }*/

    //   let post = JSON.stringify(postObj)
}