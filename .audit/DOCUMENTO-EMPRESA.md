# Guía Ejecutiva: Integración de Nueva Empresa al Directorio

## Todo Para Fiestas - Manual de Procedimientos

**Versión:** 1.0
**Última actualización:** Diciembre 2024
**Documento confidencial - Uso interno**

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Información Requerida de la Empresa](#2-información-requerida-de-la-empresa)
3. [Fase 1: Creación de la Vendor Card](#3-fase-1-creación-de-la-vendor-card)
4. [Fase 2: Creación de la Página de Perfil/Reseña](#4-fase-2-creación-de-la-página-de-perfilreseña)
5. [Fase 3: Integración y Vinculación en el Sitio](#5-fase-3-integración-y-vinculación-en-el-sitio)
6. [Fase 4: Verificación y Control de Calidad](#6-fase-4-verificación-y-control-de-calidad)
7. [Estructura de Archivos](#7-estructura-de-archivos)
8. [Checklist Final](#8-checklist-final)
9. [Plantillas de Código](#9-plantillas-de-código)

---

## 1. Resumen Ejecutivo

Este documento establece el procedimiento estándar para integrar una nueva empresa al directorio "Todo Para Fiestas". El proceso consta de cuatro fases principales:

| Fase | Descripción | Tiempo Estimado |
|------|-------------|-----------------|
| 1 | Creación de Vendor Card | 15-20 min |
| 2 | Creación de Página de Perfil | 30-45 min |
| 3 | Integración y Vinculación | 15-20 min |
| 4 | Verificación y QA | 10-15 min |

**Tiempo total estimado:** 1-2 horas por empresa

---

## 2. Información Requerida de la Empresa

Antes de iniciar el proceso, recopilar la siguiente información:

### 2.1 Datos Básicos (Obligatorios)

```
□ Nombre comercial de la empresa
□ Categoría principal (ej: Fiestas Infantiles, Banquetes, Decoración)
□ Subcategoría (ej: Inflables, Animadores, Globos)
□ Descripción corta (máx. 150 caracteres)
□ Descripción larga (2-3 párrafos)
□ Ubicación/Zona de cobertura
□ Precio inicial o rango de precios
```

### 2.2 Información de Contacto (Obligatorios)

```
□ Número de teléfono principal
□ Número de WhatsApp (con código de país: 52)
□ Correo electrónico
□ Sitio web (si aplica)
□ Dirección física (si aplica)
□ Horario de atención
```

### 2.3 Contenido Visual

```
□ Logo de la empresa (preferible SVG o PNG transparente)
□ Imagen principal para la card (600x400px mínimo)
□ Galería de imágenes (mínimo 3, máximo 10)
□ Icono/emoji representativo
```

### 2.4 Información de Servicios

```
□ Lista de servicios incluidos (mínimo 3)
□ Catálogo de productos/servicios con especificaciones
□ Características destacadas
□ Años de experiencia
□ Certificaciones o verificaciones
```

### 2.5 Reseñas y Testimonios

```
□ Mínimo 3 reseñas de clientes reales
□ Por cada reseña:
  - Nombre del cliente
  - Tipo de evento
  - Ubicación del evento
  - Calificación (1-5 estrellas)
  - Texto del testimonio
```

### 2.6 Estadísticas (Opcionales pero recomendadas)

```
□ Número de eventos realizados
□ Años en el mercado
□ Zonas de cobertura
□ Porcentaje de satisfacción
□ Número de productos/servicios
```

---

## 3. Fase 1: Creación de la Vendor Card

### 3.1 Ubicación del Archivo

La vendor card se integra en el archivo `index.html` de la categoría correspondiente:

```
/categorias/[nombre-categoria]/index.html
```

**Ejemplos:**
- Fiestas Infantiles: `/categorias/fiestas-infantiles/index.html`
- Banquetes: `/categorias/banquetes/index.html`
- Decoración: `/categorias/decoracion/index.html`

### 3.2 Estructura de la Vendor Card

```html
<!-- [NOMBRE-EMPRESA] - [Categoría] -->
<article class="vendor-card vendor-card--featured" data-category="[subcategoria]">
  <div class="vendor-card__gallery">
    <div class="vendor-card__gallery-wrapper">
      <div class="vendor-card__gallery-item">
        <img src="[URL-IMAGEN]" alt="[NOMBRE-EMPRESA] - [Descripción breve]">
      </div>
    </div>
    <div class="vendor-card__badges">
      <div class="vendor-card__badge vendor-card__badge--featured">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Destacado
      </div>
      <div class="vendor-card__badge vendor-card__badge--verified">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Verificado
      </div>
    </div>
    <button class="vendor-card__favorite" aria-label="Agregar a favoritos">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </button>
    <div class="vendor-card__gallery-overlay">
      <span class="vendor-card__photos-count">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        [X] fotos
      </span>
    </div>
  </div>
  <div class="vendor-card__content">
    <div class="vendor-card__header">
      <div class="vendor-card__title-wrap">
        <h3 class="vendor-card__title">[NOMBRE-EMPRESA]</h3>
        <span class="vendor-card__category">[Categoría]</span>
      </div>
      <div class="vendor-card__rating">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span class="vendor-card__rating-value">[X.X]</span>
        <span class="vendor-card__rating-count">([XXX]+)</span>
      </div>
    </div>
    <p class="vendor-card__location">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      [Ubicación/Cobertura]
    </p>
    <p class="vendor-card__description">
      [Descripción corta del servicio - máximo 150 caracteres]
    </p>
    <div class="vendor-card__features">
      <span class="vendor-card__feature">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        [Característica 1]
      </span>
      <span class="vendor-card__feature">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        [Característica 2]
      </span>
      <span class="vendor-card__feature">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        [Característica 3]
      </span>
    </div>
    <div class="vendor-card__footer">
      <div class="vendor-card__price">
        <span class="vendor-card__price-label">Desde</span>
        <span class="vendor-card__price-value">$[X,XXX]<span class="vendor-card__price-unit">/evento</span></span>
      </div>
      <div class="vendor-card__actions">
        <a href="[nombre-empresa].html" class="vendor-card__cta">Ver más</a>
        <a href="https://wa.me/52[NUMERO]" target="_blank" rel="noopener" class="vendor-card__contact" aria-label="Contactar por WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  </div>
</article>
```

### 3.3 Consideraciones para la Vendor Card

| Elemento | Especificación |
|----------|----------------|
| Imagen | Mínimo 600x400px, formato JPG/WebP optimizado |
| Título | Nombre comercial completo |
| Descripción | Máximo 150 caracteres, incluir palabras clave |
| Características | Exactamente 3, las más relevantes |
| Precio | Formato con comas: $1,200 |
| Rating | Formato X.X (ej: 5.0, 4.8) |
| Enlace "Ver más" | Apunta al archivo [nombre-empresa].html |
| WhatsApp | Formato: 52XXXXXXXXXX (sin espacios ni guiones) |

---

## 4. Fase 2: Creación de la Página de Perfil/Reseña

### 4.1 Ubicación y Nomenclatura

El archivo de perfil se crea en la misma carpeta de la categoría:

```
/categorias/[nombre-categoria]/[nombre-empresa].html
```

**Convención de nombres:**
- Todo en minúsculas
- Sin espacios (usar guiones)
- Sin caracteres especiales
- Sin acentos

**Ejemplos:**
- INFLAPY → `inflapy.html`
- Globos Mágicos → `globos-magicos.html`
- Banquetes Don José → `banquetes-don-jose.html`

### 4.2 Estructura del Archivo de Perfil

El archivo debe contener las siguientes secciones en orden:

```
1. DOCTYPE y HEAD
   - Meta tags SEO
   - Open Graph tags
   - Favicon
   - Google Fonts
   - CSS principal (../../css/style.css)
   - Estilos inline específicos del perfil

2. BODY
   2.1 Top Bar (heredado del sitio)
   2.2 Header (heredado del sitio)
   2.3 Breadcrumb (Inicio > Categoría > Empresa)
   2.4 Hero Section (estilo two-cols)
       - Badges (Destacado, Verificado)
       - Título de la empresa
       - Descripción/tagline
       - Meta info (ubicación, rating, experiencia)
   2.5 Provider Content (grid 2 columnas)
       MAIN CONTENT:
       - Sobre [Empresa]
       - ¿Qué incluye el servicio?
       - Catálogo de productos/servicios
       - Opiniones de clientes
       - Contacto y Cobertura
       SIDEBAR (contenido del directorio):
       - Promoción "Registra tu Negocio"
       - Artículos de interés
       - Proveedores relacionados
       - Categorías populares
       - Newsletter
   2.6 Footer (heredado del sitio)
   2.7 Scripts (../../js/app.js)
```

### 4.3 Rutas Relativas

Desde `/categorias/[categoria]/[empresa].html`:

| Recurso | Ruta |
|---------|------|
| CSS principal | `../../css/style.css` |
| JavaScript | `../../js/app.js` |
| Index principal | `../../index.html` |
| Index categoría | `index.html` |
| Imágenes locales | `../../img/[imagen]` |

### 4.4 Breadcrumb

```html
<nav class="breadcrumb" aria-label="Navegación">
  <div class="container">
    <div class="breadcrumb__nav">
      <a href="../../index.html" class="breadcrumb__link">
        <svg><!-- icono casa --></svg>
        Inicio
      </a>
      <span class="breadcrumb__separator">
        <svg><!-- icono chevron --></svg>
      </span>
      <a href="index.html" class="breadcrumb__link">[Nombre Categoría]</a>
      <span class="breadcrumb__separator">
        <svg><!-- icono chevron --></svg>
      </span>
      <span class="breadcrumb__current">[NOMBRE EMPRESA]</span>
    </div>
  </div>
</nav>
```

### 4.5 Secciones del Contenido Principal

#### 4.5.1 Sobre la Empresa

```html
<div class="provider-section">
  <h2 class="provider-section__title">
    <svg><!-- icono info --></svg>
    Sobre [NOMBRE EMPRESA]
  </h2>
  <div class="provider-description">
    <p>[Párrafo 1: Historia y propuesta de valor]</p>
    <p>[Párrafo 2: Servicios y especialidades]</p>
    <p>[Párrafo 3: Diferenciadores y compromiso]</p>
  </div>
</div>
```

#### 4.5.2 Servicios Incluidos

```html
<div class="provider-section">
  <h2 class="provider-section__title">
    <svg><!-- icono check --></svg>
    ¿Qué incluye el servicio?
  </h2>
  <div class="provider-features">
    <!-- Mínimo 6 características -->
    <div class="provider-feature">
      <div class="provider-feature__icon">[Emoji]</div>
      <span class="provider-feature__text">[Característica]</span>
    </div>
    <!-- Repetir para cada característica -->
  </div>
</div>
```

#### 4.5.3 Catálogo

```html
<div class="provider-section">
  <h2 class="provider-section__title">
    <svg><!-- icono imagen --></svg>
    Catálogo de [Productos/Servicios]
  </h2>
  <div class="catalog-grid">
    <div class="catalog-item">
      <div class="catalog-item__image">[Emoji o imagen]</div>
      <div class="catalog-item__content">
        <h3 class="catalog-item__name">[Nombre producto]</h3>
        <div class="catalog-item__specs">
          <span class="catalog-item__spec">[Spec 1]</span>
          <span class="catalog-item__spec">[Spec 2]</span>
          <span class="catalog-item__spec">[Spec 3]</span>
        </div>
      </div>
    </div>
    <!-- Repetir para cada producto -->
  </div>
</div>
```

#### 4.5.4 Reseñas

```html
<div class="provider-section">
  <h2 class="provider-section__title">
    <svg><!-- icono estrella --></svg>
    Opiniones de Clientes
  </h2>
  <div class="reviews-grid">
    <div class="review-card">
      <div class="review-card__header">
        <div class="review-card__author">
          <div class="review-card__avatar">[INICIALES]</div>
          <div>
            <div class="review-card__name">[Nombre Cliente]</div>
            <div class="review-card__event">[Tipo evento] - [Ubicación]</div>
          </div>
        </div>
        <div class="review-card__rating">
          <!-- 5 SVG estrellas -->
        </div>
      </div>
      <p class="review-card__text">"[Texto del testimonio]"</p>
    </div>
    <!-- Mínimo 3 reseñas, recomendado 6 -->
  </div>
</div>
```

#### 4.5.5 Contacto y Cobertura

```html
<div class="provider-section">
  <h2 class="provider-section__title">
    <svg><!-- icono teléfono --></svg>
    Contacto y Cobertura
  </h2>
  <div class="contact-coverage-grid">
    <div class="contact-box">
      <h3 class="contact-box__title">Información de Contacto</h3>
      <div class="contact-list">
        <!-- Teléfono, Email, Web, Dirección, Horario -->
      </div>
      <div class="contact-buttons">
        <a href="https://wa.me/52[NUMERO]" class="contact-btn contact-btn--whatsapp">
          Cotizar por WhatsApp
        </a>
        <a href="[URL-WEB]" class="contact-btn contact-btn--website">
          Ver Catálogo Completo
        </a>
      </div>
    </div>
    <div class="coverage-box">
      <h3 class="coverage-box__title">Zonas de Cobertura</h3>
      <div class="coverage-areas">
        <!-- Zonas organizadas por región -->
      </div>
    </div>
  </div>
</div>
```

---

## 5. Fase 3: Integración y Vinculación en el Sitio

### 5.1 Enlaces a Actualizar

Una vez creados la card y el perfil, actualizar los siguientes archivos:

#### 5.1.1 Index de la Categoría

**Archivo:** `/categorias/[categoria]/index.html`

**Acciones:**
- [ ] Agregar la vendor card en la sección `featured__grid`
- [ ] Agregar testimonios en la sección `testimonials__grid` (opcional)
- [ ] Verificar que el enlace "Ver más" apunte a `[empresa].html`

#### 5.1.2 Index Principal (si aplica como destacado)

**Archivo:** `/index.html`

**Acciones:**
- [ ] Si la empresa es destacada a nivel sitio, agregar card en `featured__grid`
- [ ] Actualizar dropdown del menú de navegación si aplica

#### 5.1.3 Menú de Navegación

**Archivos a verificar:**
- `/index.html`
- `/categorias/[categoria]/index.html`
- `/categorias/[categoria]/[empresa].html`

**Verificar:**
- [ ] El enlace de la categoría en el nav funciona
- [ ] Los dropdowns muestran la empresa si aplica

### 5.2 Enlaces Internos del Perfil

En el archivo `[empresa].html`, verificar:

| Elemento | Debe apuntar a |
|----------|----------------|
| Logo header | `../../index.html` |
| Links nav categoría activa | `index.html` |
| Links nav otras categorías | `../../index.html#proveedores` |
| Breadcrumb Inicio | `../../index.html` |
| Breadcrumb Categoría | `index.html` |
| Footer categorías | Rutas correctas con `../../` |
| Sidebar "Fiestas Infantiles" | `index.html` |
| Sidebar otras categorías | `../../index.html#categorias` |

### 5.3 SEO y Meta Tags

Verificar que el archivo de perfil contenga:

```html
<title>[EMPRESA] - [Servicio] en [Ubicación] | Todo Para Fiestas</title>
<meta name="description" content="[Descripción SEO de 150-160 caracteres con keywords]">
<meta property="og:title" content="[EMPRESA] - [Servicio] | Todo Para Fiestas">
<meta property="og:description" content="[Descripción para redes sociales]">
```

---

## 6. Fase 4: Verificación y Control de Calidad

### 6.1 Pruebas de Enlaces

Ejecutar las siguientes verificaciones:

```
□ Abrir /categorias/[categoria]/index.html
  □ Click en "Ver más" de la card → Abre perfil correctamente
  □ Click en WhatsApp → Abre WhatsApp con mensaje predefinido

□ Abrir /categorias/[categoria]/[empresa].html
  □ Breadcrumb "Inicio" → Lleva a index principal
  □ Breadcrumb "[Categoría]" → Lleva a index de categoría
  □ Logo header → Lleva a index principal
  □ Links de navegación → Funcionan correctamente
  □ Botón WhatsApp hero → Abre WhatsApp
  □ Botón sitio web → Abre sitio externo en nueva pestaña
  □ Botones contacto → Funcionan correctamente
  □ Links sidebar → Funcionan correctamente
  □ Footer links → Funcionan correctamente
```

### 6.2 Pruebas Visuales

```
□ Responsive móvil (< 768px)
  □ Header se adapta correctamente
  □ Hero es legible
  □ Cards se apilan verticalmente
  □ Sidebar se reorganiza
  □ Botones son clickeables

□ Responsive tablet (768px - 1024px)
  □ Grid se ajusta a 2 columnas donde aplica
  □ Sidebar se muestra en grid de 2 columnas

□ Desktop (> 1024px)
  □ Layout completo funciona
  □ Sidebar en columna derecha
  □ Hover states funcionan
```

### 6.3 Verificación de Contenido

```
□ Sin errores ortográficos
□ Información de contacto correcta
□ Precios actualizados
□ Imágenes cargan correctamente
□ Reseñas con formato consistente
□ Badges correctos (Destacado/Verificado)
```

---

## 7. Estructura de Archivos

### 7.1 Árbol de Directorios

```
/TODO-PARA-FIESTAS/
├── index.html                          # Página principal
├── css/
│   └── style.css                       # Estilos globales
├── js/
│   └── app.js                          # JavaScript global
├── img/                                # Imágenes globales
├── categorias/
│   ├── fiestas-infantiles/
│   │   ├── index.html                  # Listado de categoría
│   │   ├── inflapy.html               # Perfil empresa 1
│   │   ├── [empresa-2].html           # Perfil empresa 2
│   │   └── [empresa-n].html           # Perfil empresa N
│   ├── banquetes/
│   │   ├── index.html
│   │   └── [empresas].html
│   ├── decoracion/
│   │   ├── index.html
│   │   └── [empresas].html
│   └── [otras-categorias]/
└── .audit/
    └── DOCUMENTO-EMPRESA.md            # Este documento
```

### 7.2 Convención de Nombres

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Carpetas categoría | kebab-case | `fiestas-infantiles` |
| Archivos empresa | kebab-case.html | `globos-magicos.html` |
| Clases CSS | BEM | `vendor-card__title` |
| IDs HTML | kebab-case | `id="proveedores"` |

---

## 8. Checklist Final

### Pre-Lanzamiento

```
FASE 1 - VENDOR CARD
□ Card agregada en index de categoría
□ Imagen optimizada y cargando
□ Información correcta (nombre, precio, ubicación)
□ Badges configurados (Destacado/Verificado)
□ Enlace "Ver más" correcto
□ WhatsApp con número correcto

FASE 2 - PÁGINA DE PERFIL
□ Archivo creado con nombre correcto
□ Meta tags SEO configurados
□ Breadcrumb funcional
□ Hero con información completa
□ Sección "Sobre" con 3 párrafos
□ Servicios incluidos (mínimo 6)
□ Catálogo de productos
□ Reseñas de clientes (mínimo 3)
□ Contacto y cobertura completos
□ Sidebar con contenido del directorio

FASE 3 - INTEGRACIÓN
□ Enlaces internos funcionando
□ Navegación correcta
□ Footer links actualizados
□ SEO optimizado

FASE 4 - QA
□ Pruebas en móvil
□ Pruebas en tablet
□ Pruebas en desktop
□ Todos los enlaces funcionan
□ WhatsApp abre correctamente
□ Sin errores de consola
```

### Post-Lanzamiento

```
□ Verificar en navegadores (Chrome, Firefox, Safari)
□ Probar en dispositivo móvil real
□ Confirmar que empresa recibió notificación
□ Documentar fecha de alta en registro interno
```

---

## 9. Plantillas de Código

### 9.1 Plantilla Completa de Página de Perfil

Ver archivo de referencia: `/categorias/fiestas-infantiles/inflapy.html`

### 9.2 Plantilla de Vendor Card

Ver sección 3.2 de este documento.

### 9.3 Plantilla de Testimonial

```html
<div class="testimonial-card testimonial-card--featured">
  <div class="testimonial-card__header">
    <div class="testimonial-card__avatar-placeholder">[XX]</div>
    <div class="testimonial-card__author">
      <div class="testimonial-card__name">[Nombre]</div>
      <div class="testimonial-card__event">[Evento] - [Ubicación]</div>
      <div class="testimonial-card__provider">
        <svg><!-- check icon --></svg>
        [NOMBRE EMPRESA]
      </div>
    </div>
    <div class="testimonial-card__rating">
      <!-- 5 estrellas SVG -->
    </div>
  </div>
  <p class="testimonial-card__quote">[Texto del testimonio]</p>
</div>
```

---

## Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Dic 2024 | Documento inicial |

---

## Contacto Interno

Para dudas sobre este procedimiento, contactar al equipo de desarrollo.

**Documento creado para:** Todo Para Fiestas
**Uso:** Interno - Equipo de contenido y desarrollo
