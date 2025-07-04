export class CalculatorComponent extends HTMLElement {
    constructor() {
        super();

        this.display = document.createElement('input');
        this.display.type = 'text';

        this.table = document.createElement('table');
        const buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+']
        ];

        buttons.forEach(rowValues => {
            const row = document.createElement('tr');
            rowValues.forEach(value => {
                const cell = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = value;
                cell.appendChild(button);
                row.appendChild(cell);

                if (value === '=') {
                    button.onclick = () => this.calculate();
                } else {
                    button.onclick = () => this.appendToDisplay(value);
                }
            });
            this.table.appendChild(row);
        });
    }

    connectedCallback() {
        this.appendChild(this.display);
        this.appendChild(this.table);
    }

    disconnectedCallback() {}

    appendToDisplay(value) {
        this.display.value += value;
    }

    calculate() {
        try {
            this.display.value = eval(this.display.value);
        } catch {
            this.display.value = 'Error';
        }
    }
}
