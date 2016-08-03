/**
 * @fileoverview Utility for retrieving callee identifier node from a CallExpression
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */

var assert = require( 'assert' );
var getI18nStringFromNode = require( '../../../lib/util/get-i18n-string-from-node.js' );
var config = require( '../../../.eslintrc.json' );
var parser = require( config.parser );

function parseCode( code ) {
	var programNode = parser.parse( code, config.env );
	// Espree thinks it's parsing a whole program, so we just need to peel away
	// the 'Program' packaging.
	return programNode.body[ 0 ];
}
function parseExpressionStatement( code ) {
	var node = parseCode( code ).expression;
	return node;
}

describe( '#getStringFromNode', function() {
	it( 'should return simple strings', function() {
		assert.equal( 'a simple string', getI18nStringFromNode( parseExpressionStatement( "'a simple string'" ) ) );
	} );

	it( 'should return concatentated strings', function() {
		assert.equal( 'A string in two parts', getI18nStringFromNode( parseExpressionStatement( '"A string" + " in two parts"' ) ) );
	} );

	it( 'should return concatentated strings', function() {
		assert.equal( 'A string in three parts', getI18nStringFromNode( parseExpressionStatement( '"A string" + " in " + "three parts"' ) ) );
	} );

	it( 'should return strings from template literals', function() {
		assert.equal( 'A template literal string', getI18nStringFromNode( parseExpressionStatement( '`A template literal string`' ) ) );
	} );

	it( 'should handle different literal types', function() {
		assert.equal( 'A template and a string', getI18nStringFromNode( parseExpressionStatement( '`A template` + " and a string"' ) ) );
	} );

	it( 'should return false for functions', function() {
		var functionNode = parseExpressionStatement( 'foo()' );

		assert.strictEqual( false, getI18nStringFromNode( functionNode ) );
	} );

	it( 'should return false for variable assignments', function() {
		var variableDeclarationNode = parseCode( "var aVariable = 'a string to assign';" );
		var variableDeclarator = variableDeclarationNode.declarations[0];

		assert.strictEqual( false, getI18nStringFromNode( variableDeclarationNode ) );
		assert.strictEqual( false, getI18nStringFromNode( variableDeclarator ) );
	} );

	it( 'should return false for a binary structure including invalid node types', function() {
		assert.strictEqual( false, getI18nStringFromNode( parseExpressionStatement( "'a string plus a function' + foo()" ) ) );
	} );
} );

