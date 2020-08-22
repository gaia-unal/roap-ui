import request from 'superagent';

class userService {
  constructor() {
    this.url = `${process.env.NODE_ENV === 'production' ? '' : 'http://192.168.1.56:8081'}`;
  }

  post(email, password, name, requestedRole, response, error) {
    const user = {
      email,
      password,
      name,
      requested_role: requestedRole,
    };
    request
      .post(`${this.url}/v1/user-collection`)
      .send(user)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  validateAccount(token, response, error) {
    request.get(`${this.url}/v1/user-account/validate/${token}`).end((err, res) => {
      if (!err) {
        response(res);
      } else {
        error(err);
      }
    });
  }

  sendUserEmail(email, response, error) {
    request.get(`${this.url}/v1/user-account/send-email/${email}`).end((err, res) => {
      if (!err) {
        response(res);
      } else {
        error(err);
      }
    });
  }

  sendEmailRecoverPassword(email, response, error) {
    request.get(`${this.url}/v1/recover-password/send-email/${email}`).end((err, res) => {
      if (!err) {
        response(res);
      } else {
        error(err);
      }
    });
  }

  recoverPasswordUserAccount(token, password, response, error) {
    request
      .post(`${this.url}/v1/recover-password/${token}`)
      .send({ password: password })
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
