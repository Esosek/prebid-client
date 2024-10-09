window.gdprAppliesGlobally = true
;(function () {
  function n(e) {
    if (!window.frames[e]) {
      if (document.body && document.body.firstChild) {
        var t = document.body
        var r = document.createElement('iframe')
        r.style.display = 'none'
        r.name = e
        r.title = e
        t.insertBefore(r, t.firstChild)
      } else {
        setTimeout(function () {
          n(e)
        }, 5)
      }
    }
  }
  function e(r, a, o, s, c) {
    function e(e, t, r, n) {
      if (typeof r !== 'function') {
        return
      }
      if (!window[a]) {
        window[a] = []
      }
      var i = false
      if (c) {
        i = c(e, n, r)
      }
      if (!i) {
        window[a].push({ command: e, version: t, callback: r, parameter: n })
      }
    }
    e.stub = true
    e.stubVersion = 2
    function t(n) {
      if (!window[r] || window[r].stub !== true) {
        return
      }
      if (!n.data) {
        return
      }
      var i = typeof n.data === 'string'
      var e
      try {
        e = i ? JSON.parse(n.data) : n.data
      } catch (t) {
        return
      }
      if (e[o]) {
        var a = e[o]
        window[r](
          a.command,
          a.version,
          function (e, t) {
            var r = {}
            r[s] = { returnValue: e, success: t, callId: a.callId }
            n.source.postMessage(i ? JSON.stringify(r) : r, '*')
          },
          a.parameter
        )
      }
    }
    if (typeof window[r] !== 'function') {
      window[r] = e
      if (window.addEventListener) {
        window.addEventListener('message', t, false)
      } else {
        window.attachEvent('onmessage', t)
      }
    }
  }
  e('__uspapi', '__uspapiBuffer', '__uspapiCall', '__uspapiReturn')
  n('__uspapiLocator')
  e('__tcfapi', '__tcfapiBuffer', '__tcfapiCall', '__tcfapiReturn')
  n('__tcfapiLocator')
  ;(function (e) {
    var t = document.createElement('link')
    t.rel = 'preconnect'
    t.as = 'script'
    var r = document.createElement('link')
    r.rel = 'dns-prefetch'
    r.as = 'script'
    var n = document.createElement('link')
    n.rel = 'preload'
    n.as = 'script'
    var i = document.createElement('script')
    i.id = 'spcloader'
    i.type = 'text/javascript'
    i['async'] = true
    i.charset = 'utf-8'
    var a =
      'https://sdk.privacy-center.org/' +
      e +
      '/loader.js?target=' +
      document.location.hostname
    if (window.didomiConfig && window.didomiConfig.user) {
      var o = window.didomiConfig.user
      var s = o.country
      var c = o.region
      if (s) {
        a = a + '&country=' + s
        if (c) {
          a = a + '&region=' + c
        }
      }
    }
    t.href = 'https://sdk.privacy-center.org/'
    r.href = 'https://sdk.privacy-center.org/'
    n.href = a
    i.src = a
    var d = document.getElementsByTagName('script')[0]
    d.parentNode.insertBefore(t, d)
    d.parentNode.insertBefore(r, d)
    d.parentNode.insertBefore(n, d)
    d.parentNode.insertBefore(i, d)
  })('9a8e2159-3781-4da1-9590-fbf86806f86e')
})()
