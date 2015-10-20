window.addEventListener('load', function() {
    var calculateButton = document.getElementById('calculate'),
        resultElement = document.getElementById('result'),
        heightInput = document.getElementById('height'),
        weightInput = document.getElementById('weight');

    function forEachNodeList(elem, cb) {
        return Array.prototype.forEach.call(elem, cb);
    }

    function calculateBodyMassIndex(weight, height) {
        var bodyMassIndex = weight / Math.pow(height / 100, 2);
        return bodyMassIndex.toFixed(1); /*На відміну від значення індексу в
        завданні, тут воно округлюється до десятої частини згідно з точністю
        значень в таблиці.*/
    }

    function highlightTableRow(id, mode) {
        var row = document.getElementById(id);
        row.classList.add(mode ? 'table__row--' + mode : 'table__row--bad');
    }

    calculateButton.addEventListener('click', function() {
        var tableRows = document.querySelectorAll('#table tbody tr'),
            height = parseFloat(heightInput.value),
            weight = parseFloat(weightInput.value),
            bodyMassIndex;

        forEachNodeList(tableRows, function(row) {
            row.classList.remove('table__row--bad');
            row.classList.remove('table__row--good');
        });

        if (height <= 0 || weight <= 0) {
            alert('Значення повинні бути більше 0!');
        } else if (!height || !weight) {
            alert('Потрібно заповнити усі поля! Значення має бути числом.');
        } else {
            bodyMassIndex = calculateBodyMassIndex(weight, height);
            resultElement.textContent = bodyMassIndex;

            if (bodyMassIndex < 18.5) {
                highlightTableRow('result1');
            } else if (bodyMassIndex >= 18.5 && bodyMassIndex <= 24.9) {
                highlightTableRow('result2', 'good');
            } else if (bodyMassIndex >= 25 && bodyMassIndex <= 29.9) {
                highlightTableRow('result3');
            } else if (bodyMassIndex >= 30 && bodyMassIndex <= 34.9) {
                highlightTableRow('result4');
            } else if (bodyMassIndex >= 35 && bodyMassIndex <= 39.9) {
                highlightTableRow('result5');
            } else {
                highlightTableRow('result6');
            }

        }
    }, false);

}, false);
