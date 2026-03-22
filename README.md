# COCOnutrition

COCOnutrition este un proiect frontend de tip e-commerce realizat pentru facultate, cu scopul de a simula un magazin online modern pentru suplimente nutritive, produse wellness si accesorii fitness.

Aplicatia este construita ca un magazin static, fara backend, dar include functionalitati care imita comportamentul unei platforme reale de shopping: navigare pe categorii, afisare dinamica a produselor, cautare, filtrare, cos de cumparaturi si flux de checkout simulat.

## Scopul proiectului

Scopul principal al proiectului a fost dezvoltarea unei aplicatii web cu aspect premium, organizare clara si experienta de utilizare apropiata de cea a unui magazin online real.

Prin acest proiect s-a urmarit:

- realizarea unei interfete moderne si coerente
- folosirea unei structuri clare de categorii si subcategorii
- simularea unui flux complet de cumparare
- aplicarea unor concepte moderne de dezvoltare frontend
- publicarea proiectului online prin GitHub Pages

## Functionalitati principale

- homepage structurata ca hub de shopping
  <img width="1895" height="945" alt="image" src="https://github.com/user-attachments/assets/c46701b7-bc72-4353-9f64-218b539943b6" />
- mega menu cu categorii, subcategorii si sub-subcategorii
  <img width="1895" height="945" alt="image" src="https://github.com/user-attachments/assets/e324dc1c-a376-4bc3-9026-26f46a215a82" />
- afisare dinamica a produselor dintr-un fisier local de date
  <img width="1893" height="944" alt="image" src="https://github.com/user-attachments/assets/15775e46-1fc3-473e-a3ec-1125c9681379" />
- pagini individuale pentru produse
- cautare dupa nume si categorie
  <img width="1893" height="943" alt="image" src="https://github.com/user-attachments/assets/6f207057-e299-439c-a20d-23c949624872" />
- filtrare dupa brand, scop si pret
- cos de cumparaturi cu persistenta in localStorage
  <img width="1895" height="947" alt="image" src="https://github.com/user-attachments/assets/ae26d25f-3a5a-4584-8d22-83854a052f21" />
- actualizare cantitate si stergere produse din cos
- checkout simulat
  <img width="1894" height="947" alt="image" src="https://github.com/user-attachments/assets/011ed858-8d92-4380-814e-c63689b7c47f" />
- pagini About si Contact

## Tehnologii folosite

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- localStorage

Acest stack a fost ales pentru ca permite dezvoltarea unei aplicatii rapide, modulare si usor de intretinut, potrivita pentru un proiect academic cu nivel bun de complexitate.

## Directie vizuala

Designul proiectului urmareste o estetica premium, minimalista si echilibrata.  
Am evitat un stil incarcat sau agresiv si am ales o prezentare mai curata, apropiata de magazinele moderne din zona de sport nutrition si wellness.

### Paleta de culori

- Background: `#F7F7F5`
- Primary: `#1C1F26`
- Secondary: `#2B2F36`
- Accent: `#C7A27C`
- Text: `#111111`

### De ce a fost aleasa aceasta paleta

- fundalul deschis ofera claritate si un aspect elegant
- nuantele inchise definesc vizual zona de navigatie si elementele importante
- accentul cald sugereaza calitate si premium feel
- contrastul general ajuta la lizibilitate si la organizarea informatiei

## Structura proiectului

Aplicatia este organizata pe componente, pagini, date si logica reutilizabila.  
Produsele sunt definite intr-un fisier local, iar interfata le afiseaza dinamic in functie de pagina accesata.

Exista rute separate pentru:

- categorii
- branduri
- produse
- reduceri
- cautare
- cos
- checkout

## Rulare locala

Pentru rulare locala:

```bash
npm install
npm run dev
```

Pentru build:

```bash
npm run build
```

## Deploy

Proiectul este pregatit pentru deploy pe GitHub Pages prin GitHub Actions.

Link live:

[https://alexandrubocanci.github.io/COCOnutrition/](https://alexandrubocanci.github.io/COCOnutrition/)

## Imagini

Imaginile reale pentru produse, categorii si hero section se adauga manual in folderul `public/images/`.

Structura folosita este:

- `public/images/products/`
- `public/images/categories/`
- `public/images/hero/`

Lista completa cu fisierele necesare si denumirile exacte se afla in:

[IMAGE_ASSETS_NEEDED.md](./IMAGE_ASSETS_NEEDED.md)

Aceasta lista trebuie folosita pentru:

- identificarea imaginilor lipsa
- denumirea corecta a fisierelor
- completarea vizuala a proiectului fara modificari suplimentare in cod

## Autor

Alexandru Bocanci  
