import request from 'superagent';


class LearningObjectCollectionService {
  constructor() {
    this.url = 'http://localhost/back/object';
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
}

export default LearningObjectCollectionService;