
const perfis = [
    {
        id: "java",
        nome: "Desenvolvimento Java",
        categoria: "Programação",
        descricao: "Você gosta de lógica, programação e de criar sistemas para resolver problemas. A trilha Java combina com seu interesse por tecnologia e desenvolvimento.",
        icone: "💻"
    },
    {
        id: "ia",
        nome: "IA e Dados",
        categoria: "Inteligência Artificial e Análise",
        descricao: "Você gosta de investigar informações, encontrar padrões e descobrir como os dados podem ajudar a resolver problemas. IA e Dados é uma trilha para explorar essas habilidades.",
        icone: "🤖"
    },
    {
        id: "gestao",
        nome: "Gestão",
        categoria: "Planejamento e Liderança",
        descricao: "Você gosta de organizar tarefas, planejar projetos e ajudar equipes a alcançar objetivos. A trilha de Gestão combina com seu interesse por organização e decisões.",
        icone: "📊"
    },
    {
        id: "marketing",
        nome: "Marketing",
        categoria: "Criatividade e Comunicação",
        descricao: "Você gosta de criar ideias, comunicar mensagens e pensar em formas de alcançar pessoas. A trilha de Marketing combina com seu interesse por criatividade e divulgação.",
        icone: "🎯"
    }
];

const formulario = document.getElementById("quiz-form");
const resultado = document.getElementById("resultado");
const nascimento = document.getElementById("nascimento");

const hoje = new Date();
const hojeFormatado = new Date(
    hoje.getTime() - hoje.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

nascimento.max = hojeFormatado;

function calcularIdade(data) {
    const dataNascimento = new Date(data + "T00:00:00");

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() === dataNascimento.getMonth() &&
         hoje.getDate() < dataNascimento.getDate());

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = nascimento.value;

    if (!nome || !data) {
        alert("Preencha seu nome e sua data de nascimento.");
        return;
    }

    if (data > hojeFormatado) {
        alert("A data de nascimento não pode ser futura.");
        return;
    }

    const idade = calcularIdade(data);
    const respostas = new FormData(formulario);

    const pontuacao = {
        java: 0,
        ia: 0,
        gestao: 0,
        marketing: 0
    };

    ["q1", "q2", "q3", "q4"].forEach(function(pergunta) {
        const resposta = respostas.get(pergunta);

        if (resposta && pontuacao[resposta] !== undefined) {
            pontuacao[resposta]++;
        }
    });

    const maiorPontuacao = Math.max(...Object.values(pontuacao));

    const vencedores = Object.keys(pontuacao).filter(function(trilha) {
        return pontuacao[trilha] === maiorPontuacao;
    });

    document.getElementById("pessoa").textContent =
        `${nome} • ${idade} ${idade === 1 ? "ano" : "anos"}`;

    if (vencedores.length > 1) {
        const nomes = perfis
            .filter(perfil => vencedores.includes(perfil.id))
            .map(perfil => perfil.nome)
            .join(" e ");

        document.getElementById("icone").textContent = "✨";
        document.getElementById("perfil").textContent = "Perfil em combinação!";
        document.getElementById("categoria").textContent = "Empate entre trilhas";
        document.getElementById("descricao").textContent =
            `Suas respostas combinaram com estas trilhas: ${nomes}. Você demonstra interesses variados!`;
    } else {
        const perfil = perfis.find(function(item) {
            return item.id === vencedores[0];
        });

        document.getElementById("icone").textContent = perfil.icone;
        document.getElementById("perfil").textContent = perfil.nome;
        document.getElementById("categoria").textContent = perfil.categoria;
        document.getElementById("descricao").textContent = perfil.descricao;
    }

    resultado.hidden = false;
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();
    resultado.hidden = true;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.getElementById("nome").focus();
});
