/**
 * @fileoverview Disallow strings which include only placeholders
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require( '../../../lib/rules/i18n-no-filler-text' ),
	config = { env: { es6: true } },  // support for string templates
	RuleTester = require( 'eslint' ).RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

( new RuleTester( config ) ).run( 'i18n-no-filler-text', rule, {
	valid: [
		{
			code: 'translate( \'Hey dipsum!\' );'
		},
		{
			code: 'translate( \'Ablation is removal of material from the surface of an object.\' );'
		}
	],

	invalid: [
		{
			code: 'translate( \'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( `Bacon ipsum dolor amet sirloin bresaola leberkas, strip steak hamburger short ribs beef pork. Tenderloin salami sausage tongue capicola. Hamburger tenderloin prosciutto venison pork loin, bresaola tri-tip shank.` );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Lorem ipsum\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'Lorem ipsum dolor sit amet\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'bla bla\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		},
		{
			code: 'translate( \'This is a sample text blablabla\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE
			} ]
		}
	]
} );
