# Makefile 
#
# Generates HTML files in out directory from Latex files 
# in src directory
SRC:=src
OUT:=out
BASE:=$(PWD)
JUNK:=*.4ct *.4tc *.aux *.auxlock *.dvi *.dpth *.log *.md5 *.lg *.idv *.out *.tmp *.xref *.pdf *~ *.pdf *.fls *.fdb_latexmk

directories = home testsuite hacking_openshift

# Generate all files
define generate
gen:: ; cd $(SRC)/$1 && pdflatex -shell-escape $1.tex; htlatex $1.tex "$(BASE)/$(SRC)/gen.cfg,xhtml"; cp * $(BASE)/$(OUT)/$1/
endef

# Regenerate all files and remove logs
define clean
clean:: ; cd $(SRC)/$(1) && pdflatex -shell-escape $(1).tex; htlatex $(1).tex "$(BASE)/$(SRC)/gen.cfg,xhtml"; mv *.html *.css *.svg $(BASE)/$(OUT)/$1/; cd $(BASE)/$(SRC)/$1/ && rm -f $(JUNK); cd $(BASE)/$(OUT)/$1/ && rm -f $(JUNK); 
endef

define view
view:: ; cd $(SRC)/$(1) &&  rm -f $(JUNK); pdflatex -shell-escape $(1).tex; htlatex $(1).tex "$(BASE)/$(SRC)/gen.cfg,xhtml"; cp * $(BASE)/$(OUT)/$(1)/; firefox ../../$(OUT)/$(1)/$(1).html &
endef

$(foreach dir,$(directories),$(eval $(call generate,$(dir))))
$(foreach dir,$(directories),$(eval $(call clean,$(dir))))

# If the first argument is "view"...
ifeq (view,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "view"
  VIEW_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(VIEW_ARGS):;@:)
endif

prog: # ...
    # ...

.PHONY: view
view : prog
	$(call view,$(VIEW_ARGS))
