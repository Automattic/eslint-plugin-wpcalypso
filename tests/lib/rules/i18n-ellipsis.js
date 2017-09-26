/**
 * @fileoverview Disallow using three dots in translate strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require( '../../../lib/rules/i18n-ellipsis' ),
	config = { env: { es6: true } }, // support for string templates
	RuleTester = require( 'eslint' ).RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

( new RuleTester( config ) ).run( 'i18n-ellipsis', rule, {
	valid: [
		{
			code: 'this.translate( \'Hello World…\' );',
		},
		{
			code: 'i18n.translate( \'Hello World…\' );',
		},
		{
			code: 'translate( \'Hello World…\' );',
		},
		{
			code: 'translate( `Hello World…` );',
		},
		{
			code: 'translate( \'Hello World…\', \'Hello Worlds…\' );',
		},
		{
			code: '( 0, translate )( \'Hello World…\' );',
		},
	],

	invalid: [
		{
			code: 'this.translate( \'Hello World...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'this.translate( \'Hello World…\' );',
		},
		{
			code: 'this.translate( "Hello World..." );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'this.translate( "Hello World…" );',
		},
		{
			code: 'i18n.translate( \'Hello World...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( \'Hello World…\' );',
		},
		{
			code: 'i18n.translate( \'Fix string containing single quote(\\\')...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( \'Fix string containing single quote(\\\')…\' );',
		},
		{
			code: 'i18n.translate( \'Fix ...\' + \'Joined strings...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( \'Fix …Joined strings…\' );',
		},
		{
			code: 'i18n.translate( \'Fix single quote \\\' containing\' + \'Joined strings...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( \'Fix single quote \\\' containingJoined strings…\' );',
		},
		{
			code: 'i18n.translate( `Hello World...` );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( `Hello World…` );',
		},
		{
			code: 'i18n.translate( `Hello ${ "World" }...` );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'i18n.translate( `Hello ${ "World" }…` );',
		},
		{
			code: 'var world = "World"; i18n.translate( `Hello ${ world }...` );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'var world = "World"; i18n.translate( `Hello ${ world }…` );',
		},
		{
			code: 'translate( \'Hello World...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'translate( \'Hello World…\' );',
		},
		{
			code: 'translate( \'Hello World…\', \'Hello Worlds...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: 'translate( \'Hello World…\', \'Hello Worlds…\' );',
		},
		{
			code: '( 0, translate )( \'Hello World...\' );',
			errors: [ {
				message: rule.ERROR_MESSAGE,
			} ],
			output: '( 0, translate )( \'Hello World…\' );',
		},
	],
} );
