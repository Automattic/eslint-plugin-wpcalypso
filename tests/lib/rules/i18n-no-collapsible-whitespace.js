/**
 * @fileoverview Disallow collapsible whitespace in translatable strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require( '../../../lib/rules/i18n-no-collapsible-whitespace' ),
	config = { env: { es6: true } },  // support for string templates
	RuleTester = require( 'eslint' ).RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

( new RuleTester( config ) ).run( 'i18n-no-collapsible-whitespace', rule, {
	valid: [
		{
			code: 'this.translate( \'Hello World…\' );'
		},
		{
			code: 'i18n.translate( \'Hello World…\' );'
		},
		{
			code: "translate( 'Hello World!' ) + '<br>' + translate( 'More text on another line' );"
		},
		{
			code: "translate( '<p>Hello' + ' World!</p>' );"
		},
		{
			code: 'translate( `A long string ` +\n `spread over ` +\n  `multiple lines.` );'
		},

	],

	invalid: [
		{
			code: 'translate( "My double-quoted string\\nwith a newline" );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: "translate( 'My single quoted string\\nwith a newline' );",
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( `My template literal\non two lines` );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: "translate( '	My tab-indented string.' );",
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: "translate( '\tMy string with a tab escape sequence.' );",
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: "translate( '\u0009My string with a unicode tab.' );",
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( `A string with \r a carriage return.` );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: "translate( 'A string with consecutive spaces.  These two are after a full stop.' );",
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
	]
} );
