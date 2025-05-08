# 🧠 Site de Digitação

Um site de digitação moderno inspirado em plataformas como Monkeytype. Ideal para quem quer praticar a digitação e acompanhar seu desempenho em tempo real.

## 🔗 Acesse agora

👉 [Clique aqui para acessar o site](https://marcus1423.github.io/site-digitacao/)

## ✨ Funcionalidades

- Teste de digitação com palavras aleatórias
- Cálculo de WPM, CPM, acurácia e palavras corretas
- Estatísticas individuais por usuário
- Salvamento automático dos resultados no Firestore

## 🛠️ Tecnologias utilizadas

- **React** (Vite/CRA)
- **Firebase Firestore** (banco de dados)
- **Firebase Auth** (login de usuários)
- **React Router** (navegação)
- **CSS**

## 📁 Estrutura de pastas

```bash
src/
├── components/
│   └── NavigationButton.jsx
├── hooks/
│   └── useTypingLogic.js
├── pages/
│   ├── TypingTest.jsx
│   ├── Results.jsx
│   └── GlobalResults.jsx
├── services/
│   ├── firebase.js
│   └── saveTestResult.js
└── App.js