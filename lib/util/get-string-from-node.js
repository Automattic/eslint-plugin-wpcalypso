/**
 * @fileoverview Utility for retrieving the final translatable string from an AST
 * node for tests that focus on the strings themselves.
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */

/**
 * Returns the singular and maybe plural strings from a CallExpression.
 *
 * @param  {Object} node CallExpression node
 * @return {Object}      First non-sequence callee
 */
var getStringLeafNodes = require( './get-string-leaf-nodes' );

function getStringFromNode( node ) {
	// We need to handle two cases:
	// TemplateLiteral quasis =>  node.value.raw
	// Literal strings => node.value
	return getStringLeafNodes( node )
		.map( ( leaf ) => leaf.value.raw || leaf.value )
		.join( '' );
}

 module.exports = getStringFromNode;
