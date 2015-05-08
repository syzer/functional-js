/**
 * https://www.codeeval.com/open_challenges/32/
 *
 *   There are two strings: A and B. Print 1 if string B occurs at the end of string A. Otherwise, print 0.
 Input sample:

 The first argument is a path to the input filename containing two comma-delimited strings, one per line. Ignore all empty lines in the input file.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'trailingString');
var _ = require('lodash');

var input = [
    'Hello World,World',
    'Hello CodeEval,CodeEval',
    'San Francisco,San Jose',
    'OK,NOK'
].join('\n');

var output = [
    '1',
    '1',
    '0',
    '0'
].join('\n');

var inputFull = [
    'Hello CodeEval,CodeEval',
    't3o k2JscvCsv HOfVj,Msv HOfVj',
    '4v UJmwS3vYknV4a8EI BEHVEP2k 01sZNy KY2 YwbCf,Wk 01sZNy KY2 YwbCf',
    '3dSaOTe5FajFs W I7 U q04vsGau 6IEEDZ4WH,6IEEDZ4WH',
    'Hello World,World',
    '1QRf2sY43k ZN ihJG5PJj2y,Zh3jf4NPJ5iRs G Yk22Q',
    'k HCRWocHF3 aEn0dFtVvhUIQlL 2T,0dFtVvhUIQlL 2T',
    '1Q0 p o i5j S22 u Ya3W 2HO 0 I1zvxSnVbTld YI11K,TYa3W 2HO 0 I1zvxSnVbTld YI11K',
    'f27xSanBvTOoiKzjVLFSn Ts,Sjoxi TVzTv2S',
    'JasqyqY l3Sn 65Od vfV3SlG HZrrvR7n5Qv53e 3Xlzs,7v   ral3Y lqS5G s5s6yqV3O',
    '2 i7vkswJB 7kA4a e1gafunHxC fxjc,kawBj',
    'Fjr8hTi5X6X5 vveBAYIHnAKtBmMNVpNBqnAOx w H1,rBAYIHnAKtBmMNVpNBqnAOx w H1',
    'XX1i 7F sMSGa pKpGAy wYMjM84kFfS IupJwb,IupJwb',
    'y h m9wsbGLdi 5fw,y h m9wsbGLdi 5fw',
    'OK,NOK',
    'dtlK aa9nQaRZQyW lQ1dxdwak8zRm,nazd8R',
    'b qTUyoiDlb4De74j6aT 8sowSV8sz24nkQiARwrKLEA7XW,qioQk7D4',
    'Ifj6qWc 5RGXG F7,sj6qWc 5RGXG F7',
    'YD8Q tWmN D 4,Q tWmN D 4',
    'fYAV1FF 3KkZ08P JNCYJvOPTNhr g,gJNCYJvOPTNhr g',
    'CovLIm1fxS AwI78o46,AwI78o46',
    '0qQtYl KqdaohU7JAwUY oVdur YgGJ5AY GExF x S b,JAwUY oVdur YgGJ5AY GExF x S b',
    'tvIpfKaFGGy mfUI6C FpKIFI33 WuFZusnNN,FGGy mfUI6C FpKIFI33 WuFZusnNN',
    '9Gl1 N98T LhAYTkIT 6J Z9e8ICJPRcW5n wv2,lk99 vJwLZRh5WG ITN',
    'Kj5ckGsuCOpDc,COpDc',
    'BFRCPUv2I lZoXyz4 YLi FpGW QOP9M1,PUv2I lZoXyz4 YLi FpGW QOP9M1',
    'S1bRQ le2x1l3Uwn au6oFd,nub',
    'NQ60iM2 Eo62HVz1 G9hC qDvxI,IzNoiHx02VGhCD6 q M6QE92 1',
    'qv BE Wjg3En 4Aa7Ikyk4VBS m,VBS m',
    '1 WFhp j b6L q h ctcG,b6L q h ctcG',
    'San Francisco,San Jose',
    'nb oIyqZ l2tPtJSB HLb Hg1ll VW cnWGJuyhAj jl,LBn uly APltq1 WHon',
    '1t6je2bQ NX qGed X6e RiTAp,t6je2bQ NX qGed X6e RiTAp',
    '21 GOTlkF Nygp Ukp2 pq sig xA,p2 G',
    'Random Numbers,ers',
    'AWV3x DX4aLO0y BmfdKotY cwpJXg0 j jENAjXsC e3Aj9,j0XtON DgVmwxjAEYXAo0f d3WJj 9LKj e3',
    'sJIqqyf8 NtB xWiMgulJjTwcfQIWp6W9s,xBp9JuM8ITNytl sJj6Iwiffqg WWQsq',
    'k JM Z4 wJCacr8,4 J',
    'M h0RWS rD 3MQ4PUUYSqNY PQ2ry5,YYrSR Mr0S',
    '0 YXS1C Vxry46GD Lhuma7uDPFVg Jq4hco,gVuV7oxYL XDmJyc6S4 4hF 1Du'
].join('\n');

describe('trailingString', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        //console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

});
