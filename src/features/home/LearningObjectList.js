import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import SocialVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import SocialDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SocialNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import {
  darkBlack,
  blueGrey200,
  blueGrey500,
  red900,
  orange900,
  yellow900,
  lightGreen900,
  green900,
} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import * as actions from './redux/actions';

export class LearningObjectList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    showDescription: false,
    showLearningObject: false,
    learningObjectDescription: '',
    learningObjectTitle: '',
    learningObjectMetadata: '',
    learningObjectId: '',
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

  getRankingIcon(ranking, tooltip) {
    switch (ranking) {
      case 1:
        return this.insertSvgIconIntoIconButton(tooltip, red900, <SocialVeryDissatisfied hoverColor={blueGrey200} />);
      case 2:
        return this.insertSvgIconIntoIconButton(tooltip, orange900, <SocialDissatisfied hoverColor={blueGrey200} />);
      case 3:
        return this.insertSvgIconIntoIconButton(tooltip, yellow900, <SocialNeutral hoverColor={blueGrey200} />);
      case 4:
        return this.insertSvgIconIntoIconButton(tooltip, lightGreen900, <SocialSatisfied hoverColor={blueGrey200} />);
      case 5:
        return this.insertSvgIconIntoIconButton(tooltip, green900, <SocialVerySatisfied hoverColor={blueGrey200} />);
      default:
        return this.insertSvgIconIntoIconButton(tooltip, blueGrey200, <SocialNeutral hoverColor={blueGrey200} />);
    }
  }

  getRightIcons(lo) {
    return (
      <Paper style={{ zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {this.getRankingIcon(
          Math.round(lo.user_scores.creator),
          `Creator score: ${lo.user_scores.creator || 'has not been rated'}`
        )}
        {this.getRankingIcon(
          Math.round(lo.user_scores.expert),
          `Creator score: ${lo.user_scores.expert || 'has not been rated'}`
        )}
        <IconButton
          tooltip="View full description"
          tooltipPosition="top-left"
          style={{ padding: '8px', width: '60', height: '60' }}
          iconStyle={{ margin: '-2px', color: blueGrey500 }}
        >
          <ActionInfo
            onClick={() => {
              this.setState({
                showDescription: true,
                learningObjectDescription: lo.metadata.general.description,
                learningObjectTitle: lo.metadata.general.title,
              });
            }}
            hoverColor={blueGrey200}
          />
        </IconButton>
      </Paper>
    );
  }

  getLeftAvatar(id) {
    return <Avatar> {id + 1 + this.props.home.offset} </Avatar>;
  }

  /*
  TODO: Add description, palabras clave, formato, idioma to lo description.
    Add search help
    
  */

  insertSvgIconIntoIconButton(tooltip, color, SvgIcon) {
    return (
      <IconButton
        tooltip={tooltip}
        tooltipPosition="top-left"
        style={{ padding: '4px', width: '60', height: '60' }}
        iconStyle={{ margin: '-2px', color }}
      >
        {SvgIcon}
      </IconButton>
    );
  }

  render() {
    return (
      <div className="home-learning-object-list">
        {this.state.showLearningObject && (
          <Redirect push to={`/learning-object/${this.state.learningObjectId}`} />
        )}
        <Dialog
          title="Description"
          open={this.state.showDescription}
          onRequestClose={() => {
            this.setState({ showDescription: false });
          }}
        >
          <span style={{ color: darkBlack }}>{this.state.learningObjectTitle}</span>
          <br />
          {this.state.learningObjectDescription}
        </Dialog>
        <center>
          <Paper
            style={{
              marginRight: '2%',
              marginLeft: '2%',
              height: '70%',
              padding: 10,
              minWidth: '480px'
            }}
          >
            <List>
              {this.props.home.getLearningObjectListError ? (
                <ListItem primaryText="Connection error" />
              ) : this.props.home.learningObjectList.length === 0 && !this.props.home.getLearningObjectListPending ? (
                <ListItem primaryText="No results" />
              ) : (
                _.map(this.props.home.learningObjectList, (lo, id) => (
                  <div key={id}>
                    <ListItem
                      onClick={() => {
                        this.setState({
                          showLearningObject: !this.state.showLearningObject,
                          learningObjectMetadata: <pre> {JSON.stringify(lo.metadata, undefined, 4)} </pre>,
                          learningObjectId: lo.file_path.includes('zip') ? lo._id : lo.file_path,
                        });
                      }}
                      style={{ textAlign: 'left', padding: '15px' }}
                      primaryText={lo.metadata.general && lo.metadata.general.title}
                      secondaryText={
                        <p>
                          <span style={{ color: darkBlack }}>{lo.category}</span>
                          {' -- '}
                          <span style={{ color: darkBlack }}>{lo.created}</span>
                          {' -- '}
                          <span style={{ color: darkBlack }}>{lo.file_path.split('.').pop()}</span>
                          {' -- '}
                          {lo.metadata.general && lo.metadata.general.description}
                        </p>
                      }
                      secondaryTextLines={2}
                      leftAvatar={this.getLeftAvatar(id)}
                      rightIconButton={this.getRightIcons(lo)}
                    />
                    <Divider inset />
                  </div>
                ))
              )}
            </List>
          </Paper>
        </center>
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
