import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { push } from 'react-router-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import userService from './custom-services/user';

const user = new userService();

class GetRecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {email: null};
  }

  handleRequestToken() {
    user.sendEmailRecoverPassword(
      this.state.email,
      res => this.props.push('/learning-object-collection'),
      err => console.error(err)
    )
  }

  handleClickClose() {
    this.props.close()
  }

  render() {
    return(
      <Dialog
          open={ this.props.open }
          aria-labelledby="get-recover-password-title">
          <DialogTitle id="get-recover-password-title">Recuperar contraseña</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Escriba la dirección de correo electrónico asoaciada a su cuenta, 
              enviaremos un email con un enlace para el cambio de la contraseña.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={e =>
                this.setState({ email: e.target.value})
              }
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={ this.props.close() }
              color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => this.handleRequestToken()}
              color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
    )
  };
}

export default connect(null, { push })(GetRecoverPassword);
