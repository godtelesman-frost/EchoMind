// =========================
// FAKE LIVE PRODUCTIVITY
// =========================

const progress = document.querySelector(".progress");

let width = 0;

function animateProgress(){

  if(!progress){
    return;
  }

  if(width >= 82){

    clearInterval(loader);

  }else{

    width++;

    progress.style.width = width + "%";

  }

}

let loader = setInterval(animateProgress,20);
