const initializeApp = require('firebase/app')


function firebaseServiceProvider (){
	const firebaseConfig = {
		apiKey: "AIzaSyAvuUwb7R858nBlDFkEK7KVN1gzghGcmrE",
		authDomain: "my-first-project-4f321.firebaseapp.com",
		projectId: "my-first-project-4f321",
		storageBucket: "my-first-project-4f321.appspot.com",
		messagingSenderId: "467111421322",
		appId: "1:467111421322:web:d9a43f7af8bb103c7fd473",
	};


	return initializeApp(firebaseConfig)
}


module.exports = {firebaseServiceProvider}


