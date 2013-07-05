module.exports.index = function(req, res) {
  res.json({ "wtf": true });
};

var Link = function(long_url) {
  // Így néz ki egy link.
  // Ezt a struktúrát használtunk az első részben is.
  this.short = "";
  this.long = long_url;
  this.clicks = 0;
  this.created_at = new Date();

  // Legeneráltatjuk a rövid azonosítót
  this.generateShort();
};

Link.prototype.generateShort = function() {
  // A range nevű hosszú string lesz az alapja a generálásnak.
  // Ezen karakterek fordulhatnak elő benne.
  var range = "qwertyuiopasdfghjklzxcvbnm1234567890",
      // elmentjuk a hosszát is ennek, hogy ne kelljen a ciklusban
      // minden körben megnézni újra.
      rangeLength = range.length;

  // Jelenleg egy hét karakteres azonosító jó lesz.
  for (var i=0; i < 7; i++) {
    // Minden körben elmentünk a range stringből egy véletlenszerű karaktert.
    // Elég primitív generálás, de majd később okosítunk rajta, hogy
    // ne kelljen sok kört futni az egyedisége miatt.
    this.short += range.charAt(Math.floor(Math.random() * rangeLength));
  }

  return true;
};

module.exports.addLink = function(req, res) {
  // Kiszedjük a POST (azaz body) részből a linket
  // Ha nincs, akkor `link` vagy 0 karakter hosszú,
  // akkorvisszatérünk hibával.
  if (typeof req.body.link == "undefined" || req.body.link.length < 1) {
    return res.json({"error": true, "message": "empty url"});
  }
  // Ha van link, akkor csinálunk egy új Link példányt,
  // ami majd lerendezi nekünk a megfelelő átalakításokat
  var link = new Link(req.body.link);
  // aztán vissza is tudunk vele térni.
  return res.json(link);
};