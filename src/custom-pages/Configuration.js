import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import SwitchLanguage from '../switchLanguage';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
};

const Configuration = ({ classes, locale, translate }) => (
  <Card>
    <Title title={translate('tabs_name.configuration')} />
    <CardContent>
      <div className={classes.label}>{translate('tabs_name.language')}</div>
      <SwitchLanguage locale={locale} classes={classes} />
    </CardContent>
  </Card>
);

const mapStateToProps = state => ({
  theme: state.theme,
  locale: state.i18n.locale,
});

export default compose(
  connect(
    mapStateToProps,
    {
      changeLocale,
    }
  ),
  translate,
  withStyles(styles)
)(Configuration);
