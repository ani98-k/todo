import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  constructor() {
    super();
    this.state= {
      searchText: '',
      statusFilter: 'all',
      todoData: [
        {label: 'Drink Cofee', important: false, done: false, id: 0},
        {label: 'Make Awesome App', important: false, done: false, id: 1},
        {label: 'Have a lunch', important: false, done: false, id: 2},
      ]  
    };
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.onSearchItem = this.onSearchItem.bind(this);
    this.onFilterItems = this.onFilterItems.bind(this);
  }
  

  // createItem(label, id) {
  //   return(
  //     {
  //       label: label,
  //       important:false,
  //       done: false,
  //       id: id
  //     }
  //   );
  // }

  onDeleteItem(id) {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id===id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray
      };
    });
    // const array = [...this.state.todoData];
    // const idx = array.findIndex((el) => el.id===id);
    // if (idx !== -1) {
    //   array.splice(idx, 1);
    //   this.setState({todoData: array});
    // }
  }

  onAddItem(text) {
    const array = [...this.state.todoData];
    const newItem = {
      label: text,
      important: false,
      id:array.length
    };
    array.push(newItem);
    this.setState({todoData: array});
  }

  toggleProperty(arr, id, prop) {
    const idx = arr.findIndex((el) => el.id===id);
    arr[idx][prop] = !arr[idx][prop];
    this.setState({todoData: arr});
  };

  onToggleImportant(id) {
    this.toggleProperty([...this.state.todoData], id, 'important');
  };

  onToggleDone(id) {
    this.toggleProperty([...this.state.todoData], id, 'done');
  };

  onSearchItem(e) {
    this.setState({ searchText: e.target.value});
  } 

  onFilterItems(filter) {
    this.setState({ statusFilter: filter});
  } 

  search(items, text) {
    if(text.length===0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
              .toLocaleUpperCase()
              .indexOf(text.toLocaleUpperCase()) > -1;
    });
  }

  filter(items, status) {
    switch (status) {
      case 'all':
        return items;
      case 'done':
        return items.filter((item) => item.done);
      case 'active':
        return items.filter((item) => !item.done);  
      default:
        return items;
    }
  }

    render() {
      const { todoData, searchText, statusFilter} = this.state;
      const visibleItems = this.filter(this.search(todoData, searchText), statusFilter);
      const doneCount = todoData.filter((el) => el.done===true).length;
      const toDoCount = todoData.length - doneCount;

      return (
        <div className="todo-app">
          <AppHeader toDo={toDoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel onSearchItem={this.onSearchItem} />
            <ItemStatusFilter
             filter={statusFilter}
              onFilterItems={this.onFilterItems}/>
          </div>

          <TodoList todos={visibleItems} 
                    onDeleted={ this.onDeleteItem }
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant} />
          <ItemAddForm onAddItem={this.onAddItem}/>          
        </div>
      );
    };
}