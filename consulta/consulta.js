var dataAtual = new Date();
const firebaseConfig = {

    apiKey: "AIzaSyB2OkyEL8IwEJVm39guJ2uKDRnFbGrSuNs",    
    authDomain: "organizer-c70eb.firebaseapp.com",
    projectId: "organizer-c70eb",
    storageBucket: "organizer-c70eb.appspot.com",
    messagingSenderId: "764919847604",
    appId: "1:764919847604:web:eddcaa9646e911f0b115e1",
    measurementId: "G-5SJ2BWTERC"
};
// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


var user = firebase.auth().currentUser;
document.body.style.display = 'none'; // Oculta o conteúdo da página inicialmente

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;

        // Restante do código que depende da autenticação
        var consultaRef = database.ref('/consultas/' + uid + '/-Nk6fMOGc22g6RXx0I5U');

        // Resto do código...

        document.body.style.display = 'block'; // Exibe o conteúdo da página após a autenticação

    } else {
        console.error('Usuário não autenticado.');

        // Redirecionar para a página de login
        window.location.href = 'https://tgszwdv.github.io/organize';
    }
});

// Password for accessing the site
var correctPassword = ""; // Troque pela sua senha

// Show the password modal on page load


document.querySelector('.container').style.display = 'block';



function criarBotaoRemover(key) {
    var button = document.createElement('button');
    button.textContent = 'Remover';
    button.addEventListener('click', function() {
        removerConsulta(key);
    });
    return button;
}

function agendarConsulta() {
    // Verifica o estado de autenticação do usuário
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;

            // Obtém os dados do formulário
            var usuario = document.getElementById('usuario').value;
            var data = document.getElementById('data').value;
            var horario = document.getElementById('horario').value;
            var nomeMedico = document.getElementById('nomeMedico').value;

            var appointmentData = {
                usuario: usuario,
                data: data,
                horario: horario,
                nomeMedico: nomeMedico
            };

            // Adiciona dados ao Firebase Realtime Database associados ao UID do usuário
            var appointmentsRef = database.ref('consultas/' + uid);
            var newAppointmentRef = appointmentsRef.push(appointmentData);

            // Obtemos a chave (key) gerada para a nova consulta
            var appointmentKey = newAppointmentRef.key;

            // Atualiza a exibição
            displayCategorizedAppointments();
        } else {
            console.error('Usuário não autenticado.');
        }
    });
}

function removerConsulta(key) {
    // Pede uma confirmação antes de remover a consulta
    var confirmacao = confirm('Deseja realmente remover esta consulta?');

    if (confirmacao) {
        // Verifica o estado de autenticação do usuário
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                var appointmentsRef = database.ref('consultas/' + uid);

                // Use the correct reference to remove the appointment
                appointmentsRef.child(key).remove();

                // Atualiza a exibição
                displayCategorizedAppointments();
            } else {
                console.error('Usuário não autenticado.');
            }
        });
    }
}

function formatarData(data) {
    var partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0].slice(-4);
}

// Função para exibir as consultas em um container
function exibirConsultas(container, consultas) {
    container.innerHTML = '';

    consultas.forEach(function(consulta) {
        var card = document.createElement('div');
        card.className = 'appointment-card';

        var dataConsulta = new Date(consulta.appointment.data + ' ' + consulta.appointment.horario);
        var diaDaSemana = obterDiaDaSemana(dataConsulta.getDay());

        // Adiciona o botão de editar
        var botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', function() {
            exibirFormularioEdicao(consulta, card);
        });

        card.innerHTML = `
            <p><strong>Usuário:</strong> ${consulta.appointment.usuario}</p>
            <p><strong>Data:</strong> ${formatarData(consulta.appointment.data)} (${diaDaSemana})</p>
            <p><strong>Horário:</strong> ${consulta.appointment.horario}</p>
            <p><strong>Médico:</strong> ${consulta.appointment.nomeMedico}</p>
        `;

        card.appendChild(botaoEditar);

        var botaoRemover = criarBotaoRemover(consulta.key);
        card.appendChild(botaoRemover);
        container.appendChild(card);
    });
}

// Função para exibir o formulário de edição
function exibirFormularioEdicao(consulta, card) {
    if (card.classList.contains('editing')) {
        return;
    }
   card.classList.add('editing');
    // Criação do formulário de edição
    var formularioEdicao = document.createElement('div');
    formularioEdicao.className = 'edit-form';

    var camposEdicao = ['usuario', 'data', 'horario', 'nomeMedico'];

    camposEdicao.forEach(function(campo) {
        var label = document.createElement('label');
        label.textContent = campo.charAt(0).toUpperCase() + campo.slice(1);

        var input = document.createElement('input');
        input.type = 'text';
        input.value = consulta.appointment[campo];

        formularioEdicao.appendChild(label);
        formularioEdicao.appendChild(input);
    });

    // Criação do botão de salvar
    var botaoSalvar = document.createElement('button');
    botaoSalvar.textContent = 'Salvar';
    botaoSalvar.addEventListener('click', function() {
        // Atualiza os dados da consulta no Firebase
        atualizarConsulta(consulta.key, formularioEdicao);
    });

    formularioEdicao.appendChild(botaoSalvar);

    // Adiciona o formulário de edição ao card
    card.appendChild(formularioEdicao);
}

// Função para atualizar os dados da consulta no Firebase
function atualizarConsulta(key, formularioEdicao) {

    var novoUsuario = formularioEdicao.querySelector('input:nth-child(2)').value;
    var novaData = formularioEdicao.querySelector('input:nth-child(4)').value;
    var novoHorario = formularioEdicao.querySelector('input:nth-child(6)').value;
    var novoNomeMedico = formularioEdicao.querySelector('input:nth-child(8)').value;

    var updates = {
        usuario: novoUsuario,
        data: novaData,
        horario: novoHorario,
        nomeMedico: novoNomeMedico
    };

    var appointmentsRef = database.ref('consultas');
    appointmentsRef.child(key).update(updates);

    // Atualiza a exibição
    displayCategorizedAppointments();
}

// Função para obter o nome do dia da semana
function obterDiaDaSemana(numeroDoDia) {
    var diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[numeroDoDia];
}

// Função para categorizar as consultas em Anteriores e Próximas
function categorizarConsultas(consultas) {
    var consultasAnteriores = [];
    var proximasConsultas = [];

    consultas.forEach(function(consulta) {
        var dataConsulta = new Date(consulta.appointment.data + ' ' + consulta.appointment.horario);

        if (dataConsulta < dataAtual) {
            consultasAnteriores.push(consulta);
        } else {
            proximasConsultas.push(consulta);
        }
    });

    return {
        anteriores: consultasAnteriores,
        proximas: proximasConsultas
    };
}

// Função para exibir as consultas categorizadas
function displayCategorizedAppointments() {
    // Verifica o estado de autenticação do usuário
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var appointmentsRef = database.ref('consultas/' + uid);
            var previousContainer = document.getElementById('previous-appointment-container');
            var upcomingContainer = document.getElementById('upcoming-appointment-container');

            appointmentsRef.orderByChild('data').once('value', function (snapshot) {
                var consultas = [];
                snapshot.forEach(function (childSnapshot) {
                    var appointment = childSnapshot.val();
                    var key = childSnapshot.key;
                    consultas.push({ key, appointment });
                });

                // Categoriza as consultas
                var consultasCategorizadas = categorizarConsultas(consultas);

                // Exibe as Consultas Anteriores
                exibirConsultas(previousContainer, consultasCategorizadas.anteriores);

                // Exibe as Próximas Consultas
                exibirConsultas(upcomingContainer, consultasCategorizadas.proximas);
            });
        } else {
            console.error('Usuário não autenticado.');
        }
    });
}
