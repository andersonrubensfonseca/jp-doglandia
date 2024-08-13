async function login(event) {
    event.preventDefault();
    const form = document.getElementById('formLogin');
    const formData = new FormData(form)
    let data = {}
    formData.forEach((value,key)=>{
        data[key] = value
    })
    fetch('http://localhost:3333/login', {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Tipo de conteúdo
        },
        body: JSON.stringify(data), // Dados a serem enviados, convertidos para JSON
      }).then(response => {
        if (!response.ok) {
            const res = JSON.parse(response)
            form.reset()
            const toastmessage = document.getElementById('toastmessage');
            toastmessage.innerHTML = res.message
            const toast = new bootstrap.Toast(document.getElementById('toastAlert')) 
            toast.show();
        }
        return response.json(); // Converte a resposta para JSON
      }).then(data => {
        console.log(data); // Manipula os dados recebidos
        localStorage.setItem('credential',JSON.stringify(data))
        window.location='dash.html'
      }).catch(error => {
        form.reset()
        const toastmessage = document.getElementById('toastmessage');
        toastmessage.innerHTML = "Credendiais Inválidas"
        const toast = new bootstrap.Toast(document.getElementById('toastAlert')) 
        toast.show();
      });
    
    return false
}

async function sair(params) {
    localStorage.clear();
    window.location = 'login.html'
}

async function listaAnimais(
    cachorros = [
        {
            nome: "Rex",
            foto: "https://www.petlove.com.br/images/breeds/193219/profile/original/labrador-p.jpg?1532539172",
            tutor: "João Silva",
            idade: 5,
            breveDescricao: "Rex é um labrador muito amigável e cheio de energia. Adora brincar no parque e é muito leal à sua família."
        },
        {
            nome: "Bella",
            foto: "https://blog-static.petlove.com.br/wp-content/uploads/2018/05/beagle-filhote.jpg",
            tutor: "Maria Oliveira",
            idade: 3,
            breveDescricao: "Bella é uma beagle curiosa e inteligente. Ela adora caçar e é ótima com crianças."
        },
        {
            nome: "Max",
            foto: "https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270",
            tutor: "Carlos Souza",
            idade: 7,
            breveDescricao: "Max é um pastor alemão protetor e gentil. É um excelente cão de guarda e adora longas caminhadas."
        },
        {
            nome: "Luna",
            foto: "https://blog-static.petlove.com.br/wp-content/uploads/2022/11/10133544/nomes-para-Poodle-Petlove.jpg",
            tutor: "Ana Costa",
            idade: 4,
            breveDescricao: "Luna é uma cachorrinha Poodle que é muito carinhosa e adora estar perto de seus tutores. Ela é bem treinada e ama passeios."
        }
    ]) {
    const listaAnimais = document.getElementById('listaAnimais');
    listaAnimais.innerHTML = ''; // Limpa o conteúdo da div

    cachorros.forEach(cachorro => {
        // Cria o elemento do cartão
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';

        card.innerHTML = `
            <div class="card">
                <img src="${cachorro.foto}" class="card-img"" alt="Foto de ${cachorro.nome}">
                <div class="card-body">
                    <h5 class="card-title">${cachorro.nome}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Idade: ${cachorro.idade} anos</h6>
                    <p class="card-text">${cachorro.breveDescricao}</p>
                    <p class="card-text"><small class="text-muted">Tutor: ${cachorro.tutor}</small></p>
                </div>
            </div>
        `;

        // Adiciona o cartão à div
        listaAnimais.appendChild(card);
    });
}

listaAnimais()

function filtrarCachorros(event) {
    event.preventDefault()
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const  cachorros = [
        {
            nome: "Rex",
            foto: "https://www.petlove.com.br/images/breeds/193219/profile/original/labrador-p.jpg?1532539172",
            tutor: "João Silva",
            idade: 5,
            breveDescricao: "Rex é um labrador muito amigável e cheio de energia. Adora brincar no parque e é muito leal à sua família."
        },
        {
            nome: "Bella",
            foto: "https://blog-static.petlove.com.br/wp-content/uploads/2018/05/beagle-filhote.jpg",
            tutor: "Maria Oliveira",
            idade: 3,
            breveDescricao: "Bella é uma beagle curiosa e inteligente. Ela adora caçar e é ótima com crianças."
        },
        {
            nome: "Max",
            foto: "https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270",
            tutor: "Carlos Souza",
            idade: 7,
            breveDescricao: "Max é um pastor alemão protetor e gentil. É um excelente cão de guarda e adora longas caminhadas."
        },
        {
            nome: "Luna",
            foto: "https://blog-static.petlove.com.br/wp-content/uploads/2022/11/10133544/nomes-para-Poodle-Petlove.jpg",
            tutor: "Ana Costa",
            idade: 4,
            breveDescricao: "Luna é uma cachorrinha Poodle que é muito carinhosa e adora estar perto de seus tutores. Ela é bem treinada e ama passeios."
        }
    ]
    const cachorrosFiltrados = cachorros.filter(cachorro =>
        cachorro.nome.toLowerCase().includes(searchInput) ||
        cachorro.tutor.toLowerCase().includes(searchInput)
    );

    listaAnimais(cachorrosFiltrados);
    return false;
}

let nomePagina = document.getElementsByTagName('title')[0].innerHTML   

if(nomePagina !== 'Sistema'){
    const user = JSON.parse(localStorage.getItem('credential'))
    if(!user){
        window.location = 'login.html'
    }
    const nomeuser = document.getElementById('nomeuser');
    nomeuser.innerHTML= `Bem vindo(a) ${user.name}`
}

async function listaUsuarios(params) {
    fetch('http://localhost:3333/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer SEU_TOKEN_AQUI`,
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        // Seleciona o corpo da tabela onde as linhas serão inseridas
        const tableBody = document.getElementById('user-table-body');
    
        // Preenche a tabela com dados
        data.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // Adiciona as células da linha
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        `;
        
        // Adiciona a linha ao corpo da tabela
        tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
}

if(nomePagina==='Sistema - Usuários'){
    listaUsuarios()
}