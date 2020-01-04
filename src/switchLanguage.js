import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

class SwitchLanguage extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.locale = this.props.locale;
    this.classes = this.props.classes;
    this.changeLocale = this.props.changeLocale;
  }

  switchToSpanish = () => {
    this.cookies.set('user_lang', 'es_CO', { path: '/' });
    this.changeLocale('es');
  };

  switchToEnglish = () => {
    this.cookies.set('user_lang', 'en_US', { path: '/' });
    this.changeLocale('en');
  };

  switchToPortuguese = () => {
    this.cookies.set('user_lang', 'pt_BR', { path: '/' });
    this.changeLocale('pt');
  };

  render() {
    
    return (
      <div>
        <Button
          variant="raised"
          className={this.classes.button}
          color={this.locale === 'en' ? 'primary' : 'default'}
          onClick={this.switchToEnglish}
        >
          EN
        </Button>
        <Button
          variant="raised"
          className={this.classes.button}
          color={this.locale === 'es' ? 'primary' : 'default'}
          onClick={this.switchToSpanish}
        >
          ES
        </Button>
        <Button
          variant="raised"
          className={this.classes.button}
          color={this.locale === 'pt' ? 'primary' : 'default'}
          onClick={this.switchToPortuguese}
        >
          PT
        </Button>
      </div>
    );
  }
}

export default SwitchLanguage;
