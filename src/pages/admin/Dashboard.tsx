import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Tag, Building2 } from "lucide-react";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [produtos, parceiros, marcas, departamentos] = await Promise.all([
        supabase.from("produtos").select("*", { count: "exact", head: true }),
        supabase.from("parceiros").select("*", { count: "exact", head: true }),
        supabase.from("marcas").select("*", { count: "exact", head: true }),
        supabase.from("departamentos").select("*", { count: "exact", head: true }),
      ]);
      return {
        produtos: produtos.count ?? 0,
        parceiros: parceiros.count ?? 0,
        marcas: marcas.count ?? 0,
        departamentos: departamentos.count ?? 0,
      };
    },
  });

  const cards = [
    { label: "Produtos", value: stats?.produtos ?? 0, icon: Package, color: "text-primary" },
    { label: "Parceiros", value: stats?.parceiros ?? 0, icon: Users, color: "text-accent" },
    { label: "Marcas", value: stats?.marcas ?? 0, icon: Tag, color: "text-industrial-teal" },
    { label: "Departamentos", value: stats?.departamentos ?? 0, icon: Building2, color: "text-industrial-steel" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-bold text-2xl text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
