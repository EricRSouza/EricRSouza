# Estudos de layout

Branch local `feature/layout-options`, baseada na implementação ainda em revisão
em `feature/personal-site`. Nenhuma promoção para DEV ou main foi feita.

As alternativas mudam a página inicial e reutilizam conteúdo, projetos, blog e
contato. A barra superior permite comparar três opções:

- `?layout=original`: versão atual.
- `?layout=editorial`: fundo claro, títulos serifados, serviços em linhas e projetos horizontais.
- `?layout=portfolio`: abertura azul-marinho, gráfico em destaque e projetos antes dos serviços.

A escolha fica na sessão do navegador para preservar o layout ao voltar do blog
ou trocar o idioma. As alternativas requerem JavaScript e são estudos locais;
o HTML pré-renderizado e a URL canônica continuam sendo os da versão original.
Após a escolha, integrar apenas a direção aprovada e remover a barra de avaliação.

Validação: build estático, TypeScript, seis testes existentes e inspeção visual
em desktop e celular. Preview separado na porta 4179; a versão anterior segue
na porta 4178.
