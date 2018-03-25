import request from 'superagent';


class LearningObjectScoreService {
  constructor() {
    this.url = 'http://localhost/back/object-rate';
  }

  post(_id, score, then) {
    request
      .post(this.url + '/' + _id)
      .query({score: score})
      .end((err, res) => {
        if (!err) then(res);
        else console.error(err);
      });
  }

  get(_ids, then) {
    request
      .get(this.url + '/' + _ids.join("&"))
      .end((err, res) => {
        if (!err) then(res);
        else console.error(err);
      });
  }
}

export default LearningObjectScoreService;