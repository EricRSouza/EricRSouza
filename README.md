# Site de Eric Ramos Souza

Site estático com Jekyll, publicado pelo GitHub Pages a partir de `main`.

## Branches e aprovação

```text
DEV → feature/<nome> → PR para DEV → CI + revisão
DEV → CI + homologação + revisão de outro agente → aprovação de Eric → PR para main → GitHub Pages
main → PR de sincronização para DEV
```

`DEV` e `main` são permanentes. As demais branches são temporárias.
`main` representa PROD; não existe uma terceira branch chamada PROD.

- **DEV:** PR obrigatória, build/testes obrigatórios e conversas resolvidas.
- **main:** mesmas regras, mais o check de promoção a partir de DEV e o check
  **Approve production**, liberado por Eric no ambiente `production-approval`.
- As regras incluem administradores e bloqueiam force push e exclusão.
- PRs devem estar atualizadas com a branch de destino antes do merge.
- Use **Create a merge commit** nas promoções e sincronizações entre branches permanentes.
  Nunca exclua DEV após o merge. A exclusão automática de branches fica desativada.

O autor não pode aprovar a própria PR pela revisão comum do GitHub. Por isso,
a aprovação obrigatória usa **Actions → execução da PR → Review deployments →
production-approval → Approve and deploy**. Apesar do nome do botão, esse job
apenas registra a aprovação: o deploy real continua acontecendo após o merge.
O ambiente permite autoaprovação e tem Eric como revisor obrigatório, sem bypass
de administradores. Novos commits geram uma nova execução e exigem nova aprovação.
Agentes não podem aprovar esse ambiente em nome de Eric.

Antes dessa decisão, outro agente deve revisar o diff e registrar na PR o commit
revisado, achados, riscos e evidências dos testes. Essa revisão independente é uma
regra de trabalho registrada em `AGENTS.md`; o GitHub exige a aprovação humana,
mas não consegue atestar por si só que houve uma segunda análise de IA.

As proteções são configurações do GitHub, não são aplicadas apenas por este arquivo.
Confira-as em Settings → Branches. Administradores ainda podem editar essas configurações.

## Implementar uma feature

```powershell
git switch DEV
git pull --ff-only origin DEV
git switch -c feature/nome-da-feature
# Faça as mudanças, revise e crie os commits.
git push -u origin feature/nome-da-feature
gh pr create --base DEV
```

Antes de abrir a PR, atualize a branch com `origin/main` e `origin/DEV` (fetch e
rebase da branch temporária). Não faça rebase nem force push das branches permanentes.
Espere os checks e a revisão. Faça merge somente quando autorizado.

## Homologar DEV

O workflow **Site CI** compila com o mecanismo Jekyll do GitHub Pages e verifica
páginas essenciais, processamento de Liquid, geração/listagem dos posts e arquivos
que não devem ser publicados. Ele roda nas PRs e em cada push/merge em DEV.
Não valida links externos nem substitui a revisão visual e funcional.

O artefato `site-<SHA>` de cada execução bem-sucedida contém o site para revisão.
DEV não tem URL pública própria: a prévia abaixo roda apenas na sua máquina.

```powershell
gh run list --workflow site-ci.yml --branch DEV --event push
# Substitua RUN_ID pelo ID da execução concluída do commit que será publicado.
# Use uma pasta vazia para não misturar artefatos de execuções diferentes.
gh run download RUN_ID --dir .preview/RUN_ID/EricRSouza
python -m http.server 4000 --bind 127.0.0.1 --directory .preview/RUN_ID
```

Abra <http://localhost:4000/EricRSouza/>. O caminho `/EricRSouza/` preserva o
`base href` atual do site. Revise navegação, páginas afetadas e versões desktop/celular.
Registre o SHA e o resultado na PR de produção. Links quebrados preexistentes não
são cobertos por estes checks e devem ser tratados em features próprias.

## Promover para produção

1. Aguarde o **Site CI** do commit atual de DEV terminar com sucesso.
2. Faça a homologação e abra `gh pr create --base main --head DEV`.
3. Solicite revisão independente a outro agente e inclua seu levantamento na PR.
4. Eric lê o levantamento, confere a homologação e aprova `production-approval` no Actions.
5. Após autorização, use merge commit. O Pages publica a partir de main.
6. Abra uma PR de `main` para `DEV` e integre com merge commit para sincronizar o histórico.

O check **Verify DEV promotion** recusa outras branches e exige CI bem-sucedido
do mesmo SHA em um evento push de DEV. Se a PR foi aberta antes de o CI de DEV
terminar, reexecute o check após o sucesso. Correções urgentes também passam por DEV.

## Configuração inicial

A criação de DEV inclui a configuração inicial do CI, antes de ativar a proteção
da nova branch. A adoção em main ocorre por PR, sem push direto nem publicação
antecipada. A fonte e a política de publicação do Pages continuam limitadas a main.

Documentação: [proteção de branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
