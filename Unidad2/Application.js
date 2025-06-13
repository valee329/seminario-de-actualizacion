import { LoginApplicationView } from './LoginApplicationView.js';

class Application
{
	constructor(apiInstanceObject, productInstanceObject)
	{
		this._api = apiInstanceObject;
		this._productAPI = productInstanceObject;
		this._defaultView = new LoginApplicationView(this._api, this._productAPI);		
		this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
		this._attempts = 0;
		this._api_return = null;
	}

	init()
	{
		this._api_return = this._defaultView.show();
	}

	run()
	{
		while( this._api_return.result == 'USER_PASSWORD_FAILED' && this._attempts < this._maxLoginFailedAttempts )
		{
			this._api_return = this._defaultView.show();

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}
		}

		if(this._api_return.status === true) 
		{
			const username = this._defaultView.getLastUsername();
			this._defaultView.GUI_menu( username);
		}
	}


}

export { Application };