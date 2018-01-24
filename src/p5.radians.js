// author  : Arthur Correnson
// mail    : jdrprod@gmail.com
// version : 0.0.0

// This plugin is in development, do not use ^^ !

(function() {

  // <-- PRIVATE --> //
  var version = "0.0.0";
  //private method
  function cos (rad) {
    return Math.cos(rad);
  }

  function sin (rad) {
    return Math.sin(rad);
  }

  function tan (rad) {
    return Math.tan(rad);
  }

  // <-- PUBLIC --> //

  //class Point
  p5.prototype.Point = function(a, b, radius) {
    this.a = a;
    this.b = b;
    this.radius = radius;
  }

  // convert actuals spherical coordinates in cartesian coordinates
  p5.prototype.Point.prototype.setCart = function() {
    this.x = this.radius * cos(this.a)/cos(this.b);
    this.y = this.radius * sin(this.a)/cos(this.b);
    this.z = this.radius * tan(this.b);
  }

  p5.prototype.Point.prototype.rotate = function() {
    console.log("e")
  }

  p5.prototype.Point.prototype.draw = function() {
    this.setCart();
    fill(255, 0, 0);
    ellipse(this.x, this.y, 10, 10);
  }


})();