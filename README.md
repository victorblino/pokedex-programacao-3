
# Pokédex - Aplicação React com TypeScript - Programação 3

## Visão Geral

Esta aplicação é uma Pokédex moderna desenvolvida com React, TypeScript e Tailwind CSS. Ela permite aos usuários navegar, pesquisar e filtrar Pokémon, além de visualizar detalhes específicos de cada um deles.

## Recursos

- **Listagem de Pokémon**: Exibe uma grade de cards de Pokémon com imagens e tipos.
- **Paginação**: Navegação fácil através de páginas de resultados com controles intuitivos.
- **Pesquisa**: Busca por nome de Pokémon em tempo real.
- **Filtragem por Tipo**: Filtra Pokémon por seus tipos elementais.
- **Visualização Detalhada**: Página dedicada para visualizar informações detalhadas de cada Pokémon.
- **Design Responsivo**: Interface adaptável para dispositivos móveis e desktop.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **TypeScript**: Superset JavaScript tipado para desenvolvimento mais seguro.
- **Tailwind CSS**: Framework CSS utilitário para estilos rápidos e consistentes.
- **React Query**: Gerenciamento de estado do servidor e requisições de dados.
- **React Router**: Navegação entre páginas da aplicação.
- **Shadcn UI**: Componentes reutilizáveis para uma experiência de usuário consistente.
- **PokéAPI**: API pública para obtenção de dados de Pokémon.

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── PokemonCard.tsx  # Card de exibição para cada Pokémon
│   └── ui/              # Componentes de UI (shadcn)
├── lib/                 # Utilitários e funções auxiliares
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Página principal (listagem de Pokémon)
│   ├── DetalhePokemon.tsx  # Página de detalhes do Pokémon
│   └── NotFound.tsx     # Página 404
├── services/            # Serviços e APIs
│   └── pokemon.ts       # Funções para interagir com a PokéAPI
├── types/               # Definições de tipos TypeScript
│   └── pokemon.ts       # Interfaces para os dados de Pokémon
├── App.tsx              # Componente principal da aplicação
└── main.tsx             # Ponto de entrada da aplicação
```

## Funcionalidades Detalhadas

### Listagem de Pokémon

- Exibe 20 Pokémon por página
- Cada card mostra:
  - Imagem oficial do Pokémon
  - Nome (com primeira letra em maiúscula)
  - Número na Pokédex
  - Tipos (com cores correspondentes)

### Paginação

- Navegação intuitiva entre páginas
- Exibe página atual e total de páginas
- Botões "Anterior" e "Próximo"
- Números de página para acesso direto

### Filtragem e Busca

- Pesquisa por nome em tempo real
- Filtragem por 18 tipos diferentes de Pokémon
- Redefine automaticamente para a primeira página ao alterar filtros
- Exibe mensagem quando nenhum resultado é encontrado

### Página de Detalhes

- Mostra informações detalhadas sobre um Pokémon específico:
  - Imagem em tamanho maior
  - Nome e número na Pokédex
  - Tipos (com cores correspondentes)
  - Altura e peso
  - Habilidades
- Botão para retornar à listagem principal

## Gerenciamento de Estado

A aplicação utiliza React Query para gerenciar:
- Carregamento de dados da API
- Cache de resultados para melhor performance
- Estados de carregamento e erro
- Paginação eficiente

## Estilos e Temas

- **Sistema de Cores por Tipo**: Cada tipo de Pokémon tem uma cor específica associada
- **Animações**: Efeitos sutis para melhorar a experiência do usuário
- **Componentes Reutilizáveis**: Uso de componentes shadcn UI para consistência visual

## Serviços de API

### `getPokemonList`
Obtém uma lista paginada de Pokémon da PokéAPI.

### `getPokemonDetails`
Obtém detalhes completos de um Pokémon específico por ID ou nome.

### `getPokemonDetailsInBatches`
Otimiza o carregamento obtendo detalhes de vários Pokémon em lotes.

## Tratamento de Erros

- Feedback visual para estados de carregamento
- Mensagens de erro amigáveis quando a API não responde
- Redirecionamento para página 404 quando um Pokémon não é encontrado

## Responsividade

- Layout de grade adaptável (1-4 colunas dependendo do tamanho da tela)
- Controles de interface otimizados para toque em dispositivos móveis
- Tamanho de texto e espaçamento ajustáveis

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse a aplicação no navegador:
   ```
   http://localhost:8080
   ```

## Possíveis Melhorias Futuras

- Adicionar modo escuro
- Implementar salvamento de Pokémon favoritos
- Adicionar comparação entre Pokémon
- Expandir detalhes com estatísticas de base, movimentos e evoluções
- Adicionar suporte para idiomas adicionais
