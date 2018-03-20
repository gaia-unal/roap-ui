import request from 'superagent';


class LearningObjectCollectionService {
  constructor() {
    this.url = 'http://localhost/back/object';
  }

  get(offset, count, search, then) {
    let query = {
      offset: offset, count: count
    }
    if (search != '') {
      query = {
        offset: offset, count: count, search: search
      }
    }
    request
      .get(this.url)
      .query(query)
      .end((err, res) => {
        if (!err) then(res);
        else console.error(err);
      });
  }
}

export default LearningObjectCollectionService;