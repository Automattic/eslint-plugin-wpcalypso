/**
 * @fileoverview Disallow new functions in react-redux#connect
 * @author Automattic
 * @copyright 2017 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const REF = ' See wp-calypso#14024';
const BIND_ERROR_MESSAGE = "Don't bind functions within `connect`." + REF;
const FUNC_ERROR_MESSAGE = "Don't instantiate functions within `connect`." + REF;

function isStateInArgs( node ) {
	return node.params.some( function( paramNode ) {
		return paramNode.name === 'state';
	} );
}

module.exports = {
	meta: {
		docs: {
			description: 'Disallow binding or instantiation of functions within a closure that contains global state',
			recommended: true
		},
		schema: []
	},
	create: function( context ) {
		let hasStateInClosure = false;

		function onFunctionEnter( node ) {
			if ( hasStateInClosure ) {
				context.report( node, FUNC_ERROR_MESSAGE );
				return;
			}

			if ( isStateInArgs( node ) ) {
				hasStateInClosure = true;
			}
		}

		function onFunctionExit( node ) {
			if ( hasStateInClosure && isStateInArgs( node ) ) {
				hasStateInClosure = false;
			}
		}

		return {
			FunctionExpression: onFunctionEnter,
			ArrowFunctionExpression: onFunctionEnter,

			'FunctionExpression:exit': onFunctionExit,
			'ArrowFunctionExpression:exit': onFunctionExit,

			Identifier: function( node ) {
				if ( hasStateInClosure && node.name === 'bind' ) {
					context.report( node, BIND_ERROR_MESSAGE );
				}
			}
		};
	}
};
