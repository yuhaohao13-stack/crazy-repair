var fs=require('fs');
var path='/Users/hy/.openclaw/workspace/crazy-repair';

// Read BirthPlaceSelector  
var bps=fs.readFileSync(path+'/src/components/BirthPlaceSelector.jsx','utf8');
// Rewrite BirthPlaceSelector with province in value prop
var newBps=`'use client'
import { useState } from 'react'

var R=[
{n:'\\u5317\\u4eac',c:[]},{n:'\\u4e0a\\u6d77',c:[]},{n:'\\u5929\\u6d25',c:[]},{n:'\\u91cd\\u5e86',c:[]},
{n:'\\u6cb3\\u5317',c:['\\u77f3\\u5bb6\\u5e84','\\u5510\\u5c71','\\u79e6\\u7687\\u5c9b','\\u90af\\u90f8','\\u90a2\\u53f0','\\u4fdd\\u5b9a','\\u5f20\\u5bb6\\u53e3','\\u627f\\u5fb7','\\u6ca7\\u5dde','\\u5eca\\u574a','\\u8861\\u6c34']},
{n:'\\u5c71\\u897f',c:['\\u592a\\u539f','\\u5927\\u540c','\\u9633\\u6cc9','\\u957f\\u6cbb','\\u664b\\u57ce','\\u6714\\u5dde','\\u664b\\u4e2d','\\u8fd0\\u57ce','\\u5ffb\\u5dde','\\u4e34\\u6c7e','\\u5415\\u6881']},
{n:'\\u5185\\u8499\\u53e4',c:['\\u547c\\u548c\\u6d69\\u7279','\\u5305\\u5934','\\u4e4c\\u6d77','\\u8d64\\u5cf0','\\u901a\\u8fbd','\\u9102\\u5c14\\u591a\\u65af','\\u547c\\u4f26\\u8d1d\\u5c14','\\u5df4\\u5f66\\u6dd6\\u5c14','\\u4e4c\\u5170\\u5bdf\\u5e03','\\u5174\\u5b89\\u76df','\\u9521\\u6797\\u90ed\\u52d2\\u76df','\\u963f\\u62c9\\u5584\\u76df']},
{n:'\\u8fbd\\u5b81',c:['\\u6c88\\u9633','\\u5927\\u8fde','\\u978d\\u5c71','\\u629a\\u987a','\\u672c\\u6eaa','\\u4e39\\u4e1c','\\u9526\\u5dde','\\u8425\\u53e3','\\u961c\\u65b0','\\u8fbd\\u9633','\\u76d8\\u9526','\\u94c1\\u5cad','\\u671d\\u9633','\\u846b\\u82a6\\u5c9b']},
{n:'\\u5409\\u6797',c:['\\u957f\\u6625','\\u5409\\u6797','\\u56db\\u5e73','\\u8fbd\\u6e90','\\u901a\\u5316','\\u767d\\u5c71','\\u677e\\u539f','\\u767d\\u57ce','\\u5ef6\\u8fb9']},
{n:'\\u9ed1\\u9f99\\u6c5f',c:['\\u54c8\\u5c14\\u6ee8','\\u9f50\\u9f50\\u54c8\\u5c14','\\u9e21\\u897f','\\u9e64\\u5c97','\\u53cc\\u9e2d\\u5c71','\\u5927\\u5e86','\\u4f0a\\u6625','\\u4f73\\u6728\\u65af','\\u4e03\\u53f0\\u6cb3','\\u7261\\u4e39\\u6c5f','\\u9ed1\\u6cb3','\\u7ee5\\u5316','\\u5927\\u5174\\u5b89\\u5cad']},
{n:'\\u6c5f\\u82cf',c:['\\u5357\\u4eac','\\u65e0\\u9521','\\u5f90\\u5dde','\\u5e38\\u5dde','\\u82cf\\u5dde','\\u5357\\u901a','\\u8fde\\u4e91\\u6e2f','\\u6dee\\u5b89','\\u76d0\\u57ce','\\u626c\\u5dde','\\u9547\\u6c5f','\\u6cf0\\u5dde','\\u5bbf\\u8fc1']},
{n:'\\u6d59\\u6c5f',c:['\\u676d\\u5dde','\\u5b81\\u6ce2','\\u6e29\\u5dde','\\u5609\\u5174','\\u6e56\\u5dde','\\u7ecd\\u5174','\\u91d1\\u534e','\\u8862\\u5dde','\\u821f\\u5c71','\\u53f0\\u5dde','\\u4e3d\\u6c34']},
{n:'\\u5b89\\u5fbd',c:['\\u5408\\u80a5','\\u829c\\u6e56','\\u868c\\u57e0','\\u6dee\\u5357','\\u9a6c\\u978d\\u5c71','\\u6dee\\u5317','\\u94dc\\u9675','\\u5b89\\u5e86','\\u9ec4\\u5c71','\\u6ec1\\u5dde','\\u961c\\u9633','\\u5bbf\\u5dde','\\u516d\\u5b89','\\u4eb3\\u5dde','\\u6c60\\u5dde','\\u5ba3\\u57ce']},
{n:'\\u798f\\u5efa',c:['\\u798f\\u5dde','\\u53a6\\u95e8','\\u8386\\u7530','\\u4e09\\u660e','\\u6cc9\\u5dde','\\u6f33\\u5dde','\\u5357\\u5e73','\\u9f99\\u5ca9','\\u5b81\\u5fb7']},
{n:'\\u6c5f\\u897f',c:['\\u5357\\u660c','\\u666f\\u5fb7\\u9547','\\u840d\\u4e61','\\u4e5d\\u6c5f','\\u65b0\\u4f59','\\u9e70\\u6f6d','\\u8d63\\u5dde','\\u5409\\u5b89','\\u5b9c\\u6625','\\u629a\\u5dde','\\u4e0a\\u9976']},
{n:'\\u5c71\\u4e1c',c:['\\u6d4e\\u5357','\\u9752\\u5c9b','\\u6dc4\\u535a','\\u67a3\\u5e84','\\u4e1c\\u8425','\\u70df\\u53f0','\\u6f4d\\u574a','\\u6d4e\\u5b81','\\u6cf0\\u5b89','\\u5a01\\u6d77','\\u65e5\\u7167','\\u4e34\\u6c82','\\u5fb7\\u5dde','\\u804a\\u57ce','\\u6ee8\\u5dde','\\u83cf\\u6cfd']},
{n:'\\u6cb3\\u5357',c:['\\u90d1\\u5dde','\\u5f00\\u5c01','\\u6d1b\\u9633','\\u5e73\\u9876\\u5c71','\\u5b89\\u9633','\\u9e64\\u58c1','\\u65b0\\u4e61','\\u7126\\u4f5c','\\u6fee\\u9633','\\u8bb8\\u660c','\\u6f2f\\u6cb3','\\u4e09\\u95e8\\u5ce1','\\u5357\\u9633','\\u5546\\u4e18','\\u4fe1\\u9633','\\u5468\\u53e3','\\u9a7b\\u9a6c\\u5e97','\\u6d4e\\u6e90']},
{n:'\\u6e56\\u5317',c:['\\u6b66\\u6c49','\\u9ec4\\u77f3','\\u5341\\u5830','\\u5b9c\\u660c','\\u8944\\u9633','\\u9102\\u5dde','\\u8346\\u95e8','\\u5b5d\\u611f','\\u8346\\u5dde','\\u9ec4\\u5188','\\u54b8\\u5b81','\\u968f\\u5dde','\\u6069\\u65bd']},
{n:'\\u6e56\\u5357',c:['\\u957f\\u6c99','\\u682a\\u6d32','\\u6e58\\u6f6d','\\u8861\\u9633','\\u90b5\\u9633','\\u5cb3\\u9633','\\u5e38\\u5fb7','\\u5f20\\u5bb6\\u754c','\\u76ca\\u9633','\\u90f4\\u5dde','\\u6c38\\u5dde','\\u6000\\u5316','\\u5a04\\u5e95','\\u6e58\\u897f']},
{n:'\\u5e7f\\u4e1c',c:['\\u5e7f\\u5dde','\\u6df1\\u5733','\\u73e0\\u6d77','\\u6c55\\u5934','\\u4f5b\\u5c71','\\u97f6\\u5173','\\u6e5b\\u6c5f','\\u8087\\u5e86','\\u6c5f\\u95e8','\\u8302\\u540d','\\u60e0\\u5dde','\\u6885\\u5dde','\\u6c55\\u5c3e','\\u6cb3\\u6e90','\\u9633\\u6c5f','\\u6e05\\u8fdc','\\u4e1c\\u839e','\\u4e2d\\u5c71','\\u6f6e\\u5dde','\\u63ed\\u9633','\\u4e91\\u6d6e']},
{n:'\\u5e7f\\u897f',c:['\\u5357\\u5b81','\\u67f3\\u5dde','\\u6842\\u6797','\\u68a7\\u5dde','\\u5317\\u6d77','\\u9632\\u57ce\\u6e2f','\\u94a6\\u5dde','\\u8d35\\u6e2f','\\u7389\\u6797','\\u767e\\u8272','\\u8d3a\\u5dde','\\u6cb3\\u6c60','\\u6765\\u5bbe','\\u5d07\\u5de6']},
{n:'\\u6d77\\u5357',c:['\\u6d77\\u53e3','\\u4e09\\u4e9a','\\u4e09\\u6c99','\\u508b\\u5dde']},
{n:'\\u56db\\u5ddd',c:['\\u6210\\u90fd','\\u81ea\\u8d21','\\u6500\\u679d\\u82b1','\\u6cf8\\u5dde','\\u5fb7\\u9633','\\u7ef5\\u9633','\\u5e7f\\u5143','\\u9042\\u5b81','\\u5185\\u6c5f','\\u4e50\\u5c71','\\u5357\\u5145','\\u7709\\u5c71','\\u5b9c\\u5bbe','\\u5e7f\\u5b89','\\u8fbe\\u5dde','\\u96c5\\u5b89','\\u5df4\\u4e2d','\\u8d44\\u9633']},
{n:'\\u8d35\\u5dde',c:['\\u8d35\\u9633','\\u516d\\u76d8\\u6c34','\\u9075\\u4e49','\\u5b89\\u987a','\\u6bd5\\u8282','\\u94dc\\u4ec1','\\u9ed4\\u897f\\u5357','\\u9ed4\\u4e1c\\u5357','\\u9ed4\\u5357']},
{n:'\\u4e91\\u5357',c:['\\u6606\\u660e','\\u66f2\\u9756','\\u7389\\u6eaa','\\u4fdd\\u5c71','\\u662d\\u901a','\\u4e3d\\u6c5f','\\u666e\\u6d31','\\u4e34\\u6ca7','\\u695a\\u96c4','\\u7ea2\\u6cb3','\\u6587\\u5c71','\\u897f\\u53cc\\u7248\\u7eb3','\\u5927\\u7406','\\u5fb7\\u5b8f','\\u6012\\u6c5f','\\u8fea\\u5e86']},
{n:'\\u897f\\u85cf',c:['\\u62c9\\u8428','\\u65e5\\u5580\\u5219','\\u660c\\u90fd','\\u6797\\u82d7','\\u5c71\\u5357','\\u90a3\\u66f2','\\u963f\\u91cc']},
{n:'\\u9655\\u897f',c:['\\u897f\\u5b89','\\u94dc\\u5ddd','\\u5b9d\\u9e21','\\u54b8\\u9633','\\u6e2d\\u5357','\\u5ef6\\u5b89','\\u6c49\\u4e2d','\\u6986\\u6797','\\u5b89\\u5eb7','\\u5546\\u6d1b']},
{n:'\\u7518\\u8083',c:['\\u5170\\u5dde','\\u5609\\u5cea\\u5173','\\u91d1\\u660c','\\u767d\\u94f6','\\u5929\\u6c34','\\u6b66\\u5a01','\\u5f20\\u6396','\\u5e73\\u51c9','\\u9152\\u6cc9','\\u5e86\\u9633','\\u5b9a\\u897f','\\u9647\\u5357','\\u4e34\\u590f','\\u7518\\u5357']},
{n:'\\u9752\\u6d77',c:['\\u897f\\u5b81','\\u6d77\\u4e1c','\\u6d77\\u5317','\\u9ec4\\u5357','\\u6d77\\u5357','\\u679c\\u6d1b','\\u7389\\u6811','\\u6d77\\u897f']},
{n:'\\u5b81\\u590f',c:['\\u94f6\\u5ddd','\\u77f3\\u5634\\u5c71','\\u5434\\u5fe0','\\u56fa\\u539f','\\u4e2d\\u536b']},
{n:'\\u65b0\\u7586',c:['\\u4e4c\\u9c81\\u6728\\u9f50','\\u514b\\u62c9\\u739b\\u4f9d','\\u5410\\u9c81\\u756a','\\u54c8\\u5bc6','\\u660c\\u5409','\\u535a\\u5c14\\u5854\\u62c9','\\u5df4\\u97f3\\u90ed\\u695e','\\u963f\\u514b\\u82cf','\\u514b\\u5b5c\\u52d2\\u82cf','\\u5580\\u4ec0','\\u548c\\u7530','\\u4f0a\\u7281','\\u5854\\u57ce','\\u963f\\u52d2\\u6cf0']},
{n:'\\u53f0\\u6e7e',c:['\\u53f0\\u5317','\\u9ad8\\u96c4','\\u53f0\\u4e2d','\\u53f0\\u5357','\\u57fa\\u9686','\\u65b0\\u7af9','\\u5609\\u4e49','\\u6843\\u56ed','\\u65b0\\u5317']},
{n:'\\u9999\\u6e2f',c:[]},{n:'\\u6fb3\\u95e8',c:[]}
];

export default function BirthPlaceSelector({value,onChange,lang}){
  var t=function(zh,en){return lang==='en'?en:zh};
  var ov=value&&value.overseas===true;
  var sel=ov?null:R.find(function(r){return r.n===value.province;});
  return React.createElement('div',{className:'space-y-2'},
    React.createElement('div',{className:'flex gap-2'},
      React.createElement('button',{type:'button',onClick:function(){onChange({overseas:true})},className:(ov?'bg-blue-600 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200')+' px-3 py-1.5 text-xs rounded-lg font-medium transition-colors'},'\\ud83c\\udf0d '+(lang==='en'?'Overseas':'\\u6d77\\u5916')),
      React.createElement('button',{type:'button',onClick:function(){onChange({province:'',city:''})},className:(!ov?'bg-blue-600 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200')+' px-3 py-1.5 text-xs rounded-lg font-medium transition-colors'},'\\ud83c\\udde8\\ud83c\\uddf3 '+(lang==='en'?'China':'\\u4e2d\\u56fd'))
    ),
    ov?React.createElement('div',{className:'bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-500'},lang==='en'?'Overseas':'\\u6d77\\u5916'):
    React.createElement('div',{className:'space-y-2'},
      React.createElement('select',{value:value&&value.province||'',onChange:function(e){onChange({province:e.target.value,city:''})},className:'w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'},
        React.createElement('option',{value:''},lang==='en'?'Select province':'\\u8bf7\\u9009\\u62e9\\u7701\\u4efd'),
        R.map(function(r){return React.createElement('option',{key:r.n,value:r.n},r.n)})
      ),
      value&&value.province&&sel&&sel.c&&sel.c.length>0?
        React.createElement('select',{value:value&&value.city||'',onChange:function(e){onChange({province:value.province,city:e.target.value})},className:'w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'},
          React.createElement('option',{value:''},lang==='en'?'Select city':'\\u8bf7\\u9009\\u62e9\\u57ce\\u5e02'),
          sel.c.map(function(c){return React.createElement('option',{key:c,value:c},c)})
        )
      :null
    )
  );
}

export function bpStr(v){
  if(!v)return '';
  if(v.overseas)return '\\u6d77\\u5916';
  return v.province+(v.city?'/'+v.city:'');
}

export function parseBp(s){
  if(!s)return{province:'',city:''};
  if(s==='\\u6d77\\u5916')return{overseas:true};
  var p=s.split('/');
  return{province:p[0],city:p[1]||''};
}
`;
fs.writeFileSync(path+'/src/components/BirthPlaceSelector.jsx',newBps);

// Read register page, fix BirthPlaceSelector integration
var rp=fs.readFileSync(path+'/src/app/register/page.jsx','utf8');

// Make sure imports are correct  
if(!rp.includes('parseBp')){
  rp=rp.replace(
    "import BirthPlaceSelector from '../../components/BirthPlaceSelector'",
    "import BirthPlaceSelector,{bpStr,parseBp} from '../../components/BirthPlaceSelector'"
  );
}

// Fix the onChange handler (ensure it uses bpStr/parseBp properly)
// Find the BirthPlaceSelector usage and fix its onChange
if(rp.includes('BirthPlaceSelector')){
  // Replace the entire BirthPlaceSelector block
  rp=rp.replace(
    /<BirthPlaceSelector[^>]*\/>/g,
    React.createElement('div',null,
      React.createElement(BirthPlaceSelector,{value:parseBp(form.birth_place),onChange:function(v){setForm(function(prev){var r=Object.assign({},prev);r.birth_place=bpStr(v);return r;});},lang:lang})
    )
  );
  // Actually since we can't use JSX in node, let's use string manipulation
  // Find the BirthPlaceSelector line and replace
}

// Actually simpler: just edit the JSX text directly
// Replace the pattern: <BirthPlaceSelector value={form.birth_place} onChange={...} lang={lang} />
// With: <BirthPlaceSelector value={parseBp(form.birth_place)} onChange={(v)=>setForm(p=>({...p,birth_place:bpStr(v)}))} lang={lang} />

var oldPattern=/<BirthPlaceSelector[^>]*\/s*>/;
var newPattern='<BirthPlaceSelector value={parseBp(form.birth_place)} onChange={(v)=>setForm(p=>({...p,birth_place:bpStr(v)}))} lang={lang} />';

// Multi-line pattern
rp=rp.replace(
  /<BirthPlaceSelector[\s\S]*?\/>/g,
  '<BirthPlaceSelector value={parseBp(form.birth_place)} onChange={(v)=>setForm(p=>({...p,birth_place:bpStr(v)}))} lang={lang} />'
);

fs.writeFileSync(path+'/src/app/register/page.jsx',rp);

// Same for forum
var forumPath='/Users/hy/.openclaw/workspace/forum';
try{
  var fp=fs.readFileSync(forumPath+'/src/app/register/page.jsx','utf8');
  // Copy BirthPlaceSelector  
  fs.writeFileSync(forumPath+'/src/components/BirthPlaceSelector.jsx',newBps);
  // Fix imports
  if(!fp.includes('parseBp')){
    fp=fp.replace(
      "import BirthPlaceSelector from '../components/BirthPlaceSelector'",
      "import BirthPlaceSelector from '../components/BirthPlaceSelector'"
    );
  }
  // Fix usage - similar pattern
  fc.replace(/<BirthPlaceSelector[\s\S]*?\/>/g,'<BirthPlaceSelector value={parseBp(form.birth_place)} onChange={(v)=>setForm(p=>({...p,birth_place:bpStr(v)}))} lang={lang} />');
  fs.writeFileSync(forumPath+'/src/app/register/page.jsx',fp);
}catch(e){console.log('forum skip:'+e.message);}

console.log('DONE');

