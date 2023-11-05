const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth*.9;
canvas.height = window.innerHeight*.7;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
// const katakana = 'アァカサタナハマヤャラワガザダ';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '101010101010101010101010101010101010101010101010101010';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
    // addLogo();


};

interval = setInterval(draw, 30);
// setTimeout(() => restore(), 8000)

function addLogo()
{
  logo = new Image();
  logo.src = 'assets/log_no_wiz.png';
//   context.drawImage(logo, canvas.width / 2 - 100/ 2,
//   canvas.height / 2 - 100 / 2);

  const targetWidth = 200; // The desired width for the image
  // Calculate the X and Y coordinates to center the image
  const x = (canvas.width - targetWidth) / 2;
  const y = (canvas.height - (targetWidth * logo.height / logo.width)) / 2;

  // Draw the image with the calculated position and width
  context.drawImage(logo, x, y, targetWidth, (targetWidth * logo.height / logo.width));

}


restore = () => {
clearInterval(interval)
// Use the identity matrix while clearing the canvas
// context.setTransform(1, 0, 0, 1, 0, 0);
// context.clearRect(0, 0, canvas.width, canvas.height);
// document.getElementsByTagName('img').style.display ='inherit';
// Restore the transform
// context.restore();

}


try_btn = document.getElementById('btn_try');
console.log(try_btn);

var join_waiting_list = document.getElementById("join_waiting_list");
var tryBtn = document.getElementById("btn_try");
tryBtn.addEventListener("click", function(event) {
  join_waiting_list.style.display = 'flex';
	// alert('try');
});


var btn_waitList = document.getElementById('btn_wait_list');


btn_waitList.addEventListener("click",function(event){
	event.preventDefault();
	sendMail("");
	sendMail("khushbu.verma@eurosysinfo.com");
	join_waiting_list.style.display = 'none';
});

function sendMail(my_email) {

	console.log('mailing to');
	var sendTo= '';
	var msg = '';
	if(my_email){
		sendTo = my_email;	
		msg = "New potential client with Email address: " +document.getElementById('email').value +", is added to the Dimensify Waiting List";
	} else {
		sendTo = document.getElementById('email').value;
		msg = "Congratulations! You've just secured your spot on our exclusive waitlist. Get ready to be among the first to experience our groundbreaking Platform Dimensify A 3D Wizard – we'll notify you soon!"
	}

	var params = {
		
		email: sendTo,
		message:msg
	};

	console.log('mailing to :',document.getElementById('email').value);

	const serviceId = "service_6qnjn7l";
	const templateId = "template_oewpkbb";

	emailjs.send(serviceId,templateId,params)
	.then(
		res => {
			document.getElementById("email").value = "";
			console.log(res);
			// alert('you have be');
		},(error)=>{
			console.log(error);
		});
 
}

var closeButtonWait = document.getElementById("close-button-wait");

closeButtonWait.addEventListener("click", function() {
    join_waiting_list.style.display = "none";
  });



