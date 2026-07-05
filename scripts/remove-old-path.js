/**
 * Remove old breadcrumb-path text from gradient hero sections.
 * These files have the old inline path inside the bg-gradient section
 * (e.g. 首页 / 手机品牌 with ArrowLeft), which is now replaced by the
 * <Breadcrumb /> component above the section.
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src/app');

// Only these files still have old path text
const TARGETS = [
  'headphone-repair/page.jsx',  // multi-link pattern
  'computer-repair/page.jsx',
  'other-repair/page.jsx',
  'phone-repair/page.jsx',
  'tablet-repair/page.jsx',
];

// Pattern A: multiline brand-page pattern (flex items-center gap-2 text-sm)
// Pattern B: single-line category-page pattern (no flex items-center gap-2)
const PATH_DIV_RE = /^\s*<div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4[^"]*">.*?(?:flex items-center gap-2 text-sm["'][^>]*>|>).*?(?:ArrowLeft|首页).*?<\/div>\s*\n?/gm;

const IMPORT_ARROWLEFT_RE = /^import \{ ArrowLeft \} from 'lucide-react'\s*\n?/m;
const IMPORT_ARROWLEFT_MULTI_RE = /^import \{ ArrowLeft,/m;

let changed = 0;

for (const relPath of TARGETS) {
  const fullPath = path.join(APP_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;

  // 1. Remove the old path div block (handles single-line and multiline)
  const newContent = content.replace(PATH_DIV_RE, (match) => {
    modified = true;
    return ''; // delete it entirely
  });

  // 2. Clean up unused ArrowLeft import if it's the only item
  let cleaned = newContent;
  
  // If import is: import { ArrowLeft } from 'lucide-react' (solo)
  const soloMatch = cleaned.match(IMPORT_ARROWLEFT_RE);
  if (soloMatch) {
    // Check that ArrowLeft is no longer used in the file
    const restAfterImport = cleaned.replace(soloMatch[0], '');
    if (!restAfterImport.includes('ArrowLeft')) {
      cleaned = restAfterImport;
      modified = true;
      console.log(`  Removed unused import { ArrowLeft } from ${relPath}`);
    }
  }
  
  // If ArrowLeft is part of a multi-import: import { ArrowLeft, Something } from 'lucide-react'
  // We should only clean if it's truly unused
  if (cleaned.match(IMPORT_ARROWLEFT_MULTI_RE) && !cleaned.match(/\bArrowLeft\b(?!.*from 'lucide-react')/)) {
    // ArrowLeft appears in import but not in rest of code after deletion
    // Replace ", ArrowLeft" or "ArrowLeft, " in the import
    cleaned = cleaned.replace(/import \{.*?\} from 'lucide-react'/g, (match) => {
      if (!match.includes('ArrowLeft')) return match;
      const items = match.replace(/import \{/, '').replace(/\} from 'lucide-react'/, '').split(',').map(s => s.trim()).filter(s => s !== 'ArrowLeft');
      if (items.length === 0) return '';
      return `import { ${items.join(', ')} } from 'lucide-react'`;
    });
  }

  if (modified) {
    fs.writeFileSync(fullPath, cleaned, 'utf-8');
    console.log(`FIXED: ${relPath}`);
    changed++;
  } else {
    console.log(`NO CHANGE: ${relPath}`);
  }
}

console.log(`\nDone. ${changed} files modified.`);
