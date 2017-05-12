# Disallow unbound `this` in JSX Props

Disallows the usage of unbound callbacks to methods of `this` in ES6 style React classes.

Previously when we were using `React.createClass`, the callbacks would be bound to `this` automatically.
In ES6 classes (`class MyClass extends Component {}`), we need to bind them ourselves.

If we don't, the callback will have an unbounded `this` and any reference to `this` will throw an error.

# Rule Details

The following is an error:

```js
import React from 'react';
class MyClass extends React.Component {
	onClick() {
		this.setState( { clicked: true } ); 
	}
	
	render() {
		<div onClick={ this.onClick } />
	}
}
```

The following patterns are allowed:

```js
import React from 'react';
class MyClass extends React.Component {
	constructor() {
		this.onClick = this.onClick.bind( this );
	}
	
	onClick() {
		this.setState( { clicked: true } ); 
	}
	
	render() {
		<div onClick={ this.onClick } />
	}
}
```

```js
import React from 'react';
class MyClass extends React.Component {
	onClick = () => {
		this.setState( { clicked: true } ); 
	}
	
	render() {
		<div onClick={ this.onClick } />
	}
}
```

The followings are allowed by this rule, but discouraged in Calypso:

```js
import React from 'react';
class MyClass extends React.Component {
	onClick() {
		this.setState( { clicked: true } ); 
	}
	
	render() {
		<div onClick={ this.onClick.bind( this ) } />
	}
}
```

```js
import React from 'react';
class MyClass extends React.Component {
	onClick() {
		this.setState( { clicked: true } ); 
	}
	
	render() {
		<div onClick={ () => this.onClick() } />
	}
}
```

```js
import React from 'react';
const MyComponent = React.createClass( {
	onClick() {
		this.setState( { clicked: true } ); 
	},
	
	render() {
		<div onClick={ this.onClick } />
	}
} );
```


