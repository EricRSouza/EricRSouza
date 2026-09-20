# Fluxo de desenvolvimento

- Branches permanentes: `DEV` para integração e homologação; `main` para PROD.
- Crie `feature/<nome>`, `fix/<nome>` ou `chore/<nome>` a partir de `DEV` atualizado.
- Envie mudanças por PR para `DEV`. Execute o Site CI e revise o resultado antes do merge.
- Produção recebe apenas PR de `DEV` para `main`, depois do CI do commit de DEV e da homologação manual.
- Nunca faça push direto, force push, exclusão de `DEV`/`main` ou bypass das proteções.
- Antes de promover para produção, outro agente deve revisar o diff de forma independente e produzir um levantamento com achados, riscos e testes. Inclua o levantamento na PR para Eric decidir.
- Não faça merge sem autorização explícita. Eric aprova o ambiente `production-approval` no GitHub Actions usando sua própria conta; agentes nunca aprovam esse ambiente em nome dele.
- Use merge commit entre branches permanentes. Após uma release, sincronize `main` de volta para `DEV` por PR.
- O GitHub Pages publica `main`. Não altere a fonte de publicação para DEV.
- Mantenha o título da PR simples e inclua modelo/harness na descrição.
