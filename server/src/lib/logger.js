import * as winston from 'winston';
import * as fs from 'fs';

const env = process.env.NODE_ENV;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const now = new Date();
let logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			name: 'error-file',
			filename: `${logDir}/exceptions.log`,
			level: 'error',
			json: false,
		}),

		new (require('winston-daily-rotate-file'))({
			filename: `${logDir}/api.log`,
			timestamp: now,
			datePattern: 'dd-MM-yyyy',
			prepend: true,
			json: false,
			level: env === 'development' ? 'verbose' : 'info',
		}),
	],
	exitOnError: false,
});

const stream = {
	write: function(message) {
		logger.info(message);
		console.log(`message=${message}`);
	},
};

export { logger, stream };
