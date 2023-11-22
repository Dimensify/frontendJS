var expandCheckBoxes = document.querySelectorAll('.expand-checkbox');
// var row = document.getElementsByClassName('container');

// var expandCheckBoxes = document.getElementById('expand1');
// var row = document.getElementById('container_2');
let currentExpanded = null;


expandCheckBoxes.forEach(checkBox => {
    checkBox.addEventListener('change', function () {
        const currentCard = this.parentElement;
        const nextRow = currentCard.parentElement.nextElementSibling;


        if (this.checked) {

            if (currentExpanded && currentExpanded !== this) {
                currentExpanded.checked = false;
                const prevCard = currentExpanded.parentElement;
                const prevRow = prevCard.parentElement.nextElementSibling;
                if (prevRow) {
                    prevRow.classList.remove('row-moved-down');
                }
            }

            if (nextRow) {
                nextRow.classList.add('row-moved-down');
                window.scrollBy(0, 375, 'smooth');
            }
            currentExpanded = this;
        } else {
            if (nextRow) {
                nextRow.classList.remove('row-moved-down');
            }
            currentExpanded = null;
        }
    });

});


const cards = document.querySelectorAll('.card');



expandCheckBoxes.forEach(checkBox => {
    checkBox.addEventListener('change', function () {
        if (this.checked) {
            var expandableContent = this.nextElementSibling.nextElementSibling;
            var index = Array.from(cards).indexOf(this.parentElement);
            var parent = this.parentElement;
            if(index>3){
                index = index%4;
            }
                
            console.log('index: ' +index)
            expandableContent.style.left= (parent.style.width-index*350) + 'px';
          
            

        }
    });

});

expandCheckBoxes.forEach(checkBox => {
    checkBox.addEventListener('change', function () {

      /*  if (this.checked) {
            var currentCard = this.parentElement;
            var expandableContent = this.nextElementSibling.nextElementSibling;
            console.log(expandableContent);
            var firstCard = cards[0].getBoundingClientRect();
            console.log(firstCard);
            const index = Array.from(cards).indexOf(currentCard);

            if (expandableContent instanceof Node && index!==0) {
                document.body.appendChild(expandableContent);
                expandableContent.style.position = 'absolute';
                expandableContent.style.diplay='block';
                expandableContent.style.border='2px solid black';
                // expandableContent.style.left = `${firstCard.left}px`;
                expandableContent.style.left = '50px';
                console.log('******************');
                console.log(expandableContent.style.left);
                // expandableContent.style.top = `${firstCard.bottom}px`;
                expandableContent.style.top = '500px';
                console.log(expandableContent.style.top);
                console.log(cards[0]);
            } else {
                console.log("Expandable content is not a valid Node element.");
            }

        }*/

    });

});