
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "@/services/pokemon";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const DetalhePokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetails(id || ""),
  });

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-300",
      fighting: "bg-red-600",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-800",
      ghost: "bg-purple-600",
      dragon: "bg-indigo-600",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-400",
    };
    return colors[type] || "bg-gray-400";
  };

  const translateType = (type: string) => {
    const types: { [key: string]: string } = {
      normal: "Normal",
      fire: "Fogo",
      water: "Água",
      electric: "Elétrico",
      grass: "Planta",
      ice: "Gelo",
      fighting: "Lutador",
      poison: "Venenoso",
      ground: "Terra",
      flying: "Voador",
      psychic: "Psíquico",
      bug: "Inseto",
      rock: "Pedra",
      ghost: "Fantasma",
      dragon: "Dragão",
      dark: "Sombrio",
      steel: "Metálico",
      fairy: "Fada",
    };
    return types[type] || type;
  };

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
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a Pokédex
        </Button>
        
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Não foi possível carregar os detalhes deste Pokémon. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl mb-4">Pokémon não encontrado</div>
        <Button onClick={() => navigate("/")}>Voltar para a Pokédex</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para a Pokédex
      </Button>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-64 h-64 animate-float"
            />
          </div>

          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
            <p className="text-gray-500 mb-4">#{pokemon.id}</p>

            <div className="flex gap-2 justify-center mb-6">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`${getTypeColor(
                    type.name
                  )} px-4 py-1 rounded-full text-white text-sm font-medium capitalize`}
                >
                  {translateType(type.name)}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Altura</h3>
                <p>{pokemon.height / 10} m</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Peso</h3>
                <p>{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {pokemon.abilities.map(({ ability }) => (
                  <span
                    key={ability.name}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhePokemon;
