@echo off

type less\tools.less > less\combined.less
type app\views\blogpost.less >> less\combined.less

call compile-jade.cmd
call compile-less.cmd
