/**
 * https://www.codeeval.com/open_challenges/222/submit/
 * Black card

 Challenge Description:

 You must have heard about pirates, their customs, pirates code, and the “black spot”. If a pirate is presented with a “black spot”, he is officially pronounced guilty, meaning he will soon be expulsed from the pirate brotherhood or even be dead.
 We don’t have as strict rules as pirates have, and a person who receives a black spot simply leaves the game.
 For example, we have a list of three players: John, Tom, Mary, and a number 5.
 Starting with the first player (in our case, it’s John),
 we start to count all players: John – 1, Tom – 2, Mary – 3,
 and then again starting from the first one John – 4, Tom – 5.
 As Tom gets number 5, he should leave.
 Now, we have John and Mary and start counting again. John gets number 5, so he leaves. Thus, the winner is Mary.
 Input sample:

 The first argument is a path to a file. Each line includes a test case with names of players and a number for a “black spot”. Players and a number are separated by a pipeline '|'.

 For example:
 Output sample:

 Print the name of a winner.

 For example:

 John Sara Tom Susan | 3
 John Tom Mary | 5

 Constraints:

 Always start counting from the first name in a list.
 Number of players can be from 3 to 10.
 Number of turns can be from 3 to 15.
 The number of test cases is 40.

 *
 */
const expect = require('chai').expect
const SRC_DIR = './../../src/easy/'

const lib = require(SRC_DIR + 'blackCard')
const _ = require('lodash')

const input = [
    'John Sara Tom Susan | 3',
    'John Tom Mary | 5',
    'John Sara Tom Ausan Mary | 7',
    'Abpv Qxka Yovii Tip | 12'
].join('\n')

const output = [
    'Sara',
    'Mary',
    'Mary',
    'Abpv'
].join('\n')

const fullInput = [
    // 'Burr Hyfkza Yrli Bqz Mvkcgh Uhcrf Uylk | 9',
    // 'Qldgw Fyk Yythu Demlhq Gpznq Fxntr Nmltai Nhpvd Nzfoz Ogyan | 12', //Qldgw
    // 'Dkk Omkrz Ehps Nwfd | 4',  //Omkrz
    // 'Htvnkn Xfq Shl Pmlatv Csfk | 5', //Pmlatv
    // 'Hhut Dvehqx Iiyp Ialdw Wjvha Pvzk | 9', //Ialdw
    'Zuovuh Hil Cjrzhb Xurb Khkhx | 9', //Cjrzhb
    'Lvcyso Mhtz Vmzxoi Wlvui Xra Ugw Oguc Fquvwv | 8', //Mhtz
    'Drbi Zpqul Oqb Dyxar Nkrwwb Abc Uckae | 13', //Uckae
    'Vsd Fuwuq Oyn Ipxpm Igavyp Whq | 11', //Whq
    'Xjmmee Dnpgh Kakkvy Ncg | 11', //Ncg
    'Abpv Qxka Yovii Tip | 12',     //Abpv
    'Uegkv Hff Fwoph Ikty Rsw Jai Ptw Yofpa Gbyd | 6', //Hff
    'Owy Nwxsmk Bnnntv Mzjjr Rule Ivy Abl Uzwncp Olccb Sltz | 13', //Sltz
    'Tbmae Rhrbk Lotuvu Nihh Nosds Rhhpv | 14',  //Tbmae
    'Wws Dak Gksif Vxw Gwsb Sbynp | 13',    //Sbynp
    'Nnv Lsvko Akpop Tkgnnj Evsaax Tlamkk | 12', //Nnv
    'Iuimdx Xumucp Tsus Qge | 8',   //Iuimdx
    'Osi Yhvkmh Jgfuiq Ycfkzj Cdchrm Vnvsta Cplboa Iyh Hwx | 14', //Osi
    'Oeuvmu Dldv Gzfxa Wfnj Ivztlr Gvn Vgv Gnirzs Askpo Fmsofb | 5', //Wfnj
    'Bill David Susan Jane Kent Brad | 7',  //Brad
    'Vnfhg Rkpw Vvzov Ape Zpwdp Ergkma | 11', //Ergkma
    // 'John Tom Mary | 5', //Mary
    'Eko Lirojn Yot Nsnjwl | 4',        //Lirojn
    'Gjlbp Yarcfp Ppzpze Ogxwy | 12',       //Gjlbp
    'Adqcnx Axoum Txkmq Cjxsxs Vmdrds Hgv Dabqjp Mcmrin | 14',   //Adqcnx
    'Fpzzzv Xjl Tapvrc Ovi Qhrbv Snoa | 12',    //Fpzzzv
    'Sqc Ogw Kzfseh Rndada Scdele Opri Zhvuv | 11', //Zhvuv
    'Duvt Fav Cccxi Gvicr Bxiq Mges | 12',      //Duvt
    'Tufwmm Oaejqw Wgwrd Qdwrid Qsdcs | 10',        //Tufwmm
    'Tbzhu Jwap Hug Jycjnv Dxpuh Tbrqfh Ehw | 10',   //Tbzhu
    'Dbrng Clm Isjuh Neez Leup Svqwrm | 10',        //Dbrng
    'Coft Gngvmm Ropwed Rpnwcs Ogpesg Umyn Bdsg | 10',  //Coft
    'Xfeeyw Ynh Zxcj Lqpj Lkdxyw Wek Mvh Cawelh | 10', //Xfeeyw
    'Dmxp Jfdad Qzujgh Gkp Xrfboz Aafln | 6',   //Jfdad
    'Ffsc Llmfpj Aec Zxova Mbrvee Kpoart | 15',  //Llmfpj
    'Vxkbh Zqko Ddhadr Juyi Ewjqpo Rtfvqt Sbmgc Yzsunr Bsl | 11', //Bsl
    'Mqxhn Aye Bwok Tcfxe Uzani Jjfsqx Czlx | 3', //Aye
    'Vmvhm Jrn Oada Mxue Jebnjy Lzau Jxu Csud Mmjiuz | 11', //Mmjiuz
    'Jpckov Hmv Jqat Spmlth | 12' //Jpckov
].join('\n')

describe('blackCard', () => {

    // it('can run', () => {
    //     var out = lib.run(input)
    //     console.log('out:\n', out)
    //     expect(out).eql(output)
    // });


    it('can run', () => {
        var out = lib.run(fullInput)
        console.log('out:\n', out)
        expect(out).eql(output)
    });
});