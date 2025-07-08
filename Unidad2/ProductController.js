class ProductController
{
	constructor()
	{
		this._products = [];

		this.loadFromSessionStorage();

		if (this._products.length === 0)
		{
			this._products = [
				{ code: "1", name: "Lavandina 1L", price: 875.25, stock: 3000 },
				{ code: "4", name: "Detergente 500ml", price: 1102.45, stock: 2010 },
				{ code: "22", name: "Jabon en polvo 250g", price: 650.22, stock: 407 },
			];
			this.saveToSessionStorage();
		}
	}

	loadFromSessionStorage()
	{
		const data = sessionStorage.getItem('products');
		if (data) {
			this._products = JSON.parse(data);
		}
	}

	saveToSessionStorage()
	{
		sessionStorage.setItem('products', JSON.stringify(this._products));
	}

	listProducts()
	{
		return this._products;
	}

	createProduct(code, name, price, stock)
	{
		const newProduct = { code, name, price, stock };
		this._products.push(newProduct);
		this.saveToSessionStorage();
		return newProduct;
	}

	updateProduct(code, newName, newPrice, newStock)
	{
		for (let product of this._products) {
			if (product.code === code) {
				product.name = newName;
				product.price = newPrice;
				product.stock = newStock;
				this.saveToSessionStorage();
				return true;
			}
		}
		return false;
	}

	deleteProduct(code)
	{
		const index = this._products.findIndex(p => p.code === code);
		if (index !== -1) {
			this._products.splice(index, 1);
			this.saveToSessionStorage();
			return true;
		}
		return false;
	}

	buyProduct(name, units)
	{
		for (let product of this._products) {
			if (product.name.toLowerCase() === name.toLowerCase()) {
				if (product.stock >= units) {
					product.stock -= units;
					this.saveToSessionStorage();
					return true;
				} else {
					return false;
				}
			}
		}
		return null;
	}
}

export { ProductController };