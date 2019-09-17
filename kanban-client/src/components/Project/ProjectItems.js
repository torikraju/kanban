import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { getAllProject, deleteProject } from '../../store/actions';
import Loading from '../Loading';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


class ProjectItems extends Component {
    state = {
      projects: [],
      loading: true,
      isOpen: false,
    };

    componentDidMount() {
      (async () => {
        try {
          await this._fetchAndSetState();
          // const matchId = this.props.match.params.id;
          // if (!matchId) {
          //   this._getTeams(false, 'Add Match', matchId);
          // } else {
          //   const getMatch = await firebaseDB.ref(`matches/${matchId}`).once('value');
          //   this._getTeams(getMatch.val(), 'Update Match', matchId);
          // }
        } catch (e) {
          console.log(`error in componentDidMount-ProjectItems ${e}`);
        }
      })();
    }

    _fetchAndSetState = async () => {
      try {
        const { getProjects } = this.props;
        const projects = await getProjects();
        // eslint-disable-next-line no-return-assign
        projects.map((item) => item.showDelete = false);
        this.setState({ projects, loading: false });
      } catch (e) {
        console.log(`error in ProjectItems-_fetchAndSetState ${e}`);
      }
    };

    _performDelete = async (identifier) => {
      this.setState({ isOpen: false });
      try {
        const { deleteProject: _delete } = this.props;
        await _delete(identifier);
        await this._fetchAndSetState();
      } catch (e) {
        console.log(`error in ProjectItems-_performDelete ${e}`);
      }
    };

    // eslint-disable-next-line react/sort-comp
    _handleDelete(event, id) {
      event.preventDefault();
      this._toggleDelete(id);
      this.setState({ isOpen: true });
    }

    _toggleDelete = (id) => {
      const { projects } = this.state;
      const index = projects.findIndex((item) => item.id === id);
      const updatedProjects = [...projects];
      const updatedEl = { ...updatedProjects[index] };
      updatedEl.showDelete = true;
      updatedProjects[index] = updatedEl;
      this.setState({ projects: updatedProjects });
    };

    _handleClose = (id) => {
      this.setState({ isOpen: false });
      this._toggleDelete(id);
    };

    _confirmDelete = ({ id, identifier }) => {
      const { isOpen } = this.state;
      return (
        <div>
          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this._handleClose(id)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
                        Are you sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                            Do you really want to delete these records?
                            This process cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this._handleClose(id)} variant="contained">Cancel</Button>
              <Button
                onClick={() => this._performDelete(identifier)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };

    projectItem = (props) => (
      <div className="card card-body bg-light mb-3" key={props.id}>
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{props.identifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <a href="#">
                <li className="list-group-item board">
                  <i className="fa fa-flag-checkered pr-1">Project Board </i>
                </li>
              </a>
              <a href="#/">
                <li className="list-group-item update">
                  <i className="fa fa-edit pr-1">Update Project Info</i>
                </li>
              </a>
              <a href="/#" onClick={(event) => this._handleDelete(event, props.id)}>
                <li className="list-group-item delete">
                  <i className="fa fa-minus-circle pr-1">Delete Project</i>
                </li>
              </a>
              {props.showDelete && (
                this._confirmDelete(props)
              )}
            </ul>
          </div>
        </div>
      </div>
    );

    render() {
      const { projects, loading } = this.state;
      return (
        <div className="container">
          {loading ? <Loading /> : projects.map((item) => this.projectItem(item))}
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  getProjects: () => dispatch(getAllProject()),
  deleteProject: (identifier) => dispatch(deleteProject(identifier)),
});

export default connect(null, mapDispatchToProps)(ProjectItems);
