import React, { useState, useEffect } from 'react';
import { Menu, X, Send , CheckCircle , Phone, Mail, Instagram , MessageCircle , MapIcon} from 'lucide-react';
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
  const [items, setItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleRequest = async () => {
    if (!contact || items.length === 0) {
      alert("Please add your contact number and at least one item");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format items for WhatsApp message
      const itemsList = items.map(item => 
        `- ${item.category}, ${item.quality}, ${item.sizeOrType}, Quantity: ${item.quantity}`
      ).join('%0a');

      // Create WhatsApp message
      const text = `New Quote Request%0a%0aContact: ${contact}%0a%0aItems:%0a${itemsList}`;
      const whatsappNumber = '917042840925'; // Your WhatsApp business number
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      
      // Show success state
      setIsSubmitted(true);
      
      // Reset form
      setContact('');
      setCategory('');
      setQuality('');
      setSizeOrType('');
      setQuantity(1);
      setItems([]);
      
      // Close modal after short delay
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-80 rounded-lg shadow-lg p-5">
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-bold text-green-600 mb-2">Quote Request Sent!</h3>
            <p className="text-gray-600">We'll get back to you shortly via WhatsApp.</p>
          </div>
        ) : (
          <>
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
              className={`bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>

            {/* Close Button */}
            <button 
              className="bg-gray-500 text-white w-full py-2 rounded hover:bg-gray-600 mt-2"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};



const App = () => {

  const [isBoxOpen, setIsBoxOpen] = useState(false);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');

  
 
  const products = [
    {
      name: "Premium Plywood",
      description: "High-grade plywood with superior strength and durability",
      image: "https://i.pinimg.com/736x/d5/8e/ac/d58eac2e5dc6b911f7e278796203218b.jpg",
      specifications: [
        "BWP Grade",
        "Marine Grade",
        "Termite Proof",
        "Waterproof"
      ],
      sizes: ["8' x 4'", "7' x 4'", "6' x 4'", "8' x 3'", "7' x 3'", "6' x 3'"],
      thicknesses: ["18mm", "12mm", "9mm", "6mm"],
      applications: [
        "Furniture",
        "Interior Design",
        "Construction",
        "Marine Applications"
      ]
    },
    {
      name: "Blockboard",
      description: "Engineered wood product with solid core for enhanced stability",
      image: "https://i.pinimg.com/736x/38/a4/98/38a498f509ab0e533f067a6fe8b3e366.jpg",
      specifications: [
        "High Density",
        "Moisture Resistant",
        "Dimensionally Stable",
        "Screw Holding Capacity"
      ],
      sizes: ["8' x 4'", "7' x 4'", "6' x 4'"],
      thickness: "19mm",
      categories: ["Pine Board", "Popular Board"],
      applications: [
        "Doors",
        "Partitions",
        "Furniture",
        "Cabinets"
      ]
    },
    {
      name: "Shuttering Ply",
      description: "Heavy-duty plywood designed for concrete formwork",
      image: "https://5.imimg.com/data5/ZK/CX/GV/SELLER-789327/film-faced-plywood.jpg",
      specifications: [
        "High Reusability",
        "Film Faced",
        "Impact Resistant",
        "Water Resistant"
      ],
      sizes: ["8' x 4'"],
      variants: [
        { color: "Red", weights: ["30kg", "34kg"] },
        { color: "Black", weights: ["30kg", "34kg"] }
      ],
      applications: [
        "Construction",
        "Concrete Formwork",
        "Industrial Use"
      ]
    },
    {
      name: "Flush Doors (Coming Soon)",
      description: "Premium quality doors with excellent finish and durability",
      image: "https://i.pinimg.com/736x/ef/66/dd/ef66dd1f196210b2340f5d9d6a825fc3.jpg",
      specifications: [
        "Pine Filling",
        "Popular Frame",
        "Double Core",
        "Gurjan Face"
      ],
      sizes: [
        "6' x 2.5'", "6' x 3'", "6' x 3.5'", "6' x 4'",
        "7' x 2.5'", "7' x 3'", "7' x 3.5'", "7' x 4'"
      ],
      applications: [
        "Residential",
        "Commercial",
        "Hotels",
        "Offices"
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
      thickness: ['6mm  ,  ', '9mm  ,  ', '12mm  ,  ', '18mm'],
      weight: '37 KG',
    },
    premium: {
      dimensions: "8' x 4'",
      thickness: ['6mm  ,  ', '9mm  ,  ', '12mm  ,  ', '18mm'],
      weight: '39 KG',
    },
  };
  
  const featured = {
    standard: [
      'BWR (Boiling Water Resistant) Grade',
      'Termite Resistant Technology',
      '100% Borer Free',
      'ISI 303 Certified',
      'Matt Ply Process',
      '4 Time Pressed Technology',
      '100% Calibrated',
    ],
    premium: [
      'BWP (Boiling Water Proof) Grade',
      'Termite Proof Technology',
      '100% Borer Free',
      'ISI 710 Certified',
      'Matt Ply Process',
      '4 Time Pressed Technology',
      '100% Calibrated',
      '300% Money Back Guarantee on Termite & Water Error',
    ],
  };
  
  const applications = {
    standard: [
      'General home interiors',
      'Living room and bedroom furniture',
      'Cabinets and storage spaces where water exposure is minimal',
    ],
    premium: [
      'Wet areas like sinks and bathroom cabinets',
      'Back panels of wardrobes and almirahs due to termite-proof quality',
      'Any high-moisture areas prone to water exposure',
    ],
  };
  

  const handleSelectChange = (e) => {
    setProductType(e.target.value);
    setShowComparison(false); // Reset comparison view on product change
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
    document.body.style.overflow = 'unset';
  };

  const certificates = [
    {
      title: 'Standard Certificate',
      imageSrc: "certificates/1.png", // Image for display
      pdfSrc: 'carouselImages/STANDARD_CERTIFICATE.pdf',   // PDF for download
    },
    {
      title: 'Premium Certificate',
      imageSrc: 'certificates/3.png',  // Image for display
      pdfSrc: 'carouselImages/PREMIUM_CERTIFICATE.pdf',    // PDF for download
    }
  ];

  const features = [
    {
      title: 'Premium Quality Construction',
      description: 'Built with top-grade materials to ensure durability, strength, and resistance to wear, meeting the highest industry standards.',
      image: 'https://i.pinimg.com/736x/ca/c0/b2/cac0b2a0f233bc2643b76bf99511e88b.jpg' // Update with the actual image path
    },
    {
      title: 'Advanced Manufacturing Technology',
      description: 'Produced using state-of-the-art manufacturing facilities, ensuring precision and consistency across all products.',
      image: 'https://i.pinimg.com/736x/2c/6f/68/2c6f68bf74cbc2acd3ad9b91ab901803.jpg'
    },
    {
      title: 'Eco-Friendly and Sustainable',
      description: 'Manufactured with environmentally friendly practices, minimizing waste and using sustainable resources for a greener future.',
      image: 'https://i.pinimg.com/736x/0c/ec/73/0cec73c6b8782f0051a2a7d54dc19ddc.jpg'
    },
    {
      title: 'Reliable Expert Support',
      description: 'Benefit from our dedicated technical support team, ready to assist with product guidance and technical inquiries.',
      image: 'https://i.pinimg.com/736x/5e/76/41/5e7641130548fefe973a8c460b347ee0.jpg'
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


  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Create WhatsApp message
    const text = `Name: ${name}%0aEmail: ${email}%0aPhone: ${phone}%0aMessage: ${message}`;
    const whatsappNumber = '917042840925';  // Your number from the contact info
    
    try {
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      
      // Show success state
      setIsSubmitted(true);
      // Reset form
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 py-3 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left Section with Icons */}
          <div className="flex items-center gap-6">
            {/* Phone Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                className="hover:text-blue-400 transition-colors duration-200"
                onMouseEnter={() => setIsPhoneOpen(true)}
                onMouseLeave={() => setIsPhoneOpen(false)}
              >
                <Phone size={16} className="animate-pulse" />   <span className="text-sm font-medium">Call us</span>    
              </button>
              
              {isPhoneOpen && (
                <div 
                  className="absolute left-0 mt-2 py-2 px-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 whitespace-nowrap"
                  onMouseEnter={() => setIsPhoneOpen(true)}
                  onMouseLeave={() => setIsPhoneOpen(false)}
                >
                  <div className="flex flex-col gap-2">
                    <a 
                      href="tel:+919810306789"
                      className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Phone size={14} />
                      +91 9810306789
                    </a>
                    <a 
                      href="tel:+917042840925"
                      className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Phone size={14} />
                      +91 7042840925
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Email Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMailOpen(!isMailOpen)}
                className="hover:text-blue-400 transition-colors duration-200"
                onMouseEnter={() => setIsMailOpen(true)}
                onMouseLeave={() => setIsMailOpen(false)}
              >
                <Mail size={16} className="animate-pulse" /> <span className="text-sm font-medium">Mail Us</span>   
              </button>
              
              {isMailOpen && (
                <div 
                  className="absolute left-0 mt-2 py-2 px-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 whitespace-nowrap"
                  onMouseEnter={() => setIsMailOpen(true)}
                  onMouseLeave={() => setIsMailOpen(false)}
                >
                  <a 
                    href="mailto:info@madhavply.com"
                    className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail size={14} />
                    info@madhavply.com
                  </a>
                </div>
              )}
            </div>

            {/* Instagram Icon */}
            <a 
              href="https://www.instagram.com/madhavply/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200 transform hover:scale-110"
            >
              <Instagram size={16} className="animate-pulse" /> <span className="text-sm font-medium">Follow us</span>   
            </a>
            <a 
              href="https://maps.app.goo.gl/wXg8XnPn8howbmZg6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200 transform hover:scale-110"
            >
              <MapIcon size={16} className="animate-pulse" /> <span className="text-sm font-medium">Visit us</span>   
            </a>
          </div>
        </div>
      </div>
    </div>

     {/* Main Header */}
<header className="bg-white shadow-md">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center py-4">
      {/* Logo for mobile */}
      <div className="flex items-center">
        <img src="logo.png" alt="Madhavply Logo" className="h-8 md:h-12" />
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

      {/* Quote Modal */}
      <QuoteRequestBox open={isBoxOpen} onClose={() => setIsBoxOpen(false)} />
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
<section id="home" className="relative min-h-[70vh] bg-gray-900 text-white overflow-hidden">
  {/* Background Carousel */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: 'transform 1s ease-in-out',
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
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
    ))}
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
    <div className="max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 opacity-100 animate-fadeIn">
        Crafting Excellence in Plywood & Shuttering
      </h1>
      <p className="text-lg md:text-xl mb-8 opacity-100 animate-fadeIn animation-delay-200">
        Premium quality wood products for construction and interior needs
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-100 animate-fadeIn animation-delay-400">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
          Explore Products
        </button>
        <button 
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300"
          onClick={() => setIsBoxOpen(true)}
        >
          Request Quote
        </button>
      </div>
      <div className="flex space-x-4 mt-8 opacity-100 animate-fadeIn animation-delay-600">
        <img src="carouselImages/iso.png" alt="ISO Certified" className="h-12 sm:h-16" />
        <img src="carouselImages/quality.png" alt="Quality Certified" className="h-12 sm:h-16" />
        <img src="carouselImages/eco.jpeg" alt="Eco Friendly" className="h-12 sm:h-16" />
      </div>
    </div>
  </div>

  {/* Carousel Indicators */}
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


    {/* About us*/}
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

    {/* Experience*/}
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
     <section id="certificates" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Our Certificates
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              We are proud to showcase our certifications that reflect our commitment 
              to quality and excellence in the plywood industry.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div 
                    className="relative w-full aspect-[3/4] cursor-pointer overflow-hidden"
                    onClick={() => openModal(cert.imageSrc)}
                  >
                    <img
                      src={cert.imageSrc}
                      alt={`${cert.title}`}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Click to view
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gray-50 flex flex-col sm:flex-row gap-4">
                    <a
                      href={cert.pdfSrc}
                      download
                      className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base font-medium"
                    >
                      Download {cert.title}
                    </a>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-2 -right-2 text-white bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
            <img
              src={modalImage}
              alt="Certificate Fullscreen View"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transform transition-transform duration-300"
            />
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {product.name}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>

                <div className="space-y-6">
                  {/* Specifications */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.specifications.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Available Sizes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Product-specific details */}
                  {product.name === "Premium Plywood" && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Thickness Options
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.thicknesses.map((thickness, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {thickness}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.name === "Blockboard" && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {category} ({product.thickness})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.name === "Shuttering Ply" && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Available Variants
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {product.variants.map((variant, idx) => (
                          <div key={idx} className="space-y-2">
                            <h5 className="font-medium text-gray-700">{variant.color}</h5>
                            <div className="flex flex-wrap gap-2">
                              {variant.weights.map((weight, widx) => (
                                <span
                                  key={widx}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {weight}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applications */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Applications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 border border-gray-200 text-gray-600 rounded-full text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



       {/* Product Viewer Section */}
       <section id="3dview" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Interactive Product Viewer
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our products in detail with 360° views
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product 3D Viewer */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 backdrop-blur-sm">
            <div className="flex justify-between mb-4 md:mb-6">
              <select
                className="border border-gray-200 p-2 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                value={productType}
                onChange={handleSelectChange}
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
              <button
                className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200 transition-all duration-200 hover:shadow-md"
                onClick={() => setShowComparison(!showComparison)}
              >
                Compare
              </button>
            </div>

            {showComparison ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden w-full h-64 md:h-72 relative rounded-xl shadow-lg">
                  <iframe 
                    src="https://www.pacdora.com/share?filter_url=psnmvjgrw6" 
                    allow="fullscreen; vr; accelerometer; gyroscope"
                    className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] md:w-[140%] md:h-[140%] object-cover rounded-xl"
                  />
                </div>
                <div className="overflow-hidden w-full h-64 md:h-72 relative rounded-xl shadow-lg">
                  <iframe 
                    src="https://www.pacdora.com/share?filter_url=ps8awo57g2" 
                    allow="fullscreen; vr; accelerometer; gyroscope"
                    className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] md:w-[140%] md:h-[140%] object-cover rounded-xl"
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-hidden w-full h-64 md:h-80 relative rounded-xl shadow-lg">
                <iframe 
                  src={`https://www.pacdora.com/share?filter_url=${productType === 'standard' ? 'psnmvjgrw6' : 'ps8awo57g2'}`} 
                  allow="fullscreen; vr; accelerometer; gyroscope"
                  className="absolute top-[-15%] left-[-15%] w-[140%] h-[140%] md:w-[140%] md:h-[140%] object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTabs === 'specifications'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setActiveTabs('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTabs === 'featured'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setActiveTabs('featured')}
              >
                Features
              </button>
              <button
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 ${
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

          {/* Image section */}
          <img
            src={feature.image} // Assumes each feature object contains an `image` URL.
            alt={feature.title}
            className="w-full h-48 object-cover rounded-t-xl sm:h-40 md:h-48 lg:h-56"
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
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  name="message"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1 - Company Info */}
          <div className="space-y-6">
            <img src="logo.png" alt="Madhavply Logo" className="h-12" />
            <p className="text-gray-400">
              Leading manufacturer of premium quality plywood and shuttering solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/madhavply/" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links & Products */}
          <div className="grid grid-cols-2 gap-8">
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
          </div>

          {/* Column 3 - Newsletter & Map */}
          <div className="space-y-6">
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
            <div className="w-full h-[300px] mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.888273939826!2d77.53041117554643!3d28.45278417576333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce958d2000209%3A0x5a12d4c3c650f17f!2sMADHAV%20TIMBER!5e0!3m2!1sen!2sin!4v1731493510079!5m2!1sen!2sin"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">© 2024 Madhavply. All rights reserved.</p>
        </div>
      </div>
    </footer>


      {/* Contact Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/7042840925"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 group"
      >
        <MessageCircle size={20} className="animate-pulse" />
        <span className="text-sm font-medium opacity-0 max-w-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden">
          WhatsApp
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href="tel:+91 7042840925"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 group"
      >
        <Phone size={20} className="animate-pulse" />
        <span className="text-sm font-medium opacity-0 max-w-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden">
          Call us
        </span>
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
