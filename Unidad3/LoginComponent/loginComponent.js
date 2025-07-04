export class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.build();
    }

    build() {
        this.container = document.createElement('div');
        this.container.className = "w3-container w3-half w3-margin-top";
        this.form = document.createElement('form');
        this.form.className = "w3-container w3-card-4";

        this.form.appendChild(this.createInput("Name", "text", true));
        this.form.appendChild(this.createInput("Password", "password", true));
        this.form.appendChild(this.createRadio("Male", "gender", "male", true));
        this.form.appendChild(this.createRadio("Female", "gender", "female"));
        this.form.appendChild(this.createRadio("Don't know (Disabled)", "gender", "", false, true));
        this.form.appendChild(this.createCheckbox("Stay logged in", true));
        this.form.appendChild(this.createButton());

        this.container.appendChild(this.form);
        this.appendChild(this.container);

        this.form.onsubmit = (e) => {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            alert(`Welcome, ${name}`);
        }
    }

    createInput(labelText, type, required = false) {
        const p = document.createElement('p');
        const input = document.createElement('input');
        input.className = "w3-input";
        input.type = type;
        input.style.width = "90%";
        if (required) input.required = true;
        const label = document.createElement('label');
        label.innerText = labelText;
        p.appendChild(input);
        p.appendChild(label);
        return p;
    }

    createRadio(labelText, name, value, checked = false, disabled = false) {
        const p = document.createElement('p');
        const radio = document.createElement('input');
        radio.className = "w3-radio";
        radio.type = "radio";
        radio.name = name;
        radio.value = value;
        if (checked) radio.checked = true;
        if (disabled) radio.disabled = true;
        const label = document.createElement('label');
        label.innerText = labelText;
        p.appendChild(radio);
        p.appendChild(label);
        return p;
    }

    createCheckbox(labelText, checked = false) {
        const p = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.className = "w3-check";
        checkbox.type = "checkbox";
        checkbox.checked = checked;
        const label = document.createElement('label');
        label.innerText = labelText;
        p.appendChild(checkbox);
        p.appendChild(label);
        return p;
    }

    createButton() {
        const p = document.createElement('p');
        const button = document.createElement('button');
        button.className = "w3-button w3-section w3-teal w3-ripple";
        button.type = "submit";
        button.innerText = "Log in";
        p.appendChild(button);
        return p;
    }
}

customElements.define('x-login', LoginComponent);
