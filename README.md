# 📝 To-Do List - Next.js

Uma aplicação moderna de gerenciamento de tarefas desenvolvida com **Next.js**, **TypeScript** e **TailwindCSS**. Este projeto implementa um CRUD completo com interface responsiva e experiência de usuário otimizada.

![To-Do List Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=To-Do+List+App)

## 🚀 Funcionalidades

### ✨ CRUD Completo
- ➕ **Criar**: Adicionar novas tarefas com título e descrição
- 📖 **Listar**: Visualizar todas as tarefas organizadas
- ✏️ **Editar**: Modificar título e descrição de tarefas existentes
- 🗑️ **Deletar**: Excluir tarefas com confirmação de segurança
- ✅ **Marcar como concluída**: Checkbox para controle de status

### 🎨 Interface e UX
- 📱 **Design Responsivo**: Adaptável para mobile, tablet e desktop
- 🎯 **Interface Minimalista**: Layout limpo e intuitivo
- 🔔 **Notificações Toast**: Feedback visual para todas as ações
- 🎭 **Animações Suaves**: Transições e efeitos visuais
- 🎨 **Tema Moderno**: Cores e tipografia cuidadosamente escolhidas

### 📊 Recursos Avançados
- 🔍 **Filtros**: Visualizar todas, pendentes ou concluídas
- 📈 **Estatísticas**: Contadores de tarefas por status
- 💾 **Persistência**: Dados salvos no LocalStorage
- ⚡ **Performance**: Otimizado para carregamento rápido
- ♿ **Acessibilidade**: Suporte a navegação por teclado

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React para produção
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[React Hooks](https://reactjs.org/docs/hooks-intro.html)** - Gerenciamento de estado
- **LocalStorage API** - Persistência de dados no navegador

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/todo-list-nextjs.git
cd todo-list-nextjs
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
todo-list-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globais e animações
│   │   ├── layout.tsx           # Layout raiz da aplicação
│   │   └── page.tsx             # Página principal com CRUD
│   ├── components/
│   │   ├── Layout.tsx           # Componente de layout base
│   │   ├── TaskForm.tsx         # Formulário de tarefas
│   │   ├── TaskItem.tsx         # Item individual de tarefa
│   │   └── Toast.tsx            # Componente de notificação
│   ├── types/
│   │   └── task.ts              # Interfaces TypeScript
│   └── utils/
│       └── storage.ts           # Funções do LocalStorage
├── public/                      # Arquivos estáticos
├── package.json                 # Dependências e scripts
├── tailwind.config.ts          # Configuração do TailwindCSS
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
```

## 🎯 Como Usar

### Adicionando uma Tarefa
1. Clique no botão "➕ Nova Tarefa"
2. Preencha o título (obrigatório) e descrição (opcional)
3. Clique em "➕ Adicionar Tarefa"

### Editando uma Tarefa
1. Clique no ícone de edição (✏️) na tarefa desejada
2. Modifique os campos necessários
3. Clique em "💾 Salvar Alterações"

### Marcando como Concluída
- Clique no checkbox ao lado da tarefa
- A tarefa ficará riscada e com cor diferenciada

### Excluindo uma Tarefa
1. Clique no ícone de lixeira (🗑️)
2. Clique novamente para confirmar a exclusão
3. Ou clique no "✕" para cancelar

### Filtrando Tarefas
- **Todas**: Mostra todas as tarefas
- **Pendentes**: Apenas tarefas não concluídas
- **Concluídas**: Apenas tarefas finalizadas

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas no arquivo `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // Azul principal
        success: '#10B981',    // Verde de sucesso
        warning: '#F59E0B',    // Laranja de aviso
        danger: '#EF4444',     // Vermelho de perigo
      }
    }
  }
}
```

### Animações
Novas animações podem ser adicionadas no arquivo `globals.css`:

```css
@keyframes nova-animacao {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-nova {
  animation: nova-animacao 0.3s ease-out;
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Faça push do código para o GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. O deploy será automático

### Netlify
1. Execute `npm run build`
2. Faça upload da pasta `out/` no Netlify

### Outros Provedores
```bash
npm run build
npm run start
```

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run lint:fix     # Correção automática de lint
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` atualização de dependências, etc

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Paulo Gomes**
- GitHub: [@paulloach](https://github.com/paulloacg)
- LinkedIn: [Paulo Gomes](https://www.linkedin.com/in/paulo-gomes-14165b33a/)
- Email: pauloacg2.0@gmail.com

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/) pela excelente framework
- [Tailwind Labs](https://tailwindcss.com/) pelo TailwindCSS
- [Vercel](https://vercel.com/) pela plataforma de deploy
- Comunidade open source pelas inspirações

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
