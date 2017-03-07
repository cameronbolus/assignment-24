import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

const TodoListView = React.createClass({
getInitialState: function(){
  return{
    itemsArray: [
      {
        itemName: 'wash dishes'
      },
      {
        itemName: 'walk the dog'
      },

    ]

  }
},

_renderToDoList: function(array){
  let removeFunction = this._handleRemove
  return array.map(function(listItem, i){
    return <TodoItems removeToDo={removeFunction} toDoItemName={listItem} indexofSingleItem={i} key={i}/>
  })
},

_handleAddNewToDo: function(){
  let newState = this.state
  let newItem = {
    itemName: this.refs.toDoInput.value
  }
  newState.itemsArray.push(newItem)
  this.setState(newState)
  this.refs.toDoInput.value = ''
},

_handleRemove: function(indexOfItem){
  let newItemsArray = this.state.itemsArray.filter(function(listItem, i){
    if( indexOfItem === i ){
      return false
    }else{
      return true
    }
  })
  let newState = {
    itemsArray: newItemsArray
  }
  this.setState(newState)
},

render: function(){
  return (
    <div className="view-todo-list">
      <div className="input-box">
        <input ref="toDoInput" type="text"></input><button onClick={this._handleAddNewToDo} type="button" name="button">+</button>
      </div>
      <hr/>
        <ul>
          {this._renderToDoList(this.state.itemsArray)}
        </ul>
    </div>
  )
},

})

let TodoItems = React.createClass({

_handleTakeOffList: function(){
  console.log('firing', this.props)
  this.props.removeToDo(this.props.indexofSingleItem)
},

  render: function(){

    return(
        <li ><input className="checkbox" type="checkbox" name="" value=""></input>{this.props.toDoItemName.itemName}<button onClick={this._handleTakeOffList} className="cancel-button" type="button" name="button">X</button></li>
    )
  }
})


ReactDOM.render(<TodoListView/>, document.querySelector('#app-container') )
