# Une src/head.html + h2c.js + engine.js + imgs.js + imgs_app.js + i18n.js + tool.js + auth.js en index.html
d='src/'
r=lambda f:open(d+f,encoding='utf-8').read()
open('index.html','w',encoding='utf-8').write(r('head.html')+r('h2c.js')+"\n"+r('engine.js')+"\n"+r('imgs.js')+"\n"+r('imgs_app.js')+"\n"+r('i18n.js')+"\n"+r('tool.js')+"\n"+r('auth.js')+"\n</script></body></html>")
