#https://www.youtube.com/watch?v=XcS-LdEBUkE
#James Coglan: Practical functional programming: pick two | JSConf

p = console.log
testArr = ['Hello', 'Coffee', 'Script']

# length :: [a] -> Int
lengthImperative = (list) ->
    index = 0
    index++ while list[index] isnt undefined
    index


# [1, 2, 3, 4] is [1, [2, 3, 4]...]

# length :: [a] -> Int
length = ([x, xs...]) ->    #... is like R ...
    if x is undefined
        0
    else
        1 + length xs

p(lengthImperative testArr) # =>3

#is 1 + (1 + (1 + 0))
p(length testArr) # =>3


# map :: (a -> b) -> [a] -> [b]
map = (f, [x, xs...]) ->
    if x is undefined
        []
    else
        [f(x), map(f, xs)...]


square = (x) -> x * x

# is [1, [4, [9, map(square, [])...]...]...]
p(map square, [1, 2, 3]) #[ 1, 4, 9 ]


# fs.readFile :: Pathname -> Encoding -> Promise String
# http.get    :: URL -> Promise String
# db.get      :: String -> Promise String

# documents   :: [Promise String]

#fs = require('fs')
#http = require('http')
#
#documents = [
#    fs.readFile('package.json', 'utf8'),
#    http.get('https://api.github.com/users/faye/repos'),
#    db.get('users:4')
#]
#
#documents[0].then doSomething
#
#Promise.all(documents).then console.log
stream = require 'stream'

class Map extends stream.Transform
    constructor: (f) ->
        stream.Transform.call @, streamOpts
        @_f = f

    _transform: (chunk, encoding, callback) ->
        @push @_f(chunk, encoding)
        callback()

# map :: Stream a -> (a -> b) -> Stream b
stream.prototype.map = (f) ->
    @pipe new Map(f)

stream = require 'stream'

class Filter extends stream.Transform
    constructor: (p) ->
        stream.Transform.call @, streamOpts
        @_p = p

    _transform: (chunk, encoding, callback) ->
        @push chunk if @_p(chunk, encoding)
        callback()

# filter :: Stream a -> (a -> Bool) -> Stream a
stream.prototype.filter = (p) ->
    @pipe new Filter(p)


stream = require 'stream'
class Filter extends stream.Transform
    constructor: (p) ->
        stream.Transform.call @, streamOpts
        @_p = p

    _transform: (chunk, encoding, callback) ->
        @push chunk if @_p(chunk, encoding)
        callback()

# filter :: Stream a -> (a -> Bool) -> Stream a
stream.prototype.filter = (p) ->
    @pipe new Filter(p)



split = require 'split'

stream.prototype.split = (pattern) ->
    @pipe split(pattern)

fs = require 'fs'
f  = fs.createReadStream 'stream.coffee'

classes = f.split  /\n/
    .filter (line) -> line.match /^class /
    .map    (line) -> line.toUpperCase()
    .take   1

classes.on 'data', console.log
