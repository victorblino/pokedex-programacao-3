
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemonDetailsInBatches } from "@/services/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20; // Quantidade de Pokémon por página

  // Calcular o offset baseado na página atual
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-list", offset],
    queryFn: async () => {
      const list = await getPokemonList(offset, limit);
      const urls = list.results.map(pokemon => pokemon.url);
      const pokemon = await getPokemonDetailsInBatches(urls);
      return {
        count: list.count,
        pokemon
      };
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const pokemonList = data?.pokemon || [];
  const totalCount = data?.count || 0;
  
  // Aplicar filtros
  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || pokemon.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  // Calcular o total de páginas com base no total de Pokémon
  const totalPages = Math.ceil(totalCount / limit);

  // Função para navegar para a página anterior
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Função para navegar para a próxima página
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Função para navegar para uma página específica
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Redefinir para a primeira página ao alterar filtros
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

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

  if (isLoading && offset === 0) {
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

  const hasNoResults = filteredPokemon.length === 0;
  
  // Geração dos números de página para o componente de paginação
  const getPageNumbers = () => {
    const MAX_VISIBLE_PAGES = 5;
    const pageNumbers = [];
    
    if (totalPages <= MAX_VISIBLE_PAGES) {
      // Se tivermos menos páginas que o máximo visível, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sempre mostrar a primeira página
      pageNumbers.push(1);
      
      // Calcular o intervalo de páginas a serem mostradas
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);
      
      // Ajustar se estivermos perto do início ou fim
      if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        endPage = totalPages - 1;
        startPage = Math.max(2, endPage - 2);
      }
      
      // Adicionar elipses antes das páginas do meio se necessário
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }
      
      // Adicionar páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Adicionar elipses depois das páginas do meio se necessário
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }
      
      // Sempre mostrar a última página
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="w-full"
        />
        <Select 
          value={selectedType} 
          onValueChange={(value) => {
            setSelectedType(value);
            handleFilterChange();
          }}
        >
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
      
      {!hasNoResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePreviousPage();
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(Number(page));
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNextPage();
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Index;
