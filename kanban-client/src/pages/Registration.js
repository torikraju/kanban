import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';

import Layout from '../hoc/Layout';
import {
  prepareFormData, resetForm, update,
} from '../utility/AppUtil';
import FormField from '../components/FormField';
import { register } from '../store/actions';
import SubmitButton from '../components/SubmitButton';


class Registration extends Component {
  state = {
    formErrorMessage: '',
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      username: {
        element: 'input',
        value: '',
        config: {
          name: 'username',
          type: 'email',
          placeholder: 'Email Address',
          className: 'form-control form-control-lg',

        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm Password',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  modal=() => {
    const { formSuccess } = this.state;
    return (
      <Dialog aria-labelledby="customized-dialog-title" open={formSuccess}>
        <DialogTitle>
          Congratulations !!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You will be redirected to the LOGIN in a couple seconds...
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };

  updateForm = (element) => {
    const {
      formData,
    } = this.state;
    this.setState({
      formErrorMessage: '',
    });
    const updatedFormData = update(element, formData);
    this.setState({
      formData: updatedFormData,
    });
  };

  _submitForm = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const { register: saveUser, history } = this.props;
    const { data: _data, formIsValid } = prepareFormData(formData);
    if (formIsValid) {
      try {
        await saveUser(_data);
        this.setState({
          formData: resetForm(formData),
          formSuccess: true,
        });
        setTimeout(() => { history.push('/login'); }, 3000);
      } catch (e) {
        if (e.data) {
          const message = Object.values(e.data);
          this.setState({ formErrorMessage: message[0] });
        }
      }
    }
  };

  render() {
    const {
      formData, formErrorMessage,
    } = this.state;
    const { loading } = this.props;
    return (
      <Layout>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your Account</p>
                <form onSubmit={(event) => this._submitForm(event)}>
                  {Object.keys(formData).map((el) => (
                    <FormField
                      key={el}
                      id={el}
                      formData={formData[el]}
                      change={(element) => this.updateForm(element)}
                    />
                  ))}
                  <p className="text-danger">{formErrorMessage}</p>
                  <SubmitButton loading={loading} />
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.modal()}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ui.formLoading,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
