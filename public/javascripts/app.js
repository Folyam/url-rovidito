var App = {
  controllers: {},
  configuration: {
    domain: "s.l",
    protocol: "http"
  },
  utils: {}
};

(function UrlUtils (app) {
  app.utils.url = {
    get: function(path) {
      return app.configuration.protocol + "://" + app.configuration.domain + path;
    }
  };
})(App);

(function LinkController (app) {
  app.controllers.Link = function ($scope, $http) {
    // Ebben vannak a linkek, amikről tudunk.
    $scope.links = [];

    // Hozzáadunk egy függvényt a scope-hoz, ami
    // akkor fog meghívódni, amikor megnyomjuk az
    // add gombot.
    $scope.addLink = function addLink () {
      // Azonnal el is indítunk egy POST kérést
      // a szerver felé. A szerver egy link nevű
      // paramétert vár a kérés törtzsében, ezt
      // meg is adjuk neki. Ha kész, akkor meghívódik
      // a callback.
      $http.post('/link', { link: $scope.newLink }).success(function(data, status) {
        // Ha a válasz státuszkódja nem 200, akkor
        // baj van. Erről szólni illik a felhasználónak
        // még ha nem is ilyen barbár alert ablakkal.
        if (status != 200) {
          alert("Valami hiba történt!");
          return false;
        }
        // Ha van error kulcs a kapott adatban
        // és az igaz, akkor adjuk vissza
        // a felhasználónak a hozzá tartozó
        // hibaüzenetet.
        if (data.hasOwnProperty('error') && data.error == true) {
          alert(data.message);
          return false;
        }
        // Írjuk felül a kapott adatot, legalábbis
        // a short tulajdonságát, mert az ugye
        // nem tartalmazza csak a rövid kódot,
        // míg mi linket szeretnénk kirakni.
        data.short = App.utils.url.get("/" + data.short);
        // Adjuk hozzá a tömbünk elejéhez.
        $scope.links.unshift(data);
      });

      // Ürítsük ki a beviteli mezőnket, hogy
      // új linket lehessen felvinni.
      $scope.newLink = "";
      return null;
    };
  };
  // JavaScript tömörítők esetén nem tudja az Angular.js,
  // hogy mik a paraméterek így meg kell neki mondani.
  // Ha nem tömöríted, akkor is érdemes megadni, mert
  // később kényelmetlen mindenhova felvinni, ha mégis
  // szeretnéd tömöríteni.
  app.controllers.Link.$inject = ['$scope', '$http'];
})(App);
