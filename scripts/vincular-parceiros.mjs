import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://utnkmabblqbswlplbsxm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bmttYWJibHFic3dscGxic3htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ4MTU5NSwiZXhwIjoyMDk1MDU3NTk1fQ.wakCkcfDHWtKx8LHscPhZGdVc8k1pH9WtT7cksI_jjc"
);

// Mapeamento: old_id → nome do parceiro (conforme lista fornecida)
const oldIdToNome = {
  220: "AB Utilidades", 166: "AGomes", 106: "ALDORINO", 68: "Acoplas",
  131: "Adinei", 101: "Alessandro", 132: "Alfamach", 89: "Amilplast",
  232: "América Tampas", 34: "Aqualine", 253: "Arnolfo", 239: "Art Copos",
  259: "Artt Plasticos", 18: "Beira Alta", 208: "Beira Alta II", 2: "Bezavel",
  222: "Biemme", 117: "Biofarmaceutica", 250: "Bruen", 163: "Bruno",
  49: "Burgues", 64: "C.G.E", 257: "CLEPLAX", 206: "Calpinjet",
  153: "Canato", 92: "Casa Line", 251: "Casco", 267: "Caterina",
  260: "Cebi", 110: "Cellpus", 97: "Cido Cruz", 161: "Claudinei",
  73: "Colorcup", 195: "Compet Auto Falantes", 142: "Compulux", 154: "Cortazzo",
  29: "Costa Plastik", 121: "Creative", 127: "DBL", 160: "DG Marel",
  17: "DMI Máquinas", 183: "Daivak", 66: "Danilo Jacob", 277: "Desli",
  240: "Disnei", 245: "ECUS", 256: "EXATA", 152: "Ekoplus",
  123: "Eletropower", 95: "Emperium", 134: "Erdal", 233: "Essencial",
  174: "Euromold", 52: "Evemplastic", 262: "Everson", 126: "FAME",
  270: "Fabricio", 58: "Fenix", 200: "Filler", 46: "Focus Sul",
  180: "Francisco - Pedreira", 205: "GF Lanternas", 90: "GROUPACK", 35: "GVS",
  122: "Gan", 143: "Gefertec", 264: "Granado", 81: "Grid",
  243: "Grupo Antolin", 75: "Grupo K", 138: "HG", 196: "Hannaplast",
  209: "Harribrindes", 168: "Hidrossol", 158: "Himaflex", 150: "IFA Plast",
  165: "INBR", 120: "INJEPLASTEC", 88: "Inforplast", 173: "Injectorplastic",
  236: "Injemac", 248: "Injequale", 177: "Inova", 112: "Iva - Agua Rasa",
  32: "JC Plasticos", 14: "JORGE (TANAMÚ)", 164: "JPA", 111: "JR EXTRUSÃO",
  87: "Joel PL", 189: "Joelini", 230: "K1 Ferramentaria", 62: "Keita",
  162: "Kepler", 151: "Kilimplast", 65: "KraH", 212: "Kraus-Muller",
  188: "LC Ferramentaria", 105: "LCS", 193: "Lagazzi", 194: "Lanna",
  60: "Lar Plasticos", 115: "Laudelino", 238: "Luinjet", 1: "MAGONE",
  53: "MAHLE", 7: "MARCOS PRATERO", 99: "MAXIPLAST", 214: "METALTEX",
  98: "MILENIO", 54: "MPacking", 252: "MRE", 225: "Mac Loren",
  146: "Maee", 190: "Magus", 139: "Malaquias", 255: "Mapario",
  31: "Marcelo Franca", 156: "Marp", 178: "Marp", 242: "Marpla",
  221: "Marwell", 234: "Mary Itu", 149: "Matrix", 104: "Maua",
  55: "Maxicaixa", 36: "Mebuki", 41: "Megatech", 223: "Megatech",
  279: "Melida", 93: "Meriodomaq", 261: "Metalplas", 169: "Mexabem",
  20: "Miguel Vitorino", 159: "Mil Vasos", 283: "Moldit", 246: "Moldplast",
  229: "Monte Libano", 202: "Monte Tampas", 116: "Natanael", 185: "Natuplast",
  235: "Newfer", 79: "Nilton Londrina", 113: "Ninaplast", 269: "Nova Era",
  271: "Novacril", 272: "Novacril", 176: "Oldimar", 50: "Oppeanto",
  203: "Optovac", 266: "Oralgift", 48: "Oxiplas", 148: "PL Ferram",
  77: "PLASNORTHON", 102: "PLESTIN", 128: "PLastemac", 268: "PauloRicardo",
  61: "Pavão", 114: "Petrocar", 249: "Pider", 63: "Pieretti",
  129: "Pirituba", 282: "Plaest", 135: "Plasfergi", 213: "Plasjet",
  186: "Plasmart", 8: "Plasmolde", 124: "Plasmáquina", 133: "Plasnanda",
  91: "Plasonic", 285: "Plastbag", 155: "Plastiteco", 85: "Plastvida",
  19: "Plasvic", 78: "Pochini", 45: "Polibol", 4: "Polijet",
  201: "Polinjet", 83: "Prado", 96: "Pratika-UD", 44: "Promold",
  13: "QUANTUNPLAS", 43: "Quest", 82: "R & S", 80: "RCG",
  37: "RODRIGUES", 86: "RS Plasticos", 107: "Raimundo - Brascom", 24: "Raiplast",
  227: "Real Pen", 276: "Reciplast", 12: "Reginaldo Maia", 72: "Renato - Engel",
  9: "Riberbrink", 197: "Ricaelle", 145: "Richiotto", 137: "Rodzand",
  218: "Rogitec", 38: "Romintech", 210: "Romulo Germer", 21: "Rose Plastic",
  192: "Rossetti", 207: "Ruiz", 5: "Russo", 125: "SANPLAST",
  69: "SANTEC", 241: "SN Ferramentaria", 76: "SOL Embalagens", 179: "Saciloto",
  144: "Saga", 39: "Satech", 280: "Satech", 84: "Save Energy",
  70: "Schmersal", 254: "Seancar", 231: "Senior Moldes", 40: "Sforplast",
  42: "Sigal", 217: "Signumat", 109: "Sillas", 23: "Smartbox",
  263: "Solo Industrial", 141: "Squadroni", 6: "Start Plastico", 100: "Steck",
  273: "Steelmac", 247: "Strahl", 182: "Sulbras", 26: "Supercopo",
  16: "Suport Med", 27: "Suttini", 28: "TEGAFER", 22: "Tanamu",
  147: "Teccar", 136: "Tecnoplastic", 215: "Tecnowork", 103: "Teskmedical",
  67: "Tir Injetados", 281: "Topinjet", 167: "Trali", 284: "Transrecari",
  11: "Triplastic", 108: "Trisil", 30: "Tupan", 119: "Turbo Car",
  74: "Ucelo", 33: "Universal Tools", 130: "Usipart",
  184: "Vago", 187: "Vago", 191: "Vago", 211: "Vago", 216: "Vago",
  219: "Vago", 224: "Vago", 226: "Vago", 228: "Vago", 237: "Vago",
  244: "Vago", 258: "Vago", 274: "Vago", 275: "Vago", 286: "Vago",
  94: "Ved Systen", 51: "Veplasticos", 181: "Vetor", 15: "Vicplas",
  157: "Vinnere", 10: "WASHINGTON", 71: "WISA", 265: "Willaplast",
  3: "ZEZINHO", 47: "ZURICH", 278: "Zenaplast", 175: "Zito",
};

async function main() {
  // Busca todos os parceiros do Supabase
  const { data: parceiros, error: pErr } = await supabase.from("parceiros").select("id, nome");
  if (pErr) { console.error("Erro ao buscar parceiros:", pErr.message); return; }

  // Monta índice: nome → uuid
  const nomeToUuid = {};
  for (const p of parceiros) nomeToUuid[p.nome] = p.id;

  // Monta índice: old_id → uuid
  const oldIdToUuid = {};
  for (const [oldId, nome] of Object.entries(oldIdToNome)) {
    const uuid = nomeToUuid[nome];
    if (uuid) oldIdToUuid[oldId] = uuid;
  }

  console.log(`Mapeados ${Object.keys(oldIdToUuid).length} IDs antigos para UUIDs`);

  // Busca todos os produtos
  const { data: produtos, error: prErr } = await supabase.from("produtos").select("id, referencia");
  if (prErr) { console.error("Erro ao buscar produtos:", prErr.message); return; }

  console.log(`${produtos.length} produtos encontrados`);

  let vinculados = 0, semParceiro = 0, naoEncontrado = 0;

  for (const produto of produtos) {
    // Extrai o ID do parceiro da referência: "5983/163" → 163 ou "5983-163" → 163
    const match = produto.referencia.match(/[\/\-](\d+)$/);
    if (!match) { semParceiro++; continue; }

    const oldId = match[1];
    const parceiroUuid = oldIdToUuid[oldId];

    if (!parceiroUuid) { naoEncontrado++; continue; }

    const { error } = await supabase
      .from("produtos")
      .update({ parceiro_id: parceiroUuid })
      .eq("id", produto.id);

    if (error) {
      console.error(`Erro no produto ${produto.referencia}:`, error.message);
    } else {
      vinculados++;
    }
  }

  console.log(`\n✅ Concluído!`);
  console.log(`   Vinculados: ${vinculados}`);
  console.log(`   Sem parceiro na ref: ${semParceiro}`);
  console.log(`   ID não encontrado: ${naoEncontrado}`);
}

main();
