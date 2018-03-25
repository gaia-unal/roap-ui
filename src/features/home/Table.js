import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import _ from 'lodash';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ActionDescription from 'material-ui/svg-icons/action/description';
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
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import LearningObjectScoreService from './services/LearningObjectScore';
import IconButton from 'material-ui/IconButton';


export class LearningObjectTable extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  insertSvgIconIntoIconButton(tooltip, color, SvgIcon) {
    return (
        <IconButton
        tooltip={tooltip}
        tooltipPosition='top-left'
        style={{padding: '4px', width: '60', height: '60'}}
        iconStyle={{ margin: '-2px', color: color }}
      >
        {SvgIcon}
      </IconButton>
    );
  }

  getRankingIcon(ranking, tooltip) {
    console.log(ranking);
    switch(ranking) {
      case 1: 
        return this.insertSvgIconIntoIconButton(tooltip, red900,
          <SocialVeryDissatisfied hoverColor={blueGrey200} />
        );
        break;
      case 2: 
        return this.insertSvgIconIntoIconButton(tooltip, orange900,
          <SocialDissatisfied hoverColor={blueGrey200} />
        );
        break;
      case 3: 
        return this.insertSvgIconIntoIconButton(tooltip, yellow900,
          <SocialNeutral hoverColor={blueGrey200} />
        );
        break;
      case 4: 
        return this.insertSvgIconIntoIconButton(tooltip, lightGreen900,
          <SocialSatisfied hoverColor={blueGrey200} />
        );
        break;
      case 5: 
        return this.insertSvgIconIntoIconButton(tooltip, green900,
          <SocialVerySatisfied hoverColor={blueGrey200} />
        );
        break;
      default:
        return this.insertSvgIconIntoIconButton(tooltip, blueGrey200,
          <SocialNeutral hoverColor={blueGrey200} />
        );
        break;
    }
  }

  state = {
    learningObjectList: [],
    learningObjectScore: [],
    showDescription: false,
    showMetadata: false,
    learningObjectDescription: '',
    learningObjectTitle: '',
    learningObjectMetadata: ''
  };

  learningObjectScoreService = new LearningObjectScoreService();

  getLearningObjectScore(_ids) {
    this.learningObjectScoreService.get(
      _ids,
      res => {
        this.setState({
          learningObjectScore: res.body
        });
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ learningObjectScore: [] }, () => {
      this.setState(
        { learningObjectList: nextProps.learningObjectList },
        () => { this.getLearningObjectScore(this.state.learningObjectList.map((lo) => { return lo._id; }))}
      );
    });
  }

  render() {
    return (
      <div className="home-table">
        <Dialog
          title="Description"
          open={this.state.showDescription}
          onRequestClose={() => { this.setState({ showDescription: false, showMetadata: false }); }}
        >
          <span style={{ color: darkBlack }}>{this.state.learningObjectTitle}</span><br />
          {this.state.learningObjectDescription}
        </Dialog>
        <Dialog
          autoScrollBodyContent={true}
          title="Metadata"
          open={this.state.showMetadata && !this.state.showDescription}
          onRequestClose={() => { this.setState({ showMetadata: false }); }}
        >
          {this.state.learningObjectMetadata}
        </Dialog>
        <center>
          <Paper zDepth={4} style={{ marginRight: '5%', marginLeft: '5%', height: '70%', padding: 10, minWidth: '480px' }}>
            <List>
              {_.map(this.state.learningObjectList, (lo, id) => (
                <div key={id}>
                  <ListItem
                    onClick={() => {this.setState( { 
                      showMetadata: !this.state.showMetadata,
                      learningObjectMetadata: (
                        <pre> {JSON.stringify(lo.metadata, undefined, 4)} </pre>
                      )
                    } )}}
                    style={{textAlign: 'left', padding: '15px'}}
                    primaryText={lo.metadata.general.title}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>{lo.created}</span>{ ' -- ' }
                        {lo.metadata.general.description}
                      </p>
                    }
                    secondaryTextLines={2}
                    leftAvatar={
                      <Avatar size={50}
                        style={{ fontSize: '20px', marginLeft: '-20px'}}
                      >
                        {String(lo.category).substring(0, 4)}
                      </Avatar>
                    }
                    rightIcon={
                      <div>
                        {this.state.learningObjectScore[lo._id] ? (
                          <div>
                            {this.getRankingIcon(
                              this.state.learningObjectScore[lo._id].creator,
                              'Creator score: ' + (this.state.learningObjectScore[lo._id].creator  || 'has not been rated'))}
                            {this.getRankingIcon(
                              this.state.learningObjectScore[lo._id].expert,
                              'Expert score: ' + (this.state.learningObjectScore[lo._id].expert|| 'has not been rated'))}
                          </div>
                        ): (
                          <div>
                            {this.insertSvgIconIntoIconButton('tooltip', blueGrey200, <SocialNeutral hoverColor={blueGrey200} />)}
                            {this.insertSvgIconIntoIconButton('tooltip', blueGrey200, <SocialNeutral hoverColor={blueGrey200} />)}
                          </div>
                        )}
                      <IconButton
                        tooltip={'View full description'}
                        tooltipPosition='top-left'
                        style={{padding: '4px', width: '60', height: '60'}}
                        iconStyle={{ margin: '-2px', color: blueGrey500 }}
                      >
                        <ActionDescription
                          onClick={() => { this.setState({
                            showDescription: !this.state.showDescription,
                            learningObjectDescription: lo.metadata.general.description,
                            learningObjectTitle: lo.metadata.general.title,
                          }); }}
                          hoverColor={blueGrey200}
                        />
                      </IconButton>
                      </div>
                    }
                  />
                  <Divider inset={true} />
                </div>
              ))}
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningObjectTable);
