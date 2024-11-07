import React, { useState, useEffect } from 'react';
import { Menu, X, Send , CheckCircle , Phone, Mail, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel'; // Named import for Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuoteRequestBox = ({ open, onClose }) => {
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [quality, setQuality] = useState('');
  const [sizeOrType, setSizeOrType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]); // Store items

  // Options based on category selection
  const qualityOptions = {
    Plywood: ['Standard', 'Premium'],
    Blockboard: ['Standard', 'Premium'],
    Shuttering: ['Red', 'Black'],
  };

  const sizeOrTypeOptions = {
    Plywood: ['18mm', '12mm', '9mm', '6mm'],
    Blockboard: ['Pine Double Core', 'Popular Board'],
    Shuttering: ['30kg', '34kg'],
  };

  // Add item to the list
  const addItem = () => {
    if (category && quality && sizeOrType && quantity > 0) {
      setItems([...items, { category, quality, sizeOrType, quantity }]);
      setCategory('');
      setQuality('');
      setSizeOrType('');
      setQuantity(1);
    } else {
      alert("Please fill in all fields");
    }
  };

  // Remove item from the list
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleRequest = () => {
    alert(`Request Sent: 
    Contact: ${contact},
    Items: ${JSON.stringify(items)}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-80 rounded-lg shadow-lg p-5">
        <h2 className="text-lg font-bold mb-4 text-center">Request a Quote</h2>

        {/* Contact Number */}
        <label className="block text-gray-700 mb-1">Contact Number</label>
        <input 
          type="tel" 
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
          className="border p-2 rounded w-full mb-3" 
          placeholder="Your phone number"
        />

        {/* Product Category Dropdown */}
        <label className="block text-gray-700 mb-1">Product Category</label>
        <select 
          value={category} 
          onChange={(e) => {
            setCategory(e.target.value);
            setQuality('');
            setSizeOrType('');
          }}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="">Select Category</option>
          <option value="Plywood">Plywood</option>
          <option value="Blockboard">Blockboard</option>
          <option value="Shuttering">Shuttering</option>
        </select>

        {/* Quality/Color Dropdown */}
        {category && (
          <>
            <label className="block text-gray-700 mb-1">Quality/Color</label>
            <select 
              value={quality} 
              onChange={(e) => setQuality(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="">Select Quality/Color</option>
              {qualityOptions[category].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </>
        )}

        {/* Size/Type/Weight Dropdown */}
        {quality && (
          <>
            <label className="block text-gray-700 mb-1">Size/Type/Weight</label>
            <select 
              value={sizeOrType} 
              onChange={(e) => setSizeOrType(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="">Select Size/Type</option>
              {sizeOrTypeOptions[category].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </>
        )}

        {/* Quantity */}
        <label className="block text-gray-700 mb-1">Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          className="border p-2 rounded w-full mb-3" 
          min="1" 
          placeholder="Enter quantity"
        />

        {/* Add Item Button */}
        <button 
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 mb-3"
          onClick={addItem}
        >
          Add Item
        </button>

        {/* Display Item List */}
        <ul className="mb-3">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{item.category}, {item.quality}, {item.sizeOrType}, Qty: {item.quantity}</span>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Send Request Button */}
        <button 
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={handleRequest}
        >
          Send Request
        </button>

        {/* Close Button */}
        <button 
          className="bg-gray-500 text-white w-full py-2 rounded hover:bg-gray-600 mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};



const App = () => {

  const [isBoxOpen, setIsBoxOpen] = useState(false);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState('specifications');

  const products = [
    {
      name: 'Plywood',
      images: ['carouselImages/1.jpeg', 'carouselImages/2.jpeg', 'carouselImages/3.jpeg'],
      description: 'High-quality plywood available in various sizes: 18mm, 12mm, 9mm, 6mm.',
      sizes: ['18mm', '12mm', '9mm', '6mm'],
      specifications: [
        'Water-resistant',
        'Termite-resistant',
        'BWP grade available',
        'Smooth finish'
      ],
      applications: [
        'Furniture',
        'Interior decoration',
        'Cabinet making',
        'Wall paneling'
      ]
    },
    {
      name: 'Blockboard',
      images: ['carouselImages/4.jpeg', 'carouselImages/5.jpeg', 'carouselImages/6.jpeg'],
      description: 'Premium Blockboards: Pine Double Core and Popular Board, ideal for versatile applications.',
      variants: [
        'Pine Double Core',
        'Popular Board'
      ],
      specifications: [
        'High density core',
        'Moisture resistant',
        'Dimensional stability',
        'Superior bonding'
      ],
      applications: [
        'Door manufacturing',
        'Heavy furniture',
        'Partitions',
        'Tables'
      ]
    },
    {
      name: 'Shuttering',
      images: ['carouselImages/7.jpeg', 'carouselImages/8.jpeg', 'carouselImages/9.jpeg'],
      description: 'Shuttering solutions available in Red and Black colors, with 30kg and 34kg options.',
      variants: [
        'Red Shuttering',
        'Black Shuttering'
      ],
      weights: ['30kg', '34kg'],
      specifications: [
        'High reusability',
        'Film-faced coating',
        'Impact resistant',
        'Superior strength'
      ]
    }
  ];

  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
    setCurrentImage(0);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
    setCurrentImage(0);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % products[currentProduct].images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => 
      (prev - 1 + products[currentProduct].images.length) % products[currentProduct].images.length
    );
  };


  const [activeTabs, setActiveTabs] = useState('specifications');
  const [productType, setProductType] = useState('standard');
  const [showComparison, setShowComparison] = useState(false);

  const specs = {
    standard: {
      dimensions: "8' x 4'",
      thickness: '18mm',
      weight: '30 KG',
    },
    premium: {
      dimensions: "8' x 4'",
      thickness: '20mm',
      weight: '32 KG',
    },
  };
  const featured = {
    standard: ['High-grade material composition', 'Water-resistant bonding', 'Superior edge strength'],
    premium: ['Premium quality material', 'Advanced water resistance', 'Enhanced edge strength'],
  };
  const applications = {
    standard: ['Commercial construction', 'Residential projects', 'Industrial applications'],
    premium: ['Luxury interiors', 'Custom residential projects', 'Specialized industrial applications'],
  };

  const handleSelectChange = (e) => {
    setProductType(e.target.value);
    setShowComparison(false); // Reset comparison view on product change
  };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSrc, setModalSrc] = useState("");
  
    const openModal = (src) => {
      setModalSrc(src);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalSrc("");
    };

    const features = [
      {
        title: 'Premium Quality',
        description: 'Highest grade materials and strict quality control',
      },
      {
        title: 'Modern Manufacturing',
        description: 'State-of-the-art production facilities',
      },
      {
        title: 'Eco-Friendly',
        description: 'Sustainable practices and materials',
      },
      {
        title: 'Expert Support',
        description: 'Dedicated technical assistance',
      },
    ];
    
      // Container animation for staggered child animation
      const containerVariants = {
        visible: {
          transition: {
            staggerChildren: 0.3, // Delay between each feature
          },
        },
      };
    
      // Individual card animation with slide reveal and opacity change
      const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      };

  const images = [
    'carouselImages/1.1.jpeg',
    'carouselImages/1.jpeg',
    'carouselImages/2.jpeg',
    'carouselImages/3.jpeg',
    'carouselImages/4.jpeg',
    'carouselImages/5.jpeg',
    'carouselImages/6.jpeg',
    'carouselImages/7.jpeg',
    'carouselImages/8.jpeg',
    'carouselImages/9.jpeg',
    'carouselImages/10.jpeg',
    'carouselImages/11.jpeg',
    'carouselImages/12.jpeg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="tel:+919810306789" className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+91 9810306789</span>
            </a>
            <a href="tel:+917042840925" className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+91 7042840925</span>
            </a>
            <a href="mailto:info@madhavply.com" className="flex items-center space-x-2">
              <Mail size={16} />
              <span>info@madhavply.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/madhavply/" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="logo.png" alt="Madhavply Logo" className="h-12" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-800 hover:text-blue-600">Home</a>
              <a href="#product" className="text-gray-800 hover:text-blue-600">Products</a>
              <a href="#about-us" className="text-gray-800 hover:text-blue-600">About Us</a>
              <a href="#certificates" className="text-gray-800 hover:text-blue-600">Certificates</a>
              <a href="#3dview" className="text-gray-800 hover:text-blue-600">3-D view</a>
              <a href="#contact" className="text-gray-800 hover:text-blue-600">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div>
      <button 
        className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        onClick={() => setIsBoxOpen(true)}
      >
        Request Quote
      </button>

      <QuoteRequestBox open={isBoxOpen} onClose={() => setIsBoxOpen(false)} />
    </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-800 hover:text-blue-600">Home</a>
                <a href="#products" className="text-gray-800 hover:text-blue-600">Products</a>
                <a href="#about" className="text-gray-800 hover:text-blue-600">About Us</a>
                <a href="#certificates" className="text-gray-800 hover:text-blue-600">Certificates</a>
                <a href="#process" className="text-gray-800 hover:text-blue-600">Process</a>
                <a href="#contact" className="text-gray-800 hover:text-blue-600">Contact</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[70%] bg-gray-900 text-white overflow-hidden">
      {/* Background Carousel */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 1s ease-in-out',
          width: `100%`,
          display: 'flex'
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 opacity-100 animate-fadeIn">
            Crafting Excellence in Plywood & Shuttering
          </h1>
          <p className="text-xl mb-8 opacity-100 animate-fadeIn animation-delay-200">
            Premium quality wood products for construction and interior needs
          </p>
          <div className="flex space-x-4 opacity-100 animate-fadeIn animation-delay-400">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Explore Products
            </button>
            
          </div>
          <div className="flex space-x-6 mt-12 opacity-100 animate-fadeIn animation-delay-600">
            <img src="carouselImages/iso.png" alt="ISO Certified" className="h-16" />
            <img src="carouselImages/quality.png" alt="Quality Certified" className="h-16" />
            <img src="carouselImages/eco.jpeg" alt="Eco Friendly" className="h-16" />
          </div>
        </div>
      </div>

      {/* Optional: Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>

    <section id="about-us" className="py-20 bg-gray-100">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start space-y-16 md:space-y-0 md:space-x-16">
    {/* Vision Section */}
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Vision</h2>
      <p className="text-xl md:text-2xl text-gray-700">
        Our vision is to establish Madhav as a trusted brand across India, delivering exceptional quality and innovative solutions in every corner of the country. We are committed to building lasting relationships through superior service, sustainable practices, and customer-centric values that drive growth and satisfaction.
      </p>
      <img src="carouselImages/vision.jpg" alt="Vision Image" className="w-full h-auto object-cover mt-8" /> {/* Fixed height */}
    </div>

    {/* Mission Section */}
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Mission</h2>
      <p className="text-xl md:text-2xl text-gray-700">
      Madhav Plywood is dedicated to providing eco-friendly plywood that enhances the strength and longevity of every space. We prioritize sustainability and responsible sourcing to support our customers . Our commitment to continuous innovation ensures that we deliver cutting-edge solutions tailored to meet the needs of our clients.
      </p>
      <img src="carouselImages/mission (1).jpg" alt="Vision Image" className="w-full h-auto object-cover mt-8" /> {/* Fixed height */}
    </div>
  </div>
</section>


<section className="py-20 bg-gray-100">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start space-y-16 md:space-y-0 md:space-x-16">
    {/* Experience Section */}
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Experience</h2>
      <p className="text-xl md:text-3xl text-gray-700">
        With over 9+ years of experience in the plywood industry, we bring comprehensive expertise as a manufacturer, distributor, and seller. Our in-depth understanding of each stage of the supply chain allows us to streamline operations and provide seamless support to distributors, ensuring smooth and efficient delivery of quality products.
      </p>
    </div>

    {/* Image for Experience Section */}
    <div className="w-full md:w-1/2">
      <div className="w-full h-auto overflow-hidden">
        <img 
          src="carouselImages/experience.jpg" 
          alt="Experience Image" 
          className="w-full h-auto object-cover"
          style={{ objectPosition: 'center top' }}
        />
      </div>
    </div>
  </div>
</section>


{/* Certificates Section */}
<section id="certificates" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start space-y-12 md:space-y-0 md:space-x-12">
    
    {/* Certificates Text Section */}
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
        Our Certificates
      </h2>
      <p className="text-lg md:text-2xl text-gray-600 mb-8 leading-relaxed">
        We are proud to showcase our certifications that reflect our commitment
        to quality and excellence in the plywood industry.
      </p>
    </div>

    {/* Certificates Display Section */}
    <div className="flex flex-col md:flex-row w-full md:w-1/2 space-y-6 md:space-y-0 md:space-x-6">
      
      {/* Standard Certificate */}
      <div className="w-full flex flex-col shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="w-full h-80 md:h-96 overflow-hidden">
          <iframe
            src="carouselImages/STANDARD_CERTIFICATE.pdf#toolbar=0&navpanes=0"
            title="Standard Certificate PDF"
            className="w-full h-full"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="flex justify-between px-4 py-4 bg-gray-50">
          <a
            href="carouselImages/STANDARD_CERTIFICATE.pdf"
            download
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Download Standard Certificate
          </a>
          <button
            onClick={() => openModal("carouselImages/STANDARD_CERTIFICATE.pdf")}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition duration-300"
          >
            View Fullscreen
          </button>
        </div>
      </div>

      {/* Premium Certificate */}
      <div className="w-full flex flex-col shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="w-full h-80 md:h-96 overflow-hidden">
          <iframe
            src="carouselImages/PREMIUM_CERTIFICATE.pdf#toolbar=0&navpanes=0"
            title="Premium Certificate PDF"
            className="w-full h-full"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="flex justify-between px-4 py-4 bg-gray-50">
          <a
            href="carouselImages/PREMIUM_CERTIFICATE.pdf"
            download
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Download Premium Certificate
          </a>
          <button
            onClick={() => openModal("carouselImages/PREMIUM_CERTIFICATE.pdf")}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition duration-300"
          >
            View Fullscreen
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Modal for Fullscreen View */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-11/12 md:w-4/5 h-4/5">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full focus:outline-none"
        >
          ✕
        </button>
        <iframe
          src={`${modalSrc}#toolbar=0&navpanes=0`}
          title="Certificate Fullscreen View"
          className="w-full h-full"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  )}
</section>



      {/* Featured Products Section */}
      <section id="product" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
      Premium Wood Products
    </h2>
    
    <div className="relative max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden bg-white p-8">
      
      {/* Product Navigation */}
      <button
        onClick={prevProduct}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
        aria-label="Previous Product"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextProduct}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
        aria-label="Next Product"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Product Card */}
      <div className="p-6 lg:p-10 space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {products[currentProduct].name}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {products[currentProduct].description}
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-inner">
          <img
            src={products[currentProduct].images[currentImage]}
            alt={`${products[currentProduct].name} - Image ${currentImage + 1}`}
            className="object-cover w-full h-full"
          />

          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-900/60 p-1 rounded-full hover:bg-gray-900/80"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-900/60 p-1 rounded-full hover:bg-gray-900/80"
            aria-label="Next Image"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {products[currentProduct].images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImage === idx ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Sizes/Variants */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              {products[currentProduct].sizes ? 'Available Sizes' : 'Variants'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(products[currentProduct].sizes || products[currentProduct].variants || products[currentProduct].weights)?.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm shadow">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Specifications</h4>
            <ul className="list-inside space-y-1">
              {products[currentProduct].specifications?.map((spec, idx) => (
                <li key={idx} className="text-gray-600 text-sm">
                  • {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Applications */}
        {products[currentProduct].applications && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Applications</h4>
            <div className="flex flex-wrap gap-2">
              {products[currentProduct].applications.map((app, idx) => (
                <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-600 rounded-full text-sm shadow-sm">
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product Navigation Indicators */}
        <div className="flex justify-center space-x-2 pt-6">
          {products.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                currentProduct === idx ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


       {/* Product Viewer Section */}
       <section id="3dview" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Interactive Product Viewer
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Explore our products in detail with 360° views
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-16">
      {/* Product 3D Viewer */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
        <div className="flex justify-between mb-6">
          <select
            className="border border-gray-200 p-2.5 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            value={productType}
            onChange={handleSelectChange}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <button
            className="px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200 transition-all duration-200 hover:shadow-md"
            onClick={() => setShowComparison(!showComparison)}
          >
            Compare
          </button>
        </div>

        {showComparison ? (
          <div className="grid grid-cols-2 gap-8">
            <div className="overflow-hidden w-full h-72 relative rounded-xl shadow-lg">
              <iframe 
                src="https://www.pacdora.com/share?filter_url=psnmvjgrw6" 
                allow="fullscreen; vr; accelerometer; gyroscope"
                className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] object-cover rounded-xl"
              />
            </div>
            <div className="overflow-hidden w-full h-72 relative rounded-xl shadow-lg">
              <iframe 
                src="https://www.pacdora.com/share?filter_url=ps8awo57g2" 
                allow="fullscreen; vr; accelerometer; gyroscope"
                className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] object-cover rounded-xl"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden w-full h-80 relative rounded-xl shadow-lg">
            <iframe 
              src={`https://www.pacdora.com/share?filter_url=${productType === 'standard' ? 'psnmvjgrw6' : 'ps8awo57g2'}`} 
              allow="fullscreen; vr; accelerometer; gyroscope"
              className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTabs === 'specifications'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setActiveTabs('specifications')}
          >
            Specifications
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTabs === 'featured'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setActiveTabs('featured')}
          >
            Features
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTabs === 'applications'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setActiveTabs('applications')}
          >
            Applications
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          {showComparison ? (
            <>
              {activeTabs === 'specifications' && (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Feature</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Standard</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Dimensions</td>
                      <td className="py-4 px-4 font-medium">{specs.standard.dimensions}</td>
                      <td className="py-4 px-4 font-medium">{specs.premium.dimensions}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Thickness</td>
                      <td className="py-4 px-4 font-medium">{specs.standard.thickness}</td>
                      <td className="py-4 px-4 font-medium">{specs.premium.thickness}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Weight</td>
                      <td className="py-4 px-4 font-medium">{specs.standard.weight}</td>
                      <td className="py-4 px-4 font-medium">{specs.premium.weight}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {activeTabs === 'featured' && (
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Standard</h4>
                    <ul className="space-y-4">
                      {featured.standard.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Premium</h4>
                    <ul className="space-y-4">
                      {featured.premium.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {activeTabs === 'applications' && (
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Standard</h4>
                    <ul className="space-y-4">
                      {applications.standard.map((application, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Premium</h4>
                    <ul className="space-y-4">
                      {applications.premium.map((application, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {activeTabs === 'specifications' && (
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Dimensions</td>
                      <td className="py-4 px-4 font-medium">{specs[productType].dimensions}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Thickness</td>
                      <td className="py-4 px-4 font-medium">{specs[productType].thickness}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Weight</td>
                      <td className="py-4 px-4 font-medium">{specs[productType].weight}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {activeTabs === 'featured' && (
                <ul className="space-y-4">
                  {featured[productType].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTabs === 'applications' && (
                <ul className="space-y-4">
                  {applications[productType].map((application, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{application}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Why Choose Us Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 transform rotate-45 scale-150 bg-gradient-to-r from-blue-500/10 to-blue-300/10"></div>
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-blue-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-300/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Why Choose Madhavply
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Excellence delivered through quality and commitment
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                  repeatDelay: 3
                }}
              />

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg">
                We're here to help with your requirements. Reach out to us anytime.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">Call Us</h3>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    +91 7042840925
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">Email Us</h3>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    info@madhavply.com
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="Madhav garg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white 
                  ${isSubmitted ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} 
                  transition-colors duration-300 flex items-center justify-center space-x-2`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <img src="logo.png" alt="Madhavply Logo" className="h-12 mb-6" />
              <p className="text-gray-400 mb-6">
                Leading manufacturer of premium quality plywood and shuttering solutions.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/madhavply/" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} className="text-gray-400 hover:text-white" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#product" className="text-gray-400 hover:text-white">Products</a></li>
                <li><a href="#about-us" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Products</h3>
              <ul className="space-y-4">
                <li><a href="" className="text-gray-400 hover:text-white">PLYWOODS</a></li>
                <li><a href="" className="text-gray-400 hover:text-white">BLOCKBOARDS</a></li>
                <li><a href="" className="text-gray-400 hover:text-white">SHUTTERING PLY</a></li>
                <li><a href="" className="text-gray-400 hover:text-white">FLUSH DOORS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to receive updates and special offers</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">© 2024 Madhavply. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Buttons */}
<div className="fixed bottom-4 right-4 flex flex-col space-y-4">
  {/* WhatsApp Button */}
  <a 
    href="https://wa.me/9810306789" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
  >
    {/* WhatsApp Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.44A10.02 10.02 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.85.51 3.65 1.48 5.24L2 22l4.82-1.49A10.02 10.02 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.66-1.04-5.17-2.95-7.08l-.53-.48zM12 20c-1.68 0-3.27-.52-4.6-1.4l-.36-.25-2.83.87.89-2.83-.25-.36C4.52 15.27 4 13.68 4 12c0-4.42 3.58-8 8-8 2.13 0 4.12.83 5.61 2.33C19.17 7.88 20 9.87 20 12c0 4.42-3.58 8-8 8z" />
      <path d="M15.07 13.26c-.34-.17-2.02-.98-2.34-1.1-.31-.1-.54-.17-.76.17-.2.34-.88 1.1-1.08 1.32-.2.2-.4.23-.74.06-.34-.17-1.43-.5-2.73-1.6-.6-.53-1-1.17-1.1-1.5-.1-.34.05-.5.22-.67.23-.23.34-.34.5-.57.17-.23.1-.4 0-.57-.1-.17-.76-1.8-1.04-2.44-.26-.63-.53-.54-.76-.55-.2 0-.4-.03-.62-.03-.23 0-.57.08-.86.4-.3.35-1.13 1.1-1.13 2.68s1.15 3.1 1.31 3.32c.17.23 2.27 3.47 5.5 4.63.77.27 1.38.44 1.85.56.78.2 1.5.17 2.07.1.63-.08 2.02-.82 2.3-1.61.27-.78.27-1.47.2-1.6-.1-.17-.33-.27-.67-.44z" />
    </svg>
  </a>
  
  {/* Phone Call Button */}
  <a 
    href="tel:+91 9810306789" 
    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
  >
    {/* Phone Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.26 1.12.35 2.33.54 3.57.54.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.19 2.45.54 3.57.09.35 0 .75-.26 1.02l-2.2 2.2z" />
    </svg>
  </a>
</div>


    </div>
  );
};


const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 1s forwards;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }

  .animation-delay-600 {
    animation-delay: 600ms;
  }
`;

export default App;
