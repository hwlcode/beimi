import Vue from 'vue';

// import public_method from './public_method.js';


//自己写的方法
Object.defineProperty(
	Vue.prototype,
	'$method',
	{
		// value:public_method
	}
)

