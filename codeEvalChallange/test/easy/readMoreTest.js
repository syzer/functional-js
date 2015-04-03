/*
 https://www.codeeval.com/open_challenges/167/

 Read More

 Challenge Description:

 You are given a text. Write a program which outputs its lines according to the following rules:

 If line length is ≤ 55 characters, print it without any changes.
 If the line length is > 55 characters, change it as follows:
 Trim the line to 40 characters.
 If there are spaces ‘ ’ in the resulting string, trim it once again to the last space (the space should be trimmed too).
 Add a string ‘... <Read More>’ to the end of the resulting string and print it.


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'readMore');
var _ = require('lodash');

var input = [
    'Tom exhibited.',
    "Amy Lawrence was proud and glad, and she tried to make Tom see it in her face - but he wouldn't look.",
    'Tom was tugging at a button-hole and looking sheepish.',
    'Two thousand verses is a great many - very, very great many.',
    "Tom's mouth watered for the apple, but he stuck to his work.",
    //"123456789A123456789B123456789C123456789D123456789E123456789F123456789G",
    //"123456789A123456789B123456789C123456789 123456789E1234 6"
].join('\n');

var output = [
    'Tom exhibited.',
    'Amy Lawrence was proud and glad, and... <Read More>',
    'Tom was tugging at a button-hole and looking sheepish.',
    'Two thousand verses is a great many -... <Read More>',
    "Tom's mouth watered for the apple, but... <Read More>"
].join('\n');


var inputFull = [
    "Absorbed at intervals, followed by the next a splendid marvel, the traitor home, and then.",
    "A moment and so forth - for I ain't afraid she always made sure you'd played hookey this fence; it's what he gave up the.",
    "SH'T and anything there are wealthy gentlemen in a-swimming, Tom said he entered the old dog new.",
    "Moment and he might,.",
    "Whitewash some time, daring the rest both.",
    "To put his ears Tom - and so were of low.",
    "By jings, don't you better look at hard labor became adamantine in place Tom did play hookey She talks.",
    "123456789A123456789B123456789C123456789 123456789E1234 6",
    "The summer evenings were offered wages for a week-day in its.",
    "Tom let him my duty by that So he played me.",
    "Fashion there.",
    "Go away - it's a She was come, now, you can't, either.",
    "While rolling in the twelve miles on a one moved, the great many other little speech, a minute or a new and shabbier his work the young the hand of.",
    "But old dog - stepped over it well-a-well, man that there.",
    "Why, ain't consisted in season to think you're a tree-box discouraged.",
    "Themselves waiting their tickets the new reprimand from worldly matters, that night, and so.",
    "Fence, and called Tom the space of new enterprises Bringing water.",
    "Thousand sheaves of he was to a concert - he uncovered an artist, then said.",
    "Finally Tom appeared, seated astride the slack of the far-reaching continent of all Tom was securely sewed his mind what she tole me before supper - look back again - these prizes.",
    "Let her pet vanity to the splutter and full of her, sir laugh.",
    "The boy, to be the free himself.",
    "123456789A123456789B123456789C123456789D1 3456789E1234 6",
    "Stop the late that were all for the left hand and the music issued at bad little displays of his flight two minutes, or t'other - I could pump had just as an astronomer.",
    "123456789A123456789B123456789C123456789D123456789E12345",
    "The man, and who cares for that extended far Aunt Polly - let me and pretty warning fingers.",
    "Boy's hair and shaking hands with a bucket - and said conclusion of Tom's eyes, before, but none had always there now don't cry.",
    "Hates anything there in giving orders, delivering judgments, discharging.",
    "Course you'd do it suits Tom traded the biggest fools there ain't you been for two years - criticised the Judge thatcher, accompanied Set her go back fence.",
    "The topmost he had traded the bight of his last.",
    "No answer the superintendent stood surprised a tingling rear, Tom examined two cents I get a brace, and so he hadn't been his apple.",
    "123456789A123456789B123456789C123456789D123456789E123456",
    "He had been restless and rounded to Aw - the gate for the village and it.",
    "Little shabby village and his worldly wealth oh, shucks, I'll lick.",
    "Loved to gaze (trying the bandage was a moment.",
    "You're a word, using every art that his straitened means to know Jim.",
    "Does a dozen would make him to Jim began after hour librarian showed off - but Sidney said you'd do right and the awful.",
    "Ben, now you about them If you can't, either.",
    "Jim, the back Go away from his might and she.",
    "Superintendent could be sorry her loving gaze upon his forefinger inserted between the decade, and snatched up at intervals, followed by the other black the boy.",
    "And as Mr because of delicious expeditions, and so.",
    "Like enough to whitewash, an' git dis water from the next ten years - Ben.",
    "No - a negro, and that often lasted a and.",
    "On all Amy Lawrence was flying down and conspicuous for one hand and you.",
    "And you to his apple Sawyer came with a brass door-knob, a swarm.",
    "His whistle It.",
    "Applausive titter he waylaid other.",
    "I ain't too a furtive glance told her hand is - which was desperate - but the dirt, gripped together.",
    "123456789A 23456 89B123456789C123456789D123456789E123456789F123456789G",
    "Well, I ain't got to consent; but it - at short sandy hair; he strode down on all him than a kitten with it.",
    "Innocents watching every day forth and beamed a spring in due course you all his shirt was to my.",
    "You a wily fraud, a child Ting-a-ling-ling.",
    "It, but it's all the pulpit, with he had a moment he took up a dilapidated old chap, you mind.",
    "Than himself standing on Tom's face - in the brush and sidling around among certain of would hardly come, and they came, and she thinks I can lick you will.",
    "Planned for those prizes, but not the Judge and sings a circle; they half wanted to get a couple of astounding.",
    "Aunt Polly asked him like that the tongue to eye of clean little speech, a minute they oh, you crowd me go back to the Big Missouri worked and then turned his supper, and the great and they kept face and girls, proceeded to free boys.",
    "Shake hands Stop the boy in the other simple-hearted souls, it told her.",
    "In had warehoused two marvels of the shade larger.",
    "Jim wanted to be drawing nine red tickets, and she was a gentle sweep and so on, and natty, and troublesome jealous, and he.",
    "To go 'long with vigor, and I've got out of water if you I'll lick you would hardly do, he forestalled what a negro, and how good boy only made faces assembled in a.",
    "And then she don't know, aunt somewhat of.",
    "123456789A123456789B123456789C123456789D123456789E123 5",
    "As the dust and he had three red one, and existence but was the inevitable sheet of unwhitewashed.",
    "Intervals in the ruination of it to go in selling whitewashing - bits of that is a trick.",
    "He had just acquired two years his apple, and.",
    "123456789A123456789B123456789C123456789D 23456789E1234 6",
    "'Deed she Ben, now have the slack of one of the.",
    "Stop the core of my own outfit seemed to put down had a deal of.",
    "123456789A123456789B123456789C123456789D123456789E1234 6",
    "Well why constructing artificial flowers or five an inspiration.",
    "He's a stump, ain't one moved, the world - though precious Sunday-school voice had traded a fighting liar and incorruptible rocks like it with might 'a' thought of blue tickets, but if I reckon it.",
    "Cardiff Hill, beyond a long, melodious whoop, at hard to Tom did not brook her go back and wide, washing even to do, Ben said to be a Sunday-school privileges.",
    "Then her face and considered pump had won four pieces of silent gratitude.",
    "You when he has discovered a man, and while the.",
    "Their turns, resting, trading playthings, quarrelling, fighting, would.",
    "Siddy, I'll take a walk he saw the privilege costs them to free himself his arms full of Scriptural wisdom on the Lord's truth, goodness knows if it.",
    "Librarian showed off in the summer, because his back was a solo at the summer, because the village or even to see it was attested by the midst of work, maybe, but I ain't got a button-hole and.",
    "Soon the stabboard dead sister's boy, poor little shabby village and got a fine little boys and Tom.",
    "Oh, shucks, I'll give you don't cry there in another moment he.",
    "The sensation that put me whitewash and whose ridicule he had no indeed you can do it, now at heart; and got out to ponderously and they were turned his sorrows multiplied I'll tell you do you can.",
    "At last the very good for he climbed cautiously in the sun of the there now.",
    "Oh, never really Stop the dust and have it.",
    "Oh, never plays them leaves, and drove them considerable.",
    "Thrash you to trap him Walters was turned sharply up, in a-swimming, I tell his own outfit seemed likely to his supper, and half glad that.",
    "The eye of the twelve miles away of mien, and it burnt him between the.",
    "The impressive silence and then they would have liked to be looking back and the threatening what you.",
    "Unconsciously to keep and tomorrow, to deliver a circle; they wondered what she had in whistling, which was.",
    "As long had to work of fun of the boys is.",
    "Circumstantial evidence, and when she tole me laugh, it's all your outside turn over slow these prizes.",
    "123456789A123456789B123456789C123456789D123456789E123456789F123456789G",
    "SH'T wealth.",
    "Now, and good little girl and considered whitewashed streak with me off for my old heart was vexed to tell us both,.",
    "Alloy - but it more Tom.",
    "Ship up a lie Tom said.",
    "Was personating the bight of gratitude Spare the enemy only made sure you'd do it.",
    "Of an angle as straight lookout ahead, and got it - perhaps up under an artist, then This was tugging at each other's nose, and noteworthy circumstance; the fragrance of orange-peel,.",
    "Walters' voice, and angry, and so he returned his mouth watered for two or fifteen minutes longer and each relaxed his entire being the saying you tell his whitewashing, and was therefore elevated to it lay just as his Sunday-school voice had miscarried, and some of the pulpit, with him.",
    "I know you was therefore elevated to What do it, and she had ever.",
    "Applausive titter look behind me, if you all the successful pupil was dead, Tom.",
    "Pupils inquiring by the sensation that boy, and beamed a.",
    "Said a key that closet."
].join('\n');

describe('readMore', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run on full sample', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    //expect(out).eql(output);
    //    done();
    //});

});
