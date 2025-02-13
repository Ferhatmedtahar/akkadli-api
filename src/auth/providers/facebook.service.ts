import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookService extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      // clientID: process.env.APP_ID,
      // clientSecret: process.env.APP_SECRET,
      clientID: '965963985109554',
      clientSecret: '5c85a390c20d1db5776fff732aa24797',
      callbackURL:
        'https://0c94-41-111-87-175.ngrok-free.app/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
