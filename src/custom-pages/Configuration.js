import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
    classes,
    theme,
    locale,
    changeLocale,
    translate,
}) => (
    <Card>
        <Title title={translate('tabs_name.configuration')} />
        <CardContent>
            <div className={classes.label}>{translate('tabs_name.language')}</div>
            <Button
                variant="raised"
                className={classes.button}
                color={locale === 'en' ? 'primary' : 'default'}
                onClick={() => changeLocale('en')}
            >
                en
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={locale === 'es' ? 'primary' : 'default'}
                onClick={() => changeLocale('es')}
            >
                es
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={locale === 'pt' ? 'primary' : 'default'}
                onClick={() => changeLocale('pt')}
            >
                pt
            </Button>
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