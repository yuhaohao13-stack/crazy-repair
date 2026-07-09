node -e "
var fs=require('fs');
// 1. Fix PhoneInput - make country code button shorter
var pp=fs.readFileSync('/Users/hy/.openclaw/workspace/crazy-repair/src/components/PhoneInput.jsx','utf8');
pp=pp.replace('min-w-[5.5rem]','min-w-[5rem]');
pp=pp.replace('min-w-[5.5rem]','min-w-[5rem]');
pp=pp.replace('px-2.5 py-2.5','px-2 py-2.5');
pp=pp.replace('px-2.5 py-2.5','px-2 py-2.5');
fs.writeFileSync('/Users/hy/.openclaw/workspace/crazy-repair/src/components/PhoneInput.jsx',pp);

// 2. Read register page
var rp=fs.readFileSync('/Users/hy/.openclaw/workspace/crazy-repair/src/app/register/page.jsx','utf8');
var lines=rp.split('\n');

// Find phone html input and the grid containing username+phone
// The structure should have a grid-cols-2 with username on left and phone on right
// We need to: remove phone from that grid, put phone below username as its own row

// Strategy: Find the grid that has username and phone together
// Usually looks like: <div className=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">
// followed by username div then phone div

var result=[];
var inPhoneGrid=false;
var phoneGridClosed=false;
var phoneContent=[];
var skipUntilPhoneGrid=-1;

for(var i=0;i<lines.length;i++){
  var l=lines[i];
  
  // Detect the grid that wraps username+phone  
  if(l.includes('grid-cols-1 sm:grid-cols-2 gap-4') && l.includes('gap-4')){
    // Check if this grid has username and phone
    // Look ahead for both patterns
    var joined='';
    for(var j=i;j<Math.min(i+15,lines.length);j++){
      joined+=lines[j];
    }
    if(joined.includes('User') && joined.includes('Phone')){
      // This is the username+phone grid
      // Keep the grid header, but only keep username inside it
      // Then after the grid, add phone as its own row
      result.push(l);
      // Find username block end (next </div> after username input)
      var uStart=i+1;
      var uEnd=-1;
      var depth=0;
      var started=false;
      for(var k=uStart;k<Math.min(i+15,lines.length);k++){
        var lk=lines[k];
        if(lk.includes('User') || lk.includes('username')) started=true;
        if(!started) continue;
        if(lk.includes('<div>')||lk.includes('<label')) depth++;
        if(lk.includes('</div>')){depth--; if(depth<=0 && started){uEnd=k+1; break;}}
      }
      if(uEnd===-1){
        // fallback: just copy until phone starts
        for(var k=uStart;k<Math.min(i+8,lines.length);k++){
          if(lines[k].includes('Phone')||lines[k].includes('PhoneInput')){
            uEnd=k;
            break;
          }
          result.push(lines[k]);
        }
      } else {
        // copy username block
        for(var k=uStart;k<uEnd;k++){
          result.push(lines[k]);
        }
      }
      // Close the grid
      result.push('            </div>');
      // Now extract phone block
      phoneContent=[];
      for(var k=i;k<Math.min(i+12,lines.length);k++){
        if(lines[k].includes('PhoneInput')||lines[k].includes('phone')||lines[k].includes('Phone')){
          phoneContent.push(lines[k]);
        }
      }
      // Add phone block as full width below
      result.push('            <div>');
      for(var p=0;p<phoneContent.length;p++){
        result.push(phoneContent[p]);
      }
      result.push('            </div>');
      
      // Skip original phone+username grid
      skipUntilPhoneGrid=i+12;
      inPhoneGrid=true;
      continue;
    }
  }
  
  if(inPhoneGrid && i<skipUntilPhoneGrid) continue;
  if(inPhoneGrid && i>=skipUntilPhoneGrid){inPhoneGrid=false;}
  
  result.push(l);
}

fs.writeFileSync('/Users/hy/.openclaw/workspace/crazy-repair/src/app/register.page.jsx',result.join('\n'));
console.log('DONE');
"