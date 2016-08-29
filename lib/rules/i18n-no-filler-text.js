/**
 * @fileoverview Disallow filler text in translate strings
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

var getCallee = require( '../util/get-callee' ),
	getTextContentFromNode = require( '../util/get-text-content-from-node' );

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var rule = module.exports = function( context ) {
	var fillerRegExp = [
		new RegExp( /\blorem ipsum\b/, 'i' ),
		new RegExp( /\bipsum dolor\b/, 'i' ),
		new RegExp( /\bdolor amt\b/, 'i' ),
		new RegExp( /\b(bla)+\b/, 'i' ),
	];

	return {
		CallExpression: function( node ) {
			var i;
			if ( 'translate' !== getCallee( node ).name ) {
				return;
			}

			node.arguments.forEach( function( arg ) {
				var argumentString = getTextContentFromNode( arg );

				for ( i = 0; i < fillerRegExp.length; i++ ) {
					if ( argumentString && fillerRegExp[ i ].test( argumentString ) ) {
						context.report( node.arguments[ 0 ], rule.ERROR_MESSAGE );
						break;
					}
				}
			} );
		}
	};
};

rule.ERROR_MESSAGE = 'Use of filler text';

rule.schema = [];
