
import { Pokemon, PokemonListResponse } from "@/types/pokemon";
import { toast } from "@/components/ui/use-toast";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    const error = new Error("Não foi possível carregar a lista de Pokémon");
    toast({
      variant: "destructive",
      title: "Erro ao carregar Pokémon",
      description: error.message,
    });
    throw error;
  }
  return response.json();
}

export async function getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`);
  if (response.status === 404) {
    const error = new Error(`Pokémon ${nameOrId} não encontrado`);
    toast({
      variant: "destructive",
      title: "Erro ao carregar Pokémon",
      description: error.message,
    });
    throw error;
  }
  if (!response.ok) {
    const error = new Error(`Não foi possível carregar os detalhes do Pokémon ${nameOrId}`);
    toast({
      variant: "destructive",
      title: "Erro ao carregar Pokémon",
      description: error.message,
    });
    throw error;
  }
  return response.json();
}

// Função auxiliar para buscar detalhes em lotes
export async function getPokemonDetailsInBatches(urls: string[], batchSize: number = 10): Promise<Pokemon[]> {
  const results: Pokemon[] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(url => fetch(url).then(res => res.json()))
    );
    results.push(...batchResults);
  }
  return results;
}
