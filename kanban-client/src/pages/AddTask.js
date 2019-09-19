import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout';
import { resolveProject, saveTask, getParticularTask } from '../store/actions';
import { prepareFormData, resetForm, update } from '../utility/AppUtil';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import ErrorMessage from '../components/ErrorMessage';

class AddTask extends Component {
    state = {
      identifier: '',
      updateForm: false,
      formSuccessMessage: '',
      formErrorMessage: '',
      formData: {
        summary: {
          element: 'input',
          value: '',
          config: {
            name: 'summary',
            type: 'text',
            placeholder: 'Project Task summary',
            className: 'form-control form-control-lg',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
        acceptanceCriteria: {
          element: 'textarea',
          value: '',
          config: {
            name: 'acceptanceCriteria',
            placeholder: 'Acceptance Criteria',
            className: 'form-control form-control-lg',
          },
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationMessage: '',
        },
        dueDate: {
          element: 'input',
          value: '',
          config: {
            name: 'dueDate',
            type: 'date',
            className: 'form-control form-control-lg',
          },
          label: 'Due Date',
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationMessage: '',
        },
        priority: {
          element: 'select',
          value: '',
          config: {
            name: 'priority',
            options: {
              0: 'Select Priority',
              1: 'High',
              2: 'Medium',
              3: 'Low',
            },
            className: 'form-control form-control-lg',
          },
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationMessage: '',
        },
        status: {
          element: 'select',
          value: 'TO_DO',
          config: {
            name: 'status',
            type: 'date',
            className: 'form-control form-control-lg',
            options: {
              TO_DO: 'TO DO',
              IN_PROGRESS: 'IN PROGRESS',
              DONE: 'DONE',
            },
          },
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationMessage: '',
        },
      },
      id: '',
      fetchError: false,
    };

    componentDidMount() {
      (async () => {
        try {
          const { identifier, sequence } = this.props.match.params;
          this.setState({ identifier });
          await this.props.resolveProject(identifier);
          if (sequence) {
            this.setState({ updateForm: true });
            this._setFormData();
          }
        } catch (e) {
          this.props.history.push('/dashboard');
        }
      })();
    }

    _setFormData = async () => {
      const { identifier, sequence } = this.props.match.params;
      const { formData } = this.state;
      try {
        const task = await this.props.getParticularTask(identifier, sequence);
        const updatedFormData = { ...formData };
        // eslint-disable-next-line array-callback-return
        Object.keys(updatedFormData).map((el) => {
          const updatedEl = { ...updatedFormData[el] };
          updatedEl.value = task[el] ? task[el] : '';
          updatedEl.valid = true;
          updatedEl.touch = true;
          updatedEl.validationMessage = '';
          updatedFormData[el] = updatedEl;
        });
        this.setState({ formData: updatedFormData, id: task.id });
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
    const {
      formData, updateForm, identifier, id,
    } = this.state;
    const { data: _data, formIsValid } = prepareFormData(formData);
    if (updateForm) _data.id = id;
    if (formIsValid) {
      try {
        await this.props.saveTask(_data, identifier);
        if (updateForm) this.props.history.push(`/projectBoard/${identifier}`);
        else {
          this.setState({ formData: resetForm(formData) });
          this._showSuccessMessage();
        }
      } catch (e) {
        this.setState({ formErrorMessage: 'Something went wrong please try again' });
      }
    }
  };

  _showSuccessMessage = () => {
    this.setState({ formSuccessMessage: 'Your Task successfully saved' });

    setTimeout(() => {
      this.setState({ formSuccessMessage: '' });
      this.props.history.push(`/projectBoard/${this.state.identifier}`);
    }, 2000);
  };

  render() {
    const {
      identifier, updateForm, formData, formErrorMessage, formSuccessMessage, fetchError,
    } = this.state;
    const { loading, project } = this.props;
    return (
      <Layout>
        <div className="add-PBI">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to={`/projectBoard/${identifier}`} className="btn btn-light">
                      Back to Project Board
                </Link>
                <h4 className="display-4 text-center">
                  {updateForm ? 'Update Project Task' : 'Create Project Task'}
                </h4>
                <p className="lead text-center">
                  {`${project.name} + ${project.identifier}`}
                </p>
                {fetchError
                  ? <ErrorMessage />
                  : (
                    <form onSubmit={(event) => this._submitForm(event)}>
                      {Object.keys(formData).map((el) => (
                        <FormField
                          key={el}
                          id={el}
                          formData={formData[el]}
                          change={(element) => this.updateForm(element)}
                        />
                      ))}
                      <p className="text-success">{formSuccessMessage}</p>
                      <p className="text-danger">{formErrorMessage}</p>
                      <SubmitButton loading={loading} />
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
  project: state.project.project,
});

const mapDispatchToProps = (dispatch) => ({
  resolveProject: (identifier) => dispatch(resolveProject(identifier)),
  saveTask: (data, identifier) => dispatch(saveTask(data, identifier)),
  getParticularTask: (id, ps) => dispatch(getParticularTask(id, ps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
