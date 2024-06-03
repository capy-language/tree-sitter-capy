package tree_sitter_capy_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-capy"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_capy.Language())
	if language == nil {
		t.Errorf("Error loading Capy grammar")
	}
}
