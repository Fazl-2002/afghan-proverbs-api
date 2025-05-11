# Afghan Proverbs API

## Setup
```bash
npm install
npm run dev
# Afghan Proverbs API

## 🔌 API Endpoints

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/proverbs`               | Get all proverbs             |
| POST   | `/proverbs`               | Add new proverb              |
| GET    | `/proverbs/:id`           | Get single proverb           |
| PUT    | `/proverbs/:id`           | Update proverb               |
| DELETE | `/proverbs/:id`           | Delete proverb               |
| GET    | `/proverbs/random`        | Get random proverb           |
| GET    | `/proverbs?category=wisdom` | Filter by category          |

##  Example Usage
```bash
# Get all proverbs
curl http://localhost:3000/proverbs

# Add new proverb
curl -X POST -H "Content-Type: application/json" -d '{
  "textDari": "مثال",
  "textPashto": "بېلګه",
  "translationEn": "Example",
  "meaning": "Meaning",
  "category": "wisdom"
}' http://localhost:3000/proverbs