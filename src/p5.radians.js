(function(){
    //private method
    var Utils = {
        test: function(){
            console.log("Hello");
        }
    }
    // -- PUBLIC -- //

    //return hello to the console
    p5.prototype.sayHello = function() {
        Utils.test();
    }

    //class Point
    p5.prototype.Point = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
})();
