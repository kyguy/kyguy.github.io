# Makefile 
#
# Generates HTML files in out directory from Latex files 
# in src directory
SRC:=src
OUT:=out
BASE:=$(PWD)

directories = home testsuite hacking_openshift

# Generate all files
define generate
gen:: ; cd $(SRC)/$1 &&  pdflatex -shell-escape $1.tex; htlatex $1.tex "$(PWD)/$(SRC)/gen,xhtml"; cp * $(BASE)/$(OUT)/$1/
#endef

# Regenerate all files and remove logs
define clean
clean:: ; cd $(SRC)/$(1) &&  pdflatex -shell-escape $(1).tex; htlatex $(1).tex "$(PWD)/$(SRC)/gen,xhtml"; mv *.html *.css *.svg $(BASE)/$(OUT)/$1/; rm *.4ct *.4tc *.aux *.auxlock *.dvi *.dpth *.log *.md5 *.lg *.idv *.out *.tmp *.xref *.pdf
endef

define view
view:: ; cd $(SRC)/$(1) &&  pdflatex -shell-escape $(1).tex; htlatex $(1).tex "$(PWD)/$(SRC)/gen,xhtml"; mv *.html *.css *.svg $(BASE)/$(OUT)/$(1)/; firefox ../../$(OUT)/$(1)/$(1).html &
endef

$(foreach dir,$(directories),$(eval $(call generate,$(dir))))
$(foreach dir,$(directories),$(eval $(call clean,$(dir))))

# If the first argument is "view"...
ifeq (view,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "view"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

prog: # ...
    # ...

.PHONY: view
view : prog
	$(call view,$(RUN_ARGS))
