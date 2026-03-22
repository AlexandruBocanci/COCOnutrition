import { Link } from 'react-router-dom'
import { ChevronRight, Target, Award, Users, Leaf, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Calitatea pe primul loc',
      description: 'Folosim doar ingrediente de cea mai buna calitate si colaboram cu branduri de top pentru a-ti oferi ce este mai bun.',
    },
    {
      icon: Award,
      title: 'Sustinut stiintific',
      description: 'Fiecare produs este bazat pe cercetare stiintifica si formulat pentru rezultate reale.',
    },
    {
      icon: Users,
      title: 'Orientat catre client',
      description: 'Echipa noastra te ajuta sa gasesti suplimentele potrivite obiectivelor tale.',
    },
    {
      icon: Leaf,
      title: 'Transparenta',
      description: 'Credem in etichetare corecta, ingrediente curate si transparenta totala.',
    },
  ]

  const stats = [
    { value: '50K+', label: 'Clienti multumiti' },
    { value: '200+', label: 'Produse' },
    { value: '12', label: 'Branduri premium' },
    { value: '98%', label: 'Rata de satisfactie' },
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
            <span className="text-foreground font-medium">Despre noi</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Iti sustinem drumul catre <span className="text-accent">performanta maxima</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              COCOnutrition a fost creat cu o misiune simpla: sa ofere sportivilor si pasionatilor de fitness suplimente premium, sustinute stiintific, care ofera rezultate reale. Credem ca oricine merita acces la nutritie de top, fara compromisuri.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="text-3xl lg:text-4xl font-bold text-accent">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Povestea noastra</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">
                Creat de sportivi, pentru sportivi
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ce a inceput ca un proiect de pasiune in 2018 a devenit unul dintre cele mai de incredere nume din nutritia sportiva. Fondatorul nostru, fost sportiv de performanta, era frustrat de lipsa de transparenta din industrie.
                </p>
                <p>
                  Prea multe produse erau pline de ingrediente discutabile si promisiuni goale. Ne-am propus sa schimbam asta printr-o selectie atenta de suplimente cu standarde ridicate.
                </p>
                <p>
                  Astazi lucram direct cu branduri si producatori de top pentru a-ti oferi produse eficiente, corecte si accesibile. Fiecare produs este testat si aprobat de echipa noastra.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-8xl font-bold text-primary-foreground/10">CN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Ce ne defineste</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2">Valorile noastre</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(value => (
              <div key={value.title} className="bg-card p-6 rounded-xl border border-border">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Esti gata sa incepi?</h2>
          <p className="text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
            Descopera selectia noastra de suplimente premium si gaseste produsele perfecte pentru obiectivele tale.
          </p>
          <Link
            to="/category/sport-nutrition"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 transition-colors"
          >
            Cumpara acum
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
