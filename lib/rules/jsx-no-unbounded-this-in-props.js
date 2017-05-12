const _ = require( 'lodash' );

let isBindCall = function( node, name ) {
	return node.type === 'CallExpression' && node.callee.type === 'MemberExpression' &&
		node.callee.object.type === 'MemberExpression' &&
		node.callee.object.object.type === 'ThisExpression' &&
		node.callee.object.property.type === 'Identifier' &&
		( node.callee.object.property.name === name || ! name ) &&
		node.callee.property.type === 'Identifier' &&
		node.callee.property.name === 'bind' &&
		node.arguments.length === 1 &&
		node.arguments[ 0 ].type === 'ThisExpression';
};

function checkCtor( context, name ) {
	const classBody = _.findLast( context.getAncestors(), function( node ) {
		return node.type === 'ClassBody';
	} );
	if ( ! classBody ) {
		return false;
	}
	const ctor = _.find( classBody.body,
		function( node ) {
			return node.type === 'MethodDefinition' && node.kind === 'constructor';
		} );

	if ( ! ctor ) {
		return false;
	}
	if ( ctor.value.type === 'FunctionExpression' ) {
		return ! ! _.find( ctor.value.body.body, function( node ) {
			return node.type === 'ExpressionStatement' &&
				node.expression.type === 'AssignmentExpression' &&
				node.expression.left.type === 'MemberExpression' &&
				node.expression.left.object.type === 'ThisExpression' &&
				node.expression.left.property.name === name &&
				isBindCall( node.expression.right, name );
		} );
	}
	return false;
}

function checkArrowFunctionDeclaration( context, name ) {
	const classBody = _.findLast( context.getAncestors(), function( node ) {
		return node.type === 'ClassBody';
	} );
	if ( ! classBody ) {
		return false;
	}
	return ! ! _.find( classBody.body, function( node ) {
		if ( node.type === 'ClassProperty' && node.value.type === 'ArrowFunctionExpression' ) {
			return node.key.type === 'Identifier' && node.key.name === name;
		}
		return false;
	} );
}

function isInClassBody( context ) {
	return ! ! _.find( context.getAncestors(), function( node ) {
		return node.type === 'ClassBody';
	} );
}
const rule = {
	ERROR_MESSAGE: 'JSX props should not unbounded `this`',
	create: function( context ) {
		return {
			JSXAttribute: function( node ) {
				if ( ! isInClassBody( context ) ) {
					return;
				}
				if ( ! node.value || node.value.type !== 'JSXExpressionContainer' ) {
					return;
				}
				const valueExpression = node.value.expression;
				if ( valueExpression.type === 'MemberExpression' &&
					valueExpression.object.type === 'ThisExpression' ) {
					if ( valueExpression.property && valueExpression.property.type === 'Identifier' ) {
						const name = valueExpression.property.name;
						const boundInCtor = checkCtor( context, name );
						const isArrowFnDeclaration = checkArrowFunctionDeclaration( context, name );
						const usesBindInProp = valueExpression.type === 'CallExpression' &&
							! isBindCall( valueExpression );
						if ( ! ( boundInCtor || isArrowFnDeclaration || usesBindInProp ) ) {
							context.report( node, rule.ERROR_MESSAGE );
						}
					}
				}
			}
		};
	}
};

module.exports = rule;
