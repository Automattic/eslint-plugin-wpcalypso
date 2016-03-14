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

	const aliases = {
		pluck: 'map',
		findWhere: 'find',
		where: 'filter',
		first: 'head',
		indexBy: 'keyBy',
		invoke: 'invokeMap',
		modArgs: 'overArgs',
		padLeft: 'padStart',
		padRight: 'padEnd',
		pairs: 'toPairs',
		rest: 'tail',
		restParam: 'rest',
		sortByOrder: 'orderBy',
		trimLeft: 'trimStart',
		trimRight: 'trimEnd',
		trunc: 'truncate',
		all: 'every',
		any: 'some',
		backflow: 'flowRight',
		callback: 'iteratee',
		collect: 'map',
		compose: 'flowRight',
		contains: 'includes',
		detect: 'find',
		foldl: 'reduce',
		foldr: 'reduceRight',
		include: 'includes',
		inject: 'reduce',
		methods: 'funtions',
		object: 'fromPairs',
		select: 'filter',
		unique: 'uniq'
	};

	const splits = {
		max: 'maxBy',
		min: 'minBy',
		assign: 'assignWith',
		assignIn: 'assignInWith',
		clone: 'cloneWith',
		cloneDeep: 'cloneDeepWith',
		invert: 'invertBy',
		isEqual: 'isEqualWith',
		isMatch: 'isMatchWith',
		merge: 'mergeWith',
		omit: 'omitBy',
		pick: 'pickBy',
		sample: 'sampleSize',
		sortedIndex: 'sortedIndexBy',
		sum: 'sumBy',
		uniq: 'uniqBy'
	};

	function rejectAliases( foundPair, node ) {
		const lodashFunction = foundPair[1];
		if ( lodashFunction in aliases ) {
			context.report( node, lodashFunction + ' has been moved to ' + aliases[ lodashFunction ] );
		}

		if ( lodashFunction === 'zipObject' ) {
			context.report( node, 'zipObject changed a lot. Check this one.' );
		}
	}

	return {
		VariableDeclarator: function( node ) {
			lodashFunctionsCollector.collectRequire( node, rejectAliases );
		},
		ImportDeclaration: function( node ) {
			lodashFunctionsCollector.collectImport( node, rejectAliases );
		},

		CallExpression: function( node ) {
			const lodashCall = lodashFunctionsCollector.calls.find( function( f ) {
				return node.callee.name === f[0];
			} );

			if ( ! lodashCall ) {
				return;
			}

			const split = splits[ lodashCall[1] ];

			if ( split ) {
				node.arguments.some( function( arg ) {
					if ( ~arg.type.indexOf( 'FunctionExpression' ) ) {
						context.report( node, 'Appears you might need to use the new ' + split + ' instead of ' + lodashCall[1] );
					}
				} );
			}
		}
	};
};

module.exports.schema = [];
