import React from 'react';
import Map from './Map';

function Results({ results }) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((business, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Card Image */}
            <figure className="relative h-48 overflow-hidden">
              {business.image ? (
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTA4LjI4NCA3MCA5NS4wMzU3IDc3LjE2NDMgOTUuMDM1NyA4NS40NDg3VjExNC41NTFDOTUuMDM1NyAxMjIuODM2IDEwOC4yODQgMTMwIDEwMCAxMzBDOTEuNzE1NyAxMzAgODQuNTUxMyAxMjIuODM2IDg0LjU1MTMgMTE0LjU1MVY4NS40NDg3Qzg0LjU1MTMgNzcuMTY0MyA5MS43MTU3IDcwIDEwMCA3MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  }}
                />
              ) : (
                <div className="w-full h-full">
                   <Map mapId={`map-${index}`} latitude={business.latitude} longitude={business.longitude} name={business.name} />
                </div>
              )}
            </figure>

            {/* Card Body */}
            <div className="card-body">
              <h3 className="card-title text-lg font-semibold text-neutral">
                {business.name}
              </h3>
              
              {/* Address */}
              <div className="flex items-start space-x-2 mt-2">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-gray-600">
                  {business.address}
                  {business.city && `, ${business.city}`}
                  {business.country && `, ${business.country}`}
                </p>
              </div>

              {/* Phone */}
              {business.phone && (
                <div className="flex items-center space-x-2 mt-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {business.phone}
                  </a>
                </div>
              )}

              {/* Website */}
              {business.website && (
                <div className="flex items-center space-x-2 mt-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate max-w-40"
                  >
                    {business.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}

export default Results;