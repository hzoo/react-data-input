import React from 'react';
import omit from 'lodash/omit';

const isNullOrUndefined = function(value) {
  return typeof(value) === "undefined" || value === null;
}

const isEmptyString = function(value) {
  return value.length == 0;
}

// converter methods for input types
const Converters = {
  text: {

    // transform from String representation to object. Empty Strings are returned as undefined.
    toObject: function(value) {
      return isEmptyString(value)? undefined : value;
    },  

    // transform from object to String. Null and undefined values are converted to an empty String
    toString: function(value) {
      return /*isNullOrUndefined? '' :*/ value;
    }

  },

  number: {

    toObject: function(value, attrs) {
      return isEmptyString(value)? undefined : 
        attrs.step == 1? parseInt(value) :
        parseFloat(value);
    },

    toString: function(value) {
      return isNullOrUndefined(value)? '' : ('' + value);
    }

  }
}


class Form extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (form.validate) {
      form.validate() && this.onSubmit();
    } else {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <form {...this.props} onSubmit={this.onSubmit}>
        {this.props.children}
      </form>
    )  
  }
}

Form.propTypes = {
  // the callback that will be invoked on submit, if validation passes
  onSubmit: React.PropTypes.func.isRequired
}


// component that will propagate any changes to state[props.name]
class BoundComponent extends React.Component {

  constructor(props) {
    super(props);
    this.converter = Converters[props.type] || Converters.text;
    this.state = props.state;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const props = this.props;
    this.state[props.name] = this.converter.toObject(e.target.value, props);
  }

  render() {
    const value = this.converter.toString(this.state[this.props.name]);
    const props = omit(this.props, 'state');
    props.value = value;
    props.onChange = this.onChange;
    return React.createElement(this.getNestedElementClass(), props/*, is this needed? props.children*/);
  }

}

const propTypes = React.PropTypes;
BoundComponent.propTypes = {
  name: propTypes.string.isRequired,
  state: propTypes.object.isRequired
}

function createBoundComponent(NestedElementClass) {
  return class GeneratedClass extends BoundComponent {
    getNestedElementClass() {
      return NestedElementClass;
    }
  }
}

const Input = createBoundComponent("input");
Input.propTypes = {
  type: propTypes.string.isRequired
}

const TextArea = createBoundComponent("textarea");
const Select = createBoundComponent("select");

export { Form, Input, TextArea, Select };
