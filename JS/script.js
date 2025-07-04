// Espera a página carregar completamente antes de executar os comandos
// W3Schools: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
document.addEventListener('DOMContentLoaded', function () {

    // ========== BOTÃO DE TEMA ESCURO/CLARO ==========

    // Seleciona o elemento com a classe 'header-actions'
    // W3Schools: https://www.w3schools.com/jsref/met_document_queryselector.asp
    const headerActions = document.querySelector('.header-actions');

    // Se o elemento 'headerActions' existe e o botão ainda não foi criado
    if (headerActions) {

        // Cria o botão
        // W3Schools: https://www.w3schools.com/jsref/met_document_createelement.asp
        const themeButton = document.createElement('button');

        // Define o ID e conteúdo do botão
        // W3Schools: https://www.w3schools.com/jsref/prop_node_id.asp
        themeButton.id = 'toggleTheme';

        // Define o texto do botão
        // W3Schools: https://www.w3schools.com/jsref/prop_node_textcontent.asp
        themeButton.textContent = '🌙 Tema Escuro';

        // Define a classe CSS
        // W3Schools: https://www.w3schools.com/jsref/prop_html_classname.asp
        themeButton.className = 'subscribe-btn';

        // Adiciona o botão ao elemento pai
        // W3Schools: https://www.w3schools.com/jsref/met_node_appendchild.asp
        headerActions.appendChild(themeButton);

        // Recupera o tema salvo no localStorage e aplica
        // W3Schools: https://www.w3schools.com/jsref/prop_win_localstorage.asp
        if (localStorage.getItem('tema') === 'escuro') {
            // Adiciona classe para modo escuro
            // W3Schools: https://www.w3schools.com/jsref/prop_element_classlist.asp
            document.body.classList.add('dark-mode');
            themeButton.textContent = '☀️ Tema Claro';
        }

        // Alterna o tema ao clicar no botão
        // W3Schools: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Verifica se o modo escuro está ativo
            const modoEscuroAtivo = document.body.classList.contains('dark-mode');
            themeButton.textContent = modoEscuroAtivo ? '☀️ Tema Claro' : '🌙 Tema Escuro';

            // Salva a preferência no localStorage
            localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
        });
    }

    // ========== VALIDAÇÃO DO FORMULÁRIO ==========

    // Seleciona o formulário
    // W3Schools: https://www.w3schools.com/jsref/met_document_queryselector.asp
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            // Seleciona os campos do formulário
            const nome = document.querySelector('#nome');
            const email = document.querySelector('#email');
            const telefone = document.querySelector('#telefone');
            const planoSelecionado = document.querySelector('input[name="plano"]:checked');
            const pagamento = document.querySelector('#pagamento');

            let mensagens = [];

            // Validação básica dos campos
            if (!nome.value.trim()) mensagens.push("Nome é obrigatório.");
            if (!email.value.trim() || !email.value.includes('@')) mensagens.push("E-mail válido é obrigatório.");
            if (!telefone.value.trim()) mensagens.push("Telefone é obrigatório.");
            if (!planoSelecionado) mensagens.push("Selecione um plano.");
            if (!pagamento.value || pagamento.value === "Selecione...") mensagens.push("Escolha uma forma de pagamento.");

            // Impede o envio do formulário se houver erros
            // W3Schools: https://www.w3schools.com/jsref/event_preventdefault.asp
            if (mensagens.length > 0) {
                e.preventDefault();
                // Exibe os erros em um alerta
                // W3Schools: https://www.w3schools.com/jsref/met_win_alert.asp
                alert("Erro!:\n\n" + mensagens.join('\n'));
            }
        });
    }

    // ======== CARROSSEL DE COTAÇÕES (TICKER) ========

    // Seleciona o elemento ticker para o carrossel
    // W3Schools: https://www.w3schools.com/jsref/met_document_queryselector.asp
    const ticker = document.querySelector('.ticker');

    // DUPLICA OS ITENS PARA ROLAÇÃO INFINITA
    // W3Schools: https://www.w3schools.com/jsref/prop_html_innerhtml.asp
    ticker.innerHTML += ticker.innerHTML;

    let isPaused = false;

    // Pausa o carrossel ao passar o mouse
    // W3Schools: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    ticker.addEventListener('mouseover', () => isPaused = true);
    ticker.addEventListener('mouseout', () => isPaused = false);

    // Movimento automático do carrossel
    let scrollAmount = 0;
    function autoScroll() {
        if (!isPaused) {
            scrollAmount += 1;
            // Desloca o scroll horizontalmente
            // W3Schools: https://www.w3schools.com/jsref/prop_element_scrollleft.asp
            ticker.scrollLeft = scrollAmount;

            // Reseta para início para rotação contínua
            if (scrollAmount >= ticker.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }
        // Solicita próximo frame para animação suave
        // W3Schools: https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
        requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // Suporte a arrastar com mouse ou toque

    let isDown = false;
    let startX;
    let scrollLeft;

    // Evento ao pressionar botão do mouse
    // W3Schools: https://www.w3schools.com/jsref/event_mousedown.asp
    ticker.addEventListener('mousedown', (e) => {
        isDown = true;
        ticker.classList.add('dragging');
        startX = e.pageX - ticker.offsetLeft;
        scrollLeft = ticker.scrollLeft;
    });

    // Evento ao tirar o mouse de cima do ticker
    // W3Schools: https://www.w3schools.com/jsref/event_mouseleave.asp
    ticker.addEventListener('mouseleave', () => {
        isDown = false;
        ticker.classList.remove('dragging');
    });

    // Evento ao soltar o botão do mouse
    // W3Schools: https://www.w3schools.com/jsref/event_mouseup.asp
    ticker.addEventListener('mouseup', () => {
        isDown = false;
        ticker.classList.remove('dragging');
    });

    // Evento ao mover o mouse
    // W3Schools: https://www.w3schools.com/jsref/event_mousemove.asp
    ticker.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // Impede comportamento padrão como seleção de texto
        // W3Schools: https://www.w3schools.com/jsref/event_preventdefault.asp
        const x = e.pageX - ticker.offsetLeft;
        const walk = (x - startX) * 2; // Velocidade do arrasto
        ticker.scrollLeft = scrollLeft - walk;
    });

});
