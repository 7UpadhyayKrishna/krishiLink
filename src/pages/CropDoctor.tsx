import React, { useState } from 'react';
import { Upload, Camera, Search, MessageSquare } from 'lucide-react';
import { mockDiseases, mockPlants } from '../data/mockData';

const CropDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeTab, setActiveTab] = useState('symptoms');
  
  const filteredDiseases = mockDiseases.filter(
    disease => disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Crop Doctor</h1>
      <p className="text-gray-600 mb-8">Identify plant diseases and get expert advice</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Disease detection section */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Detect Plant Diseases</h2>
              <p className="opacity-90">Upload a photo of your plant to identify diseases and get treatment recommendations</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-700 font-medium mb-1">Drag and drop image here</p>
                <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-gray-500">or</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium">
                <Camera className="w-5 h-5" />
                Take a Photo
              </button>
            </div>
          </div>
          
          {/* Common diseases */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Common Plant Diseases</h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search diseases, plants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDiseases.map((disease) => (
                <div 
                  key={disease.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedIssue?.id === disease.id 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
                  }`}
                  onClick={() => setSelectedIssue(disease)}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" 
                      style={{backgroundImage: `url(${disease.image})`}}
                    ></div>
                    <div>
                      <h3 className="font-medium text-gray-800">{disease.name}</h3>
                      <p className="text-sm text-gray-500">
                        Affects: {disease.crops.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          {/* Expert advice section */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 sticky top-4">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
              <h2 className="text-lg font-semibold">Expert Advice</h2>
            </div>
            
            {selectedIssue ? (
              <div>
                <div className="border-b">
                  <div className="flex">
                    <button 
                      className={`flex-1 py-3 px-4 font-medium text-sm ${
                        activeTab === 'symptoms' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
                      }`}
                      onClick={() => setActiveTab('symptoms')}
                    >
                      Symptoms
                    </button>
                    <button 
                      className={`flex-1 py-3 px-4 font-medium text-sm ${
                        activeTab === 'treatment' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
                      }`}
                      onClick={() => setActiveTab('treatment')}
                    >
                      Treatment
                    </button>
                    <button 
                      className={`flex-1 py-3 px-4 font-medium text-sm ${
                        activeTab === 'prevention' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
                      }`}
                      onClick={() => setActiveTab('prevention')}
                    >
                      Prevention
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  {activeTab === 'symptoms' && (
                    <div>
                      <h3 className="font-medium mb-2 text-gray-800">{selectedIssue.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{selectedIssue.description}</p>
                      <h4 className="font-medium text-sm mb-2 text-gray-700">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {selectedIssue.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'treatment' && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-gray-700">Recommended Treatment:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                        {selectedIssue.treatment.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'prevention' && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-gray-700">Prevention Methods:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                        {selectedIssue.prevention.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t bg-gray-50">
                  <button className="w-full flex items-center justify-center gap-2 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Ask an Expert
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">Select a plant disease or upload an image to get expert advice</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mockPlants.slice(0, 6).map((plant, index) => (
                    <button 
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                      onClick={() => setSearchTerm(plant)}
                    >
                      {plant}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDoctor;