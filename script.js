// Setando as variáveis
let fundo = document.getElementsByTagName('main')[0];

let botaoCadastro = document.getElementsByName('botaoCadastro')[0];
let botaoLogin = document.getElementsByName('botaoLogin')[0];

let caixaCadastro = document.getElementsByName('caixaCadastro')[0];
let caixaLogin = document.getElementsByName('caixaLogin')[0];

let fecharCadastro = document.getElementsByName('fecharCadastro')[0];
let fecharLogin = document.getElementsByName('fecharLogin')[0];

let Cadastrar = document.getElementsByName('Cadastrar')[0];
let Entrar = document.getElementsByName('Entrar')[0];

let Logout = document.getElementsByName('Logout')[0];
let Usuarios = document.getElementsByName('Usuarios')[0];

let boxUsers = document.getElementsByName('boxUsers')[0];
let apresentar = document.getElementsByName('apresentar')[0];
let UsuariosSair = document.getElementsByName('UsuariosSair')[0];

let Perfil = document.getElementsByName('perfil')[0];
let PerfilUser = document.getElementsByName('PerfilUsers')[0];
let mostrarInfo = document.getElementsByName('mostrarInfo')[0];
let sairPerfil = document.getElementsByName('SairPerfil')[0];
let seg = 0

// Variável de estado de login
let loggedIn = false;

// Setando o Array com os Objetos
let Comunidade = [];
let cont = 0;

// Setando as funções
function OpenBox(Open) {
    Open.classList.remove('invisible');
    Open.classList.add('visible');
    botaoCadastro.style.display = 'none';
    botaoLogin.style.display = 'none';
    fundo.style.backgroundColor = '#275950'
}

function CloseBox(Close) {
    Close.classList.remove('visible');
    Close.classList.add('invisible');
    fundo.style.backgroundColor = '#2A8C82'
    if (loggedIn) {
        botaoCadastro.style.display = 'none';
        botaoLogin.style.display = 'none';
    } else {
        botaoCadastro.style.display = 'block';
        botaoLogin.style.display = 'block';
    }
}

function Cadastrando() {
    let Nome = document.getElementsByName('Nome')[0].value;
    let Idade = document.getElementsByName('Idade')[0].value;
    let Email = document.getElementsByName('Email')[0].value;
    Email = Email.toLowerCase()
    let Senha = document.getElementsByName('Senha')[0].value;

    if (Nome.length === 0 || Idade.length === 0 || Email.length === 0 || Senha.length === 0) {
        alert('Preencha todas as informações!');
    } else {
        if (Email.includes('@gmail.com')  && Email.length > 10){
            if (Senha.length >= 8 && Senha.length <= 20){
                alert('Seu cadastro foi feito com sucesso!');

            // Criando um novo objeto User
            let User = {
                nome: Nome,
                idade: Idade,
                email: Email,
                senha: Senha
            };
    
            // Adicionando o usuário à comunidade
            Comunidade[cont] = User;
            cont++;
    
            // Limpando os campos
            document.getElementsByName('Nome')[0].value = '';
            document.getElementsByName('Idade')[0].value = '';
            document.getElementsByName('Email')[0].value = '';
            document.getElementsByName('Senha')[0].value = ''; 
            }
            else{
                alert('Sua senha deve conter de 8 a 20 caracteres')
            }   
        }
        else{
            alert('Seu email deve estar escrito adequadamente e conter "@gmail.com" ao final')
        } 
    }
}

function Logando() {
    let LoginEmail = document.getElementsByName('LoginEmail')[0].value;
    let LoginSenha = document.getElementsByName('LoginSenha')[0].value;
    let Conectado = document.getElementsByName('Conectado')[0];

    if (LoginEmail.length === 0 || LoginSenha.length === 0) {
        alert('Preencha todas as informações!');
    } else {
        loggedIn = false; // Reinicia a variável para controle de login
        if (LoginEmail === 'Admin' && LoginSenha === 'admin123'){
            alert('Acessou o usuário Administrador');
            Conectado.innerHTML = `Conectado: Admnistrador`;
            Conectado.style.color = 'red';
            Logout.classList.remove('sumir');
            Usuarios.classList.remove('sumir');
            loggedIn = true;

            Usuarios.classList.remove('sumir');
        }

        for (let c = 0; c < Comunidade.length; c++) {
            if (Comunidade[c]['email'] == LoginEmail && Comunidade[c]['senha'] == LoginSenha) {
                alert('Acessou!!');

                Conectado.innerHTML = `Conectado: ${Comunidade[c]['nome']}`
                seg = c
                Conectado.style.color = '#260101';
                Logout.classList.remove('sumir');
                Perfil.classList.remove('sumir');

                loggedIn = true; // Define que o login foi bem-sucedido
                break; // Sai do loop após login bem-sucedido
            }
        }

        if (!loggedIn) {
            alert('Email ou senha incorretos!'); // Mensagem de erro
        }

        // Limpando os campos de login
        document.getElementsByName('LoginEmail')[0].value = '';
        document.getElementsByName('LoginSenha')[0].value = '';
    }
}

function Saindo() {
    let Conectado = document.getElementsByName('Conectado')[0];

    loggedIn = false; // Atualiza o estado de login
    Logout.classList.add('sumir')
    Conectado.innerHTML = `Nenhum Usuário Logado`
    Conectado.style.color = 'white'

    botaoCadastro.style.display = 'block';
    botaoLogin.style.display = 'block';

    Usuarios.classList.add('sumir');
    Perfil.classList.add('sumir');
}

function mostrarUsuarios(){
    if(Comunidade.length != 0){
        OpenBox(boxUsers);
       for(let a = 0; a < Comunidade.length; a++){
        let p = document.createElement('p');
        p.textContent = `${Comunidade[a]['nome']}`
        p.classList.add('mostrarUsuario')
        apresentar.appendChild(p);
       }
    } 
    else{
        alert('Não tem usuários cadastrados')
    }
}

function mostrarInformações(){
        par = document.createElement('p');
        par.classList.add('mostrarUsuario')
        par.innerHTML = `Nome: ${Comunidade[seg]['nome']}<br>
        Idade: ${Comunidade[seg]['idade']}<br>
        Email: ${Comunidade[seg]['email']}<br>
        Senha: ${Comunidade[seg]['senha']}`;
        mostrarInfo.appendChild(par)
}

// Atribuindo as execuções
botaoCadastro.addEventListener('click', function() {
    OpenBox(caixaCadastro);
});
botaoLogin.addEventListener('click', function() {
    OpenBox(caixaLogin);
});

fecharCadastro.addEventListener('click', function() {
    CloseBox(caixaCadastro);
});
fecharLogin.addEventListener('click', function() {
    CloseBox(caixaLogin);
});
Cadastrar.addEventListener('click', function() {
    Cadastrando();
});
Entrar.addEventListener('click', function() {
    Logando();
});
Logout.addEventListener('click', function(){
    Saindo();
    seg = 0
});
Usuarios.addEventListener('click', function(){
    mostrarUsuarios();  
})
UsuariosSair.addEventListener('click', function(){
    CloseBox(boxUsers)
    apresentar.textContent = ''
})
Perfil.addEventListener('click', function(){
    mostrarInformações()
    OpenBox(PerfilUser)
})
sairPerfil.addEventListener('click', function(){
    CloseBox(PerfilUser)
    par.innerHTML = ''
})