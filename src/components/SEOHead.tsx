import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead = ({ title, description, canonical, ogImage }: SEOHeadProps) => {
  const fullTitle = `${title} | Magone - Máquinas Injetoras e Moldes`;
  const baseUrl = "https://www.magone.com.br";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical ? `${baseUrl}${canonical}` : baseUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical ? `${baseUrl}${canonical}` : baseUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Magone" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;
