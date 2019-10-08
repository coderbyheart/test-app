import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

const fs = require('fs');
const path = require('path');

const levelEnv = process.env.LOG_LEVEL || 'debug';
const logDir = 'log';
const pM: any = process.mainModule;
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

export class EWLOG {
  public static logger = createLogger({
    format: format.combine(
      format.label({ label: path.basename('pM.filename') }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    level: levelEnv,
    transports: [
      // - Write to all logs with level defined by user and above to `combined.log`
      new transports.File({
        filename,
        format: format.combine(
          format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
        ),
      }),
      // - Write all logs error (and above) to Console/terminal
    ],
  });
}
