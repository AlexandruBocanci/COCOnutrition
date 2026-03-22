import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CreditCard, Truck, ShieldCheck, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { cn } from '@/lib/utils'
import { getProductImage } from '../lib/images'
import { formatRON } from '../lib/currency'

type Step = 'shipping' | 'payment'

export default function CheckoutPage() {
  const { state, subtotal, clearCart } = useCart()
  const { items } = state
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Romania',
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  })

  const shipping = subtotal >= 350 ? 0 : 24.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const stepOrder: Step[] = ['shipping', 'payment']
  const currentStepIndex = stepOrder.indexOf(currentStep)

  const canSubmitShipping = useMemo(() => {
    return [
      shippingInfo.firstName,
      shippingInfo.lastName,
      shippingInfo.email,
      shippingInfo.address,
      shippingInfo.city,
      shippingInfo.state,
      shippingInfo.zip,
    ].every(Boolean)
  }, [shippingInfo])

  const canSubmitPayment = useMemo(() => {
    return [
      paymentInfo.cardNumber,
      paymentInfo.expiry,
      paymentInfo.cvv,
      paymentInfo.nameOnCard,
    ].every(Boolean)
  }, [paymentInfo])

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmitShipping) {
      setCurrentStep('payment')
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmitPayment) {
      return
    }
    setOrderNumber(`CN${Math.random().toString(36).slice(2, 10).toUpperCase()}`)
    setOrderPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-3">Cosul tau este gol</h1>
            <p className="text-muted-foreground mb-8">
              Adauga produse inainte de finalizarea comenzii.
            </p>
            <Link
              to="/category/sport-nutrition"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Incepe cumparaturile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Comanda plasata cu succes</h1>
            <p className="text-muted-foreground mb-2">
              Am trimis confirmarea la <span className="text-foreground">{shippingInfo.email}</span>.
            </p>
            <p className="text-sm text-muted-foreground mb-8">Comanda #{orderNumber}</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Continua cumparaturile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const steps = [
    { id: 'shipping' as Step, label: 'Livrare' },
    { id: 'payment' as Step, label: 'Plata' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Acasa
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
              Cos
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Finalizare comanda</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => {
            const isDone = index < currentStepIndex
            const isActive = currentStep === step.id

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isDone
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isDone ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={cn('ml-2 text-sm font-medium', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                  {step.label}
                </span>
                {index < steps.length - 1 && <div className="w-12 h-px bg-border mx-4" />}
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit}>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-accent" />
                  Informatii de livrare
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prenume *</label>
                    <input type="text" required value={shippingInfo.firstName} onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nume *</label>
                    <input type="text" required value={shippingInfo.lastName} onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" required value={shippingInfo.email} onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input type="tel" value={shippingInfo.phone} onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Adresa *</label>
                  <input type="text" required value={shippingInfo.address} onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Strada, numar" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Oras *</label>
                    <input type="text" required value={shippingInfo.city} onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Judet *</label>
                    <input type="text" required value={shippingInfo.state} onChange={e => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cod postal *</label>
                    <input type="text" required value={shippingInfo.zip} onChange={e => setShippingInfo({ ...shippingInfo, zip: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors" disabled={!canSubmitShipping}>
                  Continua la plata
                </button>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit}>
                <button type="button" onClick={() => setCurrentStep('shipping')} className="text-sm text-muted-foreground hover:text-foreground mb-6">
                  &larr; Inapoi la livrare
                </button>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-accent" />
                  Detalii plata
                </h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Numar card *</label>
                  <input type="text" required placeholder="1234 5678 9012 3456" value={paymentInfo.cardNumber} onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Data expirarii *</label>
                    <input type="text" required placeholder="MM/YY" value={paymentInfo.expiry} onChange={e => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV *</label>
                    <input type="text" required placeholder="123" value={paymentInfo.cvv} onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Nume pe card *</label>
                  <input type="text" required value={paymentInfo.nameOnCard} onChange={e => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Plata este simulata. Datele cardului nu sunt procesate.
                </div>
                <button type="submit" className="w-full py-3 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 transition-colors" disabled={!canSubmitPayment}>
                  Plaseaza comanda - {formatRON(total)}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Sumar comanda</h2>
              <div className="space-y-4 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedFlavor}`} className="flex gap-3">
                    <img
                      src={getProductImage(item.product)}
                      alt={item.product.name}
                      className="w-16 h-16 bg-muted rounded object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Cant.: {item.quantity}</p>
                      {item.selectedFlavor && <p className="text-xs text-muted-foreground">{item.selectedFlavor}</p>}
                    </div>
                    <p className="text-sm font-medium">{formatRON(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-b border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatRON(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livrare</span>
                  <span className={cn('font-medium', shipping === 0 && 'text-green-600')}>
                    {shipping === 0 ? 'Gratuit' : formatRON(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa (8%)</span>
                  <span className="font-medium">{formatRON(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatRON(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
