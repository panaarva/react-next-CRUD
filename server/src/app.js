const express = require("express");
const path = require('path');
const app = express();
const EmployeeRoute = require('../routes/employeeRoute');
const DepartmentRoute = require('../routes/departmentRoute');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use("/employee", EmployeeRoute);
app.use("/department", DepartmentRoute);
// error handler
app.use(function (err, req, res, next) {
  try {
    res.status(err.status || 500);

    res.json({
      status: err.status,
      type: err.message
    });
    next();
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;