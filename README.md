# 🌌 Explorador Espacial — App Sistema Solar

Aplicativo mobile educacional desenvolvido com **React Native** e **Expo** que exibe os corpos celestes do Sistema Solar em uma interface interativa com fundo animado.

## 📸 Funcionalidades

- Tela inicial com grid de planetas e o Sol, cada um com imagem e nome
- Fundo animado (GIF do espaço)
- Ao tocar em um corpo celeste, abre um modal com:
  - Nome e imagem ampliada
  - Período orbital (planetas) ou temperatura da superfície (estrela)
  - Descrição informativa
- Botão "Voltar" para fechar o modal

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| React Native | Framework mobile multiplataforma |
| Expo | Toolchain para desenvolvimento e testes rápidos |
| JavaScript (ES6+) | Linguagem principal |
| Classes (POO) | Modelagem dos dados com herança e polimorfismo |

## 📐 Conceitos de POO Aplicados

- **Classe base (`CorpoCeleste`)**: define atributos comuns (id, nome, tipo, imagem, texto)
- **Herança (`Estrela`, `Planeta`)**: classes filhas que herdam de `CorpoCeleste` e adicionam atributos próprios (`temperatura` e `dias`)
- **Polimorfismo**: o modal exibe informações diferentes dependendo do `tipo` do corpo celeste (Planeta → Órbita, Estrela → Superfície)

## 📋 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

1. **Node.js** (v18 ou superior) — [nodejs.org](https://nodejs.org/)
2. **npm** (vem junto com o Node.js)
3. **Expo CLI** (instalado automaticamente via `npx`)

### Para rodar no Android (emulador):
4. **Android Studio** com um emulador (AVD) configurado e rodando

### Para rodar no celular físico:
4. **Expo Go** instalado no celular (disponível na Google Play Store / App Store)

## 🚀 Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar no navegador (Web)

```bash
npm run web
```

Acesse `http://localhost:8081` no navegador.

### 3. Rodar no emulador Android

Com o emulador aberto no Android Studio:

```bash
npm run android
```

### 4. Rodar no celular físico (Expo Go)

```bash
npx expo start
```

Escaneie o QR Code que aparece no terminal usando o app **Expo Go** no celular. O celular e o PC devem estar na **mesma rede Wi-Fi**.

## 📁 Estrutura do Projeto

```
App_Sistema_Solar/
├── App.js              # Componente principal (lógica, dados, UI e estilos)
├── App.json            # Configurações do Expo (nome, ícones, splash screen)
├── index.js            # Ponto de entrada que registra o App
├── package.json        # Dependências e scripts npm
├── assets/             # Ícones e imagens locais do app
└── components/
    └── AssetExample.js # Componente de exemplo (não utilizado)
```

## ⚙️ Scripts Disponíveis

| Comando | Ação |
|---|---|
| `npm start` | Inicia o servidor Expo (modo interativo) |
| `npm run web` | Abre no navegador |
| `npm run android` | Abre no emulador Android |
| `npm run ios` | Abre no simulador iOS (requer macOS) |

## 📝 Observações

- As imagens dos planetas são carregadas da internet (NASA Image Library), então é necessário conexão com a internet
- O fundo animado é um GIF externo — pode levar alguns segundos para carregar na primeira vez
