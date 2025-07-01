// Espera a página carregar completamente antes de executar os comandos
// W3Schools: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o elemento com a classe 'header-actions'
    // W3Schools: https://www.w3schools.com/jsref/met_document_queryselector.asp
    const headerActions = document.querySelector('.header-actions');

    // Se o elemento 'headerActions' existe e o botão de tema ainda não foi criado
    if (headerActions && !document.querySelector('#toggleTheme')) {

        // Cria um novo botão 
        // W3Schools: https://www.w3schools.com/jsref/met_document_createelement.asp
        const themeButton = document.createElement('button');

        // Define o ID do botão
        themeButton.id = 'toggleTheme';

        // Define o texto exibido no botão
        // W3Schools: https://www.w3schools.com/jsref/prop_node_textcontent.asp
        themeButton.textContent = '🌙 Tema Escuro';

        // Define a classe CSS do botão
        themeButton.className = 'subscribe-btn';

        // Adiciona o botão criado ao elemento 'headerActions'
        // W3Schools: https://www.w3schools.com/jsref/met_node_appendchild.asp
        headerActions.appendChild(themeButton);

        // Verifica se o tema salvo no localStorage é "escuro"
        // W3Schools: https://www.w3schools.com/jsref/prop_win_localstorage.asp
        if (localStorage.getItem('tema') === 'escuro') {
            document.body.classList.add('dark-mode'); // Ativa a classe dark-mode no body
            // W3Schools: https://www.w3schools.com/jsref/prop_element_classlist.asp
            themeButton.textContent = '☀️ Tema Claro';
        }

        // Ação de clique no botão de tema
        themeButton.addEventListener('click', () => {
            // Alterna a classe "dark-mode" no body (liga/desliga)
            document.body.classList.toggle('dark-mode');

            // Verifica se o modo escuro está ativado
            const modoEscuroAtivo = document.body.classList.contains('dark-mode');

            // Atualiza o texto do botão conforme o modo
            themeButton.textContent = modoEscuroAtivo ? '☀️ Tema Claro' : '🌙 Tema Escuro';

            // Salva o estado atual do tema no localStorage
            localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
        });
    }

    // VALIDAÇÃO DO FORMULÁRIO DE ASSINATURA
    const form = document.querySelector('form'); // Seleciona o formulário da página

    if (form) {
        // Evento ao enviar o formulário
        form.addEventListener('submit', function (e) {

            // coleta os campos do formulário
            const nome = document.querySelector('#nome'); 
            const email = document.querySelector('#email');        
            const telefone = document.querySelector('#telefone');  
            const planoSelecionado = document.querySelector('input[name="plano"]:checked'); // Verifica se algum plano foi selecionado
            const pagamento = document.querySelector('#pagamento'); 

            let mensagens = []; // Lista para armazenar os erros

            // Validações simples
            // W3Schools: https://www.w3schools.com/jsref/jsref_trim_string.asp
            if (!nome.value.trim()) mensagens.push("Nome é obrigatório.");
            if (!email.value.trim() || !email.value.includes('@')) mensagens.push("E-mail válido é obrigatório.");
            if (!telefone.value.trim()) mensagens.push("Telefone é obrigatório.");
            if (!planoSelecionado) mensagens.push("Selecione um plano.");
            if (!pagamento.value || pagamento.value === "Selecione...") mensagens.push("Escolha uma forma de pagamento.");

            // Se houver erros, impede o envio e mostra os erros em alerta
            // W3Schools: https://www.w3schools.com/jsref/event_preventdefault.asp
            if (mensagens.length > 0) {
                e.preventDefault(); // Interrompe o envio do formulário

                // Exibe todos os erros encontrados
                // W3Schools: https://www.w3schools.com/jsref/met_win_alert.asp
                alert("Erro!:\n\n" + mensagens.join('\n'));
            }
        });
    }
});
