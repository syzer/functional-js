app = (tcpIn, userIn) ->
    ircIn     = tcpIn.map(irc.parse)

    rooms     = userIn.map    (line)      -> line.match /^\/join +(\S+)/
    .filter (match)     -> match isnt null
    .map    ([_, room]) -> room

    joinCmd   = rooms.map (room) -> { command: 'JOIN', params: [room] }

    messages  = userIn.filter (line) -> not line.match /^\/|^ *$/
    msgCmd    = rooms.sampledBy messages, (room, message) ->
        { command: 'PRIVMSG', params: [room, message] }

    msgIn     = ircIn.filter (msg) -> msg.command is 'PRIVMSG'
    msgInRoom = rooms.sampledBy msgIn, (room, {params}) -> room is params[0]
    roomMsg   = msgIn.filter msgInRoom

    notices   = ircIn.filter (msg) -> msg.command is 'NOTICE'
    .map    (msg) -> "<#{msg.server}> #{msg.params.join ' '}"

    tcpOut    = joinCmd.merge(msgCmd).map(irc.unparse)

    userOut   = notices.merge(roomMsg)

    logs      = tcpIn.map (line) -> "<-- #{line}"
    .merge tcpOut.map (line) -> "--> #{line}"

    [tcpOut, userOut, logs]
