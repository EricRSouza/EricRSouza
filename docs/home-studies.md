# Melhorias do layout 1 — estudos locais

Três propostas baseadas na crítica da home, na branch `feature/home-improvements`, derivada da implementação ainda em revisão `feature/personal-site`. Nenhuma integração em DEV ou produção foi feita.

O comando Impeccable `live-generate` foi tentado, mas o executável instalado respondeu `verb 'live-generate' is not implemented yet`. O fallback `live` exigiu DESIGN.md, contrariando o fluxo documentado de generate. Não foi simulada uma sessão do Impeccable: a comparação é implementada em React.

Preview: `http://127.0.0.1:4181/EricRSouza/?study=clarity`.

- `study=original`: referência original.
- `study=clarity`: perguntas de negócio e caminhos para o trabalho.
- `study=personal`: apresentação pessoal e abordagem.
- `study=analysis`: demonstração analítica com identificação explícita de dados sintéticos.

As propostas incluem tipografia auxiliar maior, menos rótulos decorativos e redução do método e da ilustração repetida do artigo. O conteúdo original permanece disponível. A escolha vale apenas na página de comparação; páginas internas e a home sem query continuam originais. As variantes requerem JavaScript e não são novas páginas publicadas.

Os estudos não resolvem a falta de evidências profissionais ainda não fornecidas. Não foram inventados currículo, fotos, resultados de clientes ou capturas de Power BI. Após escolher uma direção, integrar sua composição e conteúdo em definitivo e remover a interface de comparação.

Validação: build com TypeScript e geração estática, seis testes existentes, inspeção visual em 1440 px e 390 px, uma h1 por proposta e ausência de overflow horizontal nas três propostas a 390 px. Troca pelo seletor verificada no navegador.
