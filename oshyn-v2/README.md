# OSHYN — Premium Agency Website
### Production-ready. Free to host on Netlify.

---

## Deploy in 3 steps (100% free)
1. Go to **netlify.com** → create free account
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `oshyn-v2` folder → live instantly at `yourname.netlify.app`

---

## Connect your contact form (free)
The contact form uses Formspree — free for up to 50 submissions/month:
1. Go to **formspree.io** → create free account
2. Create a new form → copy your Form ID
3. Open `pages/contact.html`
4. Find `const FORMSPREE_ID = 'YOUR_FORM_ID'`
5. Replace `YOUR_FORM_ID` with your actual ID
6. Submissions will arrive in your email inbox

---

## What to edit first
Every editable section has a `<!-- EDIT: ... -->` comment.

| File | What to edit |
|------|-------------|
| `index.html` | Hero headline, stats, services, testimonials, clients |
| `pages/about.html` | Your story, team bios, values |
| `pages/services.html` | Service descriptions and deliverables |
| `pages/work.html` | Real case studies with actual results |
| `pages/contact.html` | Email, phone, form ID |
| `pages/faq.html` | Your actual FAQ answers and pricing |
| `pages/blog.html` | Real articles as you publish them |
| `css/style.css` | Colors (top `:root {}` section) |

## Change brand colours
Open `css/style.css` and edit:
```css
:root {
  --teal: #1DF0C4;    ← accent colour
  --ink: #08090A;     ← dark background
  --ink-soft: #111214; ← card background
}
```

## After launch — SEO checklist
- [ ] Replace all `oshyn.netlify.app` with your real domain in sitemap.xml
- [ ] Submit sitemap to Google Search Console (free)
- [ ] Create Google Business Profile (free)
- [ ] Add your real phone, email, address throughout
- [ ] Replace placeholder testimonials with real ones
- [ ] Replace placeholder case studies with real client results
- [ ] Add real team photos and bios

## Site structure
```
oshyn-v2/
├── index.html           ← Homepage
├── sitemap.xml          ← For Google
├── robots.txt           ← For crawlers
├── assets/
│   └── oshyn.png        ← Mascot (transparent)
├── css/
│   └── style.css        ← All styles
├── js/
│   └── main.js          ← All JS (navbar, FAQ, forms, Oshyn)
└── pages/
    ├── services.html
    ├── work.html
    ├── about.html
    ├── contact.html
    ├── blog.html
    ├── faq.html
    └── thankyou.html
```
