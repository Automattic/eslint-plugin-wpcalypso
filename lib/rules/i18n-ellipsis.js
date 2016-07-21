/**
 * @fileoverview Disallow using three dots in translate strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

var getCallee = require( '../util/get-callee' );
var getStringFromNode = require( '../util/get-string-from-node' );

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var rule = module.exports = function( context ) {
	return {
		CallExpression: function( node ) {
			if ( 'translate' !== getCallee( node ).name ) {
				return;
			}

			node.arguments.forEach( function( arg ) {
				if ( -1 !== getStringFromNode( arg ).indexOf( '...' ) ) {
					context.report( {
						node: arg,
						message: rule.ERROR_MESSAGE,
						fix: function( fixer ) {
							if ( arg.type === 'Literal' ) {
								return fixer.replaceText( arg, arg.raw.replace( /\.\.\./g, '…' ) );
							}
							// TODO: Fix template literals.
						}
					} );
				}
			} );
		}
	};
};

rule.ERROR_MESSAGE = 'Use ellipsis character (…) in place of three dots';

rule.schema = [];
