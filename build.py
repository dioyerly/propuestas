# Une src/head.html + engine.js + imgs.js + imgs_app.js + tool.js en index.html
d='src/'
r=lambda f:open(d+f,encoding='utf-8').read()
open('index.html','w',encoding='utf-8').write(r('head.html')+r('engine.js')+"\n"+r('imgs.js')+"\n"+r('imgs_app.js')+"\n"+r('tool.js')+"\n</script></body></html>")
