# browserify-tape-spec

Spec style reporter for your tape test output in the browser.

## install

    npm install browserify-tape-spec --save-dev

## usage

In your markup you'll need an element to stream output to. In this example I have a `<div id=out>` for that purpose:

```html
<html>
<body>
  <div id=out></div>
  <script src=bundle.js></script>
</body>
</html>
```

In the `js` we grab a reference to the reporter, invoke it with the element id we wish to stream the results to, and pass the resulting function to tape's pipe.

```javascript
var test = require('tape')
  , report = require('browserify-tape-spec')

test('useful assertion description', function(t) {
  t.plan(2)
  t.ok('a passing test')
  t.fail('this test will fail')
  t.end()
})

test.createStream().pipe(report('out'))
```

Thats it! You can see a [live example here](http://jsbin.com/cunedo/5/edit).

## contribute

A few ideas I haven't done just yet (and would love your help).

- Scope the css to the passed in element
- Mobile web friendly (viewport inject) the output
- Output for comments/plan/todo

## inspired by 

- https://github.com/substack/tap-parser
- https://github.com/scottcorgan/tap-spec
