/* TRATAMENTO DE ERROS E EXCEÇÕES

O QUE É TRATAMENTO DE ERROS?
É a prática de prever que algo pode dar errado durante a execução do programa e escrever código que lida com isso de forma controlada,
em vez de deixar o programa simplesmente travar ou quebrar sem explicação. Em vez de o programa "explodir",
ele consegue reagir — mostrar uma mensagem amigável, tentar de novo, registrar o problema em um log, etc.

O QUE É UMA EXCEÇÃO?
Uma exceção é um evento que interrompe o fluxo normal do programa durante a execução,
geralmente porque algo inesperado aconteceu (uma divisão por zero, um arquivo que não existe, uma API que não respondeu).
Quando isso acontece, o programa "lança" (throw) essa exceção, e se ninguém "pegar" ela (com try/catch), o programa para de executar.



QUAL A DIFERENÇA DE ERRO E EXCEÇÃO?


                                                        ERRRO                                                                                EXCEÇÃO
                       |-------------------------------------------------------------------------------||--------------------------------------------------------------------------
-----------            | Erro:                                                                         ||  EXCEÇÃO:                                                                |
|O QUE É? |            | Um problema mais grave,                                                       ||  Uma condição anômala que o próprio programa pode prever e tratar        |
-----------            | muitas vezes fora do controle do código (falta de memória, erro de sintaxe)   ||                                                                          |
                       |-------------------------------------------------------------------------------||--------------------------------------------------------------------------|                                                                                                      
---------------------  |-------------------------------------------------------------------------------||--------------------------------------------------------------------------|
| Pode ser tratado? |  |Geralmente não é recomendado tentar tratar (indica algo sério no ambiente)     || Sim, é feito pra ser tratado com try/catch                               |
---------------------  |-------------------------------------------------------------------------------||--------------------------------------------------------------------------|
-----------            |-------------------------------------------------------------------------------||--------------------------------------------------------------------------|
| Exemplo |            |  StackOverflowError, erro de sintaxe no código                                || Dividir por zero, tentar acessar uma propriedade de algo que é undefined,|
-----------            |                                                                               || falha ao buscar dados de uma API.                                        |
                       |-------------------------------------------------------------------------------||--------------------------------------------------------------------------|



Por que é importante tratar erros e exceções?
Evita que o programa trave inteiro por causa de um problema pontual
Melhora a experiência do usuário — em vez de uma tela branca ou uma mensagem técnica confusa, você pode mostrar algo compreensível
Facilita encontrar bugs — com boas mensagens de erro, fica mais fácil saber onde e por que algo falhou
Segurança — evita que informações sensíveis do sistema (como detalhes internos do banco de dados) vazem numa mensagem de erro não tratada.


Exemplo em TypeScript

*/



function dividir(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Não é possível dividir por zero!");  //throw new Error(...) — lança uma exceção quando a condição de erro acontece (dividir por zero)
    }
    return a / b;
}

try {   // try { ... } — o bloco onde você "tenta" executar um código que pode falhar.
    const resultado = dividir(10, 0);
    console.log("Resultado:", resultado);
} catch (erro) { // catch (erro) { ... } — captura a exceção, se ela acontecer, e trata sem travar o programa.
    if (erro instanceof Error) {
        console.log("Ocorreu um erro:", erro.message);
    }
} finally {   // finally { ... } — roda sempre, tenha dado erro ou não (útil pra "limpeza", tipo fechar uma conexão)
    console.log("Execução finalizada.");
}


// SAÍDA :  Ocorreu um erro: Não é possível dividir por zero!Execução finalizada.





 /*                                                    2. Tratamento de exceções

Finalidade: o tratamento de exceções serve para capturar e reagir a erros de forma controlada, sem deixar o programa parar abruptamente.
Ele separa o "código que pode falhar" do "código que decide o que fazer quando falha", deixando o programa mais previsível e resiliente.
*/
function buscarUsuario(id: number): string {
    if (id <= 0) {
        throw new Error("ID inválido");
    }
    return "Usuário " + id;
}

try {
    const usuario = buscarUsuario(-1);
    console.log(usuario);
} catch (erro) {
    console.log("Falha ao buscar usuário:", (erro as Error).message);
}
/*
Como funciona: o código dentro do try é executado normalmente. Se em algum ponto uma exceção for lançada (throw),
a execução do try para imediatamente e pula direto para o catch, que recebe o erro e decide o que fazer — nesse caso,
só imprimir uma mensagem amigável em vez de deixar o programa quebrar.



                                                           3. try, catch e finally


try — bloco onde você coloca o código que pode dar erro. É a "tentativa".

catch — bloco executado somente se algo dentro do try lançar uma exceção. É onde você trata o problema.

finally — bloco que roda sempre, tenha dado erro ou não. Usado para "limpeza" (fechar conexão, liberar recurso, esconder um loading, etc).

typescript
*/
function lerArquivo(nome: string): string {
    if (nome !== "dados.txt") {
        throw new Error("Arquivo não encontrado: " + nome);
    }
    return "Conteúdo do arquivo";
}

try {
    const conteudo = lerArquivo("outro.txt");
    console.log(conteudo);
} catch (erro) {
    console.log("Erro:", (erro as Error).message);
} finally {
    console.log("Tentativa de leitura finalizada.");
}
/*
Saída:

Erro: Arquivo não encontrado: outro.txt
Tentativa de leitura finalizada.

Repara que o finally roda mesmo tendo dado erro — é essa a garantia que ele oferece.      
*/

/*                                                                                     4. throw


Para que serve: o throw é usado para lançar (criar) uma exceção manualmente, quando seu código identifica que algo está errado e não deve continuar.
Ele interrompe a função imediatamente, e a exceção precisa ser capturada por um catch em algum lugar (senão o programa quebra).

typescript
*/

function validarIdade(idade: number): void {
    if (idade < 0) {
        throw new Error("Idade não pode ser negativa");
    }
    console.log("Idade válida:", idade);
}

try {
    validarIdade(-5);
} catch (erro) {
    console.log("Erro capturado:", (erro as Error).message);
}

// sAÍDA : Erro capturado: Idade não pode ser negativa.




/*                                               5. Aplicação prática — transferência bancária


typescript
*/
function transferir(saldo: number, valor: number): number {
    if (valor <= 0) {
        throw new Error("O valor da transferência deve ser maior que zero.");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente para realizar a transferência.");
    }
    return saldo - valor;
}

// Situação 1: valor inválido (zero ou negativo)
try {
    const novoSaldo = transferir(1000, -50);
    console.log("Novo saldo:", novoSaldo);
} catch (erro) {
    console.log("Erro na transferência 1:", (erro as Error).message);
}

// Situação 2: valor maior que o saldo disponível
try {
    const novoSaldo = transferir(1000, 5000);
    console.log("Novo saldo:", novoSaldo);
} catch (erro) {
    console.log("Erro na transferência 2:", (erro as Error).message);
}

// Situação 3: transferência válida
try {
    const novoSaldo = transferir(1000, 300);
    console.log("Novo saldo:", novoSaldo);
} catch (erro) {
    console.log("Erro na transferência 3:", (erro as Error).message);
}

/*   Saída no console:

Erro na transferência 1: O valor da transferência deve ser maior que zero.
Erro na transferência 2: Saldo insuficiente para realizar a transferência.
Novo saldo: 700

Como funciona:

A função transferir recebe o saldo atual e o valor a transferir.
Ela valida duas regras de negócio: valor precisa ser positivo e não pode passar do saldo disponível. Se qualquer uma falhar, ela lança (throw) um erro específico explicando o motivo.
Cada chamada da função fica dentro de um try/catch separado, então mesmo que a Transferência 1 e 2 falhem, o programa continua rodando normalmente e ainda executa a Transferência 3 com sucesso.
Se não existisse o try/catch, a primeira exceção lançada pararia o programa inteiro, e as transferências 2 e 3 nunca seriam executadas
