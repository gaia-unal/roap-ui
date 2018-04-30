import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

import AlertWarning from 'material-ui/svg-icons/alert/warning';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import { deepOrange500, grey300 } from 'material-ui/styles/colors';

import _ from 'lodash';

export default class LearningObjectForm extends Component {
  static propTypes = {

  };

  state = {
    stepIndex: -1,
  };

  getComponentByType(type_, text, onChange, value, required) {
    switch (type_) {
      case 'string':
        return (
          <TextField
            floatingLabelText={text}
            style={{ marginLeft: '5px', marginRigth: '5px' }}
            onChange={(e, t) => { onChange(t); }}
            underlineStyle={{ borderColor: required ? deepOrange500 : grey300 }}
            value={value}
          />
        );

      default:
        return null;
    }
  }

  getKey(obj) {
    return Object.keys(obj[0])[0];
  }

  // TODO: validate fields.

  render() {
    return (
      <div className="comments">
        <Stepper
          activeStep={this.state.stepIndex}
          linear={false}
          orientation="vertical"
        >
          {_.map(_.zip(_.map(_.pickBy(this.props.loms, 'fields'), (v, k) => ({ [k]: v })), _.range(Object.keys(_.pickBy(this.props.loms, 'fields')).length)), (v, id) => (
            <Step key={id} complete={true}>
              <StepButton
                onClick={() => this.setState({
                  stepIndex: this.state.stepIndex === id ? -1 : id
                })}
                icon={this.state.stepIndex === id ? <AlertWarning /> : <ActionCheckCircle />}
              >
                {this.getKey(v)}
              </StepButton>
              <StepContent transitionDuration={300}>
                {_.findKey(this.props.loms[this.getKey(v)].fields, 'fields') ? (
                  this.props.loms[this.getKey(v)].fields && <LearningObjectForm
                    loms={this.props.loms[this.getKey(v)].fields}
                    keys={[...(this.props.keys || []), this.getKey(v)]}
                    onChange={this.props.onChange}
                    lom={this.props.lom.hasOwnProperty(this.getKey(v)) ? this.props.lom[this.getKey(v)] : ''}
                  />
                ) : (
                  _.map(_.zip(_.map(_.pickBy(this.props.loms[this.getKey(v)].fields, 'type'), (vv, kk) => ({ [kk]: vv })), _.range(Object.keys(_.pickBy(this.props.loms[this.getKey(v)].fields, 'type')).length)), (vv, id) => (
                    this.getComponentByType(
                      this.props.loms[this.getKey(v)].fields[this.getKey(vv)].type,
                      this.getKey(vv),
                      (value) => {
                        this.props.onChange(
                          value,
                          [...(this.props.keys || []), this.getKey(v), this.getKey(vv)]
                        );
                      },
                      (this.props.lom.hasOwnProperty(this.getKey(v)) && this.props.lom[this.getKey(v)].hasOwnProperty(this.getKey(vv))) ? this.props.lom[this.getKey(v)][this.getKey(vv)] : '',
                      this.props.loms[this.getKey(v)].fields[this.getKey(vv)].required
                    ) || 'nada'
                  ))
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {_.map(_.zip(_.map(_.pickBy(this.props.loms, 'type'), (v, k) => ({ [k]: v })), _.range(Object.keys(_.pickBy(this.props.loms, 'type')).length)), (v, id) => (
          this.getComponentByType(
            this.props.loms[this.getKey(v)].type,
            this.getKey(v),
            (value) => {
              this.props.onChange(
                value,
                [...(this.props.keys || []), this.getKey(v)]
              );
            },
            this.props.lom.hasOwnProperty(this.getKey(v)) ? this.props.lom[this.getKey(v)] : '',
            this.props.loms[this.getKey(v)].required
          ) || 'nada'
        ))}
      </div>
    );
  }
}
