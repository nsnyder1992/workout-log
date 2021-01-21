//express
const router = require("express").Router();

//database
const Log = require("../db").import("../models/log.js");

// validation
const validateSession = require("../middleware/validate-session");

///////////////////////////////////////////////////////////////
//CREATE WORKOUT LOG
///////////////////////////////////////////////////////////////
router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  };

  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//READ ALL ENTRIES
///////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  Log.findAll()
    .then((logs) => res.status(200).json({ logs }))
    .catch((err) => res.status(500).json({ err }));
});

///////////////////////////////////////////////////////////////
//READ ALL USER ENTRIES
///////////////////////////////////////////////////////////////
router.get("/:userID", (req, res) => {
  Log.findAll({ where: { owner_id: req.params.userID } })
    .then((logs) => res.status(200).json({ logs }))
    .catch((err) => res.status(500).json({ err }));
});

///////////////////////////////////////////////////////////////
//UPDATE USER ENTRY
///////////////////////////////////////////////////////////////
router.put("/:entryID", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  };

  const query = { where: { id: req.params.entryID, owner_id: req.user.id } };

  Log.update(logEntry, query)
    .then((logs) => res.status(200).json({ logs }))
    .catch((err) => res.status(500).json({ err }));
});

///////////////////////////////////////////////////////////////
//DELETE ENTRY BY ID
///////////////////////////////////////////////////////////////
router.delete("/:entryID", validateSession, (req, res) => {
  const query = { where: { id: req.params.entryID, owner_id: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
