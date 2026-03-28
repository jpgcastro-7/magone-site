import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ProdutoSituacao = Database["public"]["Enums"]["produto_situacao"];

type Produto = {
  id: string;
  referencia: string;
  nome: string;
  descricao: string | null;
  marca_id: string | null;
  modelo: string | null;
  ano: number | null;
  parceiro_id: string | null;
  preco: number | null;
  quantidade: number;
  situacao: ProdutoSituacao;
  departamento_id: string | null;
  imagens: string[];
  marcas?: { nome: string } | null;
  parceiros?: { nome: string } | null;
  departamentos?: { nome: string } | null;
};

const emptyForm = {
  referencia: "",
  nome: "",
  descricao: "",
  marca_id: "",
  modelo: "",
  ano: "",
  parceiro_id: "",
  preco: "",
  quantidade: "0",
  situacao: "Usado" as Database["public"]["Enums"]["produto_situacao"],
  departamento_id: "",
};

const AdminProdutos = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filterMarca, setFilterMarca] = useState("all");
  const [filterDepto, setFilterDepto] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: produtos = [] } = useQuery({
    queryKey: ["admin-produtos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*, marcas(nome), parceiros(nome), departamentos(nome)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Produto[];
    },
  });

  const { data: marcas = [] } = useQuery({
    queryKey: ["admin-marcas"],
    queryFn: async () => {
      const { data } = await supabase.from("marcas").select("*").order("nome");
      return data ?? [];
    },
  });

  const { data: parceiros = [] } = useQuery({
    queryKey: ["admin-parceiros"],
    queryFn: async () => {
      const { data } = await supabase.from("parceiros").select("*").order("nome");
      return data ?? [];
    },
  });

  const { data: departamentos = [] } = useQuery({
    queryKey: ["admin-departamentos"],
    queryFn: async () => {
      const { data } = await supabase.from("departamentos").select("*").order("nome");
      return data ?? [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        referencia: form.referencia,
        nome: form.nome,
        descricao: form.descricao || null,
        marca_id: form.marca_id || null,
        modelo: form.modelo || null,
        ano: form.ano ? parseInt(form.ano) : null,
        parceiro_id: form.parceiro_id || null,
        preco: form.preco ? parseFloat(form.preco) : null,
        quantidade: parseInt(form.quantidade) || 0,
        situacao: form.situacao as ProdutoSituacao,
        departamento_id: form.departamento_id || null,
        imagens: imageUrls,
      };
      if (editId) {
        const { error } = await supabase.from("produtos").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("produtos").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: editId ? "Produto atualizado!" : "Produto cadastrado!" });
      qc.invalidateQueries({ queryKey: ["admin-produtos"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
      resetForm();
    },
    onError: (err: Error) => {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("produtos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Produto removido!" });
      qc.invalidateQueries({ queryKey: ["admin-produtos"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setImageUrls([]);
    setOpen(false);
  };

  const openEdit = (p: Produto) => {
    setEditId(p.id);
    setForm({
      referencia: p.referencia,
      nome: p.nome,
      descricao: p.descricao || "",
      marca_id: p.marca_id || "",
      modelo: p.modelo || "",
      ano: p.ano?.toString() || "",
      parceiro_id: p.parceiro_id || "",
      preco: p.preco?.toString() || "",
      quantidade: p.quantidade.toString(),
      situacao: p.situacao,
      departamento_id: p.departamento_id || "",
    });
    setImageUrls(p.imagens || []);
    setOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const urls: string[] = [...imageUrls];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("produtos").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("produtos").getPublicUrl(path);
        urls.push(urlData.publicUrl);
      }
    }
    setImageUrls(urls);
    setUploading(false);
  };

  const filtered = produtos.filter((p) => {
    const matchSearch = !search || p.nome.toLowerCase().includes(search.toLowerCase()) || p.referencia.toLowerCase().includes(search.toLowerCase());
    const matchMarca = filterMarca === "all" || p.marca_id === filterMarca;
    const matchDepto = filterDepto === "all" || p.departamento_id === filterDepto;
    return matchSearch && matchMarca && matchDepto;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-heading font-bold text-2xl">Produtos</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Novo Produto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editId ? "Editar Produto" : "Novo Produto"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Referência *</Label>
                  <Input value={form.referencia} onChange={(e) => setForm({ ...form, referencia: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Produto *</Label>
                  <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Marca</Label>
                  <Select value={form.marca_id} onValueChange={(v) => setForm({ ...form, marca_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {marcas.map((m) => <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <Input value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input type="number" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Parceiro</Label>
                  <Select value={form.parceiro_id} onValueChange={(v) => setForm({ ...form, parceiro_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {parceiros.map((p) => <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preço (R$)</Label>
                  <Input type="number" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input type="number" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Situação *</Label>
                  <Select value={form.situacao} onValueChange={(v) => setForm({ ...form, situacao: v as ProdutoSituacao })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Usado">Usado</SelectItem>
                      <SelectItem value="Reformado">Reformado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select value={form.departamento_id} onValueChange={(v) => setForm({ ...form, departamento_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {departamentos.map((d) => <SelectItem key={d.id} value={d.id}>{d.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea rows={4} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Imagens</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <label className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-1" /> {uploading ? "Enviando..." : "Upload"}
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </Button>
                </div>
                {imageUrls.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {imageUrls.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="h-20 w-20 object-cover rounded border" />
                        <button
                          type="button"
                          onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou referência..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterMarca} onValueChange={setFilterMarca}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Marca" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Marcas</SelectItem>
            {marcas.map((m) => <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterDepto} onValueChange={setFilterDepto}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Departamento" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Deptos</SelectItem>
            {departamentos.map((d) => <SelectItem key={d.id} value={d.id}>{d.nome}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref.</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Marca</TableHead>
              <TableHead className="hidden md:table-cell">Situação</TableHead>
              <TableHead className="hidden lg:table-cell">Preço</TableHead>
              <TableHead className="hidden lg:table-cell">Qtd</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Nenhum produto encontrado.</TableCell></TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.referencia}</TableCell>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.marcas?.nome ?? "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      p.situacao === "Novo" ? "bg-industrial-success/10 text-industrial-success" :
                      p.situacao === "Reformado" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {p.situacao}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {p.preco ? `R$ ${Number(p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{p.quantidade}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProdutos;
