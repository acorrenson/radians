# p5.radians.js

*!!! BE CAREFUL, THIS PROJECT IS IN DEVELOPMENT !!!*

This plugin allows you to generate some beautiful planets, stars and galaxies.

Features:

+ 3D visualisation
+ *more soon*


# How it works ?

The rendering process of *p5.radians.js* is based on spherical coordinates to be realy light and fast.
It uses p5 2D renderer + a custom *3D engine* (it's not a true 3D engine but just a converter which computes 3D coordinates according to spherical coordinates and display it in a 2D context).

All the system is built arround the `Point` object.

```javascript
  Point(angle1, angle2, radius);
```

+ `angle1` => elevation (latitude) in Radians
+ `angle2` => inclination (longitude) in Radians
+ `radius` => distance between the point and the origin (0, 0) in px

Let's see an exemple :

```javascript
  var p = new Point(0, PI, 100);
```

`p` is a point with spherical coordinates (100, 0, PI)

* *be careful, spherical coordinates are  usually written like `radius, angle1, angle2` but the constructor needs `angle1, angle2, radius`*


# How to use it ?

This plugin is realy easy to use
