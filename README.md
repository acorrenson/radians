# p5.radians.js

![3 planets displayed with p5.radians.js]("https://raw.githubusercontent.com/Floating-Dream-Studio/radians.js/master/intro.PNG")

*!!! BE CAREFUL, THIS PROJECT IS IN DEVELOPMENT !!!*

This plugin allows you to generate some beautiful planets, stars and galaxies.

Features:

+ PLanet and Satellite creation
+ 3D visualisation
+ *more soon*

# How to use it ?

## Create a new planet

As a [p5.js]() plugin, Radians.js need p5 to work (a complete version which is'nt a plugin is in progress).

To create manually a new Planet, you need to instanciate a new Planet object. `Planet(radius, density[, color])`
+ `radius` (number) planet's radius in px
+ `density` (number) number of points displayed
+ `color` (p5 color object) planet's color

```Javascript
var p = new Planet(100, 800, color(255, 0, 0));
```

*`p` is a red planet wich is 200px wide*

## Display a planet

To display a planet, we first need to generate all points of the planet itself in order to display them.
To generate all points of a planet, use the method `Planet.generate()`.

Then, to display the planet, we need to setup p5.js and to use `Planet.draw()`.

```javascript
var p = new Planet(100, 800);

function setup() {
  p.generate();
}

function draw() {
  p.draw();
}
```

## Animate a planet

Radians.js allows us to run beautifull rotation animation.
To setup a rotation, we use the method `Planet.startRotation([angle] [, deltaTime])`
+ `angle` (number) rotation angle in radians
+ `deltaTime` (number) time in ms between each rotation

*by default, angle is set to PI/180 and deltaTime is set to 1000/60 (60 rotations/second)*

```javascript
var p = new Planet(100, 800);

function setup() {
  p.generate();
  p.startRotation(PI/200, 1000/60);
}
```

# How it works ?

The rendering process of *p5.radians.js* is based on spherical coordinates to be realy light and fast.
It uses p5 2D renderer + a custom *3D engine* (it's not a true 3D engine but just a converter which computes 3D coordinates according to spherical coordinates and display it in a 2D context).

All the system is built arround the `Point` object. `Point(radius, angle1, angle2)`.
+ `radius` (number) radial distance in px
+ `angle1` (number) azimuthal angle(latitude) in Radians
+ `angle2` (number) polar angle (longitude) in Radians

Let's see an exemple :

```javascript
  var p = new Point(100, 0, PI);
```

`p` is a point with spherical coordinates (100, 0, PI)

* *be careful, spherical coordinates in p5.radians.js are written according mathematics convention*
