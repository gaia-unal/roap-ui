import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { changeLocale as changeLocaleAction } from 'react-admin';
import Cookies from 'universal-cookie';

class SwitchLanguage extends Component {
    constructor() {
      super();
      this.cookies = new Cookies();
    }

    switchToSpanish = () => {
      this.cookies.set('user_lang', 'es_CO', { path: '/' });
      this.props.changeLocale('es');
    }

    switchToEnglish = () => {
      this.cookies.set('user_lang', 'en_US', { path: '/' });
      this.props.changeLocale('en');
    }

    switchToPortuguese = () => {
      this.cookies.set('user_lang', 'pt_BR', { path: '/' });
      this.props.changeLocale('pt');
    }

    render() {
        const {locale, classes} = this.props
        return (
            <div>
                <Button 
                  variant="raised"
                  className={classes.button}
                  color={locale === 'en' ? 'primary' : 'default'}
                  onClick={ this.switchToEnglish }
                >
                EN</Button>
                <Button 
                  variant="raised"
                  className={classes.button}
                  color={locale === 'es' ? 'primary' : 'default'}
                  onClick={ this.switchToSpanish }
                >
                ES</Button>
                <Button 
                  variant="raised"
                  className={classes.button}
                  color={locale === 'pt' ? 'primary' : 'default'}
                  onClick={ this.switchToPortuguese }
                >
                PT</Button>
            </div>
        );
    }
}

export default connect(undefined, { changeLocale: changeLocaleAction })(SwitchLanguage);