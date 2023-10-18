const Log = require("../models/log");

// CRUD Controllers

//get all logs
exports.getLogs = (req, res, next) => {
  Log.findAll()
    .then((logs) => {
      res.status(200).json({ logs: logs });
    })
    .catch((err) => console.log(err));
};

//get log by id
exports.getLog = (req, res, next) => {
  const logId = req.params.logId;
  Log.findByPk(logId)
    .then((log) => {
      if (!log) {
        return res.status(404).json({ message: "Log not found!" });
      }
      res.status(200).json({ log: log });
    })
    .catch((err) => console.log(err));
};

//create log
exports.createLog = (req, res, next) => {
  const gps = req.body.gps;

  Log.create({
    gps: gps,
  })
    .then((result) => {
      console.log("Created Log");
      res.status(201).json({
        message: "Log created successfully!",
        log: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update log
exports.updateLog = (req, res, next) => {
  const logId = req.params.logId;
  const updatedGps = req.body.gps;
  Log.findByPk(logId)
    .then((log) => {
      if (!log) {
        return res.status(404).json({ message: "Log not found!" });
      }
      log.gps = updatedGps;
      return log.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Log updated!", log: result });
    })
    .catch((err) => console.log(err));
};

//delete log
exports.deleteLog = (req, res, next) => {
  const logId = req.params.logId;
  Log.findByPk(logId)
    .then((log) => {
      if (!log) {
        return res.status(404).json({ message: "Log not found!" });
      }
      return Log.destroy({
        where: {
          id: logId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Log deleted!" });
    })
    .catch((err) => console.log(err));
};
