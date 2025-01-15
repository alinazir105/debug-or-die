import React, { useState } from 'react';
import airplane from '../assets/airplane.png';

const HomePage = () => {
  const [activeArea, setActiveArea] = useState(null);

  const handleAreaClick = (path) => {
    window.location.href = path;
  };

  const areas = [
    {
      id: 'cockpit',
      shape: 'rect',
      coords: [150, 250, 300, 350], // Engine 2 area
      path: '/page1',
      label: 'Engine 2',
      labelPosition: { top: '260px', left: '460px' }
    },
    {
      id: 'wings',
      shape: 'poly',
      coords: [100, 200, 600, 200, 700, 150, 0, 150], // Wings area
      path: '/page2',
      label: 'Wings',
      labelPosition: { top: '250px', left: '120px' }
    },
    {
      id: 'engine',
      shape: 'circle',
      coords: [200, 350, 50], // Engine 1 area
      path: '/page3',
      label: 'Engine 1',
      labelPosition: { top: '380px', left: '250px' }
    },
    {
      id: 'tail',
      shape: 'poly',
      coords: [200, 50, 300, 50, 350, 100, 250, 100], // Tail area
      path: '/page4',
      label: 'Tail',
      labelPosition: { top: '80px', left: '240px' }
    }
  ];

  const handleMouseEnter = (areaId) => {
    setActiveArea(areaId);
  };

  const handleMouseLeave = () => {
    setActiveArea(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Interactive Airplane Guide</h1>
      
      <div className="relative inline-block">
        <div className="relative">
          <img
            src={airplane}
            alt="Airplane Diagram"
            className="max-w-3xl w-full h-auto"
            useMap="#airplaneMap"
          />
          
          {/* Labels */}
          {areas.map((area) => (
            <div
              key={area.id}
              className={`absolute transition-all duration-300 px-2 py-1 rounded-md text-sm font-semibold
                         ${activeArea === area.id 
                           ? 'bg-blue-500 text-white scale-110' 
                           : 'bg-white text-gray-800 shadow-md'}`}
              style={area.labelPosition}
            >
              <button
                onMouseEnter={() => handleMouseEnter(area.id)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  handleAreaClick(area.path);
                }}
                className="text-sm font-semibold"
                style={{ cursor: 'pointer' }}
              >
                {area.label}
              </button>
            </div>
          ))}
        </div>

        <map name="airplaneMap">
          {areas.map((area) => (
            <area
              key={area.id}
              shape={area.shape}
              coords={area.coords.join(',')}
              alt={area.label}
              style={{ pointerEvents: 'none' }}  // Disable mouse events on image map
            />
          ))}
        </map>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Navigation Guide</h2>
        <div className="grid grid-cols-2 gap-4">
          {areas.map((area) => (
            <div 
              key={area.id}
              className="flex items-center space-x-2"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{area.label} - Page {area.path.slice(-1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
