import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslate, useSetLocale, useLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import SwitchLanguage from '../switchLanguage';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
};

const Configuration = ({ classes }) => {
  const translate = useTranslate();
  const locale = useLocale();
  const changeLocale = useSetLocale();

  return <Card>
    <Title title={translate('tabs_name.configuration')} />
    <CardContent>
      <div className={classes.label}>{translate('tabs_name.language')}</div>
      <SwitchLanguage locale={locale} changeLocale={changeLocale} classes={classes} />
    </CardContent>
  </Card>
};

const mapStateToProps = state => ({
  theme: state.theme,
});

export default compose(
  connect(
    mapStateToProps
  ),
  withStyles(styles)
)(Configuration);
