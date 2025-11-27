import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Coffee, Clock, MapPin, Phone, Mail, Star, Heart, Users } from 'lucide-react'
import './App.css'

// Importar as imagens
import cafeInterior from './assets/cafe-interior.jpg'
import cafeModern from './assets/cafe-modern.jpg'
import coffeeBeans from './assets/coffee-beans.jpg'
import coffeeStorage from './assets/coffee-storage.jpg'

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [menuExpanded, setMenuExpanded] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Depoimentos dos clientes
  const testimonials = [
    {
      name: "Maria Silva",
      text: "O melhor café da cidade! Ambiente aconchegante e atendimento excepcional.",
      rating: 5
    },
    {
      name: "João Santos",
      text: "Adoro vir aqui trabalhar. WiFi rápido e café delicioso. Recomendo!",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Os doces artesanais são incríveis. Meu local favorito para relaxar.",
      rating: 5
    }
  ]

  // Menu da cafeteria
  const menuItems = [
    {
      category: "Cafés Especiais",
      items: [
        { name: "Espresso Artesanal", price: "R$ 8,00", description: "Blend exclusivo da casa" },
        { name: "Cappuccino Cremoso", price: "R$ 12,00", description: "Com leite vaporizado e canela" },
        { name: "Café Gelado", price: "R$ 10,00", description: "Refrescante e aromático" }
      ]
    },
    {
      category: "Doces & Salgados",
      items: [
        { name: "Croissant Artesanal", price: "R$ 15,00", description: "Massa folhada crocante" },
        { name: "Bolo de Chocolate", price: "R$ 18,00", description: "Receita da vovó" },
        { name: "Sanduíche Natural", price: "R$ 14,00", description: "Ingredientes frescos" }
      ]
    }
  ]

  // Rotação automática dos depoimentos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Manipular formulário
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-amber-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-amber-300" />
            <h1 className="text-2xl font-bold">Café Aroma</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-amber-300 transition-colors">Início</a>
            <a href="#about" className="hover:text-amber-300 transition-colors">Sobre</a>
            <a href="#menu" className="hover:text-amber-300 transition-colors">Cardápio</a>
            <a href="#contact" className="hover:text-amber-300 transition-colors">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${cafeInterior})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 animate-fade-in">
            Bem-vindos ao Café Aroma
          </h2>
          <p className="text-xl md:text-2xl text-amber-800 mb-8 animate-slide-up">
            Onde cada xícara conta uma história especial
          </p>
          <Button 
            size="lg" 
            className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 text-lg animate-bounce-in"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Conheça nosso cardápio
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-amber-900 mb-6">Nossa História</h3>
              <p className="text-lg text-gray-700 mb-6">
                Fundado em 2018, o Café Aroma nasceu da paixão por criar experiências únicas 
                através do café artesanal. Cada grão é cuidadosamente selecionado e torrado 
                para proporcionar sabores excepcionais.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-semibold">Paixão</p>
                </div>
                <div className="p-4">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="font-semibold">Qualidade</p>
                </div>
                <div className="p-4">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-semibold">Comunidade</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={cafeModern} 
                alt="Interior moderno da cafeteria" 
                className="rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
              <img 
                src={coffeeBeans} 
                alt="Grãos de café artesanais" 
                className="rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-amber-900 mb-12">Nosso Cardápio</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {menuItems.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader 
                  className="cursor-pointer bg-amber-100 hover:bg-amber-200 transition-colors"
                  onClick={() => setMenuExpanded(menuExpanded === categoryIndex ? null : categoryIndex)}
                >
                  <CardTitle className="flex justify-between items-center text-amber-900">
                    {category.category}
                    <Coffee className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                {menuExpanded === categoryIndex && (
                  <CardContent className="animate-slide-down">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start py-3 border-b last:border-b-0">
                        <div>
                          <h4 className="font-semibold text-amber-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-amber-200 text-amber-900">
                          {item.price}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-amber-900 mb-12">O que nossos clientes dizem</h3>
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-4 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <p className="font-semibold text-amber-900">
                  - {testimonials[currentTestimonial].name}
                </p>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Entre em Contato</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-semibold mb-6">Informações</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-amber-300" />
                  <span>Rua das Flores, 123 - Centro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-amber-300" />
                  <span>(11) 9999-8888</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-amber-300" />
                  <span>contato@cafearoma.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-amber-300" />
                  <span>Seg-Dom: 7h às 22h</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-6">Envie uma mensagem</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
                ></textarea>
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Coffee className="h-6 w-6 text-amber-300" />
            <span className="text-xl font-bold">Café Aroma</span>
          </div>
          <p className="text-amber-200">
            © 2024 Café Aroma. Todos os direitos reservados. Feito com ❤️ e muito café.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
