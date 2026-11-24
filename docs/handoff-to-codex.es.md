# HANDOFF — Portada Upwork · Web Shopify de Arrive Aruba (diseño con código, por capas)

> Para Codex. Léelo entero antes de tocar nada. Fecha de corte: 2026-11-23.
> Idioma con Martín: **español** (también en los avances). Copy de la portada: **inglés** (público de Upwork).

---

## 1. Objetivo en una línea
Portada (miniatura) del ítem de portafolio de Upwork «web Shopify de Arrive Aruba» para un **fundador de marca de ropa** que quiere una web **a la medida, totalmente editable en Shopify, que venda**. Mensaje en 3 s: *For Shopify · Fully editable · Tailor-made*.

## 2. Reglas no negociables
- **Diseño con código** (HTML/CSS/SVG/canvas). **Prohibido generar imágenes con IA.** Solo assets reales del tema.
- **Se trabaja por capas, una aprobación de Martín por capa.** No avances a la siguiente capa sin su «Sí, aprobar capa N».
- En cada iteración: editar → exportar PNG → **mirar el PNG tú mismo** (corregir lo evidente antes de enseñarlo) → enseñarlo → esperar respuesta.
- **No cambies lo ya aprobado** salvo que él lo pida. Si un cambio afecta a una capa aprobada, dilo.
- Tipografía de la portada: **solo Geologica** (PortBlair y ArriveLegacy se rechazaron para los textos de portada; dentro del móvil sí aparecen porque son las del tema real).
- Sin puntos finales en los textos.
- No inventar logos. El de Shopify es el SVG que dio Martín (`01_brand/logos/shopify-bag.svg`).

## 3. Lienzo y retícula
- **1600 × 1200 px (4:3)**, exportado a **2x → 3200 × 2400 PNG**. Debe leerse a 400 px de ancho.
- Márgenes seguros: 64 px. Móvil centrado en x 530–1070.
- Zonas libres (ver `GUIDE=1`): columna izquierda x 64–510; arriba-derecha encima de la tarjeta de ventas; abajo-derecha la hoja arrastrada.

## 4. Estructura de carpetas
```
web-cover/
  HANDOFF_CODEX.md          ← este archivo
  00_brief/BRIEF.md          ← brief + registro de aprobaciones (añade una línea al aprobar cada capa)
  01_brand/tokens.css        ← colores + @font-face + variables de lienzo
  01_brand/fonts/            ← woff2 del tema (Geologica, ArriveLegacy, PortBlair)
  01_brand/logos/            ← logos Arrive (negativo = blanco), Morfe Maison, shopify-bag.svg
  02_source/theme-css/       ← critical.css + theme.css copiados del tema (solo lectura)
  02_source/media/           ← poster hero, fotos 1:1 de producto, aruba-basics-section@3x.png
  03_layers/cover.html       ← LA portada. Cada capa = <section class="layer lNN" data-layer="N">
  03_layers/layers/LNN-*.css ← un CSS por capa (se acumulan overrides con comentario de versión)
  03_layers/sections/hero-mobile.html ← réplica estática del home móvil con el CSS real del tema
  04_exports/                ← PNGs. Los aprobados llevan sufijo _APROBADO
  tools/render.mjs           ← exportador (Chrome headless)
```
Repo del tema (fuente de verdad, **no tocar**): `~/gh-repos/arrive-aruba-shopify-theme` (rama `main`).

## 5. Cómo renderizar
```bash
cd ~/work/arrive-aruba/PORTFOLIO/web-cover
node tools/render.mjs <upto> G <salida.png> [scale]     # upto = última capa visible; G = fondo aprobado
GUIDE=1 node tools/render.mjs 5 G prueba_guia.png 1      # con la guía de composición (no va al final)
Q=cursor=hand node tools/render.mjs 5 G prueba.png       # parámetros extra en la URL
```
Parámetros de `cover.html`: `upto`, `bg` (A–G; aprobado **G**), `guide=1`, `cursor=arrow|hand` (por defecto `arrow` = cursor de vóxeles).
Para mirar el PNG: ábrelo (pesa 3200×2400). No hace falta Playwright; usa Chrome del sistema.

## 6. Marca (del repo, verificado)
| Token | Hex | Uso |
|---|---|---|
| sapphire | #386395 | UI |
| sapphire-dark | #23405E | sombras |
| navy | #2C4F78 | |
| lake | #5F8BB8 | |
| cream | #F0F0E5 | tarjetas / web |
| orange | #F5A169 | acento (UPF, franja del ticker) |
| green | #92AF88 | fondo |
| ink | #17202A | texto |
Azul del editor de Shopify (contornos de sección): `#2C6ECB`.

## 7. Estado de las capas

| # | Capa | Estado | Export |
|---|---|---|---|
| 1 | Fondo degradado | **APROBADA** — G2 «Aurora con foco» (`data-bg=G`) | `L01-fondo_APROBADO.png` |
| 2 | Textos | **APROBADA** | `L02-textos_APROBADO.png` |
| 3 | Móvil con la web | **APROBADA** | `L03-movil_APROBADO.png` |
| 4 | Sección arrastrada | **APROBADA** | `L04-arrastre_APROBADO.png` |
| 5 | Puntero | **APROBADA** — cursor de vóxeles 3D con glow | `L05-puntero_APROBADO.png` |
| 6 | Ficha de producto (UPF 50+) | **APROBADA** — Liquid Glass con contenido curvado | `L06-producto_APROBADO.png` |
| 7 | Tarjeta de ventas | **APROBADA** | `L07-ventas_APROBADO.png` |
| 8 | Logo de Shopify | **resuelto dentro de la capa 2** (bolsa junto a «For Shopify») | — |
| 9 | Logo Morfe Maison | En revisión | `L09-margenes_laterales_v2.png` |
| — | Final | `FINAL_1600x1200@2x.png` + `FINAL_thumb_400.png` | — |

### Detalle de lo aprobado (para no romperlo)
**L01 — fondo (`L01-fondo.css`, reglas `[data-bg=G]`)**
- Manchas orgánicas verde/naranja muy difuminadas (blur 130 px), parte superior oscura orgánica, foco durazno sutil.
- El foco se mueve con `--fx/--fy`. **L05 lo movió a la esquina del puntero:** `[data-bg=G]{--fx:1330px;--fy:1020px}` (en `L05-puntero.css`).
- Rechazados: A/B/C, B2 (sol), B3 (haz), D/E sin foco, F (foco demasiado evidente).

**L02 — textos (`L02-textos.css`)**
- Arriba-izq: «For Shopify» (60 px, 600, blanco) + bolsa de Shopify blanca inclinada **92 px** (su caja mide 60 px para no empujar líneas). Debajo «Fully editable» (54 px, opacidad .82) y «Tailor-made» (54 px, .62), separados ~15 %.
- Abajo-izq: «Custom-coded theme / built for apparel brands» (34 px, efecto que se desvanece).
- Arriba-der: metadatos Client · Platform y logo Arrive Aruba blanco (84 px).

**L03 — móvil (`L03-movil.css` + `sections/hero-mobile.html`)**
- Pantalla **sin marco** (esquinas 64 px) con isla, hora **11:11**, señal, wifi y batería en una franja negra de 72 px. La web empieza **debajo** de la barra.
- La web va en un `<iframe>` de **390 px** (viewport real de iPhone) escalado ×1.3846.
- URL actual del iframe: `hero-mobile.html?scroll=85&hero=660&headertop=0`
  - `scroll`: desplaza solo `<main>` (el header del tema queda fijo arriba).
  - `hero`: alto del hero = 100svh de Safari con barras (660).
  - `headertop`: posición del header del tema.
  - `only=basics`: muestra solo la sección Aruba Basics (lo usa L04).
- Se ve: header completo, hero entero, franja naranja y asoman «Essentials / Aruba Basics».
- Botones redondeados y «Tap for sound» = código de `main` (PR #3 y #4). La tienda en vivo podría ir por detrás.

**L04 — hoja arrastrada (`L04-arrastre.css` + `<script>` L04 al final de `cover.html`)**
- La sección real Aruba Basics (captura 3x: `02_source/media/aruba-basics-section@3x.png`) se dibuja en **canvas por franjas de 1 px con perspectiva**. No uses franjas CSS 3D (dejan costuras).
- Parámetros en el script: `SY0=135, SY1=1365` (recorte vertical: empieza justo antes de «Essentials»), `H` calculado (494), `S0=120` (tramo plano), `TMAX=64°` (curva hacia afuera), `ENDU=0.70`, `TEND=30°` (remate final hacia abajo), `LIFT=0.42`, `YC=560`.
- Canvas 780 × 1000 css (×3), envuelto en `.paper-wrap` con `rotateZ(-6deg)`, `top:880px`, `margin-top:-560px`. Si la hoja crece, **agranda el canvas** (antes se recortaba la esquina).
- Contorno azul del editor + etiqueta «Featured collection» + botón «+» (lo coloca el script sobre el borde superior). Hueco punteado azul vacío en el móvil (`.slot`).
- Rechazado: esquina doblada (quitar siempre), malla Bézier de la v4 («espantosa»), doble S, perspectiva global de la v7.

**L05 — puntero (`L05-puntero.css` + `#cursor` en `cover.html`) · APROBADA**
- Versión actual: **cursor clásico de píxeles en vóxeles 3D** (ref. de Martín): borde en bloques gris carbón, relleno blanco con rejilla, 14 capas de grosor, perspectiva, sombra. **Sin naranja** (él lo rechazó).
- Generado por Python (rejilla `G` de 12×20). Tamaño 154 × 244 (v5.3), punta en (1350, 974), sobre el borde derecho de la hoja.
- El CSS tiene overrides acumulados. Ojo: la regla vieja `.l05 .cursor.arrow svg` tiene más especificidad; las nuevas usan `.l05 .cursor.arrow .arrow3d …`. Si lo rehaces, limpia el archivo.
- La mano (`cursor=hand`) quedó como alternativa y no gustó.
- Lleva un **glow suave** (halo blanco cálido con `drop-shadow`, v5.2, pedido por Martín).

## 8. Lo que falta (siguiente trabajo)
1. **L06 — Ficha de producto (izquierda)** en la zona libre x 110–510, y 300–940 (debajo del titular y encima del tagline; respeta márgenes).
   - Réplica de la PDP del tema: `sections/product.liquid`, `snippets/product-badges.liquid` (badge «UPF 50+» con icono de sol), `snippets/product-spec.liquid`.
   - Foto: `02_source/media/arrive-aruba-performance-pique-polo-blue-front.jpg` (o Marsh Green). Precio del polo: **$85.00** (CSV de prueba del repo).
   - Perspectiva **hacia el centro** (lado izquierdo: el borde exterior más cerca). El **badge UPF 50+ sale del plano** (translateZ / sombra). Reutiliza la técnica de render real (iframe o captura 3x + canvas) para que sea la PDP real, no un dibujo.
2. **L07 — Tarjeta de ventas** (arriba-derecha, x ≈1100–1520, y ≈150–450, debajo de los metadatos).
   - Estilo de la referencia que dio Martín: «Good morning», Total sales / Orders / Sessions / Revenue y una curva de área.
   - **Cifras grandes aspiracionales** (las autorizó él). Ejemplo: Total sales $128,450 · +38 %, Orders 2,140, Sessions 41.2K.
   - Recréala en código (no pegues la imagen de referencia). Perspectiva hacia el centro.
3. **L09 — Morfe Maison**: `01_brand/logos/morfe-maison-icon-white.svg` + nombre en Geologica, pequeño, abajo-izquierda bajo el tagline (≈ y 1120), blanco 80 %.
4. **Final**: export `FINAL_1600x1200@2x.png` sin guía, más `FINAL_thumb_400.png`. Comprueba a 400 px que se lean: For Shopify, el móvil, la hoja con el puntero, el UPF y la cifra de ventas.
5. Opcional: ajustar `--fx/--fy` si cambian el puntero o la hoja.

## 9. Trampas técnicas ya resueltas (no las repitas)
- **Chrome headless no baja de ~500 px de ancho** de ventana. Para ver la web a 390 px usa **iframe de 390 px** (o una ventana de 390 con iframe dentro para capturas).
- **Orden de capas:** cada `.layer` lleva `isolation:isolate`. Sin eso, los `z-index` internos del móvil tapan las capas siguientes.
- **Rutas en CSS** son relativas al archivo CSS (`layers/` → `../../02_source/...`). Las del script del canvas son relativas a `cover.html` (`../02_source/...`).
- **Canvas:** si algo «se corta recto», casi seguro sale del canvas; agrándalo y reajusta `YC`, `margin-top` y la etiqueta.
- **Perfil de Chrome:** no uses `--user-data-dir` (se colgó). Usa el perfil por defecto con `--headless=new`.
- `sips -c` recorta centrado; para recortar desde la esquina, captura con la ventana del tamaño exacto.
- No hay Python PIL instalado. Usa `sips` o Chrome.

## 10. Cómo prefiere trabajar Martín
- Itera con capturas y anotaciones (líneas rojas). Pide cambios cortos («un 10 % más», «bájalo», «al revés»). **Si es ambiguo, pregunta o haz 2 variantes** («bájalo» a veces significa mover y a veces reducir).
- Quiere ver el resultado ya renderizado, no explicaciones largas.
- Sistemas, no parches: cuando un CSS acumula overrides, consolídalo.
- No hay git en `web-cover/` (no es repo). Si lo inicializas, los commits deben ir como `morfemartin`.
