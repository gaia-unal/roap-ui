import request from 'superagent';


class LearningObjectFilesService {
  constructor() {
    this.url = `${process.env.BACKEND_HOST}/files`;
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
