// / <reference types="_all.d.ts" />

import * as http from 'http';
import * as debug from 'debug';

import Server from './server';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 4500);
Server.set('port', port);

console.log(process.env.PORT);

console.log(`Server Listening on port ${port}`);

const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value: number | string): number | string | boolean {
	const iPort: number = typeof value === 'string' ? Number(value) : value;
	switch (true) {
		case isNaN(iPort):
			return value;
		case iPort >= 0:
			return iPort;
		default:
			return false;
	}
}

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening(): void {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
	debug(`Listening on ${bind}`);
}
