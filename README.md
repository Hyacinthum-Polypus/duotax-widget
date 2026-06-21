# DuoTax Construction Cost Calculator Widget

An embedded, interactive web widget designed to help Australian property investors, developers, and quantity surveyors estimate construction costs. Built with **React**, **Vite**, and **Tailwind CSS v4**, this calculator offers a modern, high-fidelity experience modeled after major financial institutions (e.g., Commonwealth Bank, Macquarie Bank) and the clear, simple-English question-style forms utilized by the Australian Taxation Office (ATO).

---

## 📋 Table of Contents
1. [Overview & Purpose](#-overview--purpose)
2. [Design & UX Philosophy](#-design--ux-philosophy)
3. [Key Features](#-key-features)
4. [Input Parameters & Form Validation](#-input-parameters--form-validation)
5. [Calculation Methodology](#-calculation-methodology)
6. [Project Architecture](#-project-architecture)
7. [Getting Started & Development](#-getting-started--development)
8. [Production Build & Deployment](#-production-build--deployment)

---

## 🎯 Overview & Purpose

Estimating construction costs in Australia requires considering multiple variables—location, year of completion, property type, materials, and internal specifications. 

The **DuoTax Construction Cost Calculator Widget** serves as a premium, self-service estimator that:
* Estimates construction costs based on historical and current **Building Cost Index (BCI)** multipliers.
* Guides users through a transparent breakdown of their property's details.
* Provides a professional, trustworthy estimate suitable for capital works deductions (Division 43) or initial budgeting.

---

## 🎨 Design & UX Philosophy

To ensure the widget meets the standards of top-tier financial platforms, its design is centered on:

1. **Macquarie & CommBank Caliber Aesthetics**:
   - Clean layouts, polished borders, and clear typography.
   - High-contrast action states and subtle shadow cues for a modern visual appeal.
   - Dynamic mobile-first design ensuring usability across mobile screens and desktop side-by-side viewports.

2. **ATO-Style Conversational Form Layout**:
   - Form fields formulated as direct, simple English questions (e.g., *"What year was construction completed?"* instead of *"Completion Year"*).
   - Logical grouping: core location/year details first, followed by structural specifications and option choices.
   - Input disclosures that reveal fields dynamically depending on previous choices (e.g., wall material selection is only shown for residential property types).

---

## ✨ Key Features

* **Dynamic Estimator Engine**: Real-time calculations update immediately as inputs change—no page refreshes or delays.
* **Australian BCI Multipliers**: Integrated lookup database for Australian states (NSW, VIC, QLD, WA, SA, TAS, NT, ACT) spanning from before 1987 up to 2026.
* **Component-Level Customizations**: Supports diverse property types: *House*, *Granny Flat*, *Townhouse*, *Apartment*, *Office*, and *Warehouse*.
* **Interactive Output Panel**:
  - Displays a **Low**, **Selected Finish**, and **High** estimate range (+/- 9% base margin).
  - Features a comprehensive **"How your estimate is calculated"** step-by-step breakdown.
  - Highlights specific cost drivers (e.g., elevator allowance, ducted A/C additions).

---

## 🎛️ Input Parameters & Form Validation

The calculator dynamically handles the following inputs:

| Form Field | Options / Inputs | Rules & Conditional Behavior |
| :--- | :--- | :--- |
| **Completion Year** | 1988 to 2026, Sep 1987, < Sep 1987 | Required. Maps to the Building Cost Index row. |
| **State / Territory** | VIC, QLD, NSW, SA, WA, TAS, NT | Required. Maps to the BCI location column. |
| **Build Type** | New Build, Knock-down & Rebuild, Renovations, Extensions, etc. | Required. Used for setting context. |
| **Finish Level** | Economy, Standard, Premium, Luxury | economy points to Low estimate; Standard points to Mid; Premium/Luxury point to High estimate. |
| **Floor Area** | Numeric input (m²) | Required. Must be greater than 0. Scales the core cost. |
| **Number of Storeys** | Numeric input | Required. Maps to story-offset cost scaling. |
| **Ducted A/C** | Yes / No | Adds flat rate per m² ($255/m²) if Yes. |
| **Property Type** | House, Granny Flat, Townhouse, Apartment, Office, Warehouse | Required. Sets the initial property base cost rate. |
| **Wall Type** | Brick veneer, Double brick, Reinforced concrete | Only visible & required for *House*, *Granny Flat*, and *Townhouse*. |
| **Bedrooms** | Numeric input | Only visible & required for residential properties. Adjusts cost scaling factor (-8% to +8%). |
| **Basement** | Yes / No | Visible for all types except *Granny Flat*. Adds basement surcharge factor ($105/m²). |
| **Mezzanine** | Yes / No | Only visible for *Office* and *Warehouse*. Adds mezzanine surcharge factor ($120/m²). |
| **Elevator** | Yes / No | Only visible for *Office*, *House*, and *Apartment*. Adds a flat allowance ($100k + $9.5k per storey above ground). |

---

## 🧮 Calculation Methodology

The backend estimation algorithm is located in `src/utils/calculations.js`. It utilizes the following formula:

### 1. Core Rate Determination
$$\text{Core Rate} = \text{Property Base} + \text{Mezzanine Surcharge} + \text{Wall Surcharge} + (\text{Basement Surcharge} \times 105) + \text{Ducted AC Surcharge}$$

Where:
* **Property Base**: House = \$1,560, Granny Flat = \$1,615, Townhouse = \$1,665, Apartment = \$1,410, Office = \$940, Warehouse = \$590.
* **Wall Surcharge**: Brick Veneer = \$140, Double Brick = \$180, Reinforced Concrete = \$220 (0 if not applicable).
* **Basement Surcharge**: \$105/m² if property has a basement.
* **Mezzanine Surcharge**: \$120/m² if property has a mezzanine.
* **Ducted AC Surcharge**: \$255/m² if selected.

### 2. Sizing Multipliers
$$\text{Base Cost (Excl. Elevator)} = \text{Core Rate} \times (1 + (\text{Stories Offset} \times 0.04)) \times (1 + \text{Bedrooms Factor}) \times \text{Floor Area}$$

Where:
* **Stories Offset**: Number of floors minus 1 (capped at 7 max, i.e., 8+ floors = 10x multiplier).
* **Bedrooms Factor**: 1 bed (-8%), 2 beds (-4%), 3 beds (0%), 4 beds (+4%), 5+ beds (+8%).

### 3. Elevator Allowance (If Selected)
$$\text{Elevator Allowance} = \$100,000 + (\text{Stories Offset} \times \$9,500)$$

### 4. BCI Location & Year adjustment
$$\text{Base Cost} = (\text{Base Cost (Excl. Elevator)} + \text{Elevator Allowance}) \times \text{BCI Multiplier}$$

* **BCI Multiplier**: Retrieved from the 2D data matrix in `src/utils/bciData.js` mapping Completion Year (rows) and State (columns).

### 5. Final Output Ranges
* **Low Estimate**: $\text{Base Cost} \times 0.91$
* **Mid Estimate**: $\text{Base Cost} \times 1.00$
* **High Estimate**: $\text{Base Cost} \times 1.09$

---

## 📂 Project Architecture

```
duotax-widget/
├── index.html                  # Root template
├── package.json                # Project configuration & dependencies
├── vite.config.js              # Vite compiler configuration
├── src/
│   ├── main.jsx                # Application entrypoint
│   ├── App.jsx                 # Base application component
│   ├── App.css                 # Supplementary style layouts
│   ├── index.css               # Core Tailwind directives
│   ├── components/
│   │   └── ConstructionCalculator.jsx   # Dynamic calculator UI & forms
│   └── utils/
│       ├── bciData.js          # BCI matrices & lookups for Australian states/years
│       └── calculations.js     # Cost calculation engine logic
```

---

## 🚀 Getting Started & Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
Launch the project locally on [http://localhost:5173](http://localhost:5173) with hot reload:
```bash
npm run dev
```

### 3. Code Quality / Linting
Ensure standard coding styles and rules are maintained:
```bash
npm run lint
```

---

## 📦 Production Build & Deployment

### Build the Application
Generate optimized, minified production assets in the `dist/` directory:
```bash
npm run build
```

### Preview the Production Build Locally
Verify the production build runs correctly before pushing:
```bash
npm run preview
```

### GitHub Pages Deployment
This widget is optimized for hosting via GitHub Pages.
1. Build the production files using `npm run build`.
2. Configure the site's `base` path in `vite.config.js` if it's deployed to a subfolder (e.g. `base: '/duotax-widget/'`).
3. Deploy the compiled assets located in the `dist` folder to your GitHub Pages publishing branch (e.g., `gh-pages`).
