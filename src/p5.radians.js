// author  : Arthur Correnson
// mail    : jdrprod@gmail.com
// version : 0.0.0

// This plugin is in development, do not use ^^ !

(function() {

  // <-- PRIVATE --> //
  var version = "0.0.0";
  //private method

  // <-- PUBLIC --> //

  //class Point
  p5.prototype.Point = function(radius, azim, pola) {
    this.a = azim;
    this.b = pola;
    this.radius = radius;
    this.setCart();
  }

  // convert actuals spherical coordinates in cartesian coordinates
  p5.prototype.Point.prototype.setCart = function() {
    this.x = this.radius * sin(this.b)*cos(this.a);
    this.y = this.radius * sin(this.b)*sin(this.a);
    this.z = this.radius * cos(this.b);
  }

  // rotate arround Z axis
  p5.prototype.Point.prototype.rotate = function(a) {
    this.a += a;
    this.setCart();
  }

  p5.prototype.Point.prototype.draw = function(upAxes = "z") {
    fill(255, 0, 0);
    noStroke();
    var r = upAxes === "z" ? "y" : "z";
 
    if(this[r] >= 0)
      ellipse(this.x, this[upAxes], 10, 10);
  }

})();