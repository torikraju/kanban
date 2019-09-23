import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout';
import { prepareFormData, resetForm, update } from '../utility/AppUtil';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { tryAuth } from '../store/actions';


class Login extends Component {
  state = {
    formErrorMessage: '',
    formData: {
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
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
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
    const { tryAuth: tryLogin, history } = this.props;
    const { data: _data, formIsValid } = prepareFormData(formData);
    if (formIsValid) {
      try {
        await tryLogin(_data);
        this.setState({ formData: resetForm(formData) });
        history.push('/dashboard');
      } catch (e) {
        this.setState({ formErrorMessage: 'Invalid email or password' });
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
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
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
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tryAuth: (data) => dispatch(tryAuth(data)),
});


export default connect(null, mapDispatchToProps)(Login);
