/*

  Example code to use in browser

*/
import { Form, Input, RadioGroup } from '../src/react-data-input';
import ReactDOM from "react-dom";
import React from 'react';
import MyState from './MyState';

const state = new MyState({ name: 'John Doe', age: 23, subscribed: true });
function onSubmit() {
  console.log('onSubmit() invoked successfully');
  state.printState();
}

function MyApp(props) {
  return (
    <Form onSubmit={onSubmit} state={state}>
      <label htmlFor="name">Name</label>
      <Input name="name" type="text" required maxLength="50" />
      <label htmlFor="age">Age</label>
      <Input name="age" type="number" min="0" max="120" required />
      <label><Input name="subscribed" type="checkbox" /> Subscribe to newsletter</label>
      <RadioGroup>
        <label><Input name="gender" type="radio" value="male" /> Male</label>
        <label><Input name="gender" type="radio" value="male" /> Female</label>
      </RadioGroup>
      <input type="submit" value="Submit form and see resulting state"/>
    </Form>
  );
}

ReactDOM.render(<MyApp/>, document.getElementsByClassName('container')[0]);

