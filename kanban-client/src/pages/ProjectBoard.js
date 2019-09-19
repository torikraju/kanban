import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout';
import TaskItem from '../components/TaskItem';
import { getTaskByIdentifier } from '../store/actions';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class ProjectBoard extends Component {
    _isMounted = false;

    state = {
      identifier: '',
      status: {
        TO_DO: {
          name: 'TO DO',
          clazz: 'card-header bg-secondary text-white',
        },
        IN_PROGRESS: {
          name: 'IN PROGRESS',
          clazz: 'card-header bg-primary text-white',
        },
        DONE: {
          name: 'DONE',
          clazz: 'card-header bg-success text-white',
        },
      },
      tasks: [],
      loading: true,
      fetchError: false,
    };

    componentDidMount() {
      (async () => {
        try {
          this._isMounted = true;
          const { identifier } = this.props.match.params;
          this.setState({ identifier });
          const tasks = await this.props.getTaskByIdentifier(identifier);
          // eslint-disable-next-line no-return-assign
          tasks.map((item) => item.showDelete = false);
          this.setState({ tasks, loading: false });
        } catch (e) {
          this.setState({ fetchError: true, loading: false });
        }
      })();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    _showSections = () => {
      const { status, tasks } = this.state;
      return (
        Object.keys(status).map((key) => (
          <div className="col-md-4" key={key}>
            <div className="card text-center mb-2">
              <div className={status[key].clazz}>
                <h3>{status[key].name}</h3>
              </div>
            </div>
            {tasks.map((el) => (
              (el.status === key)
                ? <TaskItem item={el} key={el.id} deleteAction={() => this.onDeleteAction(el.id)} />
                : null
            ))}
          </div>
        ))
      );
    };

    onDeleteAction=(id) => {
      const { tasks } = this.state;
      const updatedTasks = tasks.filter((item) => item.id !== id);
      this.setState({ tasks: updatedTasks });
    };

    render() {
      const { identifier, loading, fetchError } = this.state;
      return (
        <Layout>
          <div className="container">
            <Link to={`/addTask/${identifier}`} className="btn btn-primary mb-3">
              <i className="fas fa-plus-circle">Create Project Task</i>
            </Link>
            <br />
            <hr />
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading
              ? <Loading />
              : fetchError
                ? <ErrorMessage />
                : (
                  <div className="container">
                    <div className="row">
                      {this._showSections()}
                    </div>
                  </div>
                )}

          </div>

        </Layout>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  getTaskByIdentifier: (identifier) => dispatch(getTaskByIdentifier(identifier)),
});

export default connect(null, mapDispatchToProps)(ProjectBoard);
