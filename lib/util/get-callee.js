/**
 * @fileoverview Utility for retrieving callee identifier node from a CallExpression
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */

/**
 * Returns the callee identifier node from a CallExpression.
 *
 * @param  {Object} node CallExpression node
 * @return {Object}      First non-sequence callee
 */
var getCallee = module.exports = function( node ) {
	var callee = node.callee;
	if ( ! callee ) {
		return node;
	}

	if ( 'SequenceExpression' === callee.type ) {
		return getCallee( callee.expressions[ callee.expressions.length - 1 ] );
	}

	if ( 'MemberExpression' === callee.type ) {
		return getCallee( callee.property );
	}

	return callee;
};
