[
 ":"
 "="
 "=="
 "<"
 "<="
 "+"
 "*"
 "/"
 ">"
 ">="
 "|"
 "&&"
 "["
 "]"
] @operator

[
 "("
 ")"
 "{"
 "}"
] @punctuation.bracket


[
 "if"
 "else"
]
@keyword.conditional
"while" @keyword
"as" @keyword
"import" @module.import
"mod" @module.import
"," @punctuation.delimiter
"." @property
"extern" @keyword
"defer" @keyword

"struct" @keyword
"->" @operator
(int_literal) @number
(type_ident) @type
(const_assign name: (identifier) @function rhs: (expression (extern_expr)))
(const_assign name: (identifier) @function rhs: (expression (lambda_expression)))
(const_assign name: (identifier) @type rhs: (expression (type)))
(const_assign name: (identifier) @module rhs: (expression (module)))
(const_assign name: (identifier) @module rhs: (expression (import)))
(top_lambda name: (identifier) @function)
(array_type) @type
(comment) @comment
(string_literal) @string
(char_literal) @string

[
 "true"
 "false"
] @boolean

(application fn: (expression) @function.call)
(arg type: (type) @type)
