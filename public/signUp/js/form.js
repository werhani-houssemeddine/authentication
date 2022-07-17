const form = document.querySelector('form');
const message = document.querySelector('.message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const getValue = target => form[target].value.trim();

    if(getValue('password') != getValue('rePassword')){
        message.innerHTML = '<h3>Password not match !! </h3>';
        return ;
    };
    const data = {
        name: getValue('name'),
        email: getValue('email'),
        password: getValue('password')
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    fetch('/api/signup', options)
    .then(res => res.json())
    .then(info => {
        if(info.err)
            message.innerHTML = `<h3>${info.message}</h3>`;
        
        else window.location = 'http://localhost:3000/';
    })
    .catch(err => console.error(err));
});