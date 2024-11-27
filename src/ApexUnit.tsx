import { Divide, Info, MapPin, Search, Zap } from "lucide-react";
import Button from "./components/Button";
import { ArrowDownUp } from "lucide-react";
import logo from "./assets/logo.svg";
import { useQuery } from "@tanstack/react-query";
import { UnityResponse } from "./interfaces/UnityResponse";
import api from "./lib/axios";
import { useEffect, useState } from "react";
import { LocationResponse } from "./interfaces/LocationResponse";

async function getUnity() {
  const response = await api.get("/companies");
  return response.data;
}

async function getLocations(id: string) {
  const response = await api.get(`/companies/${id}/locations`);
  return response.data;
}

function ApexUnit() {
  const [selectedUnity, setSelectedUnity] = useState<string | null>(null);

  const unitiesQuery = useQuery<UnityResponse>({
    queryKey: ["unity"],
    queryFn: getUnity,
  });

  const unities = unitiesQuery.data;

  const locationsQuery = useQuery<LocationResponse>({
    queryKey: ["locations"],
    queryFn: () =>
      selectedUnity ? getLocations(selectedUnity) : Promise.resolve([]),
    enabled: !!selectedUnity,
  });

  const locations = locationsQuery.data;

  useEffect(() => {
    if (unities?.length) {
      setSelectedUnity(unities[2].id);
    }
  }, [unities]);

  const baseLocations = locations?.filter(
    (location) => location.parentId === null
  );

  const subDirectLocations = baseLocations?.flatMap((base) =>
    locations?.filter((subLocation) => base.id === subLocation.parentId)
  );

  return (
    <div className="grid grid-rows-[auto_1fr] bg-[#E3EAEF] min-h-screen">
      <header className="sticky top-0 left-0 w-full h-[68px] p-4 flex justify-between items-center gap-5 bg-[#17192D]">
        <img src={logo} alt="Tractian" />

        <div className="flex items-center gap-2.5">
          {unities
            ? unities.map((unity) => (
                <Button
                  key={unity.id}
                  variant="fill"
                  icon={<ArrowDownUp size={15} />}
                >
                  {unity.name}
                </Button>
              ))
            : ""}
        </div>
      </header>

      <div className="bg-white m-2 p-4 border border-[#D8DFE6] rounded">
        <div className="flex justify-between items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-[#24292F]">Ativos</span>
            <span className="text-[#77818C]">/ Apex Unit</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" icon={<Zap size={18} />}>
              Sensor de Energia
            </Button>
            <Button
              variant="outline"
              selected={false}
              icon={<Info size={18} />}
            >
              Crítico
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2.1fr] gap-2">
          <div className="overflow-y-auto rounded-sm border border-[#D8DFE6]">
            <div className="relative">
              <input
                type="text"
                className="border-none bg-transparent w-full h-[45px] pl-3 pr-10 placeholder:text-[#C1C9D2]"
                placeholder="Buscar Ativo ou Local"
              />
              <Search
                size={15}
                className="absolute right-3 bottom-0 h-[45px]"
              />
            </div>

            {baseLocations &&
              baseLocations.map((location) => (
                <div key={location.id}>
                  <div
                    key={location.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <MapPin color="#2188FF" />
                    {location.name}
                  </div>
                </div>
              ))}
          </div>

          <div className="rounded-sm border border-[#D8DFE6]"></div>
        </div>
      </div>
    </div>
  );
}

export default ApexUnit;
