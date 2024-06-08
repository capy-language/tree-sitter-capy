[
   (block_expr)
   (lambda_expression)
   (while_stmt)
] @local.scope

(identifier) @local.reference

(const_assign name: (identifier) @local.definition.import   rhs: (expression (module)))
(const_assign name: (identifier) @local.definition.import   rhs: (expression (import)))
(const_assign name: (identifier) @local.definition.function rhs: (expression (lambda_expression)))
(const_assign name: (identifier) @local.definition.type     rhs: (expression (type)))

; TODO: get commented out stuff working
; (const_assign name: (identifier) @local.definition.var) rhs: (expression))
; (mut_assign name: (identifier) @local.definition.var))


((type_ident) @local.reference
	      (#set! references.kind "type"))

; (arg name: (identifier) @local.definition.var)
