function getUsers() {
    const users = axios.get('http://146.190.166.253:4000/users');
    users.then((res) => {
        console.log(res.data);
        document.querySelector(`#allContainer`).innerHTML = ``;
        for (let i=0; i < res.data.length; i++) {
            document.querySelector(`#allContainer`).innerHTML += `
            <li class="user2" onclick="funcao(${res.data[i].id})">
                <img src="${res.data[i].profilePic}" alt="" class="pfp">
                <span class="user2Nick">${res.data[i].username}</span>
            </li>
            `;
        }
    })
}

getUsers();