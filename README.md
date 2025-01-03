This app converts your XLSX transactions file from ActivoBank and imports it to BudgetBaker's Wallet using module [wallet-budgetbakers-import](https://github.com/josecoelhomelo/wallet-budgetbakers-import).

# Usage
Put your XLSX file inside a directory called `activobank`. If there are multiple files inside, the app will consider the latest one. Then, create a `.env` file and fill the required information.
```env
USER =
PASSWORD =
IMPORT_EMAIL =
```
You may also specify `ACCOUNT_ID` if you have multiple accounts in Wallet.

You can retrieve the import e-mail in Wallet's account settings and the account identification in the URL, when navigating to the account detail.

Finally, run the file with Node.js:
```
node app.js
```
Only new/unexisting records will be considered. However, because ActivoBank doesn't track time, make sure you run the app at the end of the day and/or without expecting any new transactions for that day.