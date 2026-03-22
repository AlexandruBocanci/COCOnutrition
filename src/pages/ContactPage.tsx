import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormState({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@coconutrition.com',
      href: 'mailto:support@coconutrition.com',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '1-800-COCO-FIT',
      href: 'tel:+1-800-COCO-FIT',
    },
    {
      icon: MapPin,
      label: 'Adresa',
      value: 'Bucuresti, Romania',
    },
    {
      icon: Clock,
      label: 'Program',
      value: 'Lun-Vin: 09:00-18:00',
    },
  ]

  const faqs = [
    {
      question: 'Care este politica de retur?',
      answer: 'Oferim retur in 30 de zile pentru produsele nedeschise. Contacteaza echipa de suport pentru initiere.',
    },
    {
      question: 'Cat dureaza livrarea?',
      answer: 'Livrarea standard dureaza 1-3 zile lucratoare. Livrarea express este disponibila contra cost.',
    },
    {
      question: 'Livrati international?',
      answer: 'Momentan livram in Romania. Livrarea internationala va fi disponibila in curand.',
    },
    {
      question: 'Produsele sunt testate de terte parti?',
      answer: 'Da, toate produsele sunt testate pentru calitate si puritate. Certificatele sunt disponibile la cerere.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Acasa
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Ia legatura cu noi</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Ai o intrebare despre produse sau despre comanda ta? Echipa noastra te ajuta cu placere.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Trimite-ne un mesaj</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Mesaj trimis!</h3>
                <p className="text-green-700">
                  Multumim! Revenim catre tine in maximum 24 de ore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nume *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Numele tau"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Subiect *</label>
                  <select
                    required
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  >
                    <option value="">Selecteaza un subiect</option>
                    <option value="order">Intrebare comanda</option>
                    <option value="product">Intrebare produs</option>
                    <option value="return">Retur si rambursare</option>
                    <option value="wholesale">Cerere en-gros</option>
                    <option value="other">Altele</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mesaj *</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Cum te putem ajuta?"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Trimite mesaj
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Informatii de contact</h2>
            <div className="space-y-6 mb-12">
              {contactInfo.map(info => (
                <div key={info.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-foreground hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <h2 className="text-xl font-bold mb-6">Intrebari frecvente</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

