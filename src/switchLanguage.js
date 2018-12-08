import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { changeLocale as changeLocaleAction } from 'react-admin';

class SwitchLanguage extends Component {
    switchToSpanish = () => this.props.changeLocale('es');
    switchToEnglish = () => this.props.changeLocale('en');
    switchToPortuguese = () => this.props.changeLocale('pt');

    render() {
        const { changeLocale } = this.props;
        return (
            <div>
                <Button onClick={this.switchToEnglish}>en</Button>
                <Button onClick={this.switchToSpanish}>es</Button>
                <Button onClick={this.switchToSpanish}>pt</Button>
            </div>
        );
    }
}

export default connect(undefined, { changeLocale: changeLocaleAction })(SwitchLanguage);