import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type TripDraft = { pickup: string; dropoff: string };
type TripContextValue = {
  queries: TripDraft;
  setQueries: Dispatch<SetStateAction<TripDraft>>;
};

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [queries, setQueries] = useState<TripDraft>({
    pickup: "",
    dropoff: "",
  });
  return (
    <TripContext.Provider value={{ queries, setQueries }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const trip = useContext(TripContext);
  if (!trip) throw new Error("useTrip must be used inside TripProvider");
  return trip;
}
