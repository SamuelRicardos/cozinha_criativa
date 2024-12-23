# Sistema de receitas - Cozinha criativa

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) pela turma de Análise e Desenvolvimento de Sistemas (ADS), 4º período, composta pelos alunos **Samuel Ricardo**, **Bryan Gomes** e **Antônio Moraes**.

---

## O que foi usado no front-end?

- **Angular**: Versão 17.3.4  
- **Node.js**: Versão 20.17.0  
- **PrimeNG**: Versão 17  

---

## Como baixar o angular e o node?

Antes de instalar o Angular, é necessário instalar o **Node.js**, pois ele fornece o **npm (Node Package Manager)**, que é utilizado para executar comandos e instalar as dependências necessárias para a compilação do projeto.

### 1. Instalar o Node.js  

- Link para informações e documentação: [Node.js Blog Oficial](https://nodejs.org/pt/blog/release/v20.17.0)  
- Link direto para download: [Node.js v20.17.0 (Windows x64)](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi)  
- Após a instalação, abra o terminal e execute o comando:  
```bash
node -v
```

### 2. Instalar o Angular  

Após instalar o **Node.js**, siga os passos abaixo para instalar o **Angular CLI**:  

1. **Instalar o Angular CLI:**  
   - No terminal, execute o comando:  
     ```bash
     npm install -g @angular/cli@17.3.4
     ```  

2. **Verificar a instalação do Angular CLI:**  
   - Para confirmar a instalação, execute:  
     ```bash
     ng version
     ```  
   - Se a versão do Angular for exibida no terminal, o Angular CLI foi instalado com sucesso.  

3. **Instalar as dependências do projeto:**  
   - Após abrir o projeto no **VS Code**, instale as dependências necessárias executando:  
     ```bash
     npm install
     ```  
   - Esse comando irá baixar todas as dependências listadas no arquivo `package.json` e preparará o projeto para ser executado.

---

## Como Visualizar o Projeto no Front-End  

1. **Compilar o projeto:**  
   - Abra o terminal do **VS Code** e execute o comando:  
     ```bash
     ng serve
     ```  
   - Após a compilação, use **Ctrl + Clique** no link disponibilizado, geralmente:  
     ```bash
     http://localhost:4200
     ```  

2. **Acessar a tela de login:**  
   - Na URL, insira:  
     ```bash
     http://localhost:4200/login
     ```  

3. **Autenticação necessária:**  
   - Para acessar todas as páginas do sistema, é necessário estar autenticado.  
   - Certifique-se de que o servidor (back-end) está funcionando e que o **MySQL** possui o schema configurado corretamente.  

4. **Configuração do back-end:**  
   - O código do back-end está disponível em:  
     [Repositório do Back-End](https://github.com/DuarteDante81/Acervo-Receitas).  
   - As tabelas do banco de dados são criadas automaticamente pelo **Hibernate**, mas o schema deve ser criado manualmente conforme especificado na rota do arquivo `application.properties`.  

5. **Acessar páginas específicas de cargos:**  
   - Para visualizar as páginas relacionadas aos cargos (**Admin**, **Editor**, **Degustador**, ou **Cozinheiro**), é necessário:  
     - Navegar até a tela de cadastro.  
     - Criar um usuário e atribuir o cargo desejado.  
