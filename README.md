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
  Point(radius, angle1, angle2);
```

+ `radius` => radial distance in px
+ `angle1` => azimuthal angle(latitude) in Radians
+ `angle2` => polar angle (longitude) in Radians

Let's see an exemple :

```javascript
  var p = new Point(100, 0, PI);
```

`p` is a point with spherical coordinates (100, 0, PI)

* *be careful, spherical coordinates in p5.radians.js are written according mathematics convention*
# How to use it ?

This plugin is realy easy to use
