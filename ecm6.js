//TODO when new version relesed

(function loop(sum, stop) {
    if (sum < stop) {
        return Promise.delay(250).then(() => {
                sum++;
        console.log(sum);
        return loop(sum, stop);
    });
}
})(0, 10).then(() => console.log('Done'));


