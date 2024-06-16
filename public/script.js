// progress bar
const progressBar = document.getElementById("progressbar");
progressBar.style.height = 1 + "%";

window.onscroll = () => {
	const scroll = document.documentElement.scrollTop;
	const height =
		document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrolled = (scroll / height) * 100;

	if (scrolled <= 1) {
		progressBar.style.height = 1 + "%";
	} else if (scrolled >= 2 && scrolled <= 99.9) {
		progressBar.style.height = scrolled + "%";
		progressBar.classList.remove("glow");
	} else if (scrolled === 100) {
		progressBar.style.height = scrolled + "%";
		// 		Do something when reached 100% scroll
		progressBar.classList.add("glow");
	}
};


// item appearing animation
document.querySelectorAll(".choiceMenu, .btnBorder")
  .forEach((div, index) => {
    div.style.animationDelay = `${index * 0.2}s`;
  });

// loader hider/appear
const active = document.querySelector(".choiceMenu");
const hider = document.querySelector(".loadHider");
active.addEventListener(click, show);

function show(){
  hider.classList.toggle('loader')
};

      

      