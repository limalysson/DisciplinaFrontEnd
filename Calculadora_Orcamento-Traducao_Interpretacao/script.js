// Função para mudar entre os tipos de serviço
function mudarServico() {
    const tipoServico = document.getElementById('tipoServico').value;
    const secaoInterpretacao = document.getElementById('secaoInterpretacao');
    const secaoTraducao = document.getElementById('secaoTraducao');
    const resultado = document.getElementById('resultado');

    // Esconde ambas as seções
    secaoInterpretacao.style.display = 'none';
    secaoTraducao.style.display = 'none';
    resultado.style.display = 'none';

    // Mostra a seção selecionada
    if (tipoServico === 'interpretacao') {
        secaoInterpretacao.style.display = 'block';
    } else if (tipoServico === 'traducao') {
        secaoTraducao.style.display = 'block';
    }
}

// Função para calcular orçamento de INTERPRETAÇÃO
function calcularInterpretacao() {
    // Captura os valores do formulário
    const nomeEvento = document.getElementById('nomeEvento').value;
    const tipoEvento = document.getElementById('tipoEvento').value;
    const tempoEvento = parseFloat(document.getElementById('tempoEvento').value);
    const gravado = document.getElementById('gravado').value;
    const endereco = document.getElementById('endereco').value;

    // Validação
    if (!nomeEvento || !tipoEvento || !tempoEvento || tempoEvento <= 0) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente!');
        return;
    }

    // Converte tempo de minutos para horas
    const tempoHoras = tempoEvento / 60;

    // Define valor da hora e quantidade de profissionais
    let valorHora = 144; // Valor padrão
    let quantidadeProfissionais = 1;

    // Se for artístico/cultural, valor é R$ 192
    if (tipoEvento === 'Artístico/Cultural') {
        valorHora = 192;
    }

    // Define quantidade de profissionais baseado no tempo
    if (tempoHoras > 1 && tempoHoras < 6) {
        quantidadeProfissionais = 2;
    }

    // Calcula valor total das horas
    const valorTotalHoras = valorHora * tempoHoras * quantidadeProfissionais;

    // Calcula direito de imagem (10% se gravado)
    let percentualDireito = 0;
    let valorDireito = 0;
    if (gravado === 'Sim') {
        percentualDireito = 10;
        valorDireito = valorTotalHoras * (percentualDireito / 100);
    }

    // Calcula total antes de impostos
    const totalAntesDosImpostos = valorTotalHoras + valorDireito;

    // Calcula impostos (15,5%)
    const percentualImposto = 15.5;
    const valorImposto = totalAntesDosImpostos * (percentualImposto / 100);

    // Calcula total final
    const totalFinal = totalAntesDosImpostos + valorImposto;

    // Exibe o resultado
    exibirResultadoInterpretacao(
        valorHora,
        quantidadeProfissionais,
        tempoHoras,
        valorTotalHoras,
        percentualDireito,
        valorDireito,
        percentualImposto,
        valorImposto,
        totalFinal,
        nomeEvento,
        tipoEvento,
        endereco
    );
}

// Função para exibir resultado da interpretação
function exibirResultadoInterpretacao(valorHora, qtdProfissionais, tempoHoras, valorTotalHoras, percentualDireito, valorDireito, percentualImposto, valorImposto, totalFinal, nomeEvento, tipoEvento, endereco) {
    const conteudoResultado = document.getElementById('conteudoResultado');
    
    let html = `
        <div class="resultado-item">
            <strong>Evento:</strong>
            <span>${nomeEvento}</span>
        </div>
        <div class="resultado-item">
            <strong>Tipo:</strong>
            <span>${tipoEvento}</span>
        </div>
    `;

    if (endereco) {
        html += `
            <div class="resultado-item">
                <strong>Endereço:</strong>
                <span>${endereco}</span>
            </div>
        `;
    }

    html += `
        <div class="resultado-item">
            <strong>Valor da Hora por Intérprete:</strong>
            <span>R$ ${valorHora.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Quantidade de Intérpretes:</strong>
            <span>${qtdProfissionais}</span>
        </div>
        <div class="resultado-item">
            <strong>Tempo Total de Horas:</strong>
            <span>${tempoHoras.toFixed(2)} horas</span>
        </div>
        <div class="resultado-item">
            <strong>Valor Total das Horas:</strong>
            <span>R$ ${valorTotalHoras.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Porcentagem de Acréscimo (Direito de Imagem):</strong>
            <span>${percentualDireito}%</span>
        </div>
        <div class="resultado-item">
            <strong>Valor do Direito de Imagem:</strong>
            <span>R$ ${valorDireito.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Impostos (${percentualImposto}%):</strong>
            <span>R$ ${valorImposto.toFixed(2)}</span>
        </div>
        <div class="resultado-item" style="border-left-color: #ff6b6b; background: linear-gradient(135deg, #ffe5e5 0%, #fff0f0 100%);">
            <strong style="color: #ff6b6b; font-size: 15px;">VALOR TOTAL A SER PAGO:</strong>
            <span style="color: #ff6b6b; font-size: 22px;">R$ ${totalFinal.toFixed(2)}</span>
        </div>
    `;

    conteudoResultado.innerHTML = html;
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('secaoInterpretacao').style.display = 'none';
}

// Função para calcular orçamento de TRADUÇÃO
function calcularTraducao() {
    // Captura os valores do formulário
    const tituloMaterial = document.getElementById('tituloMaterial').value;
    const tipoMaterial = document.getElementById('tipoMaterial').value;
    const tempoVideo = parseFloat(document.getElementById('tempoVideo').value);
    const legendagem = document.getElementById('legendagem').value;
    const tipoEdicao = document.getElementById('tipoEdicao').value;
    const descricao = document.getElementById('descricao').value;

    // Validação
    if (!tituloMaterial || !tipoMaterial || !tempoVideo || tempoVideo <= 0 || !tipoEdicao) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente!');
        return;
    }

    // Define valor por minuto baseado no tipo de material e legendagem
    let valorMinuto = 0;

    if (tipoMaterial === 'Propaganda de Marcas') {
        valorMinuto = 250;
    } else {
        // VideoBook, Programa de TV, Filme, Documentário
        if (legendagem === 'Sim') {
            valorMinuto = 96;
        } else {
            valorMinuto = 60;
        }
    }

    // Calcula valor total
    const valorTotal = valorMinuto * tempoVideo;

    // Calcula direito de imagem (30%)
    const percentualDireito = 30;
    const valorDireito = valorTotal * (percentualDireito / 100);

    // Calcula total antes de impostos
    const totalAntesDosImpostos = valorTotal + valorDireito;

    // Calcula impostos (15,5%)
    const percentualImposto = 15.5;
    const valorImposto = totalAntesDosImpostos * (percentualImposto / 100);

    // Calcula total final
    const totalFinal = totalAntesDosImpostos + valorImposto;

    // Exibe o resultado
    exibirResultadoTraducao(
        valorMinuto,
        tempoVideo,
        valorTotal,
        percentualDireito,
        valorDireito,
        percentualImposto,
        valorImposto,
        totalFinal,
        tituloMaterial,
        tipoMaterial,
        legendagem,
        tipoEdicao,
        descricao
    );
}

// Função para exibir resultado da tradução
function exibirResultadoTraducao(valorMinuto, tempoVideo, valorTotal, percentualDireito, valorDireito, percentualImposto, valorImposto, totalFinal, tituloMaterial, tipoMaterial, legendagem, tipoEdicao, descricao) {
    const conteudoResultado = document.getElementById('conteudoResultado');
    
    let html = `
        <div class="resultado-item">
            <strong>Título do Material:</strong>
            <span>${tituloMaterial}</span>
        </div>
        <div class="resultado-item">
            <strong>Tipo de Material:</strong>
            <span>${tipoMaterial}</span>
        </div>
        <div class="resultado-item">
            <strong>Legendagem:</strong>
            <span>${legendagem}</span>
        </div>
        <div class="resultado-item">
            <strong>Tipo de Edição:</strong>
            <span>${tipoEdicao}</span>
        </div>
    `;

    if (descricao) {
        html += `
            <div class="resultado-item">
                <strong>Descrição:</strong>
                <span>${descricao}</span>
            </div>
        `;
    }

    html += `
        <div class="resultado-item">
            <strong>Valor do Minuto:</strong>
            <span>R$ ${valorMinuto.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Tempo Total em Minutos:</strong>
            <span>${tempoVideo.toFixed(2)} minutos</span>
        </div>
        <div class="resultado-item">
            <strong>Valor Total:</strong>
            <span>R$ ${valorTotal.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Porcentagem de Acréscimo (Direito de Imagem):</strong>
            <span>${percentualDireito}%</span>
        </div>
        <div class="resultado-item">
            <strong>Valor do Direito de Imagem:</strong>
            <span>R$ ${valorDireito.toFixed(2)}</span>
        </div>
        <div class="resultado-item">
            <strong>Impostos (${percentualImposto}%):</strong>
            <span>R$ ${valorImposto.toFixed(2)}</span>
        </div>
        <div class="resultado-item" style="border-left-color: #ff6b6b; background: linear-gradient(135deg, #ffe5e5 0%, #fff0f0 100%);">
            <strong style="color: #ff6b6b; font-size: 15px;">VALOR TOTAL A SER PAGO:</strong>
            <span style="color: #ff6b6b; font-size: 22px;">R$ ${totalFinal.toFixed(2)}</span>
        </div>
    `;

    conteudoResultado.innerHTML = html;
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('secaoTraducao').style.display = 'none';
}

// Função para limpar o formulário e voltar ao início
function limparFormulario() {
    document.getElementById('tipoServico').value = '';
    document.getElementById('secaoInterpretacao').style.display = 'none';
    document.getElementById('secaoTraducao').style.display = 'none';
    document.getElementById('resultado').style.display = 'none';

    // Limpa campos de interpretação
    document.getElementById('nomeEvento').value = '';
    document.getElementById('tipoEvento').value = '';
    document.getElementById('tempoEvento').value = '';
    document.getElementById('gravado').value = 'Não';
    document.getElementById('endereco').value = '';

    // Limpa campos de tradução
    document.getElementById('tituloMaterial').value = '';
    document.getElementById('tipoMaterial').value = '';
    document.getElementById('tempoVideo').value = '';
    document.getElementById('legendagem').value = 'Não';
    document.getElementById('tipoEdicao').value = '';
    document.getElementById('descricao').value = '';
}
