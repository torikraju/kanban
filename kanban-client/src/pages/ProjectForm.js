import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout';
import { prepareFormData, resetForm, update } from '../utility/AppUtil';
import FormField from '../components/FormField';
import { saveProject, getOneProject } from '../store/actions';

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
        label: 'Start Date',
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
        label: 'Estimated End Date',
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
      },
    },
    updateForm: false,
    fetchError: false,
    id: '',
  };

  componentDidMount() {
    (async () => {
      try {
        const { match } = this.props;
        const { identifier } = match.params;
        if (identifier) {
          this.setState({ updateForm: true });
          await this._setFormData(identifier);
        }
      } catch (e) {
        console.log(`error in ProjectFrom-componentDidMount ${e}`);
      }
    })();
  }

  _setFormData = async (identifier) => {
    const { getOneProject: getOne } = this.props;
    const { formData } = this.state;
    try {
      const project = await getOne(identifier);
      const updatedFormData = { ...formData };
      // eslint-disable-next-line array-callback-return
      Object.keys(updatedFormData).map((el) => {
        const updatedEl = { ...updatedFormData[el] };
        updatedEl.value = project[el] ? project[el] : '';
        updatedEl.valid = true;
        updatedEl.touch = true;
        updatedEl.validationMessage = '';
        if (el === 'identifier') {
          const updatedConfig = { ...updatedEl.config };
          updatedConfig.disabled = 'true';
          updatedEl.config = updatedConfig;
        }
        updatedFormData[el] = updatedEl;
      });
      this.setState({ formData: updatedFormData, id: project.id });
    } catch (e) {
      this.setState({ fetchError: true });
    }
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
    const { formData, updateForm, id } = this.state;
    const { saveProject: save, history } = this.props;
    const { data: _data, formIsValid } = prepareFormData(formData);
    if (updateForm) _data.id = id;
    if (formIsValid) {
      try {
        await save(_data);
        if (updateForm) history.push('/');
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
    const {
      formData, formSuccessMessage, formErrorMessage, updateForm, fetchError,
    } = this.state;
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
                {fetchError
                  ? <h5 className="display-4 text-center">Could not find project</h5>
                  : (
                    <h5 className="display-4 text-center">
                      {updateForm ? 'Update Project' : 'Create Project'}
                    </h5>
                  )}
                <hr />
                {!fetchError && (
                <form onSubmit={(event) => this._submitForm(event)}>
                  {Object.keys(formData).map((el) => (
                    <FormField
                      id={el}
                      formData={formData[el]}
                      change={(element) => this.updateForm(element)}
                    />
                  ))}
                  <p className="text-success">{formSuccessMessage}</p>
                  <p className="text-danger">{formErrorMessage}</p>
                  {button}
                </form>
                )}
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
  getOneProject: (identifier) => dispatch(getOneProject(identifier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFrom);
