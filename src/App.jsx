import React, { useState } from 'react';
import axios from 'axios';
import Results from './components/Results';
import Pagination from './components/Pagination';

function App() {
  const [searchData, setSearchData] = useState({
    keywords: '',
    location: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchData.keywords.trim() && !searchData.location.trim()) {
      setError('Veuillez entrer des mots-clés ou une localisation');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const response = await axios.get('https://list.senrevision.com/api/search.php?query=' + encodeURIComponent(searchData.keywords) + '&location=' + encodeURIComponent(searchData.location));
      const results = response.data;
      if (results.data && Array.isArray(results.data)) {
        setResults(results.data);
        setTotalResults(results.count);
      } else {
        setResults([]);
        setTotalResults(0);
        setError('Aucun résultat trouvé'); 
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Erreur lors de la connexion au serveur. Vérifiez que le serveur PHP est bien démarré.');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // / Calculer les résultats à afficher pour la page courante
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            Recherche d'Entreprises Locales
          </h1>
          <p className="text-center mt-2 text-primary-content/80">
            Trouvez facilement les entreprises près de chez vous
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Rechercher une entreprise</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Keywords Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Mots-clés</span>
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    placeholder="ex: Restaurant, Coiffeur, Garage..."
                    className="input input-bordered input-primary w-full"
                    value={searchData.keywords}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                {/* Location Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Localisation</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="ex: Paris, Lyon, Marseille..."
                    className="input input-bordered input-primary w-full"
                    value={searchData.location}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="form-control pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full md:w-auto md:px-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Recherche en cours...
                    </>
                  ) : (
                    'Rechercher'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error shadow-lg mb-6 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="mt-4 text-lg">Recherche en cours...</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <>
            <div className="mb-4">
              <p className="text-lg font-medium">
                {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
              </p>
            </div>
            
            <Results results={currentResults} />
            
            {/* Pagination */}
            {totalResults > resultsPerPage && (
              <Pagination
                resultsPerPage={resultsPerPage}
                totalResults={totalResults}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && results.length === 0 && searchData.keywords && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <h3 className="mt-4 text-lg font-medium">Aucun résultat trouvé</h3>
              <p className="mt-2 text-gray-500">Essayez avec d'autres mots-clés ou une autre localisation</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-base-300 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-base-content/70">
            © 2024 Recherche d'Entreprises Locales
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;