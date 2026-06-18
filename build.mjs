import fs from 'fs';
fs.rmSync('dist',{recursive:true,force:true});
fs.mkdirSync('dist',{recursive:true});
function copy(src,dest){if(!fs.existsSync(src))return;const s=fs.statSync(src);if(s.isDirectory()){fs.mkdirSync(dest,{recursive:true});for(const f of fs.readdirSync(src))copy(`${src}/${f}`,`${dest}/${f}`)}else fs.copyFileSync(src,dest)}
copy('index.html','dist/index.html');copy('src','dist/src');copy('public','dist/public');copy('README.md','dist/README.md');
