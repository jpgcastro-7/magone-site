import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";

const articles: Record<string, { title: string; metaDesc: string; content: string }> = {
  "como-escolher-maquina-injetora": {
    title: "Como Escolher uma Máquina Injetora: Guia Completo",
    metaDesc: "Guia completo para escolher a máquina injetora ideal. Descubra os fatores essenciais: tonelagem, tipo de acionamento, marca e aplicação.",
    content: `
## Introdução

Escolher a máquina injetora correta é uma decisão crucial para qualquer indústria de transformação plástica. A escolha errada pode resultar em baixa produtividade, desperdício de material e custos desnecessários.

## Fatores Essenciais na Escolha

### 1. Força de Fechamento (Tonelagem)
A tonelagem da injetora deve ser compatível com o tamanho do molde e a área projetada da peça. Como regra geral, calcule de 3 a 5 toneladas por polegada quadrada de área projetada.

### 2. Capacidade de Injeção
O volume de injeção deve ser suficiente para preencher completamente o molde com material plástico. Considere o peso da peça e dos canais de alimentação.

### 3. Tipo de Acionamento
- **Hidráulicas**: Mais robustas, ideais para peças grandes e de alta gramatura
- **Elétricas**: Maior precisão, menor consumo de energia, operação mais silenciosa
- **Híbridas**: Combinam vantagens de ambas as tecnologias

### 4. Marca e Procedência
Opte por marcas reconhecidas no mercado como Engel, Haitian, Romi, Borche, BMB e Chen Hsong. Essas marcas oferecem suporte técnico e disponibilidade de peças de reposição.

## Máquinas Novas vs. Usadas

Máquinas usadas revisadas podem ser uma excelente opção para reduzir o investimento inicial sem comprometer a qualidade da produção. A Magone oferece máquinas usadas completamente revisadas com garantia de funcionamento.

## Conclusão

A escolha da injetora ideal depende de uma análise cuidadosa das suas necessidades de produção. Entre em contato com a Magone para uma consultoria personalizada.
    `,
  },
  "diferenca-injetoras-hidraulicas-eletricas": {
    title: "Diferença entre Injetoras Hidráulicas e Elétricas",
    metaDesc: "Entenda as diferenças entre injetoras hidráulicas e elétricas. Vantagens, desvantagens e qual escolher para sua indústria.",
    content: `
## Introdução

Uma das principais dúvidas ao investir em uma máquina injetora é a escolha entre o acionamento hidráulico e o elétrico. Cada tipo possui características específicas que podem impactar diretamente na produtividade e nos custos operacionais.

## Injetoras Hidráulicas

### Vantagens
- Maior força de fechamento para peças grandes
- Custo de aquisição geralmente menor
- Tecnologia consolidada e de fácil manutenção
- Robustez para aplicações pesadas

### Desvantagens
- Maior consumo de energia
- Mais ruído durante operação
- Necessidade de troca periódica de óleo hidráulico

## Injetoras Elétricas

### Vantagens
- Economia de até 70% em energia elétrica
- Maior precisão e repetibilidade
- Operação silenciosa
- Menor impacto ambiental
- Ciclos mais rápidos

### Desvantagens
- Investimento inicial mais elevado
- Limitação em aplicações de grande tonelagem

## Qual Escolher?

A escolha depende da sua aplicação específica. Para peças de precisão e alta produtividade, as elétricas são ideais. Para aplicações pesadas e investimento otimizado, as hidráulicas continuam sendo excelentes opções.

## Consulte a Magone

Nossa equipe técnica pode ajudá-lo a escolher a melhor opção para sua indústria. Entre em contato para uma consultoria sem compromisso.
    `,
  },
  "guia-moldes-injecao-plastica": {
    title: "Guia de Moldes para Injeção Plástica",
    metaDesc: "Guia completo sobre moldes para injeção plástica: tipos, materiais, fabricação e manutenção. Tudo o que você precisa saber.",
    content: `
## O que é um Molde de Injeção?

O molde de injeção é uma ferramenta de precisão utilizada para dar forma ao material plástico fundido. É composto por duas metades (macho e fêmea) que se unem durante o processo de injeção.

## Tipos de Moldes

### Moldes de Duas Placas
O tipo mais comum e econômico. Ideal para peças simples com ponto de injeção direto.

### Moldes de Três Placas
Permitem maior flexibilidade na localização do ponto de injeção. Ideais para peças que necessitam de injeção submarina.

### Moldes com Câmara Quente
Eliminam o canal de alimentação, reduzindo desperdício de material e tempo de ciclo. Investimento mais alto, mas com retorno rápido em produções de grande escala.

## Materiais Utilizados

- **Aço P20**: Pré-endurecido, ideal para produções médias
- **Aço H13**: Alta resistência térmica, para materiais abrasivos
- **Aço Inox**: Resistência à corrosão, para materiais como PVC

## Fabricação na Magone

A Magone fabrica moldes de alta qualidade utilizando:
- Software CAD/CAM de última geração
- Usinagem CNC de alta precisão
- Eletroerosão por penetração e a fio
- Tratamentos térmicos especializados

## Manutenção Preventiva

A manutenção regular do molde é essencial para garantir a qualidade das peças e a vida útil da ferramenta.
    `,
  },
  "maquinas-usadas-vale-a-pena": {
    title: "Máquinas Injetoras Usadas: Vale a Pena?",
    metaDesc: "Descubra se vale a pena comprar máquinas injetoras usadas. Vantagens, cuidados e como garantir um bom investimento.",
    content: `
## Introdução

O investimento em máquinas injetoras pode representar uma parcela significativa do capital de uma indústria. As máquinas usadas surgem como alternativa viável para otimizar esse investimento.

## Vantagens das Máquinas Usadas

### 1. Economia Significativa
Máquinas usadas revisadas podem custar de 30% a 60% menos que uma máquina nova equivalente, representando economia substancial.

### 2. Disponibilidade Imediata
Enquanto uma máquina nova pode levar meses para ser entregue, uma usada pode estar disponível em poucos dias.

### 3. Valor de Revenda
Máquinas de marcas consagradas mantêm bom valor de revenda no mercado.

## Cuidados na Compra

### Verifique a Procedência
Compre apenas de fornecedores confiáveis que possam comprovar a origem do equipamento.

### Solicite Relatório Técnico
Peça um laudo técnico detalhado sobre o estado da máquina, histórico de manutenção e horas de operação.

### Teste Antes de Comprar
Sempre que possível, solicite um teste de funcionamento antes de fechar a compra.

## Por que Comprar na Magone?

- Todas as máquinas passam por revisão técnica completa
- Garantia de funcionamento
- Suporte técnico pós-venda
- Mais de 30 anos de experiência e credibilidade
- Logística para todo o Brasil

## Conclusão

Comprar máquinas injetoras usadas vale muito a pena quando feito com o fornecedor certo. A Magone garante qualidade e procedência em todas as máquinas comercializadas.
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const article = articles[slug || ""] || articles["como-escolher-maquina-injetora"];

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) return <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">{trimmed.replace("## ", "")}</h2>;
      if (trimmed.startsWith("### ")) return <h3 key={i} className="font-heading text-xl font-bold text-foreground mt-6 mb-3">{trimmed.replace("### ", "")}</h3>;
      if (trimmed.startsWith("- **")) {
        const parts = trimmed.replace("- **", "").split("**:");
        return <li key={i} className="ml-4 text-muted-foreground mb-2"><strong className="text-foreground">{parts[0]}</strong>:{parts[1] || ""}</li>;
      }
      if (trimmed.startsWith("- ")) return <li key={i} className="ml-4 text-muted-foreground mb-2">{trimmed.replace("- ", "")}</li>;
      if (trimmed === "") return <br key={i} />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  return (
    <>
      <SEOHead title={article.title} description={article.metaDesc} canonical={`/blog/${slug}`} />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground max-w-3xl mx-auto">{article.title}</h1>
          </div>
        </section>

        <article className="section-padding bg-background">
          <div className="container-industrial max-w-3xl">
            {renderContent(article.content)}
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default BlogPost;
