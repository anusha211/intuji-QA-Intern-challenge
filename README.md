#  Cypress Automation: DemoQA Practice Form

This project uses [Cypress](https://www.cypress.io/) to perform end-to-end testing on the [DemoQA Practice Form](https://demoqa.com/automation-practice-form). It validates form inputs such as text fields, email, date of birth, subject input, file upload, address fields, and dropdown selections.  

All scenarios are based on manual test cases defined in an accompanying Excel sheet (`Test_Scenarios_and_Test_Cases.xlsx`).

---


## ✅ Covered Test Scenarios

- **Positive Tests**
  
- **Negative Tests**

- **Edge Cases**


---

## ✅ testscenario_and_testcase_and_bugreport file
 - Excel file containing test scenarios, testcases and bugreports in different pages.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/demoqa-form-cypress-tests.git
cd demoqa-form-cypress-tests

---

### 2. Install dependencies
npm install


3. Open Cypress Test Runner
npx cypress open
Select demoqaform.cy.js in the Cypress UI to run the tests interactively.

📦 Running in Headless Mode
bash
Copy
Edit
npx cypress run --spec "cypress/e2e/demoqaform.cy.js"


📊 Test Cases Reference
All test cases are mapped in Test_Scenarios_and_Test_Cases.xlsx. This includes:

Test Case ID

Scenario ID

Description

Type (Positive/Negative/Edge Case)

Input values

Expected results

⚠️ Known Issues
Cypress may throw cross-origin script errors due to third-party scripts.

To bypass such issues, the following configuration is used in the test file:

js
Copy
Edit
Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // prevents test from failing due to external script errors
});
