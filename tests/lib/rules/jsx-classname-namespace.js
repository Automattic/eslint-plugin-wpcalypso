/**
 * @fileoverview Ensure JSX className adheres to CSS namespace guidelines
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require( '../../../lib/rules/jsx-classname-namespace' ),
	RuleTester = require( 'eslint' ).RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

( new RuleTester() ).run( 'jsx-classname-namespace', rule, {
	valid: [
		{
			code: 'export default function() { return <Foo className="foo" />; }',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default function() { return <Foo className="quux foo" />; }',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default () => <Foo className="foo" />;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'const Foo = () => <Foo className="foo" />; export default Foo;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'import localize from "./localize"; const Foo = () => <Foo className="foo" />; export default localize( localize( Foo ) );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'import connect from "./connect"; const Foo = () => <Foo className="foo" />; export default connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'const Foo = () => <Foo className="foo" />; module.exports = Foo;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'const localize = require( "./localize" ); const Foo = () => <Foo className="foo" />; module.exports = localize( localize( Foo ) );',
			env: { es6: true },
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'const connect = require( "./connect" ); const Foo = () => <Foo className="foo" />; module.exports = connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'function Foo() { return <Foo className="foo" />; } export default Foo;',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'module.exports = function() { return <Foo className="foo" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default React.createClass( { render: function() { return <Foo className="foo" />; } } );',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default React.createClass( { render() { return <Foo className="foo"><div className="foo__child" /></Foo>; } } );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default React.createClass( { child() { return <div className="foo__child" />; }, render() { return <Foo className="foo" />; } } );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'function child() { return <Foo className="foo__child" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'function child() { return <Foo className="quux foo__child" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'export default class Foo { render() { return <Foo className="foo" />; } }',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'import localize from "./localize"; class Foo { render() { return <Foo className="foo" />; } } export default localize( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		},
		{
			code: 'import connect from "./connect"; class Foo { render() { return <Foo className="foo" />; } } export default connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js'
		}
	],

	invalid: [
		{
			code: 'export default function() { return <Foo className="foobar" />; }',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default function() { return <Foo className="quux foobar" />; }',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default () => <Foo className="foobar" />;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'const Foo = () => <Foo className="foobar" />; export default Foo;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'import localize from "./localize"; const Foo = () => <Foo className="foobar" />; export default localize( localize( Foo ) );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'import connect from "./connect"; const Foo = () => <Foo className="foobar" />; export default connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'const Foo = () => <Foo className="foobar" />; module.exports = Foo;',
			env: { es6: true },
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'const localize = require( "./localize" ); const Foo = () => <Foo className="foobar" />; module.exports = localize( localize( Foo ) );',
			env: { es6: true },
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'const connect = require( "./connect" ); const Foo = () => <Foo className="foobar" />; module.exports = connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'function Foo() { return <Foo className="foobar" />; } export default Foo;',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'module.exports = function() { return <Foo className="foobar" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default React.createClass( { render: function() { return <Foo className="foobar" />; } } );',
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default React.createClass( { render() { return <Foo className="foo"><div className="foobar__child" /></Foo>; } } );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default React.createClass( { child() { return <div className="foobar__child" />; }, render() { return <Foo className="foo" />; } } );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'function child() { return <Foo className="foobar__child" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'function child() { return <Foo className="quux foobar__child" />; }',
			ecmaFeatures: { jsx: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'export default class Foo { render() { return <Foo className="foobar" />; } }',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'import localize from "./localize"; class Foo { render() { return <Foo className="foobar" />; } } export default localize( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'import connect from "./connect"; class Foo { render() { return <Foo className="foobar" />; } } export default connect()( Foo );',
			env: { es6: true },
			ecmaFeatures: { jsx: true, modules: true },
			filename: '/tmp/foo/index.js',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		}
	]
} );
