const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

const contentDir = path.join(__dirname, 'content');

function readJson(name) {
  const filePath = path.join(contentDir, name);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function loadContent() {
  return {
    site: readJson('site.json'),
    downloads: readJson('downloads.json'),
    news: readJson('news.json')
  };
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/assets', express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (_req, res) => {
  res.json({ ok: true, app: 'electrin-web2' });
});

app.get('/download', (_req, res) => {
  res.redirect('/#download');
});

app.get('/', (_req, res, next) => {
  try {
    const { site, downloads, news } = loadContent();
    res.render('index', {
      site,
      downloads,
      news,
      year: new Date().getFullYear()
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`electrin-web2 listening on http://localhost:${PORT}`);
});
