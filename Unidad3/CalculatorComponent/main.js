import { CalculatorComponent } from './calculatorComponent.js';

customElements.define('x-calculator', CalculatorComponent);

window.onload = () => {
    document.body.appendChild(new CalculatorComponent());
};
