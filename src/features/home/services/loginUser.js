import request from 'superagent';


class loginUserService {
  constructor() {
    this.url = 'http://localhost/user-login';
  }

  post(email, password, response, error) {
    const user = {
      email, password
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
}

export default loginUserService;
