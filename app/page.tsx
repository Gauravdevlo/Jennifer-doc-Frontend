'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Send, Menu, X } from 'lucide-react';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const faqData = [
    {
      question: "Do you accept insurance?",
      answer: "No, I do not accept insurance directly. However, I provide a superbill for each session that you can submit to your insurance provider for potential reimbursement if you have out-of-network benefits."
    },
    {
      question: "Are online sessions available?",
      answer: "Yes, I offer virtual sessions via Zoom on Mondays, Wednesdays, and Fridays from 1 PM to 5 PM. In-person sessions are available on Tuesdays and Thursdays from 10 AM to 6 PM at my Maplewood Drive office."
    },
    {
      question: "What is your cancellation policy?",
      answer: "I require 24-hour notice for cancellations. Cancellations made with less than 24 hours notice may be subject to the full session fee."
    },
    {
      question: "How long are therapy sessions?",
      answer: "Individual therapy sessions are 50 minutes long, while couples sessions are typically 60 minutes to allow for adequate time to address relationship dynamics."
    },
    {
      question: "What can I expect in our first session?",
      answer: "Our first session will focus on understanding your current concerns, goals for therapy, and relevant background information. This helps me tailor our work together to best meet your needs and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fefaf2] font-crimson">
      {/* Header with Logo */}
      <header className="py-8 bg-[#fefaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <img 
              src="/images/logo.png" 
              alt="Jennifer Hahm, Ph.D. Psychological Services"
              className="h-16 w-auto"
            />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-[#7E7E6B] hover:text-stone-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-stone-200">
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-[#7E7E6B] hover:text-stone-800 transition-colors py-2 font-freight">Home</a>
                <a href="#about" className="text-[#7E7E6B] hover:text-stone-800 transition-colors py-2 font-freight">About</a>
                <a href="#services" className="text-[#7E7E6B] hover:text-stone-800 transition-colors py-2 font-freight">Services</a>
                <a href="#faq" className="text-[#7E7E6B] hover:text-stone-800 transition-colors py-2 font-freight">FAQ</a>
                <a href="#contact" className="text-[#7E7E6B] hover:text-stone-800 transition-colors py-2 font-freight">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-16">
  {/* Background Video Container */}
  <div className="absolute inset-0 flex justify-center items-center z-0">
    <div className="w-full max-w-screen-xl overflow-hidden  relative ">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/ocean.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  </div>

  {/* Content Overlay */}
  <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto fade-in-up">
    <h1 className="text-6xl md:text-6xl font-normal mb-6 leading-tight freight-display-pro">
      Psychological Care for
    </h1>
    <h2 className="text-4xl md:text-5xl font-normal mb-8 leading-tight freight-display-pro">
      Change, Insight, and Well-Being
    </h2>
    <p className="text-lg md:text-xl mb-12 font-normal max-w-3xl mx-auto leading-relaxed freight-sans-pro">
      Offering individual psychotherapy for adults in Los Angeles through compassionate, evidence-based care
    </p>
    <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSeVPdE8FDjGrnmAJ8kAXzXUTrOz78OudwG6noNWhbShZuuIgw/viewform?usp=sf_link"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-[#a4c3c6] text-white text-sm md:text-base font-semibold px-12 py-11 rounded-[50%] uppercase tracking-wide transition duration-300 ease-in-out hover:bg-[#91b1b4] shadow-md font-sans text-center"
>
  Schedule a Consultation
</a>

  </div>
</section>



      {/* About Section */}
      <section id="about" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-normal text-[#7E7E6B] mb-8 font-crimson">
                About Dr. Serena Blake
              </h2>
              <div className="space-y-6 text-[#7E7E6B] leading-relaxed font-freight">
                <p>
                  Finding time and opportunities to care for ourselves can be incredibly challenging in today's busy and demanding world. I believe therapy offers a dedicated space for self-care, providing the support and tools needed to improve this essential practice.
                </p>
                <p>
                  Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience and over 500 client sessions. She blends evidence-based approaches—like cognitive-behavioral therapy and mindfulness—with compassionate, personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
                </p>
                <p>
                  Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed to creating a safe, supportive space for you to thrive. Her therapeutic approach combines psychodynamic and humanistic methods, emphasizing the importance of the therapeutic relationship in facilitating meaningful change.
                </p>
              </div>
            </div>
            <div className="flex justify-center fade-in-up">
              <div className="w-80 h-96 bg-black overflow-hidden shadow-lg">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/e841b9a0-6e90-4af7-89ff-cfb7018239e5/AD8A7645-Edit.jpg?format=1000w" 
                  alt="Dr. Serena Blake"
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Philosophy Section */}
      <section className="py-20 bg-[#fefaf2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center fade-in-up"
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <div className="w-full h-px bg-[#7E7E6B] mb-16"></div>
            
            <h2 className="text-3xl md:text-4xl font-normal text-[#7E7E6B] mb-8 leading-tight font-crimson fade-in-up">
              Therapy can be a space where you invest in yourself—<br />
              one of the highest forms of self-care.
            </h2>
            
            <p className="text-lg md:text-xl text-[#7E7E6B] leading-relaxed max-w-5xl mx-auto font-freight fade-in-up">
              You may be led to therapy by anxiety, depression, relationship stress, past or recent trauma, grief and loss, self-esteem issues, 
              or challenges with family, parenting, or parental relationships. Whatever the source of your stress, you don't have to face it 
              alone. Therapy offers you the time and space to work toward wellness and peace.
            </p>
            
            <div className="w-full h-px bg-[#7E7E6B] mt-16"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#fefaf2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-normal text-center text-[#7E7E6B] mb-16 font-crimson fade-in-up">
            Areas of Focus
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center fade-in-up">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-8 bg-stone-200">
                <img 
                  src="https://images.pexels.com/photos/6011667/pexels-photo-6011667.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                  alt="Anxiety and Stress Management"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-normal text-[#7E7E6B] mb-4 font-crimson">
                Anxiety & Stress Management
              </h3>
              <p className="text-[#7E7E6B] leading-relaxed font-freight">
                Life's challenges can create overwhelming feelings of anxiety and stress. Through evidence-based techniques and mindful approaches, we'll work together to develop healthy coping strategies and restore your sense of calm and control.
              </p>
            </div>

            <div className="text-center fade-in-up">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-8 bg-stone-200">
                <img 
                  src="https://images.pexels.com/photos/1687007/pexels-photo-1687007.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                  alt="Relationship Counseling"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-normal text-[#7E7E6B] mb-4 font-crimson">
                Relationship Counseling
              </h3>
              <p className="text-[#7E7E6B] leading-relaxed font-freight">
                Whether navigating romantic partnerships, family dynamics, or friendships, relationships require care and attention. I provide a supportive space to explore patterns, improve communication, and strengthen your connections with others.
              </p>
            </div>

            <div className="text-center fade-in-up">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-8 bg-stone-200">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/eeca6997-7fd7-4376-b0a4-df60a0f368e5/pexels-polina-tankilevitch-8202906.jpg?format=1000w"
                  alt="Trauma Recovery"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-normal text-[#7E7E6B] mb-4 font-crimson">
                Trauma Recovery
              </h3>
              <p className="text-[#7E7E6B] leading-relaxed font-freight">
                Traumatic experiences can profoundly impact our sense of safety and well-being. Using trauma-informed approaches, we'll work at your pace to process difficult experiences and develop resilience for healing and growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <br></br><br></br><br></br>

      {/* Rates Section */}
      <section className="py-20 bg-teal-400/20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-up">
          <h2 className="text-4xl md:text-5xl font-normal text-[#7E7E6B] mb-12 font-crimson">
            Rates and Insurance
          </h2>
          
          <div className="space-y-6 text-[#7E7E6B] font-freight">
            <p className="text-xl">Individual Session - $200</p>
            <p className="text-xl">Couples Session - $240</p>
            <p className="text-lg mt-8">
            I accept both private pay and insurance. I am in-network with BCBS and Aetna.
            <br></br> <br></br>
For out-of-network plans, I’ve partnered with Mentaya using this tool to help you check your eligibility for reimbursement for my services.
            </p>
          </div>
        </div>
      </section>

      {/* Office Hours and Consultation Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="bg-stone-50 p-8 rounded-lg shadow-sm mb-12 fade-in-up"
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <h3 className="text-2xl font-normal text-[#7E7E6B] mb-6 font-crimson">Office Hours</h3>
            <div className="grid md:grid-cols-2 gap-8 text-[#7E7E6B] font-freight">
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock size={20} />
                  <span className="font-medium">In-Person Sessions</span>
                </div>
                <p>Tuesday & Thursday</p>
                <p>10 AM – 6 PM</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock size={20} />
                  <span className="font-medium">Virtual Sessions (Zoom)</span>
                </div>
                <p>Monday, Wednesday & Friday</p>
                <p>1 PM – 5 PM</p>
              </div>
            </div>
          </div>

          <div className="text-center fade-in-up">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeVPdE8FDjGrnmAJ8kAXzXUTrOz78OudwG6noNWhbShZuuIgw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#a4c3c6] text-white text-sm md:text-base font-semibold px-12 py-5 rounded-[50%] uppercase tracking-wide transition duration-300 ease-in-out hover:bg-[#91b1b4] shadow-md font-sans text-center"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section with Dropdowns */}
      <section id="faq" className="py-20 bg-[#fefaf2] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-normal text-center text-[#7E7E6B] mb-16 font-crimson fade-in-up">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm border border-stone-200 fade-in-up"
                style={{ transform: `translateY(${scrollY * 0.01}px)` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-medium text-[#7E7E6B] font-crimson">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp size={20} className="text-stone-500" />
                  ) : (
                    <ChevronDown size={20} className="text-stone-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 ">
                    <p className="text-[#7E7E6B] leading-relaxed font-freight  ">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-normal text-[#7E7E6B] mb-8 font-crimson">
                Get in Touch
              </h2>
              <p className="text-[#7E7E6B] mb-8 font-freight leading-relaxed">
                Ready to take the first step? Send me a message and I'll get back to you within 24 hours to discuss how we can work together.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#7E7E6B] mb-2 font-freight">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-freight transition-colors focus:outline-none focus:ring-2 focus:ring-[#a4c3c6] ${
                      formErrors.name 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 font-freight">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#7E7E6B] mb-2 font-freight">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-freight transition-colors focus:outline-none focus:ring-2 focus:ring-[#a4c3c6] ${
                      formErrors.email 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 font-freight">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#7E7E6B] mb-2 font-freight">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-freight transition-colors focus:outline-none focus:ring-2 focus:ring-[#a4c3c6] ${
                      formErrors.phone 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 font-freight">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#7E7E6B] mb-2 font-freight">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-freight transition-colors focus:outline-none focus:ring-2 focus:ring-[#a4c3c6] resize-vertical ${
                      formErrors.message 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                    placeholder="Tell me a bit about what brings you to therapy and what you're hoping to work on..."
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600 font-freight">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#a4c3c6] text-white font-medium px-8 py-4 rounded-lg uppercase tracking-wide transition hover:bg-[#91b1b4] disabled:opacity-50 disabled:cursor-not-allowed font-freight flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-freight">Thank you for your message! I'll get back to you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-freight">There was an error sending your message. Please try again or contact me directly.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Image */}
            <div className="fade-in-up">
              <div className="w-full h-96 bg-stone-200 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/logo.png" 
                  alt="Contact Jennifer Hahm"
                  className="w-full h-full object-contain bg-stone-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-44 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/44c05ca0-453a-453a-811d-c7bc342ee810/pexels-josh-sorenson-386148.jpg")',
          
            
          }}
        >
          <div className="absolute inset-0 bg-white/25 sepia saturate-150"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black-space fade-in-up text-[26.5px]">
          <h3 className="text-2xl md:text-3xl font-normal mb-6 leading-tight font-crimson ">
            "I have come to believe that caring for myself is not self-indulgent. 
            Caring for myself is an act of survival."
          </h3>
          <cite className="text-lg font-normal font-freight">—Audre Lorde</cite>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#fefaf2] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-up">
          <h2 className="text-4xl md:text-5xl font-normal text-[#7E7E6B] mb-4 font-crimson">
            Jennifer Hahm, Ph.D., Licensed Psychologist
          </h2>
          
          <div className="space-y-6 text-[#7E7E6B] mb-12 font-freight">
            <div className="flex items-center justify-center space-x-2">
              <Mail size={20} />
              <a href="mailto:jennifer@drjenniferhahm.com" className="hover:text-stone-800 transition-colors underline">
                jennifer@drjenniferhahm.com
              </a>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>(248) 939-8150</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <MapPin size={20} />
              <span>28175 Haggerty Rd, Novi, MI 48377</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 text-[#7E7E6B] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-freight">
          <p className="mb-4">© 2025 Jennifer Hahm Ph.D. Psychological Services, PLLC. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-stone-800 transition-colors underline">Home</a>
            <a href="#" className="hover:text-stone-800 transition-colors underline">Privacy Policy</a>
            <a href="#" className="hover:text-stone-800 transition-colors underline">Good Faith Estimate</a>
          </div>
          <div className="mt-6">
            <a href="#" className="text-sm hover:text-stone-800 transition-colors underline border-b border-[#7E7E6B]">
              Client Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}