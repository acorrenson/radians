
// author  : Arthur Correnson
// mail    : jdrprod@gmail.com
// version : 0.0.0

// This plugin is in development, do not use ^^ !

(function() {

  // <-- PRIVATE --> //
  var version = "0.0.0";
  //private method
  // <-- PUBLIC --> //

  window.originUniverse = {
    a: 0,
    b: 0
  }

  // scale
  p5.prototype.scale = function(point, modeName = "linear", intensity = -0.5) {
    var mode = {
      linear: function() {
        return intensity/point.radius * abs(point.x) + 1;
      }
    }
    return mode[modeName]();
  }

  //class Point
  p5.prototype.Point = function(radius, azim, pola, c = color(255, 0, 0)) {
    // shperical coordinates
    this.a = azim;
    this.b = pola + HALF_PI;
    this.radius = radius;
    // color
    this.c = c;
  }

  // convert actuals spherical coordinates to cartesian coordinates
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

  // draw a point
  p5.prototype.Point.prototype.draw = function(upAxes = "z", scaleEnabled = true) {
    // get cartesian coordinates
    if(!this.x) this.setCart();
    fill(this.c);
    noStroke();
    var r = upAxes === "z" ? "y" : "z";
    var h = scaleEnabled ? 8*scale(this) : 8;
    if(this[r] > 0)
      ellipse(this.x, this[upAxes], h, h);
  }

  // class Planet
  p5.prototype.Planet = function(radius, density, origin = originUniverse, c) {
    this.points = [];
    this.satellites = [];
    this.density = density;
    this.radius = radius;
    this.c =  c;
    this.origin = origin;
    this.generate();
  }

  // planet.generate()
  p5.prototype.Planet.prototype.generate = function() {
    for(var i = 0; i < this.density; i++) {
      this.points.push(new Point(this.radius, random(0, TWO_PI), random(0, TWO_PI), this.c));
    }
  }

  // planet.draw()
  p5.prototype.Planet.prototype.draw = function() {
    fill(0);
    ellipse(0, 0, this.radius*2, this.radius*2);
    for(var i = 0; i < this.points.length; i++) {
      this.points[i].draw();
    }
  }

  // planet.rotate()
  p5.prototype.Planet.prototype.rotate = function(angle) {
    for(var i = 0; i < this.points.length; i++) {
      this.points[i].rotate(angle);
    } 
  }

  // planet.setRotation()
  // start auto rotation
  p5.prototype.Planet.prototype.startRotation = function(angle, delta) {
    this.rotation = setInterval(() => {this.rotate(angle)}, delta);
  }

  // planet.stopRotation()
  // cancel auto rotation
  p5.prototype.Planet.prototype.stopRotation = function() {
    if (this.rotation)
      clearInterval(this.rotation);
  }

  // add a new satellite
  p5.prototype.Planet.prototype.newSatellite = function(satellite) {
    var s = new Anchor(this, satellite);
    this.satellites.push(s);
  }

  p5.prototype.Planet.prototype.drawSatellites = function() {
    for(var i = 0; i < this.satellites.length; i++) {
      push();
      this.satellites[i].rotate(PI/180);
      translate(this.satellites[i].x, this.satellites[i].z);
      this.satellites[i].child.draw();
      pop();
    }
  }

  p5.prototype.Anchor = function(parent, child) {
    this.parent = parent;
    this.child = child;
    p5.prototype.Point.call(this, this.parent.radius + this.child.radius + 50, 0, 0);
  }

  p5.prototype.Anchor.prototype = Object.assign({}, p5.prototype.Point.prototype);

})();