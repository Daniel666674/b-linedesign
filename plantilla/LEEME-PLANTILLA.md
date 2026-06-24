# Plantilla — Sitio web para estudios de personalización vehicular

Plantilla lista para revender a negocios del sector (wrap, PPF, polarizado,
ceramic coating, diseño de cascos, detailing). Toda la información del negocio
está marcada con `[TOKENS]` entre corchetes: personalizar un cliente = copiar
la carpeta, reemplazar los tokens, cambiar color y logo, y publicar.

> El sitio original de B-Line Design **NO** está aquí. Esta carpeta es una copia
> genérica e independiente. B-Line queda intacto.

---

## Paso 1 — Copia la carpeta
Copia toda la carpeta `plantilla/` con un nombre nuevo, p. ej. `cliente-nuevo/`.

## Paso 2 — Reemplaza los datos del negocio (buscar y reemplazar)
Abre la carpeta en tu editor y haz **Buscar y reemplazar en todos los archivos**
para cada token. (En VS Code: `Ctrl/Cmd + Shift + H`.)

| Token | Qué es | Ejemplo |
|---|---|---|
| `[NOMBRE_NEGOCIO]` | Nombre del negocio | `WrapZone Medellín` |
| `[DOMINIO]` | Dominio sin `https://` | `wrapzone.co` |
| `[WHATSAPP]` | WhatsApp en formato internacional **sin** `+` ni espacios | `573001234567` |
| `[TELEFONO]` | Teléfono visible (como se muestra) | `+57 300 123 4567` |
| `[USUARIO_REDES]` | Usuario de Instagram/TikTok (sin `@`) | `wrapzone.co` |
| `[DIRECCION]` | Dirección de la calle | `Calle 10 #43-21` |
| `[DIRECCION_URL]` | Misma dirección para enlaces de mapa (espacios = `+`, `#` = `%23`) | `Calle+10+%2343-21` |
| `[CIUDAD]` | Ciudad | `Medellín` |
| `[REGION]` | Departamento | `Antioquia` |
| `[GEO_REGION]` | Código ISO región (Google) | `CO-ANT` |
| `[CODIGO_POSTAL]` | Código postal | `050021` |
| `[LAT]` | Latitud del local (Google Maps) | `6.2447` |
| `[LNG]` | Longitud del local (negativa en Colombia) | `-75.5736` |
| `[GOOGLE_ANALYTICS_ID]` | ID de Google Analytics 4 | `G-AB12CD34EF` |
| `[GOOGLE_SEARCH_CONSOLE]` | Código de verificación de Search Console | `abc123...` |
| `[GOOGLE_PLACE_ID]` | Place ID del negocio (para "dejar reseña") | `ChIJ...` |

> Para `[LAT]` / `[LNG]`: abre Google Maps, clic derecho sobre el local →
> aparecen las coordenadas. La longitud en Colombia siempre empieza con `-`.
>
> Si el cliente aún no tiene Analytics / Search Console / Place ID, puedes dejar
> esos tokens y completarlos después; el sitio funciona igual.

## Paso 3 — Color de marca
En `styles.css`, al inicio del bloque `:root`, edita **solo estos dos valores**:

```css
--accent: #ffffff;        /* color de marca en HEX */
--accent-rgb: 255,255,255; /* el MISMO color en R,G,B, sin # */
```

Con esto se tiñe automáticamente todo el sitio: el *glow* característico, el
subrayado del menú y los puntos de cada sección. Por defecto es blanco = look
original (blanco y negro). Ejemplos:

```css
/* Azul   */ --accent:#2e6bff;  --accent-rgb:46,107,255;
/* Naranja*/ --accent:#ff6a00;  --accent-rgb:255,106,0;
/* Verde  */ --accent:#1db954;  --accent-rgb:29,185,84;
```

Las fuentes (`--font-display`, `--font-body`) también están ahí si quieres
cambiarlas (recuerda actualizar el `<link>` de Google Fonts en cada `.html`).

## Paso 4 — Imágenes
Reemplaza dentro de `assets/` manteniendo los **mismos nombres de archivo**:
- `logo.png` — logo del cliente
- `hero-video.mp4` — video del hero (o reemplázalo por una imagen)
- `mustang.png`, `ducati.png`, `silverado.png`, `kawasaki.png`, `helmet.png`,
  `shop.png`, `shop-dark.png` — fotos del portafolio del cliente
- Crea/reemplaza `og-image.jpg` (imagen al compartir en redes)

## Paso 5 — Reseñas (IMPORTANTE)
La sección de reseñas viene **vacía con marcadores** (`[Nombre del cliente]`,
`[Reseña real del cliente]`, puntaje `[X.X]`, `[N]` reseñas).

- Rellénala **solo con reseñas reales** del cliente, **o**
- Elimina por completo la sección `<!-- GOOGLE REVIEWS -->` en `index.html`.

⚠️ **No publiques reseñas inventadas.** Mostrar reseñas falsas como datos
verificados de Google viola las políticas de Google y puede penalizar el sitio.

## Paso 6 — Publica
Es un sitio estático: súbelo a **GitHub Pages** o **Netlify** (gratis) y apunta
el dominio del cliente. No requiere servidor ni base de datos.

---

## Antes de entregar — checklist rápido
- [ ] Buscar `[` en toda la carpeta: no debe quedar ningún token sin reemplazar.
- [ ] WhatsApp, dirección y mapa abren los datos correctos del cliente.
- [ ] Color de marca aplicado (`--accent` / `--accent-rgb`).
- [ ] Logo y fotos reemplazados.
- [ ] Reseñas reales o sección eliminada.
- [ ] Revisar en celular y computador.
