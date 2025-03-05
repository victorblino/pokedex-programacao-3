
import { Pokemon } from "@/types/pokemon";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();

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

  return (
    <Card
      className="relative overflow-hidden p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in"
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <div className="absolute top-2 right-2 text-sm font-mono text-gray-500">#{pokemon.id}</div>
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-32 h-32 animate-float"
          loading="lazy"
        />
        <h3 className="mt-2 text-lg font-semibold capitalize">{pokemon.name}</h3>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${getTypeColor(
                type.name
              )} px-2 py-1 rounded-full text-white text-xs font-medium capitalize`}
            >
              {translateType(type.name)}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
