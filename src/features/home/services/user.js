import request from 'superagent';


class userService {
  constructor() {
    this.url = 'http://localhost/back/user';
  }

  post(email, password, name, requestedRole, response, error) {
    const user = {
      email, password, name, requested_role: requestedRole,
    };
    request
      .post(this.url)
      .send(user)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  get(query, token, response, error) {
    request
      .get(this.url)
      .query(query)
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

export default userService;
