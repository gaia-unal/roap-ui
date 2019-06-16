import request from 'superagent';

class CollectionService {
    constructor() {
        this.url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';
        this.url = `${this.url}/v1/collection`;
        this.token = localStorage.getItem('token');
    }

    getCollections(ok, error) {
        request.get(this.url).set({ Authorization: this.token })
            .end((err, resp) => {
                if (!err) ok(resp.body);
                else error(err);
            });
    }

    getSubCollections(collection_id, ok, error) {
        request.get(`${this.url}/${collection_id}`).set({ Authorization: this.token })
            .end((err, resp) => {
                if (!err) ok(resp.body);
                else error(err);
            })
    }

    createCollection(data, ok, error) {
        request.post(this.url).send(data).set({ Authorization: this.token }).end((err, resp) => {
            if (!err) ok(resp.body);
            else error(err);
        })
    }
}

export default CollectionService