# ALLEN KS — THE SOUND

Rediseño local sobre alandiaz145/allenks-web-v2, rama redesign/the-sound-review-20261107. Preparada para PR en borrador y vista previa aislada; sin merge ni despliegue de producción.

## Ver la web

No requiere instalar dependencias para esta versión estática.

1. Desde la raíz del proyecto: `node scripts/build-static.mjs`.
2. Servir `out/`: `python -m http.server 4173 --directory out`.
3. Abrir http://localhost:4173. No abrir el HTML con file://: las rutas son absolutas.

El build regenera inicio, música, proyectos y tienda. Conserva el contrato out/ usado por GitHub Pages. `app/` es código anterior que no participa del build estático actual. No usar next dev para revisar esta entrega.

## Actualizar contenido

Editar `content/public.json` y ejecutar el build:

- `releases`: selección, no el catálogo completo. El primer elemento es el destacado y necesita un ID público de YouTube en `video`. Usar title, type (Original o Remix), subtitle opcional, url pública. No incluir tokens ni música privada. Los filtros usan esos dos tipos.
- `sets`: título real, descripción, ID de YouTube y segundo de inicio opcional. Incluye un set y dos vlogs de shows, identificados como tales.
- `content`: el primer video es el walkthrough destacado. Los demás contenidos se descubren en el canal oficial.
- `socials`: enlaces públicos. Instagram usa @allenksmusic según tu pedido, aunque el repositorio previo usaba @dubstepwacho.
- `shows`: vacío hasta confirmar próximos shows. Para agregar uno: {"date":"2027-01-01T23:00:00-03:00","confirmed":true,"venue":"Lugar confirmado","city":"Ciudad","url":"https://enlace-oficial"}. Ejemplo de esquema, no evento real. Solo se muestran fechas futuras confirmadas. El navegador también retira eventos vencidos al abrir la página. Reconstruir después de editar los datos.
- `projects`: tarjetas con título, descripción, URL y etiqueta del enlace.
- Tienda: editar `content/store.html`. Se conservaron Mercado Pago y Droploud del sitio anterior. No se verificó una transacción ni la entrega del pack. No se publicaron precios o stock supuestos.

Diseño: `preview-build/assets/the-sound.css`. Interacciones: `preview-build/assets/the-sound.js`. Plantillas: `scripts/render-public.mjs`.

## Auditoría y decisiones

El build anterior copiaba preview-build y terminaba antes de los generadores antiguos. La web acumulaba CSS locales y remotos de distintas versiones, fechas vencidas, cifras estáticas y videos con carga por intersección. El carousel y los embeds podían dejar superficies negras. La captura por sí sola no demuestra si cada embed estaba bloqueado por el proveedor o fallaba por código; se retiró esa dependencia del diseño inicial.

Se conservan logo, foto del estudio y foto en vivo originales sin retoques de identidad. Se conserva la ruta /musica/, /proyectos/ y /tienda/, más anclas principales y anclas del catálogo. El diseño usa negro, celeste y blanco cálido; amarillo y violeta puntuales. Sin nuevas librerías, servicios, cuentas o bases de datos. Sin datos de Allen KS Control.

Se eliminaron del recorrido las cifras no verificadas, las fechas antiguas, los iframes automáticos y las portadas de relleno de la tienda. No se publica Arkham 22/11/2026. No se declara un estreno como último lanzamiento sin confirmación: BUST IT aparece como selección en rotación. El resto del catálogo se accede en SoundCloud.

Las miniaturas son las de los videos originales, no nuevas portadas inventadas. Para una futura selección de portadas discográficas independientes hacen falta los archivos originales asociados a cada release.

Los títulos de YouTube fueron comprobados mediante oEmbed: BUST IT (VISUALS), IKI B2B ALLEN KS / Otra Noche, Vlog #3, Vlog #2 y Euronymous Walkthrough #1. Se corrigió la clasificación heredada de vlogs como sets y de walkthrough como Open FLP. No se promete una descarga de FLP no verificada.

## Verificación y límites

Build estático y comprobación sintáctica de JS realizados con Node. npm no está disponible en el PATH de esta sesión; no se necesitó instalar dependencias. El test previo tests/rendered-html.test.mjs exige un Worker y metadata temporal de desarrollo; no corresponde al build estático actual y no se presenta como aprobado.

Navegador: portada desktop y móvil, ausencia de desborde horizontal móvil, menú móvil con cierre al navegar, filtro de remixes, carga del reproductor YouTube sin autoplay, imágenes y navegación por anclas. Se confirmó el iframe real de BUST IT con controles de YouTube; no se evaluó calidad sonora ni reproducción completa de cada video. Los enlaces externos conservados no garantizan disponibilidad futura, stock, acceso regional o checkout completado.

SEO: canonical por ruta, title, description, Open Graph y tarjeta social. Accesibilidad: enlace de salto, jerarquía de títulos, controles por teclado, foco visible, estados de filtros y soporte de movimiento reducido. Imágenes con dimensiones reservadas y carga diferida; los videos se descargan solo al pedirlos y tienen enlace externo alternativo.

No publicar automáticamente. Revisar los datos comerciales del pack, identidad de cuentas y selección musical antes de integrar a main.

Se detectó que store-merch.webp no es una imagen válida. Se retiró del diseño y se conservó la consulta de merch sin imagen de reemplazo.

## Revisión online y cambios de entrega

La vista previa usa raw.githack, el servicio CDN ya usado por el repositorio. `node scripts/build-online-preview.mjs` genera cuatro páginas en `preview-online/` a partir de `out/`, con URLs de recursos y navegación vinculadas a la rama de revisión y noindex. No se cambia DNS, GitHub Pages ni el dominio principal. No es un despliegue de Cloudflare Pages; puede tener caché y limitaciones del CDN de desarrollo.

El antiguo project_id de Sites devuelve proyecto no encontrado en la conexión actual. Se conserva el manifiesto existente y no se crea ni despliega otro Site en su lugar.

Inventario del rediseño: cuatro HTML en preview-build; assets/the-sound.css y the-sound.js; content/public.json y store.html; scripts/render-public.mjs y build-static.mjs; esta guía. Preparación de revisión: scripts/build-online-preview.mjs, cuatro HTML en preview-online, tests/static-site.test.mjs y .github/workflows/verify-the-sound.yml. package.json elimina prebuild heredado (retocaba copias antiguas y no interviene en el rediseño) y agrega accesos a las pruebas y preparación de preview. Sin nuevas dependencias ni cambios en package-lock.

La verificación estática independiente usa Node 22, sin instalar dependencias y sin permisos de despliegue. El workflow de producción existente queda intacto. Se comprueban rutas, anclas, recursos locales, ausencia de iframes iniciales, ausencia de tokens privados, actualización del título destacado, exclusión de fechas pasadas/no confirmadas y aislamiento de URLs de preview.
