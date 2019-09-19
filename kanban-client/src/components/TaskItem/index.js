import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';

import { deleteTask } from '../../store/actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

class TaskItem extends Component {
    state = {
      priority: {
        1: {
          name: 'High',
          clazz: 'bg-danger',
          textClazz: 'card-header text-white',
        },
        2: {
          name: 'Medium',
          clazz: 'bg-warning',
          textClazz: 'card-header text-white',
        },
        3: {
          name: 'Low',
          clazz: 'bg-light',
          textClazz: 'card-header text-primary',
        },
      },
      isOpen: false,
    };

    _performDelete=async (id, ps) => {
      try {
        await this.props.deleteTask(id, ps);
        this.setState({ isOpen: false });
        this.props.deleteAction(id);
      } catch (e) {
        this.setState({ isOpen: false });
      }
    };

    _confirmDelete = (id, ps) => {
      const { isOpen } = this.state;
      return (
        <div>
          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.setState({ isOpen: false })}
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
              <Button onClick={() => this.setState({ isOpen: false })} variant="contained">Cancel</Button>
              <Button
                onClick={() => this._performDelete(id, ps)}
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

    render() {
      const { item } = this.props;
      const { priority } = this.state;
      const updateLink = `/updateTask/${item.projectIdentifier}/${item.projectSequence}`;
      return (
        <div className={`card mb-1  ${priority[item.priority].clazz}`}>
          <div className={priority[item.priority].textClazz}>
            {`ID: ${item.projectSequence} -- Priority: ${priority[item.priority].name}`}
          </div>
          <div className="card-body bg-light">
            <h5 className="card-title">{item.summary}</h5>
            <p className="card-text text-truncate ">{item.acceptanceCriteria}</p>
            <Link to={updateLink} className="btn btn-primary">View / Update</Link>
            <button
              onClick={() => this.setState({ isOpen: true })}
              type="button"
              className="btn btn-danger ml-4"
            >
                Delete
            </button>
            {this._confirmDelete(item.projectIdentifier, item.projectSequence)}
          </div>
        </div>
      );
    }
}
const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id, ps) => dispatch(deleteTask(id, ps)),
});


export default connect(null, mapDispatchToProps)(TaskItem);
