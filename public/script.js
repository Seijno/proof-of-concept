// a big progress bar (for pleasurable) (had to look this one up)
const progressBar = document.getElementById("progressbar");
progressBar.style.height = 1 + "%";

window.onscroll = function() {
	const scroll = document.documentElement.scrollTop,
	height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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
const trigger = document.querySelector(".navItems");
const hider = document.querySelector(".loadHider");
const shower = document.querySelector(".loader")
active.addEventListener(click, show);

function show(){
  hider.classList.toggle('shower')
};

      

      