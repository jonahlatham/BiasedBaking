import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InboxIcon from '@material-ui/icons/Inbox';
import EditIcon from '@material-ui/icons/Edit';
import './Vote.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)'
  })
});

const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class Vote extends Component {
  state = {
    pies: [],
    hasAccess: false
  };

  async componentDidMount() {
    const pies = await axios.get(`/user/pie`);
    this.setState({
      pies: pies.data
    });
    const access = await axios.get(`/vote/grantAccess`);
    this.setState({
      hasAccess: access.data
    });
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const pies = reorder(
      this.state.pies,
      result.source.index,
      result.destination.index
    );

    this.setState({
      pies
    });
  };

  handleSubmit = async () => {
    const masPies = this.state.pies.map((e, i) => {
      const body = {
        UserId: Number(localStorage.getItem('nickname')),
        PieId: e.id,
        Rank: i + 1
      };
      return body;
    });
    const response = await axios.post(`/vote/vote`, { votes: masPies });
    if (!response.data) {
      alert("You've already voted");
      this.props.history.push('/results');
    } else {
      alert('Your vote has been counted');
      this.props.history.push('/results');
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div className="Vote-App">
        <div className="Vote-message" style={{ display: this.state.hasAccess ? 'none' : 'block' }}>
          Every pie must be submitted prior to voting
        </div>
        <div style={{ display: !this.state.hasAccess ? 'none' : 'block' }}>
          <div style={{ display: !this.state.pies ? 'none' : 'block' }}>
            <sup>Order the pies from best to worst then hit submit</sup>
            <div className="Vote-container">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.pies.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={`item-${item.id}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                className="Vote-item"
                                ContainerComponent="li"
                                ContainerProps={{ ref: provided.innerRef }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <ListItemText
                                  primary={item.name}
                                  secondary={item.user}
                                />
                                <ListItemSecondaryAction>
                                  {index + 1}
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </List>
                    </RootRef>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <button className="Vote-submit-button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Vote;
