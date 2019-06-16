import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import CollectionService from '../custom-services/collection';

import { push } from 'react-router-redux';

import { translate } from 'react-admin';
import { withFormik } from 'formik';
import { object, string, ref } from 'yup';

const collectionService = new CollectionService();


class CollectionCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            sub_collections: [{
                name: '',
                id: 0
            }]
        };
    }

    submit = () => {
        const { translate } = this.props;

        collectionService.createCollection(
            this.state,
            res =>
                console.log("Yeahh"),
            err => {
                console.log("Ouch")
            }
        );
    };

    makeSubCollection = () => {
        return {
            name: '',
            id: this.state.sub_collections[this.state.sub_collections.length - 1].id + 1
        }
    }

    addSubCollection = () => {
        this.setState({
            sub_collections: [...this.state.sub_collections, this.makeSubCollection()]
        });
    }

    removeSubCollection = idSubCollection => {
        console.log(idSubCollection)

        this.setState(prevState => ({ sub_collections: prevState.sub_collections.filter(sub_collection => sub_collection.id !== idSubCollection) }));
    }

    change = (name, e) => {
        e.persist();
        this.props.handleChange(e);
        this.props.setFieldTouched(name, true, false);
    };

    updateNameCollection(evt) {
        this.setState({
            name: evt.target.value
        });
    }
    render() {
        const { values, errors, touched, isValid, translate } = this.props;

        return (
            <div>
                <Paper style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label={translate('collections.name')}
                        name="name"
                        type="text"
                        value={this.state.name}
                        error={touched.name && Boolean(errors.name)}
                        onChange={evt => this.updateNameCollection(evt)}
                        autoFocus
                        required
                    />
                    {this.state.sub_collections.map(({ name, id }) => {
                        return (<div key={`div${id}`}>
                            <TextField
                                label={translate('collections.name')}
                                name="name"
                                type="text"
                                value={name}
                                autoFocus
                                required
                                key={`textField${id}`}
                            />
                            {
                                id > 0 && <Button
                                    variant="outlined"
                                    style={{ marginTop: '10px' }}
                                    color="primary"
                                    key={`deleteButton${id}`}
                                    onClick={() => this.removeSubCollection(id)}
                                >
                                    Eliminar subcolección
                                </Button>
                            }
                        </div>)
                    })}
                    <Button
                        variant="outlined"
                        style={{ marginTop: '10px' }}
                        color="primary"
                        onClick={() => this.addSubCollection()}
                    >
                        Agregar subcolección
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ marginTop: '10px' }}
                        color="primary"
                        onClick={() => this.submit()}
                    >
                        Crear colección
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default connect(
    null,
    { push }
)(
    translate(
        withFormik({
            mapPropsToValues: () => ({
                email: '',
                name: '',
                password: '',
                passwordConfirm: '',
            }),
            validationSchema: object({
                email: string('')
                    .email('errorMessages.email')
                    .required('errorMessages.required'),
                name: string('').required('errorMessages.required'),
                password: string('')
                    .min(8, 'errorMessages.passwordLen')
                    .required('errorMessages.required'),
                passwordConfirm: string('')
                    .oneOf([ref('password'), null], 'errorMessages.passwordConfirm')
                    .required('errorMessages.required'),
            }),
        })(CollectionCreate)
    )
);
