const express = require('express');
const app = express();

app.get('/api/proverbs', (req, res) => {
  const proverbs = [
    {
      id: 1,
      textDari: "سر زنده باشد کلاه زیاد است",
      textPashto: "سر ژوندی وي، ټوپۍ ډېری دی",
      translationEn: "While the head is alive, there are many hats",
      meaning: "As long as someone is alive, there are many opportunities and options available to them",
      category: "wisdom"
    },
    {
      id: 2,
      textDari: "شنیدن کَی بوَد مانند دیدن",
      textPashto: "اورېدنه لکه لیدل نه دی",
      translationEn: "Seeing is believing",
      meaning: "Listening or hearing about something is not the same as experiencing it firsthand.",
      category: "advice"
    }
  ];
  
 
  let html = '<h1>ضرب‌المثل‌های افغانی</h1><ul>';
  proverbs.forEach(proverb => {
    html += `
      <li>
        <h3>${proverb.textDari}</h3>
        <p>پشتو: ${proverb.textPashto}</p>
        <p>ترجمه انگلیسی: ${proverb.translationEn}</p>
        <p>معنی: ${proverb.meaning}</p>
        <p>دسته: ${proverb.category}</p>
      </li>
    `;
  });
  html += '</ul>';
  
  res.send(html);
});

app.listen(3000, () => {
  console.log('سرور در حال اجراست: http://localhost:3000/api/proverbs');
});