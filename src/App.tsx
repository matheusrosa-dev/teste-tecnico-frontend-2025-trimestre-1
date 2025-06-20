import { Header, SearchCepForm } from "./components";

function App() {
  return (
    <main>
      <Header />

      <div className="w-4/5 mx-auto">
        <h2 className="text-4xl font-medium">Pesquise por CEP</h2>
        <p className="text-xl mt-2 text-gray-700 font-thin mb-10">
          Encontre detalhes do endereço pelo CEP
        </p>

        <SearchCepForm />
      </div>
    </main>
  );
}

export default App;
