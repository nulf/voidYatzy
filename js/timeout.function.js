(function(w) {
     var active = {};

     var _setTimeout = w.setTimeout;
     var _clearTimeout = w.clearTimeout;

     w.setTimeout = function(fn, delay) {
         var id = _setTimeout(function() {
             fn();
             delete active[id];
         }, delay);
         active[id] = true;
         return id;
     }

     w.clearTimeout = function(id) {
         delete active[id];
         _clearTimeout(id);
     }

     w.activeTimers = function() {
         return Object.keys(active).length > 0;
     }
})(window);