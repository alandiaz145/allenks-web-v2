# ALLEN KS — Estado maestro de la web
Actualizado: 13 de noviembre de 2026. Este archivo permite continuar el proyecto entre chats sin repetir decisiones ni reemplazar el diseño aprobado.

## Fuentes de verdad
- Sitio oficial: https://allenks.com.ar/
- Repositorio de producción: https://github.com/alandiaz145/allenks-web-v2 (rama main).
- Código de la versión iridiscente aprobada: directorio `preview-build/` dentro del repositorio. NO volver a la versión blanca ni a las maquetas iniciales.
- Site de referencia: https://chatgpt.com/sites/appgprj_6af255f8c348819182e3affc783dca01/settings?account_id=personal&sharing=1
- Cloudflare R2: bucket `allenks-music`, prefijos `audio/` y `covers/`. Worker `allenks-music-media` en `allenbeatsadb.workers.dev`.
- ALLEN KS Control: https://alanks-control.files-mentioned-by-the-user-panel.workers.dev/login . Correo de acceso compartido anteriormente. No almacenar contraseñas en repositorio ni documentación.
- Catálogo público sincronizado desde R2; última observación: 53 MP3 y 35 portadas (número variable).
- No tocar DNS ni sobrescribir el diseño iridiscente.

## Decisiones musicales
- Cada MP3 nuevo en R2 genera automáticamente tarjeta y página individual. Se intenta normalizar el nombre, preservando la fuente en el catálogo.
- VIP, edits, remixes propios, colaboraciones y remix contests son versiones diferenciadas.
- Reproducción disponible para inventario conectado; descarga gratuita de terceros solo con permisos revisados. Skrillex y Virtual Riot NO se liberan para descarga.
- Remixes hechos por otras personas de canciones de Allen KS deben tener categoría diferenciada. Futura sección para ganadores/participantes: GO DOWN (NeoKrono Remix), segundo puesto, y GO DOWN (EIGHTFOLD REMIX), primer puesto.
- Portadas: `neokrono.png` corresponde a GO DOWN (NeoKrono Remix); `ChatGPT Image 12 sept...` corresponde a WAY OF CHAOS VIP (revisar conversión y nombres).
- Revisar y comprimir portadas originales manteniendo calidad, sin modificar identidad ni fotos.
- SoundCloud y ALLEN KS Control son referencias para artista, créditos y discos, no publicar duplicados por prefijos.

## Diseño / UX aprobado
- Web iridiscente blanca con acentos ácido, cyan y violeta. Grilla 4 columnas por 2 filas y paginación, responsive.
- Audio debe seguir sonando entre navegación interna, nunca dos canciones simultáneas. Reproductor flotante con controles ±10 s; opción de devolverlo debajo de Lanzamientos (Inicio) o Catálogo Oficial (Música). Eliminar barra visual de progreso que se superponía.
- Música: Catálogo Oficial, Free Downloads, Remixes (con filtros TODOS / COLABORACIONES / MIS REMIXES / REMIX CONTEST) y Condiciones de uso. No duplicar Últimos Lanzamientos allí.
- Búsqueda por título / artista también en Remixes. BPM/género no inventados; completar con datos aprobados.
- Títulos largos cortos en tarjeta y héroe, completos en ficha junto a artwork.
- Event ticket de Otra Noche: QR a https://www.instagram.com/otranochefiesta/; conservar navegación a En vivo desde el resto de la entrada.
- Bookings sin limitar país; en móvil botón WhatsApp sin tapar la cara.
- Evitar textos internos técnicos públicos; correcciones siempre en rama y pruebas antes de integrar.

## Pendientes posteriores
1. Verificar visualmente el nuevo layout en anchos móvil, tablet y escritorio, especialmente portada, hero y reproductor. Confirmar Safari/iPhone real.
2. Optimización efectiva de imágenes R2 (WebP/AVIF tamaños y srcset cuando corresponda).
3. Completar metadatos BPM y género, créditos y clasificación de colaboraciones/remixes/contest; auditar los enlaces de descarga con artistas.
4. Incorporar fotos y recursos oficiales para Spartans Label, Otra Noche y Dubstep Academia en Proyectos.
5. Implementar categoría destacada para ganadores y participantes de remix contests (incluido NeoKrono).
6. Evaluar URLs limpias `/cancion/corruption` con rutas reales y redirecciones, sin romper `?tema=corruption`.
7. Resolver si se debe duplicar marca ALLEN KS en header y hero del escritorio; en móvil la preferencia es evitar repetición sin perder identidad.
8. Mantener un historial de cambios y pendientes con referencia al commit de GitHub en futuras conversaciones.

## Regla de continuidad
En cada nuevo chat: leer este documento y la versión actual de `main` antes de tocar producción. No asumir que un PR fusionado equivale a despliegue verificado. Mantener copia de seguridad/reversión, comprobar Actions y sitio real.

## Revisión responsive 13/11/2026 (nueva corrección)
- Usuario revisó la web en escritorio, tablet y móvil. Reportó overlay en inicio, banda negra al minimizar, falla al volver al modo flotante y CTA de Bookings tapando el rostro.
- Correcciones integradas en rama `fix/player-scroll-mobile-bookings-20261113`: reproductor oculto durante hero de Inicio hasta Lanzamientos (salvo audio ya activo), con elevación sobre el footer y ocultamiento al llegar al final; botón del reproductor vuelve al DOM raíz tras alternar inline/flotante; sin relleno artificial de footer; volumen 100 % inicial y slider solo escritorio; logotipo superior restaurado móvil; foto de hero situada debajo de botones y sticker corregido; CTA de Bookings anclado abajo de tarjeta para no tapar cara.
- Requisitos de prueba: scroll desde hero a Lanzamientos, toggle inline/flotante ida/vuelta repetido, navegar Inicio→Música→En vivo→Contacto con audio en curso, scroll hasta footer sin bloque negro; tamaños 375, 430, 768, 1024, 1440 px; iPhone real. No afirmar verificación visual si el navegador remoto no es accesible.
- Notas: evitar cambiar fotos / estética iridiscente o aumentar el contenido de Música sin autorización. La carga de archivos y las descargas deben seguir controles existentes.
