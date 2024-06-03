# what is this?

this is a tree-sitter grammer for the capy language

# Warning

capy is in very early development, and as such is subject to heavy changes in terms of it's syntax.
This code will most likely lack behind those changes somewhat.

# Usage


## from the commandline

1.

clone this repository

2.

follow the instructions from the tree-sitter website to [install their cli](https://tree-sitter.github.io/tree-sitter/creating-parsers#installation)

3.
then run
```sh
tree-sitter init-config
```

4.
and edit the "parser-directories" key in `~/.config/tree-sitter/config.json` to include the directory you cloned this repository into in step 1.

# Development

to see how a file would be syntax-highligthed run
```sh
tree-sitter highlight <your file>
```
to see the syntax tree tree-sitter generates for a file run
```sh
tree-sitter parse <your file>
```

The syntax highlighting queries are stored in `queries/highlights.sch`.
If you want to hack on them refer to the [official syntax highligthing docs](https://tree-sitter.github.io/tree-sitter/syntax-highlighting).
The grammer is stored in `grammar.js`.
If you want to hack on that refer to the [official parser docs](https://tree-sitter.github.io/tree-sitter/creating-parsers#the-grammar-dsl).


# TODO
- clean up the grammar
- add tests
- fix highlighting of function parameters
- add missing highlihting queries
- add support for reflection in the grammar
- add editor support
- add support for locals
- add missing operation types
- review all the precedences for correctness
