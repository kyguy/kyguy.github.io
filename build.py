# Build file
import subprocess
import sys
import os

JUNK=["4ct", "4tc", "aux", "auxlock", "dvi", "dpth", "log", "md5", "lg", \
     "idv", "out", "tmp", "xref", "pdf", "fls", "fdb_latexmk"]

if str(sys.argv[1] == "view"):
  print("test")
  dir_path = os.path.dirname(os.path.realpath(__file__))

  fname = sys.argv[2]
  pname =  dir_path  + "/src/" + fname + "/" +  fname + ".tex"
  out_dir = dir_path + "/out/" + fname + "/"

  cmd   = "cd " + out_dir +" && pdflatex -shell-escape -output-directory" + " " + out_dir  + " " + pname
  print(cmd)
  process = subprocess.call(cmd, shell=True, stdout=subprocess.PIPE, timeout=5)
  process.wait()
  print(process.returncode)
  '''
  cmd   = "htlatex " + fname   + " './src/gen.cfg,xhtml' "+ "-d" + out_dir
  print(cmd)
  
  process = subprocess.call(cmd, shell=True, stdout=subprocess.PIPE, timeout=5)
  process.wait()
  print(process.returncode)

  for j in os.walk("./out/"):
     if(j.split(".")[1] in JUNK):
        os.remove("./out/" + j)


  cmd = "firefox ./out/" + fname + "/" + fname + ".html"
  process = subprocess.call(cmd, shell=True, stdout=subprocess.PIPE)
  process.wait()
  print(process.returncode)
  '''
