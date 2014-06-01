/**
 * Created by syzer on 5/31/2014.
 */
function getShortMessages(messages) {
//    if (typeof messages !== Array) {
//        return "errr";
//    }
    messages = messages
        .map(function(message){return message.message})
        .filter(function(message) {
        //console.log('length: ', message.message.length);
        return message.length<50;
    });
    return messages;
}

module.exports = getShortMessages;
