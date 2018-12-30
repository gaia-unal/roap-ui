import request from 'superagent';

class SchemaService {
  constructor() {
    this.url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';
    this.url = `${this.url}/v1/learning-object-metadata-schema`;
    this.token = localStorage.getItem('token');
  }

  getSchema(ok, error) {
    request
      .get(this.url)
      .set({ Authorization: this.token })
      .end((err, res) => {
        if (!err) ok(res.body);
        else error(err);
      });
  }
}

export default SchemaService;
