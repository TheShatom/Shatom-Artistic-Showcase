import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Gallery = {
  id: string;
  title: string;
  images: string[];
};

const galleries: Gallery[] = [
  {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    images: [
      'https://images.unsplash.com/photo-1682687220742-aba19b51f36d',
      'https://images.unsplash.com/photo-1682687221038-404670f09ef7',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    ],
  },
  {
    id: 'paintings',
    title: 'PAINTINGS',
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7',
    ],
  },
  {
    id: 'bio',
    title: 'BIO',
    images: [], // Bio section doesn't need images
  },
  {
    id: 'contact',
    title: 'CONTACT',
    images: [], // Contact section doesn't need images
  },
];

function App() {
  const [selectedGallery, setSelectedGallery] = useState<Gallery>(galleries[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === 0
        ? selectedGallery.images.length - 1
        : selectedImageIndex - 1
    );
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === selectedGallery.images.length - 1
        ? 0
        : selectedImageIndex + 1
    );
  };

  const renderContent = () => {
    switch (selectedGallery.id) {
      case 'bio':
        return (
          <div className="max-w-2xl mx-auto text-center py-12">
            <h2 className="text-2xl font-light mb-8">About Shatom</h2>
            <p className="text-gray-300 leading-relaxed">
              [Your biography content will go here. Please provide the text you'd like to display.]
            </p>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-2xl font-light mb-8 text-center">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        );
      default:
        return (
          <div className="space-y-12">
            {selectedGallery.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className="w-full block aspect-[16/9] overflow-hidden"
              >
                <img
                  src={`${image}?auto=format&fit=crop&w=2000&q=80`}
                  alt={`${selectedGallery.title} ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header>
        <h1 className="py-12 text-4xl sm:text-6xl font-bold tracking-wider text-center">SHATOM</h1>
        <nav className="bg-white text-black py-6">
          <div className="flex justify-center items-center space-x-12">
            {galleries.map((gallery) => (
              <button
                key={gallery.id}
                onClick={() => setSelectedGallery(gallery)}
                className={`px-4 py-2 text-lg tracking-widest transition-colors duration-300 ${
                  selectedGallery.id === gallery.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {gallery.title}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[2000px] mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Legal Notice</h3>
              <p className="text-sm">
                © {new Date().getFullYear()} SHATOM. All rights reserved.<br />
                All images and artworks on this website are protected by copyright law.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Privacy Policy</h3>
              <p className="text-sm">
                This website respects your privacy and ensures the protection of any personal information shared.
                No cookies are used for tracking purposes.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Terms of Use</h3>
              <p className="text-sm">
                Unauthorized use or reproduction of any content from this website is strictly prohibited.
                For licensing inquiries, please contact us.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={handlePrevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={handleNextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <img
            src={`${selectedGallery.images[selectedImageIndex]}?auto=format&fit=crop&w=2000&q=90`}
            alt={`${selectedGallery.title} ${selectedImageIndex + 1}`}
            className="max-h-[95vh] max-w-[95vw] object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default App;