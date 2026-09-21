# Três propostas de reformulação

Estudos de páginas iniciais completas, não um sistema visual final aprovado.
Eric preferiu “Raciocínio em ação” e pediu três designs completamente diferentes
seguindo essa direção. Prioridade comercial; cliente ideal permanece indefinido.

Branch local: `feature/full-redesigns`, dependente da implementação em revisão
`feature/personal-site`. Sem merge, publicação ou modificação de DEV/main.

## Comparação

Preview na porta 4182, base `/EricRSouza/`:

- `?design=1`: Laboratório de decisões. Navy predominante, gráfico de barras
  explorável e painel separado de interpretação. Projetos em linhas, serviços
  em três colunas e contato compacto.
- `?design=2`: Caderno de análise. Superfície de leitura, títulos em Source Serif,
  gráfico de linhas e comentário editorial. Projetos e formas de ajudar lado a
  lado, com navegação e divisórias inspiradas em uma publicação.
- `?design=3`: História dos números. Tipografia grande, capítulos de leitura,
  seletor de mês com composição da receita, grandes blocos visuais de projetos
  e fechamento de contato em largura total.

Todas incluem projetos, formas de ajudar, apresentação pessoal, blog e contato.
Reutilizam o mesmo conteúdo factual e os mesmos dados sintéticos, mas variam
hierarquia, disposição, gráficos, navegação e fechamento.

## Decisões visuais provisórias

Paleta da marca: navy `#0B1F3B`, blue `#1F6A8D`, glacier `#E6F2FA`, âmbar
`#F5A524`. Inter para interface; Source Serif 4 para expressão editorial.

Laboratório: fundo `#0B1F3B`, área de análise `#112B46`, painel `#17334F`, texto
`#EDF5FB`, texto secundário `#BED0E0`. Caderno: fundo `#FAF9F6`, texto `#142B3A`,
secundário `#55636B`, bordas `#C7CBC7`. História: glacier na abertura, branco nos
capítulos, navy na conclusão, azul secundário no contato. Os três usam controles
nativos, foco visível, rótulos e estados de seleção.

Não tratar estas alternativas como três novas identidades aprovadas. A escolha
de Eric determinará o sistema a integrar ao restante do site.

## Evidência e limites

Os gráficos derivam de `monthlySales('all')`. A variação Jan–Jun é +72,5% na
receita e −13,9 pontos percentuais na margem. Todos os dados são sintéticos;
os exemplos excluem impostos e despesas operacionais. Nenhum resultado de
cliente, fotografia, cargo ou currículo foi inventado.

Os links de projetos e blog abrem as páginas existentes. O redesenho delas fica
para depois da escolha de direção. As propostas usam query string e carregamento
React após a página original; dependem de JavaScript e podem mostrar brevemente
o original ao abrir. Essa limitação é própria do preview local, não uma solução
aprovada de publicação/SEO. Não fazer release com o seletor de propostas.

## Validação

- TypeScript, build estático e verificação de links/assets passaram.
- Seis testes existentes de dados e rotas passaram.
- Inspeção visual em desktop 1440 px e celular 390 px nas três propostas.
- Overflow de História corrigido e confirmado em 320 px.
- Troca Receita/Margem e seletor de mês por teclado verificados.
- Revisão independente confirmou os cálculos e pediu maior diferenciação da
  parte inferior, aumento de alvos de toque e legibilidade dos gráficos.
  Esses pontos receberam correções; a limitação de SSR do preview permanece
  explícita acima.

O executável Impeccable usado anteriormente não implementa `live-generate`.
As propostas foram construídas diretamente em React, conforme o processo
code-first escolhido por Eric. Não houve uma sessão simulada do plugin.
