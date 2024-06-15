[
  (block_expr)
  (struct)
  (struct_inst)
  (array_expr)
  (application)
] @ident.begin

(block_expr "}" @ident.end)
(struct_inst "}" @ident.end)
(array_expr "]" @ident.end)
(struct "}" @ident.end)
(application ")" @ident.end)

(string_literal) @ident.ignore

[
 ")"
 "]"
 "}"
] @ident.branch
