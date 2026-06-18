// ==========================================
// 1. URL DO GOOGLE APPS SCRIPT
// ==========================================
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyiitVhZvidUpSBIcIikL46wSTZFnz84IyxxvUWZzNL-5qrgrEfXBHMKuOJrn2RUJGa/exec";

// ==========================================
// 2. BASE DE DADOS DOS JOGOS
// ==========================================
const jogosCopas = [
    { id: 1, data: "18/06/2026", horario: "13:00", grupo: "Grupo A", time1: "República Tcheca", bandeira1: "cz", time2: "África do Sul", bandeira2: "za" },
    { id: 2, data: "18/06/2026", horario: "16:00", grupo: "Grupo B", time1: "Suíça", bandeira1: "ch", time2: "Bósnia", bandeira2: "ba" },
    { id: 3, data: "18/06/2026", horario: "19:00", grupo: "Grupo B", time1: "Canadá", bandeira1: "ca", time2: "Catar", bandeira2: "qa" },
    { id: 4, data: "18/06/2026", horario: "22:00", grupo: "Grupo A", time1: "México", bandeira1: "mx", time2: "Coreia do Sul", bandeira2: "kr" },
    { id: 5, data: "19/06/2026", horario: "16:00", grupo: "Grupo D", time1: "Estados Unidos", bandeira1: "us", time2: "Austrália", bandeira2: "au" },
    { id: 6, data: "19/06/2026", horario: "19:00", grupo: "Grupo C", time1: "Escócia", bandeira1: "gb-sct", time2: "Marrocos", bandeira2: "ma" },
    { id: 7, data: "19/06/2026", horario: "21:30", grupo: "Grupo C", time1: "BRASIL", bandeira1: "br", time2: "Haiti", bandeira2: "ht" },
    { id: 8, data: "19/06/2026", horario: "01:00 (Sáb)", grupo: "Grupo D", time1: "Turquia", bandeira1: "tr", time2: "Paraguai", bandeira2: "py" },
    { id: 9, data: "20/06/2026", horario: "14:00", grupo: "Grupo F", time1: "Holanda", bandeira1: "nl", time2: "Suécia", bandeira2: "se" },
    { id: 10, data: "20/06/2026", horario: "17:00", grupo: "Grupo E", time1: "Alemanha", bandeira1: "de", time2: "Costa do Marfim", bandeira2: "ci" },
    { id: 11, data: "20/06/2026", horario: "21:00", grupo: "Grupo E", time1: "Equador", bandeira1: "ec", time2: "Curaçao", bandeira2: "cw" },
    { id: 12, data: "20/06/2026", horario: "01:00 (Dom)", grupo: "Grupo F", time1: "Tunísia", bandeira1: "tn", time2: "Japão", bandeira2: "jp" },
    { id: 13, data: "21/06/2026", horario: "13:00", grupo: "Grupo H", time1: "Espanha", bandeira1: "es", time2: "Arábia Saudita", bandeira2: "sa" },
    { id: 14, data: "21/06/2026", horario: "16:00", grupo: "Grupo G", time1: "Bélgica", bandeira1: "be", time2: "Irã", bandeira2: "ir" },
    { id: 15, data: "21/06/2026", horario: "19:00", grupo: "Grupo H", time1: "Uruguai", bandeira1: "uy", time2: "Cabo Verde", bandeira2: "cv" },
    { id: 16, data: "21/06/2026", horario: "22:00", grupo: "Grupo G", time1: "Nova Zelândia", bandeira1: "nz", time2: "Egito", bandeira2: "eg" },
    { id: 17, data: "22/06/2026", horario: "14:00", grupo: "Grupo J", time1: "Argentina", bandeira1: "ar", time2: "Áustria", bandeira2: "at" },
    { id: 18, data: "22/06/2026", horario: "18:00", grupo: "Grupo I", time1: "França", bandeira1: "fr", time2: "Iraque", bandeira2: "iq" },
    { id: 19, data: "22/06/2026", horario: "21:00", grupo: "Grupo I", time1: "Noruega", bandeira1: "no", time2: "Senegal", bandeira2: "sn" },
    { id: 20, data: "22/06/2026", horario: "00:00 (Ter)", grupo: "Grupo J", time1: "Jordânia", bandeira1: "jo", time2: "Argélia", bandeira2: "dz" },
    { id: 21, data: "23/06/2026", horario: "14:00", grupo: "Grupo K", time1: "Portugal", bandeira1: "pt", time2: "Uzbequistão", bandeira2: "uz" },
    { id: 22, data: "23/06/2026", horario: "17:00", grupo: "Grupo L", time1: "Inglaterra", bandeira1: "gb-eng", time2: "Gana", bandeira2: "gh" },
    { id: 23, data: "23/06/2026", horario: "20:00", grupo: "Grupo L", time1: "Panamá", bandeira1: "pa", time2: "Croácia", bandeira2: "hr" },
    { id: 24, data: "23/06/2026", horario: "23:00", grupo: "Grupo K", time1: "Colômbia", bandeira1: "co", time2: "RD Congo", bandeira2: "cd" }
];

// ==========================================
// 3. INICIALIZAÇÃO INTELIGENTE POR PÁGINA
// ==========================================
let dadosGlobais = null;

document.addEventListener("DOMContentLoaded", () => {
    // Se a página atual tiver a div de jogos (palpites.html), desenha os jogos
    if (document.getElementById('container-jogos')) {
        renderizarJogos();
    }

    // Se a página for de dados (ranking, resultados ou auditoria), puxa da planilha
    if (document.getElementById('ranking-body') || 
        document.getElementById('container-resultados') || 
        document.getElementById('select-participante')) {
        carregarDadosServidor();
    }
});

// ==========================================
// 4. FUNÇÕES DE RENDERIZAÇÃO (TELA DE PALPITES)
// ==========================================
function renderizarJogos() {
    const container = document.getElementById('container-jogos');
    if (!container) return; 
    container.innerHTML = ""; 

    jogosCopas.forEach(jogo => {
        const card = document.createElement('div');
        card.className = "match-card";
        card.setAttribute('data-match', jogo.id);

        card.innerHTML = `
            <div class="match-meta">${jogo.data} às ${jogo.horario} — ${jogo.grupo}</div>
            <div class="match-teams">
                <div class="team team-home">
                    <img src="https://flagcdn.com/h24/${jogo.bandeira1}.png" alt="${jogo.time1}">
                    <span>${jogo.time1}</span>
                </div>
                <div class="score-inputs">
                    <input type="number" min="0" class="score-in home-score" placeholder="0">
                    <span>x</span>
                    <input type="number" min="0" class="score-in away-score" placeholder="0">
                </div>
                <div class="team team-away">
                    <span>${jogo.time2}</span>
                    <img src="https://flagcdn.com/h24/${jogo.bandeira2}.png" alt="${jogo.time2}">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 5. GATILHOS EXCLUSIVOS DA TELA DE PALPITES (FORMULÁRIO E MÁSCARA)
// ==========================================
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

const formBolao = document.getElementById('bolao-form');
if (formBolao) {
    formBolao.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('btn-submit');
        btn.disabled = true;
        btn.innerText = "Processando palpites...";

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        
        let palpites = [];
        const matchCards = document.querySelectorAll('.match-card');
        
        matchCards.forEach(card => {
            let hScore = card.querySelector('.home-score').value;
            let aScore = card.querySelector('.away-score').value;
            
            hScore = hScore === "" ? 0 : parseInt(hScore);
            aScore = aScore === "" ? 0 : parseInt(aScore);
            
            palpites.push({
                matchId: card.getAttribute('data-match'),
                placar1: hScore,
                placar2: aScore
            });
        });

        const element = document.getElementById('capture-area');
        const nomeLimpo = nome.trim().replace(/\s+/g, '_').toUpperCase();
        const celularLimpo = telefone.replace(/\D/g, '');
        const nomeArquivo = `COMPROVANTE_BOLAO_${nomeLimpo}_${celularLimpo}.pdf`;

        const opt = {
            margin: [10, 5, 10, 5],
            filename: nomeArquivo,
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            image: { type: 'jpeg', quality: 0.8 },
            html2canvas: { scale: 1.5, useCORS: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();

        const payload = {
            nome: nome,
            telefone: telefone,
            palpites: palpites
        };

        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(() => {
            alert("Sucesso! O comprovante foi salvo no seu dispositivo e os dados foram registrados na planilha.");
            btn.disabled = false;
            btn.innerText = "Submeter e Exportar Resultados";
            formBolao.reset(); // Limpa o formulário após o sucesso
        })
        .catch(err => {
            console.error(err);
            alert("Falha na comunicação com o servidor. Tente novamente.");
            btn.disabled = false;
            btn.innerText = "Submeter e Exportar Resultados";
        });
    });
}

// ==========================================
// 6. CARREGAMENTO E RENDERIZAÇÃO DE DADOS (Telas: Ranking, Resultados, Auditoria)
// ==========================================
function carregarDadosServidor() {
    const tbodyRanking = document.getElementById('ranking-body');
    const containerResultados = document.getElementById('container-resultados');
    const containerAuditoria = document.getElementById('container-auditoria');

    if (tbodyRanking) tbodyRanking.innerHTML = `<tr><td colspan="3" style="text-align: center;">⏳ Conectando à planilha...</td></tr>`;
    if (containerResultados) containerResultados.innerHTML = `<p style="text-align: center;">⏳ Baixando resultados oficiais...</p>`;

    fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                dadosGlobais = data;
                if (tbodyRanking) renderizarRanking(data.ranking);
                if (containerResultados) renderizarResultadosOficiais(data.resultadosOficiais);
                if (document.getElementById('select-participante')) popularSelectParticipantes(data.todosPalpites);
            } else {
                if (tbodyRanking) tbodyRanking.innerHTML = `<tr><td colspan="3">Erro ao ler os dados.</td></tr>`;
            }
        })
        .catch(err => {
            console.error(err);
            if (tbodyRanking) tbodyRanking.innerHTML = `<tr><td colspan="3">Falha de conexão.</td></tr>`;
        });
}

function renderizarRanking(rankingList) {
    const tbody = document.getElementById('ranking-body');
    if(!tbody) return;
    tbody.innerHTML = "";

    if(rankingList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Nenhum palpite registrado ainda.</td></tr>`;
        return;
    }

    rankingList.forEach((user, index) => {
        let icone = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}º`;
        tbody.innerHTML += `
            <tr>
                <td>${icone}</td>
                <td>${user.nome}</td>
                <td><strong>${user.pontos} pts</strong></td>
            </tr>
        `;
    });
}

function renderizarResultadosOficiais(resultados) {
    const container = document.getElementById('container-resultados');
    if(!container) return;
    container.innerHTML = "";

    resultados.forEach(res => {
        const j = jogosCopas.find(jogo => jogo.id === res.jogo);
        if(!j) return;

        let placar1 = res.placar1 !== null ? res.placar1 : "-";
        let placar2 = res.placar2 !== null ? res.placar2 : "-";

        container.innerHTML += `
            <div class="match-card">
                <div class="match-meta">Jogo ${j.id} — ${j.data}</div>
                <div class="match-teams">
                    <div class="team team-home">
                        <img src="https://flagcdn.com/h24/${j.bandeira1}.png" alt="${j.time1}">
                        <span>${j.time1}</span>
                    </div>
                    <div class="score-inputs">
                        <span class="score-in" style="line-height: 35px; background: #1a4f31;">${placar1}</span>
                        <span>x</span>
                        <span class="score-in" style="line-height: 35px; background: #1a4f31;">${placar2}</span>
                    </div>
                    <div class="team team-away">
                        <span>${j.time2}</span>
                        <img src="https://flagcdn.com/h24/${j.bandeira2}.png" alt="${j.time2}">
                    </div>
                </div>
            </div>
        `;
    });
}

function popularSelectParticipantes(todosPalpites) {
    const select = document.getElementById('select-participante');
    if(!select) return;
    
    select.innerHTML = '<option value="">Selecione um participante...</option>';
    
    todosPalpites.forEach(p => {
        select.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
    });

    select.addEventListener('change', function() {
        const nomeEscolhido = this.value;
        const participante = dadosGlobais.todosPalpites.find(p => p.nome === nomeEscolhido);
        
        if (participante) {
            renderizarPalpitesIndividuais(participante.palpites);
        } else {
            document.getElementById('container-auditoria').innerHTML = "";
        }
    });
}

function renderizarPalpitesIndividuais(palpites) {
    const container = document.getElementById('container-auditoria');
    if(!container) return;
    container.innerHTML = "";

    palpites.forEach(p => {
        const j = jogosCopas.find(jogo => jogo.id === p.jogo);
        if(!j) return;

        container.innerHTML += `
            <div class="match-card">
                <div class="match-meta">Jogo ${j.id} — ${j.data}</div>
                <div class="match-teams">
                    <div class="team team-home">
                        <img src="https://flagcdn.com/h24/${j.bandeira1}.png" alt="${j.time1}">
                        <span>${j.time1}</span>
                    </div>
                    <div class="score-inputs">
                        <span class="score-in" style="line-height: 35px;">${p.placar1}</span>
                        <span>x</span>
                        <span class="score-in" style="line-height: 35px;">${p.placar2}</span>
                    </div>
                    <div class="team team-away">
                        <span>${j.time2}</span>
                        <img src="https://flagcdn.com/h24/${j.bandeira2}.png" alt="${j.time2}">
                    </div>
                </div>
            </div>
        `;
    });
}
