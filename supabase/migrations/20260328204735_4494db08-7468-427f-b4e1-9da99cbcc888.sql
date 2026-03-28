
-- Create enum for product condition
CREATE TYPE public.produto_situacao AS ENUM ('Novo', 'Usado', 'Reformado');

-- Departamentos
CREATE TABLE public.departamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Marcas
CREATE TABLE public.marcas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Parceiros
CREATE TABLE public.parceiros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  detalhes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Produtos
CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referencia TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  marca_id UUID REFERENCES public.marcas(id) ON DELETE SET NULL,
  modelo TEXT,
  ano INTEGER,
  parceiro_id UUID REFERENCES public.parceiros(id) ON DELETE SET NULL,
  preco DECIMAL(12,2),
  quantidade INTEGER NOT NULL DEFAULT 0,
  situacao public.produto_situacao NOT NULL DEFAULT 'Usado',
  departamento_id UUID REFERENCES public.departamentos(id) ON DELETE SET NULL,
  imagens TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.departamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marcas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read departamentos" ON public.departamentos FOR SELECT USING (true);
CREATE POLICY "Public read marcas" ON public.marcas FOR SELECT USING (true);
CREATE POLICY "Public read parceiros" ON public.parceiros FOR SELECT USING (true);
CREATE POLICY "Public read produtos" ON public.produtos FOR SELECT USING (true);

-- Authenticated users can manage
CREATE POLICY "Auth manage departamentos" ON public.departamentos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth manage marcas" ON public.marcas FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth manage parceiros" ON public.parceiros FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth manage produtos" ON public.produtos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_departamentos_updated_at BEFORE UPDATE ON public.departamentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_marcas_updated_at BEFORE UPDATE ON public.marcas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parceiros_updated_at BEFORE UPDATE ON public.parceiros FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON public.produtos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_produtos_marca ON public.produtos(marca_id);
CREATE INDEX idx_produtos_departamento ON public.produtos(departamento_id);
CREATE INDEX idx_produtos_parceiro ON public.produtos(parceiro_id);
CREATE INDEX idx_produtos_referencia ON public.produtos(referencia);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('produtos', 'produtos', true);

CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'produtos');
CREATE POLICY "Auth upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'produtos');
CREATE POLICY "Auth update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'produtos');
CREATE POLICY "Auth delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'produtos');
