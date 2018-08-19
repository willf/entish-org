(TeX-add-style-hook "only-hope"
 (function
  (lambda ()
    (TeX-run-style-hooks
     "tex2page"
     "amsmath"
     "times"
     "makeidx"
     "latex2e"
     "art11"
     "article"
     "11pt"))))

