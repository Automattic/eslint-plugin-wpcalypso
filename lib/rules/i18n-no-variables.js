/**
 * @fileoverview Disallow variables as translate strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

var getSequenceCallee = require( '../util/sequence-callee' );

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var rule = module.exports = function( context ) {
	return {
		CallExpression: function( node ) {
			if ( 'translate' !== getSequenceCallee( node ).name ) {
				return;
			}

			node.arguments.forEach( function( arg, i ) {
				// Ignore last argument in multi-argument translate call, which
				// should be the object argument
				if ( i === node.arguments.length - 1 && node.arguments.length > 1 ) {
					return;
				}

				if ( 'Literal' !== arg.type && 'BinaryExpression' !== arg.type ) {
					context.report( node, rule.ERROR_MESSAGE );
				}
			} );
		}
	};
};

rule.ERROR_MESSAGE = 'Variables cannot be used as translate strings';

rule.schema = [];
