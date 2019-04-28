import '../styles/index.scss';
import $ from 'jquery';

console.log('webpack starterkit');

// let user = {
//     'avatar': "https://s3.amazonaws.com/uifaces/faces/twitter/scrapdnb/128.jpg",
//     'createdAt': "2019-04-28T03:05:29.332Z",
//     'id': "1000",
//     'name': "Abhishek Goenka"
// }
// let promise = $.post('https://5cc57207f24a0f0014cd1cee.mockapi.io/users', user);
// promise.then(data => console.log(data));

let promise = $.get('https://5cc57207f24a0f0014cd1cee.mockapi.io/users');
promise.then(data => console.log(data));