/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'mthToLast');

var fs = require('fs');
//var input1 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1.txt');
var input =
    'a b c d 4\n'+
    'a b c d 1\n'+
    'e f g h 2\n';

var output =
    'a\n' +
    'd\n' +
    'g\n';

var input2 =
    'j q x t l m k a v n 26\n'+
    'a y t w e h q r g v c s z f x 8\n'+
    'x z t f y b n 10\n'+
    'j p x i e c q u b a z g k t 2\n'+
    'u o h p d m i g k f v l x j 3\n'+
    'b u c g o y w h m f a j q r x e t i d v l p 25\n'+
    'e g i y z h m w f j n o k c x t b q v 1\n'+
    's f g a m t o n x h u v 24\n'+
    'h y x q r d e l u p 20\n'+
    'r i m o b 11\n'+
    'k c s x m w g n a o d 3\n'+
    'o c p j a v n r f x d k z e b i m w 1\n'+
    'o v g n m p i c q x a y 5\n'+
    'q c m s b t x u p z r 1\n'+
    'm q e p r u x k a t v n l c z s h w d f 4\n'+
    'i g u 11\n'+
    't p n h d l i c a s f y o q r j x k v 9\n'+
    'a o t k v 11\n'+
    'x i y d n h r 26\n'+
    's a c j e q p y 17\n';


var input3 =
    'g n c y a r f s w q x p d e i z k 17\n'+
    'q d r a e j n y l h m o c x 25\n'+
    'p y w q a x v h j l f d r n u 12\n'+
    'g b w y z q h o c l d j r x s v e 6\n'+
    's x r o k q n t u 20\n'+
    'g f a v h 13\n'+
    'g v u h e k a y x s z t m d n o p l r 18\n'+
    'b q o k w u v a r s c h 12\n'+
    'b v j x q r s k a d u h m n z 25\n'+
    'q u r h t n o s m b p y g j k 3\n'+
    'd w a i v j o c l e n q r u k f p t x z s h b y 17\n'+
    'f l j q r t g s n w h y p m x d c 17\n'+
    'j x y r n 2\n'+
    'i a o 3\n'+
    'q y t 1\n'+
    'a e u l z b q t d w 20\n'+
    'h s a r g p n t c v f y q k w j b z e o i d 15\n'+
    'u b j c x r h v l a 21\n'+
    'x r c u e n b l k g s f y d w i h o j v m a p 21\n'+
    't k f m i b o g v e p z w u j 8\n'+



describe('mth to last', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can get', function (done) {
//        console.log(lib.run(input3));
        expect(lib.run(input)).eql(output);
        done();
    });
});
