import request from 'superagent';


class Auth {
  constructor() {
    this.url = 'http://localhost/auth';
  }

  post(token, response, error) {
    request
      .post(this.url)
      .set('AUTHORIZATION', token)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }
}

export default Auth;
