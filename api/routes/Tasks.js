const express = require("express");
const router = express.Router();
const query = require("../db/index.js");

router.get("/", async function (req, res, next) {
  const rows = await query("SELECT * FROM tasks");
  return res.status(200).json(rows);
});

router.post("/", async function (req, res, next) {
  console.log(req.body.projects_id);
  try {
    console.log("tried");
    await query(
      `INSERT INTO tasks(title, prio, creation_date, details, status, user_id, projects_id) values(?, ?, NOW(), ?, 0, 1, ?)`,
      [req.body.title, req.body.prio, req.body.details, req.body.projects_id],
    );
    res.status(200).json({ msg: "Task Added" });
  } catch (err) {
    console.log("caught");
    res.status(500).json({ msg: err.message });
  }
});
router.put("/", async function (req, res, next) {
  console.log(req.body);
  try {
    console.log("tried");
    await query(
      `UPDATE tasks SET title="${req.body.title}", status="${req.body.status}", details="${req.body.details}", prio="${req.body.prio}"
      WHERE id=${req.body.id}`,
    );
    res.status(201).json({ msg: "Task Updated" });
  } catch (err) {
    console.log("caught");
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", function (req, res, next) {
  console.log(req.params.id);
  query(`DELETE FROM tasks WHERE id=?`, [req.params.id]);
  res.status(200).json({ msg: "Task Deleted" });
});

module.exports = router;
