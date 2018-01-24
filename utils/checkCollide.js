function checkCollide(s) {
  if(p5) {
    if(p5.prototype.hasOwnProperty(s)) {
      console.log(s, "-> check ^^");
    } else {
      console.log(s, "! already define in p5 !");
    }
  } else {
    console.log("Lib p5 is not loaded");
  }
}