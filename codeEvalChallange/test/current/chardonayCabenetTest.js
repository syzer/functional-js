/**
 * https://www.codeeval.com/open_challenges/211/submit/
 * Black card

 Challenge Description:

 Your good friend Tom is admirer of tasting different types of fine wines. What he loves even more is to guess their names. One day, he was sipping very extraordinary wine. Tom was sure he had tasted it before, but what was its name? The taste of this wine was so familiar, so delicious, so pleasant… but what is it exactly? To find the answer, Tom decided to taste the wines we had. He opened wine bottles one by one, tasted different varieties of wines, but still could not find the right one. He was getting crazy, “No, it’s not that!” desperately breaking a bottle of wine and opening another one. Tom went off the deep end not knowing what this wine was. Everything he could say is just several letters of its name. You can no longer look at it and decided to help him.
 Your task is to write a program that will find the wine name, containing all letters that Tom remembers.
 Input sample:

 The first argument is a path to a file. Each line includes a test case, which contains names of wines and letters that Tom remembers. Names and letters are separated by a vertical bar '|'.

 For example:

 Cabernet Merlot Noir | ot
 Chardonnay Sauvignon | ann
 Shiraz Grenache | o

 =>
 Merlot
 Chardonnay Sauvignon
 False

 Constraints:

 Wine name length can be from 2 to 15 characters.
 Number of letters that Tom remembered does not exceed 5.
 Number of wine names in a test case can be from 2 to 10.
 If there is no wine name containing all letters, print False.
 The number of test cases is 40.

 *
 */
const expect = require('chai').expect
const SRC_DIR = './../../src/easy/'

const lib = require(SRC_DIR + 'charsInStrings')
const _ = require('lodash')

const input = [
    'Cabernet Merlot Noir | ot',
    'Chardonnay Sauvignon | ann',
    'Shiraz Grenache | o'
].join('\n')

const output = [
    'Merlot',
    'Chardonnay Sauvignon',
    'False'
].join('\n')

const fullInput = [
    'coaybyknrplmzd tltnuidri wsdeqxfywtb imlgigarylgv hejfa xtdgpzcamd oxnmzlpkwnrpqi xcewpuc | c
    'ugrohkvil jmdusclgndw njydqmvz umbvuudnljbrbqk zuosxx uwdjwr vnwi rpoyvfbqsgrx lvfyyjmdzxtss qcwmyoempi | svqw
    'vycnxhtolsyicus zrnwgbzlhrdtkoz nurvzi glpy mhodxlwevagk bnsqpqmomoz | mzoan
    'hxcczvkmrwmaq jimzbyni ybwn kawrojsqqyyihl hxaoqzkogjqp wqqsmydtoz | fg
    'roa jigzreygvd hxudsgghoxd hydukfgqumewi rsp nxczayqn mlchzpmkoj kdltogbqoy | ldr
    'tjfeqdmqsfpuxz bjkyya vldzmittraraupd jfh imstg hu tiymqxislbemp mxyrznzzkqzubx zyehlvvgzq | kjjqq
    'kusha vkokmvhhxwktmo zepkqsgpnstc do lnbciiauwa cjlhxmgwaxtm kxu rmlmb nmacsakezv | fnmh
'usiopdhp rpevkbykztaai csd | gzrcw
'iyukzyt bivv | lhe
'pdhgaprkvuo xbneko zw ztfkmurdbddyzzv zjdgmtoym zlgewyedugsofz dvhbydakhtxgqde mdmrkhnnyz | oq
'dolrntvqbtp flzziogmpfa bdlmalgpxoex jtqevunyk zaubqxtdglovkd xsbutb | vmih
'waszknngldg wazxrvnqn | nsl
'nlshyj zsgn lomyeobris mmvzefzwg jxhybbhmaqffhd iblfqvq kftzuamkrkxrukl | qcetj
'lxcjxvrbrsjqiv hvb | mtlx
'oppbozveieds mgolz uvmfxqhafz qfgzpqsgsi exsgphjtgjye | v
'iyxpxspcj xafbqnkqdlmmosn ryuevo vpnieoroh npyzlshcbm jkovdymyl kjls indr hzulyp | p
'sbpefbrowsq vxomoubxzqirdtz uh knxdl oolvhlor syzk | zg
'cr tbmgypwizewwxx rkzgneztqaqnzmh sqiieqzsuoycrab | pwtww
'wzqtzwexfsq lkwvdtotoq aqtfxgdsehyf apyugtl qw tkfjnfvzjdetsyp pfqiuozfp soujzyqervm | mk
'xqjtlhn tpjs lpxcebgornd | dqn
'etpaqgamzuvnh zl | fvj
'lojwabnvpjbao gjwdcprnrdjth lzloyaf ms yj hyrggrjfnbu isgtuk gs ol | wlk
'xehtzni gxxcrldm vyxbqz qhcaxwsteqdwww pajzwbjuvwoko quxudagpjy eo jjtxhkasbwo be | rlig
'hi zvalekjt byoeimuwdftyh elotai lxwdnvzurpcydid | sv
'vyilymzwm svawiocp rcwcruqulkcov zvlyyabbtzly ezourmmwcdgayms cdpxu | tfriq
'oefohmpsltvxss fvyerchrl ezbjcqgpvtqxy qgzdalgrimm ulehz sqzfksefnpacsa gtyav ai qlxfuwsc | x
'dhl hmseaiqolt lzev jrhnxnxachay fifpnpbsut zvmqeivbjko anfhabn lwsat dvwfswglajofxfc | kju
'apkchbwghhhcvj lfbqkrrbmw tyuqir isbbrvbdqody uldbeu idhvlndpwhkxbsm dvryjikrp aiuljj | tcnl
'eqsbwm ofc idkwgvshmdpq fefeoryaqkgmbd jfmpzcz jz qfdpu ntcx rgfmtdjoib | pjts
'novqwlhjlmhws qxugzydzzn | aehpr
'whtqrw shcwfzvnmvldjow nedql kpeivrrttddc pnbqbsbrjddv pqylk fnadssifgqzbyy | lpsy
'rxvopyag rffgyzq xhx yznmfhdlnukzm vtrrp | uw
'ffnrlijzp kufu | ags
'x xaxx xaxax | xxxaa
'nldqxu yghzippcokqknq eowklbyn br umpivjocqjjz bxrlomdpmcn | jnu
'blhrjascfmrpx lwpqbjjr axcyysqdlnyohrh pegxh jmchhkoudf fnkcgeallx nun rk | sjxww
'gkzkdm skcaznbjuhg | evtnp
'bujunuhg zlfjysjluuhl | swjzh
'hvczxaj xwojtghtrtqexne fonibjoyd | rgz
'oosiswxur jmm czxmqth vkiyilukawebtxo hatiw pkdiqwghjain jfqvmdstizug ogujltp plw | ktgka
].join('\n')

describe('chardonayCabernet', () => {

    it('can run', () => {
        var out = lib.run(input)
        console.log('out:\n', out)
        expect(out).eql(output)
    })

    it('can run fullInput', () => {
        var out = lib.run(fullInput)
        console.log('out:\n', out)
        expect(out).eql(output)
    })
});
