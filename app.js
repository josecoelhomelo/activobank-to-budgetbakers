import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import ObjectsToCsv from 'objects-to-csv';
import XLSX from 'xlsx';
import wallet from 'wallet-budgetbakers-import';
    accountId: process.env.ACCOUNT_ID
}
const importFolder = 'activobank';
const exportFolder = 'transactions';
if (!fs.existsSync(importFolder) || !fs.readdirSync(importFolder).length) {
    throw Error(`Missing folder ${importFolder} or no files found`);
}
const importFile = fs.readdirSync(importFolder)
    .filter(file => fs.lstatSync(path.join(importFolder, file)).isFile())
    .sort((a, b) => {
        const time = [a, b].reduce((result, file) => {
            result.push(fs.lstatSync(path.join(importFolder, file)).mtime.getTime());
            return result;
        }, []);
        return time[1] - time[0];
    })[0];
const workbook = XLSX.readFile(`${importFolder}/${importFile}`);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
let transactions = XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
    header : ['launch_date', 'value_date', 'description', 'value', 'balance']
})
    .slice(6)
    .reverse()
    .map(record => {
        return {
            date: new Date(Date.UTC(0, 0, record.launch_date - 1)).toISOString(),
            note: record.description,
            amount: record.value >= 0 ? record.value : 0,
            expense: record.value < 0 ? record.value : 0
        }
    });

if (!fs.existsSync(exportFolder)) { fs.mkdirSync(exportFolder); }
const date = new Date(); 
const timestamp = `${date.getFullYear()}-${(`0` + parseInt(date.getMonth()+1)).slice(-2)}-${(`0` + date.getDate()).slice(-2)}T${(`0` + date.getHours()).slice(-2)}-${(`0` + date.getMinutes()).slice(-2)}`;
const file = `${exportFolder}/${timestamp}.csv`;        
const csv = new ObjectsToCsv(transactions); 

(async () => {
    await csv.toDisk(file);
    wallet.uploadFile(walletInfo.username, walletInfo.password, file, walletInfo.importEmail, walletInfo.accountId)
        .then(res => console.log(res))
        .catch(err => console.error(err));
})();