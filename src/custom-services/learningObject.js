import request from 'superagent';


class LearningObjectService {
  constructor() {
    this.url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';
    this.url = `${this.url}/v1/learning-object-collection`;
    this.token = localStorage.getItem('token');
  }

  rateLearningObject(learningObjectId, raterRole, rating, ok, error) {
    console.log(learningObjectId, raterRole, rating);
    request.patch(`${this.url}/${learningObjectId}`)
      .send({ rating: rating, rater_role: raterRole })
      .set({'Authorization': this.token})
      .end((err, res) => {
          if (!err) ok(res.body);
          else error(err);
      });
  }

}


export default LearningObjectService;