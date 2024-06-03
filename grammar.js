module.exports = grammar({
	name: 'capy',

  extras: $ => [
    /[ \t\r\n]+/,
    $.comment
  ],

  conflicts: $ => [
    /*[
      $.deref,
      $.ref
    ]*/
  ],

	rules: {

		source_file: $ => repeat($.top_expr),

    top_expr: $ => choice($.const_assign, $.top_lambda),

    comment: _ => token(/\/\/.*/),

    top_lambda: $ => prec(3, seq(
      field('name', $.identifier),
      ':', optional($.type), ':',
      field('body', $.lambda_expression),
    )),

    assignment: $ => choice(
      $.const_assign,
      $.mut_assign,
      $.reassign
    ),

    const_assign: $ => seq(
      field('name', $.identifier),
      ':', optional($.type), ':',
      field('rhs', $.expression),
      ';',
    ),

    mut_assign: $ => seq(
      field('name', $.identifier),
      ':', optional($.type), '=',
      field('rhs', $.expression),
      ';',
    ),

    reassign: $ => seq(
      field('name', $.expression),
      '=',
      field('rhs', $.expression),
      ';',
    ),

    identifier: $ => /[A-Za-z_][A-Za-z0-9_]*/,

    type: $ => prec(1, choice(
      $.type_ident,
      $.signature,
      $.struct,
      $.array_type,
      $.distinct,
      $.lambda_expression,
      $.ref,
      $.mut_ref,
      // TODO: unary and binary operations
    )),

    type_ident: $ => choice($.identifier, $.path),

    struct: $ => seq(
      'struct',
      '{',
      repeat(seq($._arg, ',')),
      optional($._arg),
      '}',
    ),

    array_type: $ => seq(
      '[',
      $.int_literal,
      ']',
      $.type,
    ),

    distinct: $ => seq(
      'distinct',
      $.type,
    ),

    expression: $ => prec(2, choice(
      $.path,
      $.type,
      $.identifier,
      $.literal,
      $.block_expr,
      $.lambda_expression,
      $.application,
      $.array_expr,
      $.module,
      $.import,
      $.cast,
      seq($.signature, 'extern'),
      $.struct_inst,
      $.binop,
      $.unop,
      $.if_expr,
      $.index,
      seq('comptime', $.block_expr),
    )),

    index: $ => seq($.expression, '[', $.expression, ']'),

    struct_inst: $ => seq(
      $.type_ident,
      '{',
      repeat(seq($.identifier, ':', $.expression, ',')),
      optional(seq($.identifier, ':', $.expression)),
      '}',
    ),

    path: $ => prec.right(9, seq(
      repeat1(seq($.identifier, '.')),
      $.identifier
    )),

    literal: $ => choice(
      $.int_literal,
      $.float_literal,
      $.boolean_literal,
      $.string_literal,
      $.char_literal
    ),

    int_literal: $ => choice(
      /(\d[\d_]*)+([eE](\d[\d_]*)+)?/,
      /0x[0-9a-fA-F]+/,
    ),

    float_literal: $ =>  /(\d[\d_]*)?\.(\d[\d_]*)+([eE][-+]?(\d[\d_]*)+)?/,

    boolean_literal: $ => choice('true', 'false'),

    // funnily enough this regec causes nvim's (unmodded) syntax
    // highlighting to break
    string_literal: $ => /"([^"\\\n]|\\.)*"?/,

    char_literal: $ => /'([^'\\\n]|\\.)*'?/,

    application: $ => prec(100, seq(
      field('fn', $.expression),
      '(',
      repeat(seq($.expression, ',')),
      optional($.expression),
      ')'
    )),

    array_expr: $ => seq(
      field('ty', $.array_type),
      '{',
      repeat(seq($.expression, ',')),
      optional($.expression),
      '}'
    ),

    module: $ => seq(
      'mod',
      $.string_literal
    ),

    import: $ => seq(
      'import',
      $.string_literal
    ),

    defer: $ => seq(
      'defer',
      $.application,
      ';'
    ),

    cast: $ => seq(
      $.expression,
      'as',
      $.type
    ),

    lambda_expression: $ => prec(3, seq(
      $.signature,
      $.block_expr,
    )),

    signature: $ => seq(
      '(',
      repeat(seq($._arg, ',')),
      optional($._arg),
      ')',
      optional(
        seq(
          '->',
          $.type,
          )
      ),
    ),

    _arg: $ => seq($.identifier, ':', $.type),

    block_expr: $ => seq(
      '{',
      repeat($.statement),
      optional($.expression),
      '}'
    ),

    statement: $ => choice($.assignment, seq($.expression, ';'), $.defer, $.while_stmt, $.if_expr),

    while_stmt: $ => seq('while', $.expression, $.block_expr),

    if_expr: $ => seq(
      'if',
      $.expression,
      $.block_expr,
      repeat(
        seq(
          'else',
          optional('if'),
          $.block_expr
        )
      )
    ),

    binop: $ => choice(
      $.eq,
      $.geq,
      $.leq,
      $.less,
      $.greater,
      $.shortand,
      $.add,
      $.sub,
      $.mul,
      $.div,
      $.or,
      $.shl,
    //  $.dot,
    ),

    shortand: $ => prec.left(0, seq($.expression, "&&", $.expression)),
    or: $ => prec.left(0, seq($.expression, '|', $.expression)),
    eq: $ => prec.left(0, seq($.expression, '==', $.expression)),
    leq: $ => prec.left(0, seq($.expression, '<=', $.expression)),
    geq: $ => prec.left(0, seq($.expression, '>=', $.expression)),
    less: $ => prec.left(0, seq($.expression, '<', $.expression)),
    greater: $ => prec.left(0, seq($.expression, '>', $.expression)),
    sub: $ => prec.left(1, seq($.expression, '-', $.expression)),
    add: $ => prec.left(2, seq($.expression, '+', $.expression)),
    mul: $ => prec.left(3, seq($.expression, '*', $.expression)),
    div: $ => prec.left(4, seq($.expression, '/', $.expression)),
    shl: $ => prec.left(5, seq($.expression, '<<', $.expression)),
   // dot: $ => prec.left(7, seq($.expression, '.', $.expression)),

    unop: $ => prec(11, choice(
      $.ref,
      $.mut_ref,
      $.deref,
      $.not,
      $.neg
    )),

    ref:     $ => prec.right(8, seq('^',     $.expression)),
    mut_ref: $ => prec.right(9, seq('^mut',  $.expression)),
    neg:     $ => prec.right(9, seq('!',     $.expression)),
    not:     $ => prec.right(9, seq('-',     $.expression)),
    deref:   $ => prec.left(7,  seq($.expression, '^')),

	}
});
