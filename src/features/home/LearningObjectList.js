import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import _ from 'lodash';

import SocialVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import SocialDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SocialNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ActionPageview from 'material-ui/svg-icons/action/pageview';
import Paper from 'material-ui/Paper';
import {
  blueGrey200,
  grey600,
  red900,
  orange900,
  yellow900,
  lightGreen900,
  green900,
} from 'material-ui/styles/colors';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { Rating } from 'material-ui-rating';

import * as actions from './redux/actions';
import history from '../../common/history';

export class LearningObjectList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    showLearningObject: false,
    learningObjectMetadata: '',
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

  getRankingIcon2(ranking, n) {
    switch (ranking) {
      case 1:
        return <SocialVeryDissatisfied color={ranking === n ? red900 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : red900} />;
      case 2:
        return <SocialDissatisfied color={ranking === n ? orange900 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : orange900} />;
      case 3:
        return <SocialNeutral color={ranking === n ? yellow900 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : yellow900} />;
      case 4:
        return <SocialSatisfied color={ranking === n ? lightGreen900 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : lightGreen900} />;
      case 5:
        return <SocialVerySatisfied color={ranking === n ? green900 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : green900} />;
      default:
        return <SocialNeutral color={ranking === n ? blueGrey200 : blueGrey200} hoverColor={ranking === n ? blueGrey200 : blueGrey200} />;
    }
  }

  /*
  TODO: Add description, palabras clave, formato, idioma to lo description.
    Add search help
  */

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
                            itemIconStyle={{
                              width: 20,
                              height: 20
                            }}
                            itemStyle={{
                              width: 20,
                              height: 20,
                              padding: 5
                            }}
                            iconFilledRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.creator))}
                            iconHoveredRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.creator))}
                            iconNormalRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.creator))}
                            value={Math.round(lo.user_ratings.creator)}
                            max={5}
                            onChange={value => console.log(`Rated with value ${value}`)}
                            tooltipRenderer={({ index }) => <span>{index}{': 5 times'}</span>}
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
                            itemIconStyle={{
                              width: 20,
                              height: 20
                            }}
                            itemStyle={{
                              width: 20,
                              height: 20,
                              padding: 5
                            }}
                            iconFilledRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.expert))}
                            iconHoveredRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.expert))}
                            iconNormalRenderer={({ index }) => this.getRankingIcon2(index, Math.round(lo.user_ratings.expert))}
                            value={Math.round(lo.user_ratings.expert)}
                            max={5}
                            onChange={value => console.log(`Rated with value ${value}`)}
                            tooltipRenderer={({ index }) => <span>{index}{': 5 times'}</span>}
                            tooltipPosition="bottom-center"
                          />
                        </div>
                      </div>
                    </div>
                  </CardText>
                  <CardText expandable>
                    <p>
                      <span style={{ color: grey600 }}>Collection:</span> {lo.category}
                      <br />
                      <span style={{ color: grey600 }}>Created:</span> {lo.created}
                      <br />
                      <span style={{ color: grey600 }}>Format:</span> {lo.file_path.split('.').pop()}
                      <br />
                      <span style={{ color: grey600 }}>Keywords:</span> {
                        lo.metadata.general &&
                        lo.metadata.general.keyword &&
                        lo.metadata.general.keyword.join(', ')
                      }
                    </p>
                    {/*
                    <br />
                    <iframe
                      src={`http://localhost/renderer/${lo.file_path.includes('zip') ? lo._id : lo.file_path}`}
                      height="500"
                      width="100%"
                      title="hola"
                    />
                    */}
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
                      <RaisedButton
                        style={{ marginRight: '20px' }}
                        backgroundColor={blueGrey200}
                        onClick={() => this.setState({
                          showLearningObject: !this.state.showLearningObject,
                          learningObjectMetadata: <pre> {JSON.stringify(lo.metadata, undefined, 4)} </pre>,
                          learningObjectId: lo.file_path.includes('zip') ? lo._id : lo.file_path,
                        })}
                        label="View"
                        icon={<ActionPageview />}
                      />
                      <RaisedButton
                        label={
                          id === this.state.expanded ? (
                            'Less'
                          ) : (
                            'More'
                          )
                        }
                        backgroundColor={blueGrey200}
                        style={{ marginLeft: '20px' }}
                        onClick={() => {
                          this.setState({
                            expanded: id === this.state.expanded ? -1 : id
                          });
                          /*
                          if (id === this.state.expanded) {
                            history.push('');
                          } else {
                            history.push(
                              `?lo_id=${lo.file_path.includes('zip') ? lo._id : lo.file_path}`,
                            );
                          }
                          */
                        }}
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
