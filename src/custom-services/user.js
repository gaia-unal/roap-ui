import request from 'superagent';


class userService {
  constructor() {
    this.url = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'}`;
  }

  post(email, password, name, requestedRole, response, error) {
    const user = {
      email, password, name, requested_role: requestedRole,
    };
    request
      .post(`${this.url}/user-collection`)
      .send(user)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  validateAccount(token, response, error){
    console.log('request');
    request
      .get(`${this.url}/user-account/validate/${token}`)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  sendUserEmail(email, response, error){
    request
      .get(`${this.url}/user-account/send-email/${email}`)
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
