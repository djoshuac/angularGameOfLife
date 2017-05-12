// Load d3 to the page within the angular app CITE: http://www.ng-newsletter.com/posts/d3-on-angular.html
angular.module("d3", [])
  .factory("d3Service", ["$document", "$q", "$rootScope",
    function($document, $q, $rootScope) {
      let d = $q.defer();

      function onScriptLoad() {
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }

      let scriptTag = $document[0].createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.async = true;
      scriptTag.src = "https://d3js.org/d3.v3.min.js";
      scriptTag.onreadystatechange = function () {
        if (this.readyState == "complete") onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;

      let body = $document[0].getElementsByTagName("body")[0];
      body.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
    }]);
