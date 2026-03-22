import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-semibold tracking-tight">
                COCO<span className="text-accent">nutrition</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 max-w-xs mb-6">
              Nutritie sportiva premium si suplimente pentru sportivii care vor cele mai bune rezultate.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Cumparaturi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/sport-nutrition" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Sport Nutrition
                </Link>
              </li>
              <li>
                <Link to="/category/food-snacks" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Food & Snacks
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-accent hover:text-accent/80 transition-colors">
                  Reduceri
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suport</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Contacteaza-ne
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Informatii livrare
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Retururi
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Urmareste comanda
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Companie</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Despre noi
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Cariere
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Presa
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Afiliati
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <a href="mailto:support@coconutrition.com" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  support@coconutrition.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <a href="tel:+1-800-COCO-FIT" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  0767 676 676
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span className="text-primary-foreground/70">
                  Strada Principala Nr 67<br />
                  Suceava, Romania
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} COCOnutrition. Toate drepturile rezervate. Creat de Alexandru Bocanci.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">Politica de confidentialitate</a>
            <a href="#" className="hover:text-accent transition-colors">Termeni si conditii</a>
            <a href="#" className="hover:text-accent transition-colors">Politica cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
