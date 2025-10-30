<h1 align="center">
  👾 <a href="#" alt="Nome do Projeto">MONSTER HUNT</a> 👾
</h1>

<p align="center">
  <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/impaulinha/monster-hunt-app">
  <img alt="Licença" src="https://img.shields.io/github/license/impaulinha/monster-hunt-app">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/impaulinha/monster-hunt-app">
</p>

---

## 📑 Índice

<p align="center">
  <a href="#-sobre">📌 Sobre</a> • 
  <a href="#-layout">📸 Layout</a> • 
  <a href="#️-tecnologias">🛠️ Tecnologias</a> • 
  <a href="#-como-executar">🚀 Como executar</a> • 
  <a href="#-licença">📝 Licença</a> • 
  <a href="#-autora">👩🏻‍💻 Autora</a>
</p>

---

## 📌 Sobre

O **Monster Hunt** é um mini game "encontre o alvo", onde o jogador possui 30 segundos para encontrar o monstrinho correto e fazer o maior número de pontos possível.

O projeto foi desenvolvido com o intuito de colocar em prática e/ou aprender sobre conceitos como gerenciamento de estado global (React Context), persistência de dados no dispositivo (AsyncStorage), animações (React Native Animated) e feedback multimédia (áudio com expo-audio).

Para jogar é simples:

1. Um monstro-alvo é apresentado
2. Quatro monstrinhos (incluindo o alvo) são exibidos aleatoriamente
3. O jogador tem 30 segundos para acertar o máximo de monstros possível.
4. Acertar incrementa o placar, errar (ou deixar o tempo acabar) resulta em "Game Over"

Funcionalidades:

* 🎮 **Gerenciamento de jogo:**
    * Contador regressivo de 30s que encerra o jogo ao chegar a zero
    * Os monstros e o monstro-alvo são re-embaralhados a cada acerto
* 🏅 **Ranking e Persistência:**
    * As 3 melhores pontuações são salvas automaticamente (score e data) no dispostivo 
    * Os dados são persistidos localmente, com o AsyncStorage
* 📲 **Feedback e UI/UX:**
    * Feedbacks de áudio para os acertos e para game over
    * Quando o monstro correto é selecionado, é exibido um texto animado ("+1") acima do mesmo
    * É exibido um ícone de alvo onde o toque do jogador é realizado

---

## 📸 Layout

Abaixo, uma demonstração do game:

https://github.com/user-attachments/assets/84c6b5bb-33a5-4d94-99bd-557ae72ecb46

---

## 🛠️ Tecnologias

As seguintes tecnologias foram utilizadas no projeto:

- [Expo](https://docs.expo.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Nativewind](https://www.nativewind.dev/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Expo-audio](https://docs.expo.dev/versions/latest/sdk/audio/)
- [React Navigation](https://reactnavigation.org/)
- [React Context](https://pt-br.react.dev/reference/react/useContext)
- [React Animated](https://reactnative.dev/docs/animated)

---

## 🚀 Como executar

### 📋 Pré-requisitos

É necessário que você tenha instalado em sua máquina:

- [Node](https://nodejs.org/en/) - versão LTS

E instalado o aplicativo Expo em seu dispositivo móvel:

- [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) 
- [App Store](https://apps.apple.com/app/expo-go/id982107779)


### ⚙️ Rodando o aplicativo

Se já possui todos os pré-requisitos instalados, siga os seguintes comandos:

```bash
# Clone este repositório
$ git clone https://github.com/impaulinha/monster-hunt-app.git
# Acesse a pasta do projeto no seu terminal/cmd
$ cd monster-hunt-app
# Vá para a pasta da aplicação
$ cd game
# Instale as dependências necessárias
$ npm install
# Execute o comando
$ expo start
```

- Será aberta uma página em seu navegador.

- Abra o app Expo em seu dispositivo, selecione "Scan QR Code" e aponte a câmera para o código QR disponível na página que foi aberta.

> O apicativo irá rodar em seu dispositivo.

---

## 📝 Licença

Este projeto esta sob a licença [MIT](./LICENSE).

---

## 👩🏻‍💻 Autora

Feito com ❤️ e dedicação por Ana Paula 😊. Entre em contato 👇

[![Linkedin Badge](https://img.shields.io/badge/-Paulinha-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/anapaula-aguiar/) 
[![Gmail Badge](https://img.shields.io/badge/-anaaguiar20016@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:anaaguiar20016@gmail.com)


- **Ana Paula Aguiar** - *Desenvolvedora Mobile* - [impaulinha](anapaulaaguiar.dev)

---
