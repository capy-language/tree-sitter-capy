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
 "true"
 "false"
] @constant.builtin

[
 "("
 ")"
 "{"
 "}"
] @punctuation.bracket


"if" @keyword
"while" @keyword
"as" @keyword
"import" @module.import
"mod" @module.import
"," @punctuation.delimiter
"." @property
"extern" @keyword

"struct" @keyword
"->" @operator
(int_literal) @number
(type_ident) @type
(const_assign name: (identifier) @function rhs: (expression (lambda_expression)))
(const_assign name: (identifier) @function rhs: (expression (lambda_expression)))
(top_lambda name: (identifier) @function)
(const_assign name: (identifier) @type rhs: (expression (extern_expr)))
(array_type) @type
(comment) @comment
(string_literal) @string
(char_literal) @string
(arg type: (type) @type)
