import request from 'superagent';

class CollectionService {
    constructor() {
        this.url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';
        this.url = `${this.url}/v1/collection`;
        this.token = localStorage.getItem('token');
    }

    getCollections(ok, error) {
        request.get(this.url).set({ Authorization: this.token })
            .end((err, res) => {
                if (!err) ok(res.body);
                else error(err);
            });
    }
}

export default CollectionService