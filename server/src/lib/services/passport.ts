import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';

import { User } from '../../models';

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: String(process.env.JWT_SECRET),
};

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
	const id = payload.sub;
	const timestamp = new Date().getTime();
	if (payload.exp <= timestamp) {
		done(null, false);

		return;
	}

	try {
		const user = await getRepository(User).findOne({
			where: { id },
		});
		if (user === null) {
			done(null, false);

			return;
		}

		done(null, user);

		return;
	} catch (error) {
		console.log(error);
		done(error, false);

		return;
	}
});

passport.use(jwtLogin);
