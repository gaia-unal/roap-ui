import request from 'superagent';


class LearningObjectMetadataSchemaService {
  constructor() {
    this.url = `${process.env.BACKEND_HOST}/learning-object-metadata-schema`;
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
