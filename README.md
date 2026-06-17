# ⚡ SHAURYA

### Your Financial Intelligence, Simplified.

[![Version](https://img.shields.io/badge/version-1.0.0-6C63FF?style=for-the-badge)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]()

**Built for India's Fintech Revolution 🇮🇳**

[🚀 Live Demo](https://fin-tech-project-shaurya.vercel.app)

---

## The Problem

Over **190 million Indians** remain unbanked or underserved by traditional financial institutions. Conventional credit scoring relies almost entirely on formal credit history, which leaves out gig workers, students, and first-time borrowers who have real financial activity but no credit score.

Financial literacy is also low. People often don't have a clear picture of where their money is, how it's growing, or how to borrow sensibly.

## The Idea

SHAURYA explores what a unified financial intelligence platform for this group could look like:

- An alternate credit score generated from UPI transaction patterns and behavioral signals, instead of relying on formal credit history
- A single net worth dashboard pulling together banks, mutual funds, equities, and ETFs
- Short, card-based financial literacy modules
- A P2P lending marketplace concept, with EMI calculations adapted to the alternate credit score

This is a concept build, not a production fintech product. The frontend is built and deployed; the credit scoring model is a working prototype trained on sample data, not live bank or UPI feeds.

## What's Actually Working

- React + Chakra UI dashboard, deployed and live at the link above
- Dark-themed data visualizations (ApexCharts / Recharts) for net worth and spending breakdowns
- A Python ML model that takes transaction-style features and outputs an alternate credit score, validated on sample/synthetic data
- Static financial literacy modules and a mock P2P lending UI

## What's Not Built Yet

- No real Account Aggregator integration — the consent-based bank data pull is a planned feature, not implemented
- No live UPI data source; the credit model runs on prepared sample data, not PhonePe Pulse or real user transactions
- No real money movement — the P2P lending marketplace is a UI concept, not a functioning settlement system
- Not SEBI-compliant and not intended for real investment advice

## Tech Stack

**Frontend**
- React.js + Chakra UI
- ApexCharts / Recharts for data visualization
- CSS animations, glassmorphism styling

**Backend / ML**
- Python — alternate credit score model

**Infrastructure**
- Vercel (frontend hosting)
- GitHub Actions (CI)

## Run Locally

```bash
# Clone the repo
git clone https://github.com/SGSShaurya5497/FinTech-Project-SHAURYA-.git
cd FinTech-Project-SHAURYA-

# Install dependencies
yarn install

# Start dev server
yarn start
```

## Project Structure

```
shaurya/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── views/
│   │   ├── Dashboard/    # Main dashboard, charts, stat cards
│   │   ├── Dashboard/Tables.js   # Financial Literacy Academy
│   │   └── Dashboard/Billing.js  # P2P Lending marketplace (mock)
│   ├── theme/            # Global dark theme, colors, typography
│   ├── variables/        # Chart configs, mock data
│   └── Home.js           # Landing page
├── Credit Score ML Model/
└── package.json
```

## Roadmap

If this moved beyond a concept build, the next real steps would be:

- [ ] Integrate Account Aggregator framework for live, consent-based bank data
- [ ] Replace sample data with real UPI transaction history for the credit model
- [ ] Deploy the credit model as a FastAPI microservice instead of a local script
- [ ] Real settlement flow for P2P lending via UPI deep links
- [ ] SEBI-compliance review before any investment-facing features

## Built By

**Shaurya** — DTU Mathematics & Computing

> *"Financial freedom shouldn't require a credit history."*

---

Built with ❤️ for Bharat
