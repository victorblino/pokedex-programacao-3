
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemonDetailsInBatches } from "@/services/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const { data: pokemonList, isLoading, error } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: async () => {
      const list = await getPokemonList(0, 151); // Reduzindo para primeira geração inicialmente
      const urls = list.results.map(pokemon => pokemon.url);
      return getPokemonDetailsInBatches(urls);
    },
  });

  const tipos = [
    { value: "all", label: "Todos os tipos" },
    { value: "normal", label: "Normal" },
    { value: "fire", label: "Fogo" },
    { value: "water", label: "Água" },
    { value: "electric", label: "Elétrico" },
    { value: "grass", label: "Planta" },
    { value: "ice", label: "Gelo" },
    { value: "fighting", label: "Lutador" },
    { value: "poison", label: "Venenoso" },
    { value: "ground", label: "Terra" },
    { value: "flying", label: "Voador" },
    { value: "psychic", label: "Psíquico" },
    { value: "bug", label: "Inseto" },
    { value: "rock", label: "Pedra" },
    { value: "ghost", label: "Fantasma" },
    { value: "dragon", label: "Dragão" },
    { value: "dark", label: "Sombrio" },
    { value: "steel", label: "Metálico" },
    { value: "fairy", label: "Fada" },
  ];

  const filteredPokemon = pokemonList?.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || pokemon.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl animate-bounce">Carregando Pokémon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Ocorreu um erro ao carregar os Pokémon. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const hasNoResults = filteredPokemon?.length === 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            {tipos.map(tipo => (
              <SelectItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasNoResults && (
          <Alert>
            <AlertDescription>
              Nenhum Pokémon encontrado com os filtros selecionados.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
