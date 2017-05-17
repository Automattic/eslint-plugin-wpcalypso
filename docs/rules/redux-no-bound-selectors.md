# Disallow function binding and instantiation within closure of Redux state

Disallows the anti-pattern of passing functions from `react-redux#connect`'s `mapStateToProps`'s body to components. See [`wp-calypso#14024`](https://github.com/Automattic/wp-calypso/issues/14024) for details.

## Rule details

Any function instantiation or binding that happens within the scope of a function argument named `state` will be caught.

```js
connect( ( state ) => ( {
  getSite: getSite.bind( null, state ),
} ) )( MyComponent );

// or

const mapState = ( state ) => ( {
  getSite: ( id ) => getSite( state, id ),
} );
connect( mapState )( MyComponent );
```
