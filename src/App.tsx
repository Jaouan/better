import { useShallow } from "zustand/shallow";
import { AddCountButton, Chart, Error, NavBar, Sum } from "@/components";
import { useAuthStore, useCountsStore } from "@/stores";

function App() {
  const { user, restricted } = useAuthStore();
  const lastCountDate = useCountsStore(
    useShallow(({ lastCountDate }) => lastCountDate)
  );

  return (
    <>
      <NavBar />
      <main className="*:animate-fade max-w-[800px] mx-auto px-2">
        {restricted && <Error message="Votre compte n'est pas autorisé." />}
        {lastCountDate !== null && (
          <>
            <section className="mx-6 my-8 px-2 flex items-center justify-between">
              <Sum />
              {user && <AddCountButton />}
            </section>
            <section>
              <Chart />
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
