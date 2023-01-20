let token;
let user;
let messages = [
    {
        id: 1,
        author: "Atrio",
        text: "Oi",
        time: "2023-01-19 18:54:55"
    },
    {
        id: 2,
        author: "Nmd",
        text: "Oi",
        time: "2023-01-19 18:55:40"
    },
    {
        id: 3,
        author: "Atrio",
        text: "As mensagens já estão funcionando?",
        time: "2023-01-19 18:56:18"
    },
    {
        id: 4,
        author: "Nmd",
        text: "Não",
        time: "2023-01-19 18:56:44"
    }
];

function getUsers() {
    const users = axios.get('http://146.190.166.253:4000/users');
    let repetitions = 0;

    console.log (repetitions);

    users.then((res) => {
        console.log(res.data);
        document.querySelector(`#allContainer`).innerHTML = ``;
        for (let i=0; i < res.data.length; i++) {
            document.querySelector(`#allContainer`).innerHTML += `
            <li class="user2" onclick="openSelectedUser(${res.data[i].id})">
                <img src="${res.data[i].profilePic}" alt="" class="pfp">
                <span class="user2Nick">${res.data[i].username}</span>
            </li>
            `;
        }
    })
};

function openSelectedUser(userId) {
    const users = axios.get('http://146.190.166.253:4000/users');
    users.then((res) => {
        console.log
    })
    showMessages();
};

function showMessages() {

};

function openMainPage(){
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const startingPage = document.querySelector(".startingPage");
    const pfp = document.querySelector(".pfp");

    header.classList.toggle("hidden");
    main.classList.toggle("hidden");
    startingPage.classList.toggle("hidden");
    pfp.src = ``


    setInterval(getUsers, 1000);
};

function logon(){
    const username = document.querySelector(`#registerNick`).value;
    const userpassword = document.querySelector(`#registerPass`).value;
    const userpassword2 = document.querySelector(`#registerPass2`).value;
    const userPfp = document.querySelector(`#registerImage`).value;

    console.log(username);

    if (userpassword !== userpassword2) {
        return(alert("ERRO! As senhas estão diferentes!"));
    };

    axios.post(
        "http://146.190.166.253:4000/signup",
        {
            username: `${username}`,
            password: `${userpassword}`,
            profilePic: `${userPfp}`
        }
    )
    .then((res) => {
        //criar mudança de página
        console.log(res.status);
        token = res.data;
        openMainPage();
        
    })
    .catch((err) => {
        console.log(err.message);
        if (err.response.status === 409) {
            return(alert(`Nome de usuário indisponível, tente outro.`));
        }
        else if (err.response.status === 422) {
            return(alert(`URL de imagem inválida, apenas URL de imagens podem ser usadas, favor tentar outra URL`));
        }
    });
};

function login() {
    const username = document.querySelector(`#loginNick`).value;
    const password = document.querySelector(`#loginPass`).value;

    const promise = axios.post(
        'http://146.190.166.253:4000/signin',
        {
            username: `${username}`,
            password: `${password}`
        }
    );

    promise.then((res) => {
        console.log(res.status);

        token = res.data;
        openMainPage();

    });
    promise.catch((err) => {
        console.log(err.message);
        if (err.response.status === 401) {
            return(alert(`Senha incorreta!`));
        }
        else if (err.response.status === 404) {
            return(alert(`Usuário não encontrado!`));
        }
    });
};