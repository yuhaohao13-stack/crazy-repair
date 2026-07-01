#!/usr/bin/env python3
"""Batch scrape singapuramobilerepair.com - all pages full content + images"""
import urllib.request, urllib.error
import re, os, json, time, hashlib
from html.parser import HTMLParser

OUTDIR = "/Users/hy/.openclaw/workspace/crazy-repair/scraped"
IMGDIR = os.path.join(OUTDIR, "images")
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}

pages = [
    "https://singapuramobilerepair.com",
    "https://singapuramobilerepair.com/about-us/",
    "https://singapuramobilerepair.com/phone-repair/",
    "https://singapuramobilerepair.com/iphone-repair/",
    "https://singapuramobilerepair.com/iphone-screen-glass-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-lcd-display-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-battery-replacement-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-charging-port-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-cant-on-motherboard-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-camera-lens-repair-replacement/",
    "https://singapuramobilerepair.com/iphone-water-damage-repair-replacement/",
    "https://singapuramobilerepair.com/macbook-repair/",
    "https://singapuramobilerepair.com/best-macbook-repair-singapore/",
    "https://singapuramobilerepair.com/tablet-repair/",
    "https://singapuramobilerepair.com/apple-ipad-repair-singapore/",
    "https://singapuramobilerepair.com/apple-watch-repair-singapore/",
    "https://singapuramobilerepair.com/samsung-phone-repair/",
    "https://singapuramobilerepair.com/best-samsung-repair-singapore/",
    "https://singapuramobilerepair.com/best-xiaomi-repair-singapore/",
    "https://singapuramobilerepair.com/best-oppo-repair-singapore/",
    "https://singapuramobilerepair.com/best-vivo-repair-singapore/",
    "https://singapuramobilerepair.com/huawei-phone-repair/",
    "https://singapuramobilerepair.com/oneplus-phone-repair/",
    "https://singapuramobilerepair.com/realme-phone-repair/",
    "https://singapuramobilerepair.com/google-pixel-phone-repair/",
    "https://singapuramobilerepair.com/asus-rog-phone-repair/",
    "https://singapuramobilerepair.com/best-honor-repair-singapore/",
    "https://singapuramobilerepair.com/best-nothing-repair-singapore/",
    "https://singapuramobilerepair.com/microsoft-surface-pro-laptop-repair/",
    "https://singapuramobilerepair.com/a-z-phone-repair-directory/",
    "https://singapuramobilerepair.com/contact/",
    "https://singapuramobilerepair.com/reviews/",
]

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.skip = False
        self.skip_tags = {'script', 'style', 'noscript', 'iframe', 'svg', 'nav', 'header', 'footer'}
        self.tag_stack = []
        
    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag in self.skip_tags:
            self.skip = True
        # Collect image URLs
        if tag == 'img':
            for attr, val in attrs:
                if attr == 'src' and val:
                    self.text.append(f'[IMG:{val}]')
        if tag == 'source':
            for attr, val in attrs:
                if attr == 'srcset' and val:
                    first = val.split(',')[0].strip().split(' ')[0]
                    self.text.append(f'[IMG:{first}]')
                    
    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag in self.skip_tags and tag in self.tag_stack:
            # Only unskip if this was the last skip tag
            pass
        if tag in self.skip_tags:
            self.skip = False
            
    def handle_data(self, data):
        if not self.skip:
            data = data.strip()
            if data:
                self.text.append(data)

def fetch_page(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode('utf-8', errors='replace')
        return html
    except Exception as e:
        return f"ERROR: {e}"

def extract_content(html):
    """Extract readable text and image URLs"""
    # Remove header/footer/menu noise
    html = re.sub(r'<header[^>]*>.*?</header>', '', html, flags=re.DOTALL)
    html = re.sub(r'<footer[^>]*>.*?</footer>', '', html, flags=re.DOTALL)
    html = re.sub(r'<nav[^>]*>.*?</nav>', '', html, flags=re.DOTALL)
    
    # Extract main content area if possible
    main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
    if main_match:
        html = main_match.group(1)
    
    # Extract all images from full HTML  
    imgs = []
    for m in re.finditer(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', html, re.IGNORECASE):
        src = m.group(1)
        if not src.startswith('data:') and not src.startswith('//'):
            if src.startswith('http'):
                imgs.append(src)
            elif src.startswith('/'):
                imgs.append('https://singapuramobilerepair.com' + src)
    for m in re.finditer(r'<source[^>]+srcset=[\"\']([^\"\']+)[\"\']', html, re.IGNORECASE):
        srcset = m.group(1)
        first = srcset.split(',')[0].strip().split(' ')[0]
        if first.startswith('http'):
            imgs.append(first)
    
    # Extract text
    extractor = TextExtractor()
    extractor.feed(html)
    text_blocks = extractor.text
    
    # Filter - keep blocks with meaningful content
    meaningful = []
    current_para = ""
    for block in text_blocks:
        if block.startswith('[IMG:'):
            if current_para.strip():
                meaningful.append(current_para.strip())
                current_para = ""
            meaningful.append(block)
        elif len(block) > 20:
            current_para += " " + block
        else:
            current_para += " " + block
    
    if current_para.strip():
        meaningful.append(current_para.strip())
    
    return meaningful, list(set(imgs))

def download_image(url, idx=0):
    try:
        if not url.startswith('http'):
            return None
        # Create safe filename
        ext = os.path.splitext(url.split('?')[0])[1] or '.jpg'
        if len(ext) > 6:
            ext = '.jpg'
        fname = f"img_{idx}{ext}"
        fpath = os.path.join(IMGDIR, fname)
        if os.path.exists(fpath):
            return fname
        req = urllib.request.Request(url, headers=HEADERS)
        resp = urllib.request.urlopen(req, timeout=10)
        data = resp.read()
        # Only save images > 1KB
        if len(data) > 1024:
            with open(fpath, 'wb') as f:
                f.write(data)
            return fname
        return None
    except Exception as e:
        return None

# Main
results = {}
all_imgs = []
img_idx = 0

for url in pages:
    path = url.replace('https://singapuramobilerepair.com', '') or '/'
    print(f"\n=== Scraping: {path} ===")
    html = fetch_page(url)
    if html.startswith("ERROR:"):
        print(f"  FAILED: {html}")
        results[path] = {"error": html}
        continue
    
    # Get title
    title = ""
    tm = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
    if tm:
        title = tm.group(1).strip()
    
    content, imgs = extract_content(html)
    print(f"  Content blocks: {len(content)}")
    print(f"  Images found: {len(imgs)}")
    
    # Download images
    downloaded = []
    for img_url in imgs:
        img_idx += 1
        fname = download_image(img_url, img_idx)
        if fname:
            downloaded.append({"url": img_url, "file": fname, "alt": ""})
            all_imgs.append({"url": img_url, "file": fname, "page": path})
    
    results[path] = {
        "title": title,
        "url": url,
        "content": content[:100],  # Keep first 100 blocks
        "images": downloaded,
        "image_count": len(imgs),
        "downloaded": len(downloaded)
    }
    
    # Be polite
    time.sleep(0.5)

# Save all results
with open(os.path.join(OUTDIR, "all_content.json"), "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUTDIR, "all_images.json"), "w", encoding="utf-8") as f:
    json.dump(all_imgs, f, ensure_ascii=False, indent=2)

# Summary
print("\n\n========== SUMMARY ==========")
print(f"Pages scraped: {sum(1 for v in results.values() if 'error' not in v)}/{len(pages)}")
print(f"Images downloaded: {len(all_imgs)}")
print(f"Output: {os.path.join(OUTDIR, 'all_content.json')}")
