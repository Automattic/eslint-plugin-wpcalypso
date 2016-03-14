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

	function validateImport( pair, node ) {
		if ( pair[0] !== pair[1] && pair[1] !== 'escape' && pair[1] !== 'unescape' ) {
			context.report( node, 'Variable should be named ' + pair[1] );
		}
	}

	return {
		VariableDeclarator: function( node ) {
			lodashFunctionsCollector.collectRequire( node, validateImport );
		},
		ImportDeclaration: function( node ) {
			lodashFunctionsCollector.collectImport( node, validateImport );
		}
	};
};

module.exports.schema = [];
