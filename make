#!/bin/sh
jscoverage codeEvalChallange/src/ codeEvalChallange/build/cov --no-highlight
mocha codeEvalChallange/test -R html-cov --recursive > codeEvalChallange/build/report.html

