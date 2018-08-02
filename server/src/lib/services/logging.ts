import * as fs from 'fs';
import * as winston from 'winston';

if (!fs.existsSync('logs')) {
	fs.mkdirSync('logs');
}

const logging = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: 'logs/logfile.log',
			level: 'info',
			handleExceptions: true,
			maxsize: 4096,
		}),
	],
});

// logging.stream = split().on('data', (message: string) => {
// 	logging.info(message);
// });

if (process.env.NODE_ENV !== 'production') {
	logging.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	);
}

export default logging;
