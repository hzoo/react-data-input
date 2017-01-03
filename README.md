A library to automatically bind React form elements to state attributes, automatically doing type conversion and validation. [Give it a try](http://github.io/icoloma/react-data-input).

```JavaScript
import { Form, Input, TextArea } from 'react-data-input';

const state = { username: 'Foo', age: 20 };

function save() {
  fetch('save', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: state
  });
}

function foo(props) {
  return (
    <form onSubmit={save} state={state}>
      <Input type="text" name="username" required maxLength="100" />
      <Input type="number" name="age" min="0" step="1" />
    </form>
  );
});
```

When any of these fields is modified, the corresponding change will be injected into `state[props.name]`, transforming into the corresponding type (number, date, etc) if necessary. The enclosing `Form` will run validations before triggering the `onSubmit` callback.

The list of exported components includes Form, Input (`text`, `number` and `checkbox`), TextArea and Select.

## Conversions

Each field will automatically convert values from string to the desired format. Empty strings will be set to `undefined`.

* Text
`<Input type="text" name="name" />`
`<TextArea name="description" />`

* Integer and Float (use a value other than 1 for `step`): 
`<Input type="number" name="age" />`
`<Input type="number" name="percentage" step="0.01" />`

The default converter can be overriden by a custom implementation:

```
const AllowedValues = { one: instanceOne, two: instanceTwo };
const state = { defcon: AllowedValues.one }
const myConverter =

    // transform from String to Object
    toObject: function(value) {
      return AllowedValues[value] || AllowedValues.one;
    },  

    // transform from object to String
    toString: function(value) {
      const key = Object.keys(AllowedValues).find((key) => AllowedValues[key] === value);
      return key || 'one';
    }

};

<Input type="text" name="defcon" converter={myConverter} state={state}/>
```

## Validations

Validations will use the same error messages from Chrome. The following validations are supported:

* `required`
* `number.min`
* `number.max`

When the user submits the Form, it will automatically run all validations before triggering `onSubmit`. If any validation does not pass, the callback will not be invoked and an error message will be displayed instead.

## To play with the test suite

```
# To run the test suite based on Mocha
npm run test

# To fiddle with the browser and a sample form at
# http://localhost:8080/test/example.html
npm run dev
```

