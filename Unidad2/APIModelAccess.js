class APIModelAccess
{
	constructor()
	{
		this._authData = new Map();
		this._maxLoginFailedAttempts = 3;

		this.loadFromLocalStorage();
		
		if (this._authData.size === 0)
		{
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

			this._authData.set('scorpion', userData[0]);
			this._authData.set('subZero', userData[1]);
			this.saveToLocalStorage();
		}
	}

	loadFromLocalStorage()
	{
		const data = localStorage.getItem('authData');
		if (data) {
			const obj = JSON.parse(data);
			for (let username in obj) {
				this._authData.set(username, obj[username]);
			}
		}
	}

	saveToLocalStorage()
	{
		const obj = {};
		for (let [username, userData] of this._authData.entries()) {
			obj[username] = userData;
		}
		localStorage.setItem('authData', JSON.stringify(obj));
	}

	isValidUserGetData(username)
	{
		return this._authData.get(username);
	}

	authenticateUser(username, password)
	{
		let api_return = { status: false, result: null };

		if (username && password) 
		{
			let userdata = this.isValidUserGetData(username);

			if (userdata && userdata.isLocked === false)
			{
				if (userdata.password === password)
				{
					api_return.status = true;
				}
				else
				{
					userdata.failedLoginCounter++;

					if (userdata.failedLoginCounter >= this._maxLoginFailedAttempts)
					{
						userdata.isLocked = true;
						api_return.result = 'BLOCKED_USER';
					}
					else
					{
						api_return.result = 'USER_PASSWORD_FAILED';
					}
					this.saveToLocalStorage();
				}
			}
			else if (userdata && userdata.isLocked)
			{
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
			return { status: false, result: "USERNAME_EXISTS" };
		}

		let validation = this.passwordRequirements(password);
		if (!validation.valid) {
			return { status: false, result: validation.errors };
		}

		this._authData.set(username, {
			password: password,
			failedLoginCounter: 0,
			isLocked: false
		});
		this.saveToLocalStorage();

		return { status: true };
	}

	passwordRequirements(newPassword)
	{
		let result = { valid: true, errors: [] };

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
		if (newPassword && newPassword.trim() !== "") {
			const updateUser = this._authData.get(username);
			if (!updateUser) return false;

			updateUser.password = newPassword;
			this.saveToLocalStorage();
			return true;
		}
		return false;
	}
}

export { APIModelAccess };