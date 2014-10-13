var through = require('through2')
var insertCss = require('insert-css')
var fs = require('fs')
var css = fs.readFileSync(__dirname + '/index.css')

var re = {
    ok: new RegExp([
        '^(not )?ok\\b(?:',
        '(?:\\s+(\\d+))?(?:\\s+(?:(?:\\s*-\\s*)?(.*)))?',
        ')?'].join('')),
    plan: /^(\d+)\.\.(\d+)\b(?:\s+#\s+SKIP\s+(.*)$)?/,
    comment: /^#\s*(.+)/,
    version: /^TAP\s+version\s+(\d+)/i,
    label_todo: /^(.*?)\s*#\s*TODO\s+(.*)$/
}

module.exports = function(output_element) {

  insertCss(css)
    
  var out = document.getElementById(output_element)  
  
  function msg(txt) {
    out.innerHTML +='<div class=msg>'+ txt +'</div>'
  }

  function fail(txt) {
    out.innerHTML +='<div class=fail>'+ txt +'</div>'
  }

  function ok(txt) {
    out.innerHTML +='<div class=ok>'+ txt +'</div>'
  }
  
  
  return through(function(chunk, enc, cb) {

    var line_ok = re.ok.exec(chunk)
      , line_msg = re.comment.exec(chunk)
      , line_plan = re.plan.exec(chunk)
 
  
    if (line_ok) {
      var is_ok = !line_ok[1];
      var num = line_ok[2] && Number(line_ok[2])
      var name = line_ok[3];
      var asrt = { ok:is_ok, number:num, name:name}
      
      if (asrt.ok) {
        ok(asrt.name)
      }
      else {
        fail(asrt.name)
      }
    }
    else if (line_msg) {
      if (/^tests\s+[1-9]/gi.test(line_msg[1])) msg('total '+line_msg[1])
      else if (/^pass\s+[1-9]/gi.test(line_msg[1])) ok(line_msg[1]);
      else if (/^fail\s+[1-9]/gi.test(line_msg[1])) fail(line_msg[1]);
      else msg(line_msg[1])
    } 
    else if (line_plan) {
        var start = Number(line_plan[1])
        var end = Number(line_plan[2])
        var extra = m[line_plan]
        // TODO output plan
    }
    cb()
  })
}
