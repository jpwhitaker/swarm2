Meteor.startup(function(){
  ctx = canvas.getContext('2d');

  /**
   * A Point is simply x and y coordinates
   * @constructor
   */
  Point = function(x, y) {
    this.X = x;
    this.Y = y;
  };

  /**
   * A Rectangle is x and y origin and width and height
   * @constructor
   */
  Rectangle = function(x, y, width, height) {
    this.X = x;
    this.Y = y;
    this.Width = width;
    this.Height = height;
  };

  /**
   * A Line is x and y start and x and y end
   * @constructor
   */
  Line = function(x1, y1, x2, y2) {
    this.X1 = x1;
    this.Y1 = y1;
    this.X2 = x2;
    this.Y2 = y2;
  };

  /**
   * A Hexagon is a 6 sided polygon, our hexes don't have to be symmetrical, i.e. ratio of width to height could be 4 to 3
   * @constructor
   */
  Hexagon = function(id, x, y, type) {
    // debugger
    this.Points = [];//Polygon Base
    this.type = type;
    this.name = 'henry';
    this.neighbors = [];
    this.generateNeighbors(x,y);
    this.selected = false;
    this.dragging = false;



    var x1 = null;
    var y1 = null;
    if(Hexagon.Static.ORIENTATION == Hexagon.Orientation.Normal) {
      // x1 = (Hexagon.Static.WIDTH - Hexagon.Static.SIDE)/2;
      // y1 = (Hexagon.Static.HEIGHT / 2);
      this.Points.push(new Point(x1 + x, y));
      this.Points.push(new Point(x1 + Hexagon.Static.SIDE + x, y));
      this.Points.push(new Point(Hexagon.Static.WIDTH + x, y1 + y));
      this.Points.push(new Point(x1 + Hexagon.Static.SIDE + x, Hexagon.Static.HEIGHT + y));
      this.Points.push(new Point(x1 + x, Hexagon.Static.HEIGHT + y));
      this.Points.push(new Point(x, y1 + y));
    }
    else {

      // //midX and midY shift everything to the midpoint of where the cursor clicked
      // midX = x + (Hexagon.Static.WIDTH / 2)
      // midY = y + (Hexagon.Static.HEIGHT / 2)


      x1 = (Hexagon.Static.WIDTH / 2);
      y1 = (Hexagon.Static.HEIGHT - Hexagon.Static.SIDE)/2;
      this.Points.push(new Point(x, y - (y1*2)));
      this.Points.push(new Point(Hexagon.Static.WIDTH + x - x1,  y - y1));
      this.Points.push(new Point(Hexagon.Static.WIDTH + x-x1,  Hexagon.Static.SIDE + y -y1));
      this.Points.push(new Point(x, Hexagon.Static.HEIGHT + y - (y1*2)));
      this.Points.push(new Point(x-x1,  Hexagon.Static.SIDE + y -y1));
      this.Points.push(new Point(x-x1, y -y1));
    }

    this.Id = id;

    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;

    this.TopLeftPoint = new Point(this.x -x1, this.y -y1 -y1);
    this.BottomRightPoint = new Point(this.x + Hexagon.Static.WIDTH -x1, this.y -y1 + Hexagon.Static.HEIGHT -y1);
    this.MidPoint = new Point(this.x, this.y);

    this.P1 = new Point(x + x1, y + y1);
  };

  /**
   * draws this Hexagon to the canvas
   * @this {Hexagon}
   */
  Hexagon.prototype.draw = function(ctx) {
    if(!this.selected)
      ctx.strokeStyle = "grey";
    else
      ctx.strokeStyle = "black";

    if(this.type == 'ghost'){
      ctx.setLineDash([5])
    };
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.Points[0].X, this.Points[0].Y);
    for(var i = 1; i < this.Points.length; i++)
    {
      var p = this.Points[i];
      ctx.lineTo(p.X, p.Y);
    }
    ctx.closePath();
    ctx.stroke();

    if(this.Id)
    {
      //draw text for debugging
      ctx.fillStyle = "black"
      ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      //var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
      ctx.fillText(this.Id, this.MidPoint.X, this.MidPoint.Y);

    }


    if(this.PathCoOrdX !== null && this.PathCoOrdY !== null && typeof(this.PathCoOrdX) != "undefined" && typeof(this.PathCoOrdY) != "undefined")
    {
      //draw co-ordinates for debugging
      ctx.fillStyle = "black"
      ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      //var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
      ctx.fillText("("+this.PathCoOrdX+","+this.PathCoOrdY+")", this.MidPoint.X, this.MidPoint.Y + 10);
    }

    if(Hexagon.Static.DRAWSTATS)
    {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      //draw our x1, y1, and z
      ctx.beginPath();
      ctx.moveTo(this.P1.X, this.y);
      ctx.lineTo(this.P1.X, this.P1.Y);
      ctx.lineTo(this.x, this.P1.Y);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = "black"
      ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = 'middle';
      //var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
      ctx.fillText("z", this.x + this.x1/2 - 8, this.y + this.y1/2);
      ctx.fillText("x", this.x + this.x1/2, this.P1.Y + 10);
      ctx.fillText("y", this.P1.X + 2, this.y + this.y1/2);
      ctx.fillText("z = " + Hexagon.Static.SIDE, this.P1.X, this.P1.Y + this.y1 + 10);
      ctx.fillText("(" + this.x1.toFixed(2) + "," + this.y1.toFixed(2) + ")", this.P1.X, this.P1.Y + 10);
    }
  };




  /**
   * Returns true if the x,y coordinates are inside this hexagon
   * @this {Hexagon}
   * @return {boolean}
   */
  Hexagon.prototype.isInBounds = function(x, y) {
    return this.Contains(new Point(x, y));
  };
    

  /**
   * Returns true if the point is inside this hexagon, it is a quick contains
   * @this {Hexagon}
   * @param {Point} p the test point
   * @return {boolean}
   */
  Hexagon.prototype.isInHexBounds = function(/*Point*/ p) {
    if(this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y && p.X < this.BottomRightPoint.X && p.Y < this.BottomRightPoint.Y)
      return true;
    return false;
  };

  //grabbed from:
  //http://www.developingfor.net/c-20/testing-to-see-if-a-point-is-within-a-polygon.html
  //and
  //http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#The%20C%20Code
  /**
   * Returns true if the point is inside this hexagon, it first uses the quick isInHexBounds contains, then check the boundaries
   * @this {Hexagon}
   * @param {Point} p the test point
   * @return {boolean}
   */
  Hexagon.prototype.Contains = function(/*Point*/ p) {
    var isIn = false;
    if (this.isInHexBounds(p))
    {
      //turn our absolute point into a relative point for comparing with the polygon's points
      //var pRel = new Point(p.X - this.x, p.Y - this.y);
      var i, j = 0;
      for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++)
      {
        var iP = this.Points[i];
        var jP = this.Points[j];
        
        if (
          (
           ((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
           ((jP.Y <= p.Y) && (p.Y < iP.Y))
          //((iP.Y > p.Y) != (jP.Y > p.Y))
          ) &&
          (p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)
           )
        {
          isIn = !isIn;
        }
        else
          {}
      }
    }
    return isIn;
  };

  /**
  * Returns absolute distance in pixels from the mid point of this hex to the given point
  * Provided by: Ian (Disqus user: boingy)
  * @this {Hexagon}
  * @param {Point} p the test point
  * @return {number} the distance in pixels
  */
  Hexagon.prototype.distanceFromMidPoint = function(/*Point*/ p) {
    // Pythagoras' Theorem: Square of hypotenuse = sum of squares of other two sides
    var deltaX = this.MidPoint.X - p.X;
    var deltaY = this.MidPoint.Y - p.Y;

    // squaring so don't need to worry about square-rooting a negative number 
    return Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) );
  };

  Hexagon.Orientation = {
    Normal: 0,
    Rotated: 1
  };

  Hexagon.Static = {HEIGHT:90
            , WIDTH:90
            , SIDE:50.0
            , ORIENTATION:Hexagon.Orientation.Rotated
            , DRAWSTATS: false};//hexagons will have 25 unit sides for now

})