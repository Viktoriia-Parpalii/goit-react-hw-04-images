import React, { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className="Button"
        onClick={this.props.fetchMoreImages}
      >
        Load more
      </button>
    );
  }
}
