// Atualizar IMC em tempo real
document.getElementById('peso').addEventListener('input', atualizarIMC);
document.getElementById('altura').addEventListener('input', atualizarIMC);

function atualizarIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (peso > 0 && altura > 0) {
        const imc = peso / (altura * altura);
        const classificacao = getClassificacaoIMC(imc);
        
        document.getElementById('imcDisplay').style.display = 'block';
        document.getElementById('imcValue').textContent = imc.toFixed(2);
        
        const imcClassElement = document.getElementById('imcClassification');
        imcClassElement.textContent = classificacao.texto;
        imcClassElement.style.backgroundColor = classificacao.cor;
        imcClassElement.style.color = classificacao.corTexto;
    } else {
        document.getElementById('imcDisplay').style.display = 'none';
    }
}

function getClassificacaoIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Baixo peso', cor: '#cfe2ff', corTexto: '#084298' };
    } else if (imc >= 18.5 && imc < 25) {
        return { texto: 'Normal', cor: '#d1e7dd', corTexto: '#0f5132' };
    } else if (imc >= 25 && imc < 30) {
        return { texto: 'Sobrepeso', cor: '#fff3cd', corTexto: '#664d03' };
    } else if (imc >= 30 && imc < 35) {
        return { texto: 'Obesidade', cor: '#f8d7da', corTexto: '#842029' };
    } else if (imc >= 35 && imc < 40) {
        return { texto: 'Obesidade Mórbida (Grave)', cor: '#f8d7da', corTexto: '#842029' };
    } else {
        return { texto: 'Obesidade Mórbida (Muito Grave)', cor: '#f8d7da', corTexto: '#842029' };
    }
}

function getFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10; // Abaixo do peso
    } else if (imc >= 18.5 && imc < 25) {
        return 1; // Normal
    } else if (imc >= 25 && imc < 30) {
        return 6; // Sobrepeso
    } else if (imc >= 30 && imc < 35) {
        return 10; // Obesidade
    } else if (imc >= 35 && imc < 40) {
        return 20; // Obesidade mórbida grave
    } else {
        return 30; // Obesidade mórbida muito grave
    }
}

function calcularOperadoraA(idade, imc) {
    const basico = 100 + (idade * 10 * (imc / 10));
    const standard = (150 + (idade * 15)) * (imc / 10);
    const premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    return { basico, standard, premium };
}

function calcularOperadoraB(idade, imc) {
    const fator = getFatorComorbidade(imc);
    
    const basico = 100 + (fator * 10 * (imc / 10));
    const standard = (150 + (fator * 15)) * (imc / 10);
    const premium = (200 - (imc * 10) + (fator * 20)) * (imc / 10);

    return { basico, standard, premium };
}

function calcularPlanos() {
    const idade = parseFloat(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação
    if (!idade || !peso || !altura || idade <= 0 || peso <= 0 || altura <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    // Calcular preços
    const operadoraA = calcularOperadoraA(idade, imc);
    const operadoraB = calcularOperadoraB(idade, imc);

    // Preencher tabela
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const planos = ['Básico', 'Standard', 'Premium'];
    const planosKeys = ['basico', 'standard', 'premium'];
    
    let melhorPlano = null;
    let melhorPreco = Infinity;
    let melhorOperadora = '';

    planos.forEach((plano, index) => {
        const key = planosKeys[index];
        const precoA = operadoraA[key];
        const precoB = operadoraB[key];
        const melhor = precoA < precoB ? 'Operadora A' : 'Operadora B';
        const menorPreco = Math.min(precoA, precoB);

        // Verificar se é o melhor plano geral
        if (menorPreco < melhorPreco) {
            melhorPreco = menorPreco;
            melhorPlano = plano;
            melhorOperadora = melhor;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${plano}</strong></td>
            <td class="price ${precoA < precoB ? 'best-price' : ''}">R$ ${precoA.toFixed(2)}</td>
            <td class="price ${precoB < precoA ? 'best-price' : ''}">R$ ${precoB.toFixed(2)}</td>
            <td><strong>${melhor}</strong></td>
        `;
        tableBody.appendChild(row);
    });

    // Mostrar recomendação
    const recommendation = document.getElementById('recommendation');
    recommendation.innerHTML = `
        <h3>🏆 Recomendação</h3>
        <p>Com base nos seus dados, o plano mais vantajoso é:</p>
        <div class="plan-name">${melhorPlano} - ${melhorOperadora}</div>
        <div class="plan-price">R$ ${melhorPreco.toFixed(2)}/mês</div>
        <p style="margin-top: 15px;">Este plano oferece o melhor custo-benefício considerando sua idade, peso e altura.</p>
    `;

    // Mostrar seção de resultados
    document.getElementById('resultsSection').classList.add('show');

    // Scroll suave para os resultados
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
