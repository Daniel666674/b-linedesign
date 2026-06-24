# Crear un cliente nuevo desde la plantilla

Copia el bloque de abajo, rellena los datos del negocio y pégamelo en el chat.
Yo me encargo del resto: crear la carpeta, reemplazar tokens, aplicar el color,
dejar las reseñas vacías, validar, y abrir un PR en borrador.

## Lo que necesitas del negocio (intake)

**Obligatorio para publicar:**
- Nombre del negocio
- WhatsApp (con indicativo país, ej. +57 300 123 4567)
- Dirección + ciudad + departamento
- Usuario de Instagram/TikTok
- Color de marca (HEX, ej. #2e6bff) — o dime “déjalo en blanco/negro original”

**Recomendado (mejora SEO/mapa, se puede agregar después):**
- Dominio final (ej. wrapzone.co)
- Coordenadas del local (lat, lng de Google Maps) — o pásame el link de Maps y yo las saco
- ID de Google Analytics (G-XXXX)
- Código de Google Search Console
- Place ID de Google (para el botón “deja tu reseña”)

**Imágenes (envíamelas o dime que use placeholders por ahora):**
- Logo (PNG, fondo transparente)
- Foto/video del hero
- 5–8 fotos de trabajos para el portafolio
- Reseñas reales (nombre + texto) — si no hay, dejo la sección vacía o la quito

> Lo que NO necesitas calcular: yo derivo `--accent-rgb` desde el HEX y la
> versión de la dirección para el mapa automáticamente.

---

## Prompt para pegarme (rellena y envía)

```
Crea un cliente nuevo desde plantilla/. Carpeta: clientes/<slug-del-negocio>/

DATOS DEL NEGOCIO
- Nombre:            <NOMBRE>
- Dominio:           <dominio.co | "pendiente">
- WhatsApp:          <+57 ...>            (formato visible)
- Instagram/TikTok:  <usuario sin @>
- Dirección:         <calle #..>
- Ciudad:            <ciudad>
- Departamento:      <depto>
- Coordenadas:       <lat, lng | "saca de este link: <url Maps>" | "pendiente">
- Color de marca:    <#hex | "original B&N">
- Google Analytics:  <G-XXXX | "pendiente">
- Search Console:    <código | "pendiente">
- Google Place ID:   <ID | "pendiente">

RESEÑAS
- <pega aquí reseñas reales: "Nombre — texto" una por línea, o escribe
  "sin reseñas todavía" para dejar la sección vacía / quitarla>

IMÁGENES
- <"las envío en seguida" | "usa placeholders por ahora">

Al terminar: valida que no queden tokens [ ] sin reemplazar, revisa que el
HTML parsee, haz commit en una rama nueva y abre un PR en borrador.
```

---

## Qué haré yo con eso (para tu referencia)

1. `cp -r plantilla/ clientes/<slug>/`
2. Buscar-y-reemplazar cada token con los datos enviados; derivo
   `[DIRECCION_URL]`, `[LAT]`/`[LNG]` (desde el link de Maps si hace falta) y
   `[GEO_REGION]` automáticamente.
3. Pongo `--accent` y calculo `--accent-rgb` desde el HEX en `styles.css`.
4. Reseñas: relleno las reales o dejo/quito la sección (nunca invento reseñas).
5. Imágenes: si las mandas, las pongo en `assets/`; si no, dejo los placeholders.
6. Validación: `grep` de tokens `[ ]` restantes + parseo HTML de las 6 páginas.
7. **Vista previa**: renderizo capturas (hero + secciones clave) para que
   revises el resultado antes de publicar.
8. Commit en rama nueva + PR en borrador.

Campos marcados como "pendiente" quedan como token para completar luego; el
sitio funciona igual mientras tanto.
