/**
 * @fileoverview Disallow variables as translate strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require( '../../../lib/rules/i18n-no-variables' ),
	RuleTester = require( 'eslint' ).RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

( new RuleTester() ).run( 'i18n-no-variables', rule, {
	valid: [
		{
			code: 'translate( \'Hello World\' );'
		},
		{
			code: 'translate( \'Hello\' + \' World\' );'
		},
		{
			code: 'translate( \'Hello World\', {} );'
		},
		{
			code: 'translate( \'Hello World\', { context: "a literal" } );'
		},
		{
			code: 'translate( \'A literal key\', { \'context\': "A literal" } );'
		}
	],

	invalid: [
		{
			code: 'translate( string );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Hello World\', plural, {} );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Hello World\', { context: aVariable } );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Hello World\', { context: aFunctionCall() } );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Hello World\', { comment: aVariable } );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Hello \' + name );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		}
	]
} );
