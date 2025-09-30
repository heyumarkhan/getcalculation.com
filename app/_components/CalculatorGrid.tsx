'use client';

import { useState, useMemo } from 'react';
import { calculators, categories } from './data/calculators';

interface CalculatorGridProps {
  subject?: string; // 'math', 'physics', etc.
}
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

export default function CalculatorGrid({ subject }: CalculatorGridProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calculator => {
      const matchesSearch = calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           calculator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           calculator.keywords.some(keyword => 
                             keyword.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesCategory = selectedCategory === 'All' || calculator.category === selectedCategory;
      const matchesSubject = !subject || calculator.subject === subject;
      
      return matchesSearch && matchesCategory && matchesSubject;
    });
  }, [searchTerm, selectedCategory, subject]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Geometry': 'bg-blue-100 text-blue-800 border-blue-200',
      'Algebra': 'bg-green-100 text-green-800 border-green-200',
      'Trigonometry': 'bg-purple-100 text-purple-800 border-purple-200',
      'Statistics': 'bg-orange-100 text-orange-800 border-orange-200',
      'Calculus': 'bg-red-100 text-red-800 border-red-200',
      'Kinematics': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCardColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'blue': 'hover:border-blue-300 hover:shadow-blue-100',
      'green': 'hover:border-green-300 hover:shadow-green-100',
      'purple': 'hover:border-purple-300 hover:shadow-purple-100',
      'orange': 'hover:border-orange-300 hover:shadow-orange-100'
    };
    return colors[color] || 'hover:border-gray-300 hover:shadow-gray-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {subject ? `${subject.charAt(0).toUpperCase() + subject.slice(1)} Calculators` : 'Math Calculators'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the perfect calculator for your {subject || 'math'} problems
        </p>
        
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search calculators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-lg py-4 px-6"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "primary" : "outline"}
              size="sm"
              className={`px-4 py-2 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-600">
          {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Calculator Grid */}
      {filteredCalculators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCalculators.map((calculator) => (
            <div
              key={calculator.id}
              className={`cursor-pointer group ${getCardColor(calculator.color)}`}
              onClick={() => window.location.href = calculator.href}
            >
              <Card className="p-6 transition-all duration-200 h-full">
              <div className="text-center">
                {/* Icon */}
                <div className="text-4xl mb-4">{calculator.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {calculator.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {calculator.description}
                </p>
                
                {/* Category Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(calculator.category)}`}>
                  {calculator.category}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 space-y-2">
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = calculator.href;
                    }}
                  >
                    Use Calculator
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      const embedCode = `<iframe src="${window.location.origin}${calculator.embedHref}" width="100%" height="100%" frameborder="0" style="background: transparent;"></iframe>`;
                      navigator.clipboard.writeText(embedCode);
                    }}
                  >
                    Copy Embed Code
                  </Button>
                </div>
              </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No calculators found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or category filter
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
