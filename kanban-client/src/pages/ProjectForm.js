import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout';
import { prepareFormData, resetForm, update } from '../utility/AppUtil';
import FormField from '../components/FormField';
import { saveProject } from '../store/actions';

class ProjectFrom extends Component {
  state = {
    formSuccessMessage: '',
    formErrorMessage: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Project Name',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      identifier: {
        element: 'input',
        value: '',
        config: {
          name: 'identifier',
          type: 'text',
          placeholder: 'Unique Project ID',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          name: 'description',
          // type: 'textarea',
          placeholder: 'Project Description',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      startDate: {
        element: 'input',
        value: '',
        config: {
          name: 'startDate',
          type: 'date',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
      },
      endData: {
        element: 'input',
        value: '',
        config: {
          name: 'endData',
          type: 'date',
          className: 'form-control form-control-lg',
        },
        validation: {
          required: false,
        },
        valid: true,
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
      formSuccessMessage: '',
    });
    const updatedFormData = update(element, formData);
    this.setState({
      formData: updatedFormData,
    });
  };

  _submitForm = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const { saveProject: save } = this.props;
    const { data: _data, formIsValid } = prepareFormData(formData);
    if (formIsValid) {
      try {
        await save(_data);
        this.setState({ formData: resetForm(formData) });
        this._showSuccessMessage();
      } catch (e) {
        if (e.data.identifier) {
          this.setState({ formErrorMessage: e.data.identifier });
        }
      }
    }
  };

  _showSuccessMessage = () => {
    this.setState({ formSuccessMessage: 'Your project successfully saved' });

    setTimeout(() => {
      this.setState({ formSuccessMessage: '' });
    }, 2000);
  };


  render() {
    const { formData, formSuccessMessage, formErrorMessage } = this.state;
    const { loading } = this.props;

    const button = (
      loading
        ? (
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" />
                  Loading...
          </button>
        )
        : <input type="submit" className="btn btn-primary btn-block mt-4" />
    );

    return (
      <Layout>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                <hr />
                <form onSubmit={(event) => this._submitForm(event)}>
                  <FormField
                    id="name"
                    formData={formData.name}
                    change={(element) => this.updateForm(element)}
                  />
                  <FormField
                    id="identifier"
                    formData={formData.identifier}
                    change={(element) => this.updateForm(element)}
                  />
                  <FormField
                    id="description"
                    formData={formData.description}
                    change={(element) => this.updateForm(element)}
                  />
                  <h6>Start Date</h6>
                  <FormField
                    id="startDate"
                    formData={formData.startDate}
                    change={(element) => this.updateForm(element)}
                  />
                  <h6>Estimated End Date</h6>
                  <FormField
                    id="endData"
                    formData={formData.endData}
                    change={(element) => this.updateForm(element)}
                  />
                  <p className="text-success">{formSuccessMessage}</p>
                  <p className="text-danger">{formErrorMessage}</p>
                  {button}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ui.formLoading,
});

const mapDispatchToProps = (dispatch) => ({
  saveProject: (data) => dispatch(saveProject(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFrom);
