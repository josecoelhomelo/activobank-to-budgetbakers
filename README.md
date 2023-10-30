This app converts your transactions XLSX file from ActivoBank and imports it to BudgetBaker's Wallet using module [wallet-budgetbakers-import](https://github.com/josecoelhomelo/wallet-budgetbakers-import).

# Usage

Put your XLSX file inside a directory called "activobank". If there are multiple files inside, the app will consider the latest one. Then, create a `.env` file and fill the required information regarding your BudgetBakers' Wallet:

```env
USER =
PASSWORD =
IMPORT_EMAIL =
ACCOUNT_ID = 
```