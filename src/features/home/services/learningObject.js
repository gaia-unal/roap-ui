import request from 'superagent';


class LearningObjectCollectionService {
  constructor() {
    this.url = `${process.env.BACKEND_HOST}/learning-object-collection`;
  }

  get(offset, count, search, response, error) {
    let query = { offset, count };

    if (search !== '') {
      query = { offset, count, search };
    }

    request
      .get(this.url)
      .query(query)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  rating(learningObjectId, rating, token, response, error) {
    request
      .patch(`${this.url}/${learningObjectId}`)
      .set('AUTHORIZATION', token)
      .query({ rating })
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }

  post(file, learningObjectMetadata, token, response, error) {
    request
      .post(this.url)
      .set('AUTHORIZATION', token)
      .field('learningObjectMetadata', JSON.stringify(learningObjectMetadata))
      .attach('file', file)
      .end((err, res) => {
        if (!err) {
          response(res);
        } else {
          error(err);
        }
      });
  }
}

export default LearningObjectCollectionService;
