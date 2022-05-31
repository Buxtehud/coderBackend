import {denormalize, schema} from "normalizr";

const socket = io.connect();

//Products--------------------------------------------------------------------------------------------------------------
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

//Messages--------------------------------------------------------------------------------------------------------------

//Desnormalización de los mensajes--------------------------------------------------------------------------------------

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'id'});
const schemaMessage = new schema.Entity('message', {author: schemaAuthor}, {idAttribute: 'id'});
const schemaMessages = new schema.Entity('messages', {messages: [schemaMessage]}, {idAttribute: 'id'});

const email = document.getElementById('email');
const name = document.getElementById('name');
const lastname = document.getElementById('apellido');
const age = document.getElementById('edad');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');
const inputMessage = document.getElementById('inputMessage');
const button = document.getElementById('sendButton');

const formSendMessage = document.getElementById('form-message');
formSendMessage.addEventListener('submit', e => {
    e.preventDefault();
    const message = {
        author: {
            id: email.value,
            name: name.value,
            lastname: lastname.value,
            age: age.value,
            alias: alias.value,
            avatar: avatar.value
        },
        text: inputMessage.value
    }
    socket.emit('newMessage', message);
    formSendMessage.reset();
    inputMessage.focus();
});

socket.on('messages', messages => {
    const messagesNormalizedSize = JSON.stringify(messages).length;
    const messageDesnormalized = denormalize(messages.result, schemaMessages, messages.entities);
    const messagesDesnormalizedSize = JSON.stringify(messageDesnormalized).length;
    const percentageCompressed = Math.round((messagesNormalizedSize - messagesDesnormalizedSize) / messagesNormalizedSize * 100);

    document.getElementById('compression').innerText = `${percentageCompressed}%`;

    document.getElementById('messages').innerHTML = messagesHTML(messages);
});

function messagesHTML(messages) {
    console.log(messages)
    return messages.map( message => {
        return(`
        <div>
            <b style="color:blue;">${message.author.email}</b>
            [<span style="color:brown;">${message.date}</span>] :
            <i style="color:green;">${message.text}</i>
            <img width="50" src="${message.author.avatar}" alt=" ">
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