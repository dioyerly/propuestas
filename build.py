# Une src/head.html + src/engine.js + src/tool.js en index.html
d='src/'
out=open(d+'head.html',encoding='utf-8').read()+open(d+'engine.js',encoding='utf-8').read()+"\n"+open(d+'tool.js',encoding='utf-8').read()+"\n</script></body></html>"
open('index.html','w',encoding='utf-8').write(out)
