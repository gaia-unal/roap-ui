import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import _ from 'lodash';

import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ActionPageview from 'material-ui/svg-icons/action/pageview';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import {
  blueGrey200,
  blueGrey600,
  grey600,
} from 'material-ui/styles/colors';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

import { Rating } from 'material-ui-rating';

import moment from 'moment';

import * as actions from './redux/actions';
import history from '../../common/history';

export class LearningObjectList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    showLearningObject: false,
    learningObjectId: '',
    expanded: -1
  };

  componentDidMount() {
    this.getLearningObjectList();
  }

  getLearningObjectList() {
    this.props.actions.getLearningObjectList({
      offset: this.props.home.offset,
      count: this.props.home.count,
      textSearch: null,
    });
  }

  /*
  TODO: Add search help
  */

  mean(ratingObject) {
    const summary = _.sum(_.map(Object.keys(ratingObject), (k, id) => ratingObject[k].length * (id + 1)));
    const count = _.sum(_.map(Object.keys(ratingObject), k => ratingObject[k].length));
    if (count === 0) {
      return 0;
    }
    return summary / count;
  }

  handleRate(id, rating, role) {
    const user = this.props.home.user;
    if (user && user.role === role) {
      this.props.actions.ratingLearningObject({
        learningObjectId: id,
        learingObjectRating: rating,
        token: user.token,
      });
    }
  }

  ratingToolTip(index, value) {
    return <span>{index}{`: ${value || 0} votes`}</span>;
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <div className="home-learning-object-list">
        {
          this.state.showLearningObject && (
            <Redirect push to={`/learning-object/${this.state.learningObjectId}`} />
          )
        }
        <div
          style={{
            marginRight: '2%',
            marginLeft: '2%',
            height: '70%',
            padding: 10,
            minWidth: '480px'
          }}
        >
          {this.props.home.getLearningObjectListError ? (
            <p> Connection error </p>
          ) : this.props.home.learningObjectList.length === 0 && !this.props.home.getLearningObjectListPending ? (
            <p> No results </p>
          ) : (
            _.map(this.props.home.learningObjectList, (lo, id) => (
              <Paper style={{ margin: '5px' }} key={id} zDepth={id === this.state.expanded ? 5 : 0}>
                <Card expanded={id === this.state.expanded}>
                  <CardTitle>
                    {lo.metadata.general && lo.metadata.general.title}
                  </CardTitle>
                  <CardText style={{ paddingTop: '0', paddingBottom: '0' }}>
                    <div style={{
                        alignItems: 'flex-top',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '70%',
                          display: 'inline-block'
                        }}
                      >
                        <p>
                          <span style={{ color: grey600 }}>
                            Description:
                          </span> {lo.metadata.general && lo.metadata.general.description}
                          <br />
                          <span style={{ color: grey600 }}>Collection:</span> {lo.category}
                          <br />
                          <span style={{ color: grey600 }}>Created:</span> {
                            moment(moment.utc(lo.created).toDate()).local().format('YYYY-MM-DD HH:mm:ss')
                          }
                          <br />
                          <span style={{ color: grey600 }}>Format:</span> {lo.file_name.split('.').pop()}
                          <br />
                          <span style={{ color: grey600 }}>Keywords:</span> {
                            lo.metadata.general &&
                            lo.metadata.general.keyword &&
                            lo.metadata.general.keyword.join(', ')
                          }
                        </p>
                      </div>
                      <div
                        style={{
                          alignSelf: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <p>Users rating</p>
                          <Rating
                            iconFilled={<ToggleStar color={blueGrey600} />}
                            iconHovered={<ToggleStarBorder color={blueGrey600} />}
                            itemIconStyle={{
                              width: 20,
                              height: 20
                            }}
                            itemStyle={{
                              width: 20,
                              height: 20,
                              padding: 5
                            }}
                            value={this.mean(lo.rating.creator)}
                            max={5}
                            onChange={value => this.handleRate(lo._id, value, 'creator')}
                            tooltipRenderer={({ index }) => this.ratingToolTip(index, lo.rating.creator[index.toString()].length)}
                            tooltipPosition="top-center"
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <p>Expert rating</p>
                          <Rating
                            iconFilled={<ToggleStar color={blueGrey600} />}
                            iconHovered={<ToggleStarBorder color={blueGrey600} />}
                            itemIconStyle={{
                              width: 20,
                              height: 20
                            }}
                            itemStyle={{
                              width: 20,
                              height: 20,
                              padding: 5
                            }}
                            value={this.mean(lo.rating.expert)}
                            max={5}
                            onChange={value => this.handleRate(lo._id, value, 'expert')}
                            tooltipRenderer={({ index }) => this.ratingToolTip(index, lo.rating.expert[index.toString()].length)}
                            tooltipPosition="bottom-center"
                          />
                        </div>
                      </div>
                    </div>
                  </CardText>
                  <CardText expandable>
                    <Tabs>
                      <Tab label="Content" value="a">
                        <iframe
                          src={`http://localhost/learning-object-file-renderer/${lo.file_name.includes('zip') ? lo._id : lo.file_name}`}
                          height="380px"
                          width="100%"
                          title="hola"
                        />
                      </Tab>
                      <Tab label="Metadata" value="b">
                        <div
                          style={{ overflowY: 'scroll', height: '380px' }}
                        >
                          <p>
                            <pre> {JSON.stringify(lo.metadata, undefined, 4)} </pre>
                          </p>
                        </div>
                      </Tab>
                    </Tabs>
                  </CardText>
                  <CardActions>
                    <div
                      style={{
                        justifyContent: 'flex-start',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'left'
                      }}
                    >
                      {/*
                      <RaisedButton
                        style={{ marginRight: '20px' }}
                        backgroundColor={blueGrey200}
                        onClick={() => this.setState({
                          showLearningObject: !this.state.showLearningObject,
                          learningObjectId: lo.file_name.includes('zip') ? lo._id : lo.file_name,
                        })}
                        label="View"
                        icon={<ActionPageview />}
                      />
                      */}
                      <RaisedButton
                        label={
                          id === this.state.expanded ? (
                            'Less'
                          ) : (
                            'More'
                          )
                        }
                        backgroundColor={blueGrey200}
                        style={{ marginLeft: '0px' }}
                        onClick={() => this.setState({
                            expanded: id === this.state.expanded ? -1 : id
                          })
                        }
                        icon={
                          id === this.state.expanded ? (
                            <HardwareKeyboardArrowUp />
                          ) : (
                            <HardwareKeyboardArrowDown />
                          )
                        }
                      />
                    </div>
                  </CardActions>
                </Card>
              </Paper>
            ))
          )}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningObjectList);
