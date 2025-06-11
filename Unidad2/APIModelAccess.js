class APIModelAccess
{
	constructor()
	{
		this._authData = new Map();
		this._maxLoginFailedAttempts = 3;
		
		let userData =
		[
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			}
		]

		this._authData.set('scorpion', userData[0] );
		this._authData.set('subZero', userData[1] );
	}

	isValidUserGetData( username )
	{
		return this._authData.get(username);
	}

	authenticateUser( username, password )
	{
		let api_return = 
		{
			status: false,
			result: null
		};


		if ( (username != undefined && username != null && username != '') && (password != undefined && password != null && password != '') )
		{
			let userdata = this.isValidUserGetData(username);

			if ( userdata.isLocked == false )
			{
				if( userdata.password === password )
				{
					api_return.status = true;
				}
				else
				{
					api_return.status = false;
					api_return.result = 'USER_PASSWORD_FAILED';

					userdata.failedLoginCounter++;
					
					if ( userdata.failedLoginCounter == this._maxLoginFailedAttempts )
					{
						userdata.isLocked = true;
						api_return.status = false;
						api_return.result = 'BLOCKED_USER';
					}
				}
			}
			else
			{
				api_return.status = false;
				api_return.result = 'BLOCKED_USER';
			}
			
		}
		
		return api_return;
	}

	getMaxLoginAttempts()
	{
		return this._maxLoginFailedAttempts;
	}

	registerUser(username, password) 
	{
		if (this._authData.has(username)) {
			return {
				status: false,
				result: "USERNAME_EXISTS"
			};
		}

		let validation = this.passwordRequirements(password);
		if (!validation.valid) {
			return {
				status: false,
				result: validation.errors
			};
		}

		this._authData.set(username, {
			password: password,
			failedLoginCounter: 0,
			isLocked: false
		});

		return {
			status: true
		};
	}

	passwordRequirements(newPassword)
	{
		let result = {
			valid: true,
			errors: []
		};

		if (newPassword.length < 8 || newPassword.length > 16) {
			result.valid = false;
			result.errors.push("INVALID_LENGTH");
		}

		let capital = false;
		let symbolCount = 0;

		for (let c of newPassword) {
			if (/[A-Z]/.test(c)) capital = true;
			if (/[^a-zA-Z0-9]/.test(c)) symbolCount++;
		}

		if (!capital) {
			result.valid = false;
			result.errors.push("MISSING_CAPITAL_LETTER");
		}

		if (symbolCount < 2) {
			result.valid = false;
			result.errors.push("MISSING_SYMBOLS");
		}

		return result;
	}

	changePassword(username, newPassword)
	{
		let newPassword;
		if( newPassword && newPassword.trim() !== "")
		{
			let updateUser = this._authData.get(username);
			updateUser.password = newPassword;
		   
		}
	}

}

class ProductAPI
{
	constructor()
	{
		this._products = [
			{   
				code: "1", 
				name: "Lavandina 1L", 
				price: 875.25, 
				stock: 3000
			},
			{ 
				code: "4", 
				name: "Detergente 500ml", 
				price: 1102.45, 
				stock: 2010 
			},
			{
				code: "22",
				name: "Jabon en polvo 250g",
				price: 650.22,
				stock: 407
			},
		];
		
	}

	listProducts() 
	{
        return this._products;
    }

	createProduct(code, name, price, stock) 
	{
        const newProduct = { code, name, price, stock };
        this._products.push(newProduct);
        return newProduct;
    }

	updateProduct(code, newName, newPrice, newStock)
	{
        for (let i = 0; i < this._products.length; i++) {
            if (this._products[i].code === code) {
                this._products[i].name = newName;
                this._products[i].price = newPrice;
                this._products[i].stock = newStock;
                return true;
            }
        }
        return false;
    }

	deleteProduct(code) 
	{
        for (let i = 0; i < this._products.length; i++) {
            if (this._products[i].code === code) {
                this._products.splice(i, 1);
                return true;
            }
        }
        return false;
    }

	buyProduct(name, units) 
	{
		for (let i = 0; i < this._products.length; i++) {
			if (this._products[i].name.toLowerCase() === name.toLowerCase()) {
				if (this._products[i].stock >= units) {
					this._products[i].stock -= units;
					return true;
				} else {
					return false; 
				}
			}
		}
		return null; 
	}
}

export { APIModelAccess , ProductAPI};