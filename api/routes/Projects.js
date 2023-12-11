const express = require("express");
const router = express.Router();
const query = require("../db/index.js");

router.get("/", async function (req, res, next) {
  const rows = await query("SELECT * FROM projects");
  return res.status(200).json(rows);
});

router.post("/", async function (req, res, next) {
  console.log(req.body);
  try {
    console.log("tried");
    await query(
      `INSERT INTO projects(title, prio, creation_date, description, status) values(?, ?, NOW(), ?, 0)`,
      [req.body.title, req.body.prio, req.body.description],
    );
    res.status(200).json({ msg: "Project Added" });
  } catch (err) {
    console.log("caught");
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", function (req, res, next) {
  console.log(req.body);
  query(`DELETE FROM projects WHERE id=?`, [req.params.id]);
  res.status(200).json({ msg: "Project Deleted" });
});

module.exports = router;
