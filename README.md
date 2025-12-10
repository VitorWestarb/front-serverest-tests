Front ServeRest Tests – Guia de Execução

Este projeto contém testes automatizados Playwright para o Front Serverest.

Ele está dividido em dois conjuntos de testes:

Projeto 1: Cenários 1, 2 e 3 (Cadastro de usuário, Login com usuário Admin e Login inválido)

Projeto 2: Cenários 4 e 5 (Cadastro de produto com usuário admin e visualização pelo usuário comum)

🛠 Pré-requisitos

Node.js (versão LTS recomendada)

Para verificar se já está instalado e a versão:

node -v

Para instalar/atualizar:

Windows/macOS: https://nodejs.org

Linux (Debian/Ubuntu):

sudo apt update
sudo apt install nodejs npm

A versão mínima recomendada é LTS (ex.: 18.x ou 20.x)

Terminal para executar comandos

Windows: PowerShell ou CMD

Linux/macOS: Terminal

🚀 Passo 1 – Clonar o projeto
git clone https://github.com/VitorWestarb/front-serverest-tests.git
cd front-serverest-tests

🚀 Passo 2 – Instalar dependências
npm install
npx playwright install

Isso instalará o Playwright e os navegadores necessários.

🚀 Passo 3 – Executar os testes
Projeto 1 (Cenários 1, 2 e 3)
npx playwright test tests/specs/auth.spec.js

Projeto 2 (Cenários 4 e 5)

Importante: Rode o Projeto 1 primeiro, pois o Projeto 2 depende do usuário e produto criados no Projeto 1.

npx playwright test tests/specs/produtos.spec.js

📂 Arquivos temporários gerados

./tests/temp/adminUser.json – dados do usuário admin criado

./tests/temp/produtoCriado.json – dados do produto criado

Não é necessário criar esses arquivos manualmente; eles são gerados automaticamente pelos testes.


🎯 Observações

Todos os testes usam dados aleatórios, garantindo que não haja conflito entre execuções.

Testes gravam vídeos e screenshots apenas em caso de falha (configuração playwright.config.js).

É possível rodar os testes em modo visível para debug alterando headless: false no playwright.config.js.
