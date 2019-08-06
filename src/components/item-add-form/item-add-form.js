import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
    };
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLabelChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onAddItem(this.state.text);
    this.setState({text: ''});
  }

    render() {

        return (
          <form className='item-add-form d-flex'
                onSubmit={this.onSubmit} > 
            <input type='text' 
                    className='form-control'
                    onChange={this.onLabelChange} 
                    placeholder='What needs to be done'
                    value={this.state.text} 
                    required/>
            <button className="btn btn-outline-success">
            Add Item
            </button>
          </form>   
        );
    }
}
