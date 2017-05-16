import Raven from 'raven-core';
import $ from 'jquery';
import './src/modules/methods';

//build the site object
class App_Build {
	constructor() {
		$(document).ready(() => {
			Raven.call("events");			
		});
	}
}

const app = new App_Build();
