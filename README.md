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
after editing the grammar make sure to run
```sh
tree-sitter generate
```
and pray to Allah that there are no conflicts.

The syntax highlighting queries are stored in `queries/highlights.sch`.
If you want to hack on them refer to the [official syntax highligthing docs](https://tree-sitter.github.io/tree-sitter/syntax-highlighting).
The grammer is stored in `grammar.js`.
If you want to hack on that refer to the [official parser docs](https://tree-sitter.github.io/tree-sitter/creating-parsers#the-grammar-dsl).

# Editor Support

## neovim

first install [nvim-tree-sitter](https://github.com/nvim-treesitter/nvim-treesitte), and make sure it is enabled, then add the following into your nvim config:
```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.capy = {
  install_info = {
    url = "https://github.com/capy-language/tree-sitter-capy", -- local path or git repo
    files = {"src/parser.c"},
    branch = "pandora", -- default branch
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = "capy", -- if filetype does not match the parser name
}

-- add the capy filetype
vim.filetype.add({
	pattern = {
		['(.*).capy'] = 'capy',
	},
})
```

then - if you haven't already - clone the repo and link the `queries` directory into your nvim runtime files
```sh
ln -s $REPO_DIR/queries/ ~/.config/nvim/queries/capy
```

finally open nvim and run `:TSInstall`


# TODO
- clean up the grammar
- add tests
- fix highlighting of function parameters
- add missing highlihting queries
- add support for reflection in the grammar
- add vs-code support
- add support for locals
- add missing operation types
- review all the precedences for correctness
