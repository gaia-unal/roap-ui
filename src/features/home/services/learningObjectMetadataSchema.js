import request from 'superagent';


class LearningObjectMetadataSchemaService {
  constructor() {
    this.url = 'http://localhost/back/object-meta';
  }

  get(token, response, error) {
    request
      .get(this.url)
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

export default LearningObjectMetadataSchemaService;
