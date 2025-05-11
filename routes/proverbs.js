const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/proverbs.json');

// تابع کمکی برای خواندن داده‌ها
function getProverbs() {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

// تابع کمکی برای ذخیره داده‌ها
function saveProverbs(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// دریافت همه ضرب‌المثل‌ها با امکان فیلتر
router.get('/', (req, res) => {
  try {
    let proverbs = getProverbs();
    
    // فیلتر بر اساس دسته
    if (req.query.category) {
      proverbs = proverbs.filter(p => 
        p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }
    
    res.json(proverbs);
  } catch (err) {
    res.status(500).json({ error: 'خطا در خواندن داده‌ها' });
  }
});

// دریافت یک ضرب‌المثل خاص
router.get('/:id', (req, res) => {
  try {
    const proverbs = getProverbs();
    const proverb = proverbs.find(p => p.id === parseInt(req.params.id));
    
    if (!proverb) {
      return res.status(404).json({ error: 'ضرب‌المثل یافت نشد' });
    }
    
    res.json(proverb);
  } catch (err) {
    res.status(500).json({ error: 'خطا در خواندن داده‌ها' });
  }
});

// افزودن ضرب‌المثل جدید
router.post('/', (req, res) => {
  try {
    const proverbs = getProverbs();
    const newProverb = {
      id: proverbs.length + 1,
      textDari: req.body.textDari,
      textPashto: req.body.textPashto,
      translationEn: req.body.translationEn,
      meaning: req.body.meaning,
      category: req.body.category
    };
    
    proverbs.push(newProverb);
    saveProverbs(proverbs);
    res.status(201).json(newProverb);
  } catch (err) {
    res.status(500).json({ error: 'خطا در ذخیره داده' });
  }
});

// به‌روزرسانی ضرب‌المثل
router.put('/:id', (req, res) => {
  try {
    const proverbs = getProverbs();
    const index = proverbs.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'ضرب‌المثل یافت نشد' });
    }
    
    proverbs[index] = {
      ...proverbs[index],
      ...req.body,
      id: parseInt(req.params.id) // حفظ ID اصلی
    };
    
    saveProverbs(proverbs);
    res.json(proverbs[index]);
  } catch (err) {
    res.status(500).json({ error: 'خطا در به‌روزرسانی' });
  }
});

// حذف ضرب‌المثل
router.delete('/:id', (req, res) => {
  try {
    let proverbs = getProverbs();
    const initialLength = proverbs.length;
    
    proverbs = proverbs.filter(p => p.id !== parseInt(req.params.id));
    
    if (proverbs.length === initialLength) {
      return res.status(404).json({ error: 'ضرب‌المثل یافت نشد' });
    }
    
    saveProverbs(proverbs);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'خطا در حذف' });
  }
});

// دریافت ضرب‌المثل تصادفی
router.get('/random', (req, res) => {
  try {
    const proverbs = getProverbs();
    const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
    res.json(randomProverb);
  } catch (err) {
    res.status(500).json({ error: 'خطا در خواندن داده‌ها' });
  }
});

module.exports = router;