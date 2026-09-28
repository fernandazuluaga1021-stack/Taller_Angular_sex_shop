# INSTINTOS Sex Shop — Angular

Proyecto migrado desde el sitio HTML/CSS/JS original a Angular standalone.

## Ejecutar
1. Instala Node.js LTS.
2. Abre una terminal en esta carpeta.
3. Ejecuta `npm install`.
4. Ejecuta `npm start`.
5. Abre la dirección que indique Angular (normalmente http://localhost:4200).

## API
El servicio `src/app/services/pokeapi.service.ts` consume `https://pokeapi.co/api/v2/pokemon?limit=1` únicamente para comprobar la integración con una API REST externa. La interfaz comercial de INSTINTOS no muestra Pokémon porque no forman parte de la temática del proyecto.

## Mapa de navegación
Inicio → categorías (Lencería/Juguetería/Cosmetología) → carrito → pago → confirmación.
Inicio → Envíos.
Inicio → Mi cuenta/Login.
El buscador filtra todo el catálogo.
