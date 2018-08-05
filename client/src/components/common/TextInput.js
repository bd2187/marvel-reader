import React, { Component } from "react";

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <input
        type={this.props.type}
        placeholder={this.props.placeholder}
        data-input={this.props.dataInput}
        className={this.props.className}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default TextInput;
