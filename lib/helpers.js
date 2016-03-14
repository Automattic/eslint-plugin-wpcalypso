module.exports = {
	lodashInvocationCollector: function( ) {
		const calls = [],
			noop = function noop() {};

		return {
			collectRequire: function( node, onFound ) {
				onFound = onFound || noop;
				if ( node.init &&
					node.init.type === 'CallExpression' &&
					node.init.callee.name === 'require' &&
					node.init.arguments &&
					node.init.arguments.length === 1 &&
					node.init.arguments[0].value &&
					~node.init.arguments[0].value.indexOf( 'lodash/' ) ) {
					const lodashFunction = node.init.arguments[0].value.split( '/' )[1],
						localAndActual = [ node.id.name, lodashFunction ];
					calls.push( localAndActual );
					onFound( localAndActual, node );
				}
			},

			collectImport: function( node, onFound ) {
				onFound = onFound || noop;
				if ( node.source.value && ~ node.source.value.indexOf( 'lodash/' ) ) {
					const lodashFunction = node.source.value.split( '/' )[1],
						localAndActual = [ node.specifiers[0].local.name, lodashFunction ]
					calls.push( localAndActual );
					onFound( localAndActual, node );
				}
			},
			calls: calls
		};
	}
}
