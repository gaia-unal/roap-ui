import request from 'superagent';


class userValidateService {
  constructor() {
    this.url = `${process.env.BACKEND_HOST}/user-account`;
  }

  validate(token, response, error) {
    request
      .get(`${this.url}/validate/${token}`)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  sendEmail(email, response, error) {
    request
      .get(`${this.url}/send-email/${email}`)
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
