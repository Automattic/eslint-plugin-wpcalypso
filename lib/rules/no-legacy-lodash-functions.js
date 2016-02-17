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
	let lodashFunctions = [];

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

	return {
		VariableDeclarator: function( node ) {
			if ( node.init &&
				node.init.type === 'CallExpression' &&
				node.init.callee.name === 'require' &&
				node.init.arguments &&
				node.init.arguments.length === 1 &&
				node.init.arguments[0].value &&
				~node.init.arguments[0].value.indexOf( 'lodash/' ) ) {
				const parts = node.init.arguments[0].value.split( '/' );
				if ( parts.length > 2 ) {
					context.report( node, 'Old style lodash import' );
					return;
				}
				const lodashFunction = node.init.arguments[0].value.split( '/' )[1];
				lodashFunctions.push( [ node.id.name, lodashFunction ] );
				//console.log( 'required %s', lodashFunction );

				if ( lodashFunction in aliases ) {
					context.report( node, lodashFunction + ' has been moved to ' + aliases[ lodashFunction ] );
				}

				if ( lodashFunction === 'zipObject' ) {
					context.report( node, 'zipObject changed a lot. Check this one.' );
				}
			}
		},
		ImportDeclaration: function( node ) {
			if ( node.source.value && ~ node.source.value.indexOf( 'lodash/' ) ) {
				const parts = node.source.value.split( '/' );
				if ( parts.length > 2 ) {
					context.report( node, 'Old style lodash import' );
					return;
				}
				const lodashFunction = node.source.value.split( '/' )[1];
				lodashFunctions.push( [ node.specifiers[0].local.name, lodashFunction ] );
				//console.log( 'imported %s', lodashFunction );
				if ( lodashFunction in aliases ) {
					context.report( node, lodashFunction + ' has been moved to ' + aliases[ lodashFunction ] );
				}

				if ( lodashFunction === 'zipObject' ) {
					context.report( node, 'zipObject changed a lot. Check this one.' );
				}
			}
		},

		CallExpression: function( node ) {
			const lodashCall = lodashFunctions.find( function( f ) {
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
