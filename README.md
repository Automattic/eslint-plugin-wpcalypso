# eslint-plugin-wpcalypso

Custom ESLint rules for the [WordPress.com Calypso project](https://github.com/automattic/wp-calypso).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-wpcalypso`:

```
$ npm install eslint-plugin-wpcalypso --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-wpcalypso` globally.

## Usage

Add `wpcalypso` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "wpcalypso"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "wpcalypso/rule-name": 2
    }
}
```

## Supported Rules

- [`no-lodash-import`](docs/rules/no-lodash-import.md): Disallow importing from the root Lodash module

## License

Calypso is licensed under [GNU General Public License v2 (or later)](https://github.com/Automattic/eslint-plugin-wpcalypso/blob/master/LICENSE.md).
