# Disallow filler text in translatable strings

Filler text should not be passed through the translate function as this might trigger unwanted submission of translation of the text. 

## Rule Details

The following patterns are considered warnings:

```js
translate( "Lorem ipsum dolor amet" );
translate( "Bacon ipsum dolor" );
translate( "bla bla" );
translate( "This is a sample text blablabla" );
```

The following patterns are not warnings:

```js
translate( 'Hey dipsum!' );
translate( 'Ablation is removal of material from the surface of an object.' );
```
