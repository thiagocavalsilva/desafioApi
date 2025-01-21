[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)

# Introdução

O teste de API é a base do desenvolvimento de software moderno, garantindo que a espinha dorsal do seu aplicativo seja robusta e confiável. No entanto, o processo pode tornar-se complicado sem as ferramentas e práticas adequadas. Uma maneira de agilizar seu fluxo de trabalho de teste de API é aproveitar uma interface de linha de comando (CLI) limpa. Este projeto irá se aprofundar em como você pode melhorar seu fluxo de trabalho de teste de API usando uma CLI limpa, com exemplos de código em Playwright e TypeScript.

## Por que CLI para testes de API?

- Velocidade e flexibilidade: as ferramentas CLI são leves e rápidas, permitindo executar testes rapidamente sem a sobrecarga de uma GUI.
- Automação: as ferramentas CLI podem ser facilmente integradas aos pipelines de CI/CD, facilitando a automação.
- Personalização: você pode personalizar comandos CLI para atender às suas necessidades específicas, tornando seu fluxo de trabalho mais eficiente.

## Configurando seu ambiente

Antes de mergulhar no código, certifique-se de ter o Node.js e o npm instalados. Em seguida, instale o Playwright com TypeScript:

`npm init playwright@latest`

Para instalar o projeto, execute os seguintes comandos

`npm install`

```

Examplos:

Execute todos os testes para o ambiente UAT:

`npm run test.api uat`

Execute testes para o ambiente de  para o conjunto api.spec.ts:

`npm run test.api sit api.spec.ts`

Execute o seguinte comando para Report
`npx playwright show-report`