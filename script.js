function createDates() {
    var dates = [];
    for (let m = 1; m < 13; m++) {
        let mm = m
        if (m < 10) {
            mm = "0" + mm;
        }
        for (let d = 1; d < 32; d++) {
            let dd = d
            if (d < 10) {
                dd = "0" + dd;
            }
            
            if ((m == 2 && d > 28) || ((m == 4 || m == 6 || m == 9 || m == 11) && d > 30) || (d > 31)) {
                continue;
            }
            
            dates.push("2024-" + mm + "-" + dd);
        }
    }
    return dates;
}

// console.log(createDates());
var dates = createDates();
console.log(dates);

function convertToCSV(data) {
    const csvContent = data.map(row => row.join(',')).join('\n');
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}

function download(filename, tableData) {
    const csvData = convertToCSV(tableData);

    const element = document.createElement('a');
    element.setAttribute('href', csvData);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

let tableData = [];

function extractTableData(date, ii, jj, kk) {
    var tbody = document.querySelector('tbody');
    
    if (!tbody) {
        console.error('Table body not found.');
        return;
    }

    var confd = document.getElementById("जिला").getElementsByTagName("option")[ii].text;
    var confr = document.getElementById("यूएलबी_का_चयन_करें").getElementsByTagName("option")[jj].text;
    var confu = document.getElementById("रसोई_नंबर_का_चयन_करें").getElementsByTagName("option")[kk].text;;

    console.log("YE HAI DILLI   " + confd);

    for (var i = 0; i < tbody.rows.length; i++) {
        var row = tbody.rows[i];
        var rowData = [];
        
        if (row.cells[0].textContent == confd) {
            for (var j = 0; j < row.cells.length; j++) {
                rowData.push(row.cells[j].textContent);
            }
            if (rowData.length > 0) {
                rowData.push(date);
            }
        }
        else {
            rowData.push(confd, confr, "", confu, "", date);
        }
        tableData.push(rowData);
    }
}

// firstDropdownOptions.length
// secondDropdownOptions.length
// thirdDropdownOptions.length

const firstDropdown = document.getElementById('जिला');

const firstDropdownOptions = firstDropdown.getElementsByTagName('option');

// console.log(dates);

function print(dates) {
    console.log(dates);
}

for (let i = 2; i < 3; i++) {
    firstDropdown.selectedIndex = i;

    const firstDropdownChangeEvent = new Event('change', { bubbles: true });
    firstDropdown.dispatchEvent(firstDropdownChangeEvent);

    await new Promise(resolve => setTimeout(resolve, 500));

    const selectedFirstOptionText = firstDropdownOptions[i].text;
    console.log(`Selected First Option: ${selectedFirstOptionText}`);

    const secondDropdown = document.getElementById('यूएलबी_का_चयन_करें');

    const secondDropdownOptions = secondDropdown.getElementsByTagName('option');

    for (let j = 1; j < 2; j++) {
        secondDropdown.selectedIndex = j;

        const secondDropdownChangeEvent = new Event('change', { bubbles: true });
        secondDropdown.dispatchEvent(secondDropdownChangeEvent);

        await new Promise(resolve => setTimeout(resolve, 500));

        const selectedSecondOptionText = secondDropdownOptions[j].text;
        console.log(`Selected Second Option: ${selectedSecondOptionText}`);

        const thirdDropdown = document.getElementById('रसोई_नंबर_का_चयन_करें');

        const thirdDropdownOptions = thirdDropdown.getElementsByTagName('option');

        for (let k = 2; k < 3; k++) {
            thirdDropdown.selectedIndex = k;

            const thirdDropdownChangeEvent = new Event('change', { bubbles: true });
            thirdDropdown.dispatchEvent(thirdDropdownChangeEvent);

            await new Promise(resolve => setTimeout(resolve, 500));

            const selectedThirdOptionText = thirdDropdownOptions[k].text;
            console.log(`Selected Third Option: ${selectedThirdOptionText}`);

            const dateInput = document.querySelector('input[controlname="दिनांक"]');
            // const providedDate = '2024-01-10';

            const date_value = dates[0];
            dateInput.value = date_value;
            const dateChangeEvent = new Event('change', { bubbles: true });
            dateInput.dispatchEvent(dateChangeEvent);
            await new Promise(resolve => setTimeout(resolve, 2000));

            var btnSubmit = document.getElementById('btnSubmit');
            btnSubmit.click();
            document.addEventListener('DOMContentLoaded', print(date_value));
            await new Promise(resolve => setTimeout(resolve, 6000));
            extractTableData(date_value, i, j, k);
            // await new Promise(resolve => setTimeout(resolve, 3000));

            for (let z = 1; z < dates.length; z++) {
                const date_value = dates[z];
                dateInput.value = date_value;
                const dateChangeEvent = new Event('change', { bubbles: true });
                dateInput.dispatchEvent(dateChangeEvent);
                await new Promise(resolve => setTimeout(resolve, 1000));

                var btnSubmit = document.getElementById('btnSubmit');
                btnSubmit.click();
                document.addEventListener('DOMContentLoaded', print(date_value));
                await new Promise(resolve => setTimeout(resolve, 800));
                extractTableData(date_value, i, j, k);
                
            }

            download("data.csv", tableData);
        }
    }
}
