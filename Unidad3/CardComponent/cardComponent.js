export class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = [
            { name: "Basic", color: "w3-black", storage: "10GB", emails: 10, domains: 10, price: 10 },
            { name: "Pro", color: "w3-green", storage: "25GB", emails: 25, domains: 25, price: 25 },
            { name: "Premium", color: "w3-black", storage: "50GB", emails: 50, domains: 50, price: 50 }
        ];
    }

    connectedCallback() {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://www.w3schools.com/w3css/5/w3.css';
        this.shadowRoot.appendChild(style);

        this.render();
    }

    disconnectedCallback() {
        this.shadowRoot.innerHTML = "";
    }

    render() {
        const container = document.createElement('div');
        container.className = "w3-row-padding";

        this.data.forEach(plan => {
            const col = document.createElement('div');
            col.className = "w3-third w3-margin-bottom";

            const ul = document.createElement('ul');
            ul.className = "w3-ul w3-border w3-center w3-hover-shadow";

            ul.innerHTML = `
                <li class="${plan.color} w3-xlarge w3-padding-32">${plan.name}</li>
                <li class="w3-padding-16"><b>${plan.storage}</b> Storage</li>
                <li class="w3-padding-16"><b>${plan.emails}</b> Emails</li>
                <li class="w3-padding-16"><b>${plan.domains}</b> Domains</li>
                <li class="w3-padding-16"><b>Endless</b> Support</li>
                <li class="w3-padding-16">
                    <h2 class="w3-wide">$ ${plan.price}</h2>
                    <span class="w3-opacity">per month</span>
                </li>
                <li class="w3-light-grey w3-padding-24">
                    <button class="w3-button w3-green w3-padding-large">Sign Up</button>
                </li>
            `;

            col.appendChild(ul);
            container.appendChild(col);
        });

        this.shadowRoot.appendChild(container);
    }
}
