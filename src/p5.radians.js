
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
  p5.prototype.Planet = function(radius, density, c) {
    this.points = [];
    this.satellite = null;
    this.density = density;
    this.radius = radius;
    this.c = c;
  }

  // planet.generate()
  p5.prototype.Planet.prototype.generate = function() {
    for(var i = 0; i < this.density; i++) {
      this.points.push(new Point(this.radius, random(0, TWO_PI), random(0, TWO_PI), this.c));
    }
  }

  // planet.draw()
  p5.prototype.Planet.prototype.draw = function() {

    if(this.satellite && this.satellite.anchor.y > 0) {
      this.drawSelf();
      this.satellite.draw();
    } else if(this.satellite) {
      this.satellite.draw();
      this.drawSelf();
    } else {
      this.drawSelf();
    }

  }

  p5.prototype.Planet.prototype.drawSelf = function() {
    fill(0);
    ellipse(0, 0, this.radius*2, this.radius*2);
    this.drawPoints();
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
    this.rotation = setInterval(() => {
      this.rotate(angle);
      // if (this.satellite) this.satellite.rotate(-angle);
    }, delta);
  }

  // planet.stopRotation()  
  // cancel auto rotation
  p5.prototype.Planet.prototype.stopRotation = function() {
    if (this.rotation)
      clearInterval(this.rotation);
  }

  // add a new satellite
  p5.prototype.Planet.prototype.newSatellite = function(distance, anchorAzim, anchorPola, radius, density, color) {
    var s = new Satellite(distance, anchorAzim, anchorPola, radius, density, color);
    s.generate();
    s.startRotation(-PI/180, 1000/60);
    console.log(s);
    this.satellite = s;
  }

  p5.prototype.Planet.prototype.drawPoints = function() {
    for(var i = 0; i < this.points.length; i++) {
      this.points[i].draw();
    }
  } 

  p5.prototype.Anchor = function(radius, azim, pola) {
    p5.prototype.Point.call(this, radius, azim, pola);
  }

  p5.prototype.Anchor.prototype = Object.assign({}, p5.prototype.Point.prototype);

  p5.prototype.Anchor.prototype.startRotation = function(angle, delta) {
    this.rotation = setInterval(() => {
      this.rotate(angle);
    }, delta);
  }

  p5.prototype.Anchor.prototype.stopRotation = function() {
    if(this.rotation)
      clearInterval(this.rotation);
  }

  p5.prototype.Satellite = function(distance, anchorAzim, anchorPola, radius, density, color) {
    p5.prototype.Planet.call(this, radius, density, color);
    this.anchor = new Anchor(distance, anchorAzim, anchorPola);
    this.anchor.startRotation(PI/180, 1000/60);
  }

  p5.prototype.Satellite.prototype = Object.assign({}, p5.prototype.Planet.prototype);

  p5.prototype.Satellite.prototype.draw = function() {
    push();
    translate(this.anchor.x, this.anchor.z);
    if(this.satellite && this.satellite.anchor.y > 0) {
      this.drawSelf();
      this.satellite.draw();
    } else if(this.satellite) {
      this.satellite.draw();
      this.drawSelf();
    } else {
      this.drawSelf();
    }
    pop();
  }

})();