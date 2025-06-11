class LoginApplicationView
{
	constructor(apiInstanceObject)
	{
		this._api = apiInstanceObject;
		this._lastUsername = null;

	}

/*GUI_mainMenu(apiInstanceObject)
	{

		let option = prompt("Menú principal:\n1. Iniciar sesión\n2. Crear cuenta de usuario");
		switch (option) {
			case '1':
				processLogin();
                main();
				break;
			case '2':
				GUI_register();
                main();
				break;
            case '3':    
                GUI_productMenu();
                main();
			default:
				alert("Opción no válida. Intente de nuevo.");
                main();
		}
	}*/

	show()
	{
		let username = window.prompt("Ingrese su nombre de usuario:");
		this._lastUsername = username;
		let password = window.prompt("Ingrese contraseña:");

		let api_return = this._api.authenticateUser( username, password );
		
		if ( api_return.status )
		{
			alert('Usuario autenticado exitosamente');
		}
		else if ( api_return.status == false )
		{
			switch ( api_return.result ) 
			{
				case 'BLOCKED_USER':
					alert('Usuario bloqueado. Contacte al administrador');
				break;

				case 'USER_PASSWORD_FAILED':
					alert('Usuario y/o contraseña incorrecta');
				break;

				default:
					alert('Error desconocido');
				break;
			}
		}

		return api_return;	
	}

	getLastUsername() 
	{
		return this._lastUsername;
	}
	
}

export { LoginApplicationView };