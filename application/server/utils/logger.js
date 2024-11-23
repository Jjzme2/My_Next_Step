const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const logDir = "logs/";
const fileName = logDir + new Date().toLocaleDateString().replace(/\//g, "_") + "_Application.log";


const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), logFormat),

//   File Name: MM_DD_YYYY_Application.log
  transports: [
    new transports.Console(),
    new transports.File({ filename: fileName }),
  ],
});

module.exports = logger;
