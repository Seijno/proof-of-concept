document.querySelectorAll(".choiceMenu, .btnBorder")
  .forEach((div, index) => {
    div.style.animationDelay = `${index * 0.2}s`;
  });