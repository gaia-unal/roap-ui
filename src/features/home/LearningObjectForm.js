import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

import _ from 'lodash';

export default class LearningObjectForm extends Component {
  static propTypes = {

  };

  state = {
    stepIndex: -1,
  };

  getComponentByType(type_, text) {
    switch (type_) {
      case 'string':
        return (
          <TextField
            floatingLabelText={text}
            style={{ marginLeft: '5px', marginRigth: '5px' }}
          />
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <div className="comments">
        <Stepper
          activeStep={this.state.stepIndex}
          linear={false}
          orientation="vertical"
        >
          {_.map(_.zip(_.map(_.pickBy(this.props.lom, 'fields'), (v, k) => ({ [k]: v })), _.range(Object.keys(_.pickBy(this.props.lom, 'fields')).length)), (v, id) => (
            <Step key={id}>
              <StepButton onClick={() => this.setState({ stepIndex: this.state.stepIndex === id ? -1 : id })}>
                {Object.keys(v[0])[0]}
              </StepButton>
              <StepContent transitionDuration={300}>
                {_.findKey(this.props.lom[Object.keys(v[0])[0]].fields, 'fields') ? (
                  this.props.lom[Object.keys(v[0])[0]].fields && <LearningObjectForm lom={this.props.lom[Object.keys(v[0])[0]].fields} />
                ) : (
                  _.map(_.zip(_.map(_.pickBy(this.props.lom[Object.keys(v[0])[0]].fields, 'type'), (vv, kk) => ({ [kk]: vv })), _.range(Object.keys(_.pickBy(this.props.lom[Object.keys(v[0])[0]].fields, 'type')).length)), (vv, id) => (
                   this.getComponentByType(this.props.lom[Object.keys(v[0])[0]].fields[Object.keys(vv[0])[0]].type, Object.keys(vv[0])[0])
                  ))
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {_.map(_.zip(_.map(_.pickBy(this.props.lom, 'type'), (v, k) => ({ [k]: v })), _.range(Object.keys(_.pickBy(this.props.lom, 'type')).length)), (v, id) => (
          this.getComponentByType(this.props.lom[Object.keys(v[0])[0]].type, Object.keys(v[0])[0])
        ))}
      </div>
    );
  }
}
