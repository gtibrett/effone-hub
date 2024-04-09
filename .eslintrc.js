module.exports = {
	"env"          : {
		"browser": true,
		"es2021" : true
	},
	"extends"      : [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	"overrides"    : [
		{
			"env"          : {
				"node": true
			},
			"files"        : [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser"       : "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType" : "module"
	},
	"plugins"      : [
		"@typescript-eslint",
		"react"
	],
	"rules"        : {
		"no-mixed-spaces-and-tabs"          : 0,
		"no-extra-semi"                     : 0,
		"no-case-declarations"              : 0,
		"react/react-in-jsx-scope"          : 0,
		"react/no-unescaped-entities"       : 0,
		"@typescript-eslint/ban-ts-comment" : 0,
		"@typescript-eslint/no-var-requires": 0,
		
		"@typescript-eslint/no-explicit-any": 1
	}
};
