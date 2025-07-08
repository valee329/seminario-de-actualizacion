class LoginApplicationView
{
	constructor(apiInstanceObject, appInstance, productInstanceObject)
{
    this._api = apiInstanceObject;
    this._app = appInstance;
    this._productController = productInstanceObject;
    this._lastUsername = null;
}


GUI_mainMenu()
	{

		let option = prompt("Menú principal:\n1. Iniciar sesión\n2. Crear cuenta de usuario");
		switch (option) {
			case '1':
				this._app.run();
				break;
			case '2':
				this.GUI_register();
				this._app.run();
				break;
            case '3':    
                this.GUI_productMenu();
            	break;
			default:
				alert("Opción no válida. Intente de nuevo.");
            	this.GUI_mainMenu();
		}
	}

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

	GUI_menu( username)
	{
	
		let option = prompt (`Bienvenido ${username}. \nSeleccione una opción:\n1. Cambiar contraseña\n2. Gestionar productos\n3. Salir`);
		switch (option) {
			case '1':
				this.GUI_changePassword();
				break;
			case '2':
				this.GUI_productMenu();
				break;
            case '3':    
                this._app.init();
				break;
			default:
				alert("Opción no válida. Intente de nuevo.");
                this.GUI_menu();
		}

	}

	GUI_register() 
	{
		let username = prompt("Ingrese un nombre de usuario nuevo:");
		if (!username || username.trim() === "") {
			alert("Nombre de usuario inválido.");
			return;
		}

		let password = prompt("Ingrese una contraseña para el nuevo usuario:");
		let result = this._api.registerUser(username, password);

		if (!result.status) {
			if (result.result === "USERNAME_EXISTS") {
				alert("El nombre de usuario ya existe.");
			} else {
				this.GUI_passwordRequirement(result.result); 
			}
			return;
		}

		alert("Cuenta creada exitosamente.");
	}
	
	GUI_passwordRequirement(errors) 
	{
		for (let error of errors) {
			switch (error) {
				case "INVALID_LENGTH":
					alert("- La contraseña debe tener entre 8 y 16 caracteres.");
					break;
				case "MISSING_CAPITAL_LETTER":
					alert("- Debe contener al menos una letra mayúscula.");
					break;
				case "MISSING_SYMBOLS":
					alert("- Debe contener al menos dos símbolos especiales.");
					break;
			}
		}
	}

	GUI_changePassword(username) 
	{
		alert("La contraseña debe cumplir los siguientes requisitos:\n- Entre 8 y 16 caracteres\n- Al menos una mayúscula\n- Al menos dos símbolos especiales (espacios incluidos)");

		let newPassword = prompt("Ingrese nueva contraseña:");
		let validation = this._api.passwordRequirements(newPassword);

		if (validation.valid) {
			const success = this._api.changePassword(username, newPassword);
			if (success) {
			alert("Contraseña actualizada correctamente.");
			} else {
			alert("Error al cambiar la contraseña.");
			} 
		} else {
			this.GUI_passwordRequirement(validation.errors);
			this.GUI_changePassword(username); 
		}
	}

	GUI_productMenu() {
		let option;
		do {
			option = prompt(
				"Gestión de productos:\n" +
				"1. Listar productos\n" +
				"2. Añadir producto\n" +
				"3. Editar producto\n" +
				"4. Eliminar producto\n" +
				"5. Comprar producto\n" +
				"6. Salir"
			);
	
			switch (option) {
				case "1":
					this.GUI_listProducts();
					break;
				case "2":
					this.GUI_createProduct();
					break;
				case "3":
					this.GUI_updateProduct();
					break;
				case "4":
					this.GUI_deleteProduct();
					break;
				case "5":
					this.GUI_buyProduct();
					break;
				case "6":
					return;
				default:
					alert("Opción inválida.");
			}
		} while (option !== "6");
	}
	
	GUI_listProducts() 
	{
		const productList = this._productController.listProducts();
		if (productList.length === 0) {
			alert("No se encontraron productos.");
			return;
		}

		let message = "Lista de Productos:\n\n";
		productList.forEach(p => {
			message += `Código: ${p.code}\nNombre: ${p.name}\nPrecio: $${p.price}\nStock: ${p.stock}\n\n`;
		});
		alert(message);
	}

	GUI_createProduct() 
	{
		const code = prompt("Código del producto:");
		const name = prompt("Nombre del producto:");
		const price = parseFloat(prompt("Precio:"));
		const stock = parseInt(prompt("Stock:"), 10);

		if (!code || !name || isNaN(price) || isNaN(stock)) {
			alert("Datos inválidos.");
			return;
		}

		const product = this._productController.createProduct(code, name, price, stock);
		alert(`Producto "${product.name}" añadido exitosamente.`);
	}

	GUI_updateProduct() 
	{
		const code = prompt("Código del producto a editar:");
		const product = this._productController.listProducts().find(p => p.code === code);

		if (!product) {
			alert("Producto no encontrado.");
			return;
		}

		const newName = prompt("Nuevo nombre:", product.name);
		const newPrice = parseFloat(prompt("Nuevo precio:", product.price));
		const newStock = parseInt(prompt("Nuevo stock:", product.stock), 10);

		if (!newName || isNaN(newPrice) || isNaN(newStock)) {
			alert("Datos inválidos.");
			return;
		}

		this._productController.updateProduct(code, newName, newPrice, newStock);
		alert("Producto actualizado.");
	}

	GUI_deleteProduct()
	{
		const code = prompt("Código del producto a eliminar:");
		const success = this._productController.deleteProduct(code);
		alert(success ? "Producto eliminado." : "Producto no encontrado.");
	}

	GUI_buyProduct() 
	{
		const name = prompt("¿Qué producto desea comprar?\nVerifique su nombre correcto en la lista de productos:");
		const products = this._productController.listProducts();
		const productFound = products.find(function(p)
			{return p.name.toLowerCase() === name.toLowerCase()});
	
		if (!productFound) {
			alert("Producto no encontrado o mal escrito.");
			this.GUI_buyProduct(); 
			return;
		}
	
		const unitsStr = prompt(`¿Cuántos productos desea añadir a su carrito?`);
		const units = parseInt(unitsStr);
	
		if (isNaN(units) || units <= 0) {
			alert("Lo sentimos, no hay stock.");
			return;
		}
	
		const success = this._productController.buyProduct(name, units);
	
		if (success === true) {
			alert(`Su compra ha sido efectuada correctamente.`);
		} else if (success === false) {
			alert("No se pudo efectuar su compra.");
		}
	}
}

export { LoginApplicationView };