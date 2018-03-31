import request from 'superagent';


class userValidateService {
  constructor() {
    this.url = 'http://localhost/back/user-validate';
  }

  get(token, response, error) {
    request
      .get(`${this.url}/${token}`)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }
}

export default userValidateService;
