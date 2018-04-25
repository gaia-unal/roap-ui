import request from 'superagent';


class LearningObjectFilesService {
  constructor() {
    this.url = 'http://localhost/files';
  }

  get(fileName, response, error) {
    request
      .get(`${this.url}/${fileName}`)
      .end((err, res) => {
        if (!err) {
          response(res.body);
        } else {
          error(err);
        }
      });
  }
}

export default LearningObjectFilesService;
