# Site pessoal de Eric Ramos Souza

Portfólio e blog em React + Vite + TypeScript, com páginas estáticas em português e inglês. A identidade segue Navy & Glacier. A home conecta áreas de atuação, projetos, análises e contato.

## Executar localmente

Requisitos: Node 22.18 ou superior compatível com Vite 8, e pnpm 10.34.5. Se pnpm não estiver instalado, substitua `pnpm` por `npx --yes pnpm@10.34.5`.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Abra o endereço mostrado pelo Vite, com o caminho `/EricRSouza/`. Para conferir exatamente o artefato de publicação:

```powershell
pnpm test
pnpm build
pnpm preview
```

O build executa TypeScript, gera o bundle do navegador e usa React no Node somente durante a compilação para criar HTML de cada rota. `dist/` é o único diretório publicado. Não existe servidor de aplicação em produção. Os artigos já estão no HTML antes do JavaScript; filtros do gráfico e menu móvel são ativados no navegador.

## Editar conteúdo

- `src/lib/content.ts`: textos PT/EN, contato e metadados. Os dois idiomas devem preservar os mesmos fatos.
- `src/pages/Home.tsx`: ordem e composição da home.
- `src/pages/ContentPages.tsx`: projetos, listagem de artigos e páginas editoriais.
- `src/content/*.mdx`: artigo em português e inglês. MDX é código de confiança mantido no repositório, não conteúdo enviado por visitantes.
- `src/lib/routes.ts`: rotas equivalentes por idioma e URLs antigas preservadas.
- `src/lib/analytics.ts`: dados sintéticos e cálculos do experimento; valores em reais.
- `src/styles.css`: tokens da marca, componentes e responsividade.

Ao adicionar uma página, registre as duas rotas, o conteúdo e os metadados. Se for artigo, atualize a listagem e o RSS em `scripts/prerender.mjs`. `scripts/check-build.mjs` confere os links locais, o HTML gerado e a exclusão de arquivos internos. Ainda não há CMS ou painel administrativo.

As fontes são servidas localmente. Não há analytics, cookies de rastreamento ou formulário de terceiros. O contato usa o e-mail e LinkedIn confirmados por Eric. A marca principal é o nome pessoal; nenhuma equipe, empresa estabelecida ou carteira de clientes é sugerida.

## Conteúdo e evidências

- O projeto Power BI aproveita a descrição existente no site. Seu diagrama é conceitual; não é screenshot, prova de execução ou promessa de resultados. Não há embed público disponível.
- O explorador e o artigo de receita/margem são demonstrações novas, com dados sintéticos identificados, tabela acessível e CSV para reprodução.
- O primeiro artigo de Web Analytics preserva a data e o sentido do texto original de 2024.
- A biografia utiliza apenas o contexto fornecido. Histórico de cargos, empresas, currículo e fotografia não foram inventados; podem ser acrescentados quando os materiais forem disponibilizados.
- Referência de identidade: pasta externa `../Brand`. Os arquivos dessa pasta não são publicados nem alterados pelo build.

## Branches e aprovação

```text
DEV → feature/<nome> → PR para DEV → CI + revisão
DEV → homologação + revisão independente → PR para main → aprovação de Eric → merge → publicação
main → PR de sincronização para DEV
```

DEV e main são permanentes e protegidas. Não faça push direto, force push, exclusão ou bypass. Main representa PROD. Use merge commit entre as branches permanentes; não habilite exclusão automática de DEV.

Antes de abrir uma feature PR, confirme que DEV contém a main atual e atualize a branch temporária com fetch/rebase. A integração exige autorização de Eric, inclusive para DEV.

`Site CI` roda em PRs para DEV/main e pushes em DEV, executando testes, TypeScript, build e validação do HTML. O check obrigatório mantém o nome **Build and test site**.

O workflow de produção aceita PR apenas de DEV e exige CI bem-sucedido do mesmo SHA em push de DEV. Outro agente deve revisar o diff e produzir um levantamento na PR antes da decisão de Eric.

Eric aprova em **Actions → Production approval → Review deployments → production-approval → Approve and deploy**. Esse botão libera o check; o deploy depende do merge posterior. O ambiente permite aprovação pela mesma conta e não permite bypass. Agentes nunca aprovam em nome de Eric. Edite o relatório antes da aprovação: novas edições ou commits reiniciam esse workflow.

## Homologação pelo artefato do CI

```powershell
gh run list --workflow site-ci.yml --branch DEV --event push
$devSha = gh run view RUN_ID --json headSha --jq '.headSha'
gh run download RUN_ID --name "site-$devSha" --dir .preview/RUN_ID/EricRSouza
python -m http.server 4000 --bind 127.0.0.1 --directory .preview/RUN_ID
```

Use uma pasta vazia. Abra `http://localhost:4000/EricRSouza/`. Valide home, projetos, contato, idiomas e blog em desktop/celular; no gráfico, alterne canal/métrica, confira os valores e baixe o CSV. Registre commit e resultado na PR. DEV não tem hospedagem pública separada.

## Migração da publicação (somente na release aprovada)

O repositório ainda usa a publicação Jekyll legada. As configurações de produção não foram alteradas durante a construção desta feature.

Antes de integrar a migração em main, com autorização de Eric:

1. Revisar a PR DEV → main, confirmar o CI e obter a aprovação pessoal.
2. Em Settings → Pages, trocar **Deploy from a branch** por **GitHub Actions**. Isso permite publicar o build Vite; não muda a branch de produção para DEV.
3. Fazer merge autorizado para main. `Publish approved main` compila e publica somente pushes em main, usando o ambiente `github-pages` já limitado a main.
4. Verificar o deployment e os links no endereço público. Sincronizar main → DEV por PR.

Não mescle a migração antes de preparar essa alteração: o Jekyll legado não compila TypeScript. O caminho público `/EricRSouza/` é definido em `vite.config.ts` e `scripts/prerender.mjs`; se domínio ou caminho mudar, atualize os dois e revise URLs canônicas/RSS.

## Verificação

Os testes verificam agregação, margem ponderada, filtros, números do artigo, rotas e compatibilidade de links antigos. O build verifica links/arquivos locais e conteúdo pré-renderizado. A revisão visual e de teclado complementa essas verificações; testes não equivalem a certificação integral de acessibilidade.
