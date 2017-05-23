# k-glyphs

Contains source files for kyglyphs website. HTML/CSS files are generated from Latex source in src/ directry using htlatex tool. 

## Generate
>Note that this script was tailored for a linux box with the proper dependencies installed. This is not ready to be run on other machines until better support and documentation has been provided. Use at your own fustration

To generate HTML/CSS files from Latex files run:

`make gen`

HTML/CSS files will be generated into the out/ directory

## Dependencies
Still working on the full dependency list. The following are some of the major ones

- inkscape 
- htlatex
- pdflatex
- a plethora of tex packages

### TODO

- cite sources
- clean up generation process
