let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
	// Code specific to development mode
	baseUrl = 'http://localhost:5005/api/v1';
	console.log('Running in development mode');
} else {
	//glomax-api-1901b8e6064a.herokuapp.com/
	https: baseUrl = 'https://glomax-api-1901b8e6064a.herokuapp.com/api/v1';
	// Code specific to production mode
	console.log('Running in production mode');
}
console.log('baseUrl', baseUrl);
export default baseUrl;
