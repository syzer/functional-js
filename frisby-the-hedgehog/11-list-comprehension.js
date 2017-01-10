const { List } = require('immutable-ext')


// list comprehension to iterate 3 times
const merge = () =>
    List.of(x => y => z => `${x} - ${y} - ${z}`)
        .ap(List(['t-shirt', 'sweater']))
        .ap(List(['pants', 'shorts']))
        .ap(List(['black']).map(x => x + '!'))
// List [ "t-shirt - pants - black!", "t-shirt - shorts - black!", "sweater - pants - black!", "sweater - shorts - black!" ]