const socket = io.connect();

const addProduct = document.getElementById('form-product');
addProduct.addEventListener('submit', e => {
    e.preventDefault();
    const product = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    };
    socket.emit('update', product);
    addProduct.reset();
    console.log(product)
});

socket.on('productos', productos => {
    addTable(productos).then(html => {
       document.getElementById('products').innerHTML = html;
    });
});

function addTable(products) {
    return fetch('../views/main.hbs')
        .then(ans => ans.text())
        .then(template => {
            const temp = Handlebars.compile(template);
            return temp({products});
        });
}

const email = document.getElementById('email');
const inputMessage = document.getElementById('inputMessage');
const button = document.getElementById('sendButton');

const formSendMessage = document.getElementById('form-message');
formSendMessage.addEventListener('submit', e => {
    e.preventDefault();
    const message = {mail: email.value, text: inputMessage.value}
    socket.emit('newMessage', message);
    formSendMessage.reset();
    inputMessage.focus();
});

socket.on('messages', messages => {
    document.getElementById('messages').innerHTML = messagesHTML(messages);
});

function messagesHTML(messages) {
    console.log(messages)
    return messages.map( message => {
        return(`
        <div>
            <b style="color:blue;">${message.mail}</b>
            [<span style="color:brown;">${message.date}</span>] :
                <i style="color:green;">${message.text}</i>
        </div>
        `)
    }).join(' ');
}

email.addEventListener('input', () => {
    const emailValid = email.value.length;
    inputMessage.disabled =!emailValid;
    button.disabled = !emailValid;
})

inputMessage.addEventListener('input', () => {
    const textValid = inputMessage.value.length;
    button.disabled = !textValid;
})