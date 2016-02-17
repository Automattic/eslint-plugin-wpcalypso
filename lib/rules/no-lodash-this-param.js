/**
 * @fileoverview Disallow passing a this param to certain lodash methods
 * @author Automattic
 * @copyright 2016 Automattic. All rights reserved.
 * See LICENSE.md file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function( context ) {
	const lodashFunctionsCollector = require( '../helpers' ).lodashInvocationCollector();

	const thingsThatNoLongerTakeThis = {
		dropRightWhile: 3,
		dropWhile: 3,
		findIndex: 3,
		findLastIndex: 3,
		remove: 3,
		sortedIndex: 4,
		sortedLastIndex: 4,
		takeRightWhile: 3,
		takeWhile: 3,
		uniq: 4,
		unzipWith: 3,
		zipWith: 3,
		countBy: 3,
		every: 3,
		filter: 3,
		find: 3,
		findLast: 3,
		forEach: 3,
		forEachRight: 3,
		groupBy: 3,
		indexBy: 3,
		keyBy: 3,
		map: 3,
		partition: 3,
		reduce: 4,
		reduceRight: 4,
		reject: 3,
		some: 3,
		sortBy: 3,
		clone: 4,
		cloneDeep: 3,
		isEqual: 4,
		isMatch: 4,
		maxBy: 3,
		minBy: 3,
		sum: 3,
		assign: 4,
		findKey: 3,
		findLastKey: 3,
		forIn: 3,
		forInRight: 3,
		forOwn: 3,
		forOwnRight: 3,
		mapKeys: 3,
		mapValues: 3,
		merge: 4,
		omit: 3,
		pick: 3,
		transform: 4,
		callback: 2,
		times: 3
	}

	return {
		VariableDeclarator: function( node ) {
			lodashFunctionsCollector.collectRequire( node );
		},
		ImportDeclaration: function( node ) {
			lodashFunctionsCollector.collectImport( node );
		},

		CallExpression: function( node ) {
			const lodashCall = lodashFunctionsCollector.calls.find( function( f ) {
				return node.callee.name === f[0];
			} );

			if ( ! lodashCall ) {
				return;
			}

			const sketchyArgs = thingsThatNoLongerTakeThis[ lodashCall[1] ];
			// is this one of our functions that might take this?
			if ( sketchyArgs && node.arguments.length === sketchyArgs ) {
				context.report( node, 'Passing ' + sketchyArgs + ' args to ' + lodashCall[1] + ' is suspect' );
			}

			// this appears to be a call to a lodash function
			node.arguments.forEach( function( arg ) {
				if ( arg.type === 'ThisExpression' ) {
					context.report( arg, "Don't pass `this` to lodash functions" );
				}
			} );
		}
	};
};

module.exports.schema = [];
