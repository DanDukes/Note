var path = require("path");
var fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  //POST /api/notes
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      let database = JSON.parse(data);
      database.push(newNote);
      let idKey = 1;
      for (let i = 0; i < database.length; i++) {
        database[i].id = idKey++;
      }
      fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
        if (err) throw err;
        return res.status(200).send("Note added");
      });
    });
  });

  // DELETE /api/notes/:id
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      let database = JSON.parse(data);
      let paramId = parseInt(req.params.id);
      const updatedDatabase = database.filter((obj) => obj.id !== paramId);

      fs.writeFile("./db/db.json", JSON.stringify(updatedDatabase), function (
        err
      ) {
        if (err) throw err;
        return res.status(200).send("Note deleted");
      });
    });
  });
};
