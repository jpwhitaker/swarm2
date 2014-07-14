if (Meteor.isClient) {

  Meteor.startup(function () {

    board = [];
    Canvas.resizeCanvas();


    (function(){
      var names = ['Jan','Feb', 'Mar', 'Apr','May'];
      provide({
        getMonthName: function(num) {return names[num];},

        getMonthNumber: function(name){
          for (var num = 0; num<names.length;num++){
            if (names[num] == name ) return num;
          }
        }
      });

    })();


    function provide(values){
      forEachIn(values, function(name, value){
        window[name] = value;
      });
    }

    function forEachIn(object, action){
      for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property))
          action(property, object[property]);
      }
    }


  })
};
