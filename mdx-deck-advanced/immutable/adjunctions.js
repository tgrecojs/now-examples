const Immutable = require('immutable-ext');
const { Just, Nothing } = require('data.maybe');
const Task = require('data.task');

const Reader = f => ({
    run: f,
    map: g => Reader(x => f(g(x))),
    chain: g => Reader(x => f(g(x))).run()
});

Reader.of = x => Reader(() => x);

const loadComponent = name =>
                        Immutable.map({
                            name: name[0].toUpperCase() + name.slice(1),
                            example: Nothing,
                            html: Nothing,
                            selectors: Nothing
                        });


const addExample = comp => 
                        comp.set('html', Just('< some html>'))

const beautifyHtml = comp => 
                    comp.set('html', Just('< some html>'))


const addSelectorTable = comp => comp.set('selector', Just([['cols'], ['rows']]))

const empty = Components.reduce((acc, key) => acc.set(key, key), Immutable.map());

const ui = empty.map(loadComponent).map(addComponent).map(beautifyHtml).map(addSelectorTable);

ui.get('buttons');

/**
 * NOW LAZY
 * 
 */

// from :: (Component -> a) => UI
const from = f =>
                Components.reduce((ui, key) => ui.set(key, f(key)), Immutable.map());

// to:: UI -> (Component -> a)

const to = structure => key => structure.get(key)


const empty_ = from(x => x);

const ui_ = Reader(to(empty_)).map(loadComponent).map(addExample).map(beautifyHtml).map(addSelectorTable);

ui_.run('buttons');