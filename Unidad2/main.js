import { APIModelAccess } from './APIModelAccess.js';
import { Application } from './Application.js';
import { ProductAPI } from './APIModelAccess.js';



function main()
{
	let model = new APIModelAccess();
	let productModel = new ProductAPI();
	let app = new Application(model, productModel);


	app.init();
	app.run();

}

window.onload = main;