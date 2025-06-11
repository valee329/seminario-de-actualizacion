import { LoginApplicationView } from './LoginApplicationView.js';

class Application
{
	constructor()
	{
		this._api = apiInstanceObject;
		this._defaultView = new LoginApplicationView(this._api);		
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
			this.accessMenu(username);
		}
	}

		

}

export { Application };