import { APIModelAccess } from './APIModelAccess.js';
import { Application } from './Application.js';
import { ProductController } from './ProductController.js';



function main()
{
	let model = new APIModelAccess();
	let productModel = new ProductController();
	let app = new Application(model, productModel);


	app.init();
	app.run();

}

window.onload = main;