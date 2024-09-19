Este proyecto es una API construida con NestJS, que proporciona endpoints para la gestión de usuarios, autenticación e interacción con la blockchain de Alephium y datos de mercado de criptomonedas. La API permite a los usuarios:

- Gestionar cuentas de usuario y sus criptomonedas favoritas.
- Recuperar información de mercado de criptomonedas.
- Autenticarse utilizando un mecanismo de nonce y firma.
- Interactuar con la blockchain de Alephium para obtener balances.

## Tabla de Contenidos

- Instalación
- Uso
      - Autenticación
      - Endpoints de la API
          - AuthController
          - UserController
          - IndexerAlephiumController
- Manejo de Errores
- Seguridad
- Dependencias
- Contribuciones
- Licencia

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

Clona el repositorio:

```bash
git clone <repository-url>
cd <repository-directory>
```

Instala las dependencias:

Asegúrate de tener Node.js y npm instalados.

```bash
npm install
```

Configura las variables de entorno:

Crea un archivo .env en el directorio raíz y añade las variables de entorno necesarias. Ejemplo:

```env
DATABASE_URI=mongodb://localhost:27017/alephium
JWT_SECRET=tu_clave_secreta_jwt
```

Ejecuta la aplicación:

```bash
npm run start
```

La API estará disponible en http://localhost:3000.

## Uso

### Autenticación

La API utiliza JWT para la autenticación. Para acceder a los endpoints protegidos, necesitas obtener un token utilizando los endpoints de autenticación proporcionados por el AuthController.

### Endpoints de la API

#### AuthController

Maneja la autenticación de usuarios.

Generar Nonce

- Endpoint: /auth/nonce
- Método: POST
- Descripción: Genera un nonce para que el usuario lo firme con su wallet.

- Cuerpo de la Solicitud:

```json
{
  "address": "dirección_de_tu_wallet"
}
```

- Respuesta:

```json
{
  "nonce": "cadena_de_nonce_aleatorio"
}
```

Obtener Credenciales

- Endpoint: /auth/credentials
- Método: POST
- Descripción: Valida el nonce firmado y devuelve las credenciales JWT.

- Cuerpo de la Solicitud:

```json
{
  "address": "dirección_de_tu_wallet",
  "signature": "nonce_firmado"
}
```

- Respuesta:

```json
{
  "accessToken": "token_jwt",
  "refreshToken": "token_de_actualización"
}
```

#### UserController

Gestiona operaciones relacionadas con el usuario. Todos los endpoints están protegidos y requieren autenticación JWT. Los endpoints exclusivos para administradores requieren privilegios de administrador.

Crear Usuario (Solo Administradores)

- Endpoint: /users
- Método: POST
- Descripción: Crea un nuevo usuario.

- Cuerpo de la Solicitud:

```json
{
  "address": "dirección_de_wallet",
  "roles": ["rol_de_usuario"]
}
```

- Respuesta: Devuelve el objeto del usuario creado.

Obtener Todos los Usuarios (Solo Administradores)

- Endpoint: /users
- Método: GET
- Descripción: Recupera todos los usuarios.

- Respuesta: Devuelve un array de objetos de usuarios.

Buscar Usuario por Dirección (Solo Administradores)

- Endpoint: /users/:id
- Método: GET
- Descripción: Recupera un usuario por su dirección.

- Respuesta: Devuelve el objeto del usuario.

Añadir Moneda Favorita

- Endpoint: /users/favorite-coin
- Método: POST
- Descripción: Añade una moneda a la lista de monedas favoritas del usuario.

- Cuerpo de la Solicitud:

```json
{
  "coin": "nombre_de_la_moneda"
}
```

- Respuesta:

```json
{
  "message": "Moneda añadida a favoritos"
}
```

Eliminar Moneda Favorita

- Endpoint: /users/favorite-coin
- Método: DELETE
- Descripción: Elimina una moneda de la lista de monedas favoritas del usuario.

- Cuerpo de la Solicitud:

```json
{
  "coin": "nombre_de_la_moneda"
}
```

- Respuesta:

```json
{
  "message": "Moneda eliminada de favoritos"
}
```

Obtener Monedas Favoritas

- Endpoint: /users/favorite-coins
- Método: GET
- Descripción: Recupera la lista de monedas favoritas del usuario.

- Respuesta:

```json
{
"favoriteCoins": ["moneda1", "moneda2", ...]
}
```

#### IndexerAlephiumController

Proporciona endpoints para interactuar con la blockchain de Alephium y recuperar datos de mercado de criptomonedas.

Obtener Mi Balance

- Endpoint: /indexer-alephium/my-balance
- Método: GET
- Descripción: Recupera el balance de la dirección de Alephium especificada.

- Parámetros de Consulta:

- address: La dirección de Alephium a consultar.

- Respuesta: Devuelve la información del balance.

Obtener Información de una Criptomoneda

- Endpoint: /indexer-alephium/get-crypto-info
- Método: GET
- Descripción: Recupera información de mercado de una criptomoneda específica.

- Parámetros de Consulta:

- coin: El nombre de la criptomoneda.

- Respuesta: Devuelve datos de mercado de la moneda especificada.

Obtener Información de Varias Criptomonedas

- Endpoint: /indexer-alephium/get-crypto-info-batch
- Método: POST
- Descripción: Recupera información de mercado para un conjunto de criptomonedas.

- Cuerpo de la Solicitud:

```json
{
"assets": ["moneda1", "moneda2", ...]
}
```

- Respuesta: Devuelve datos de mercado de las monedas especificadas.

Obtener Información de Monedas Populares

- Endpoint: /indexer-alephium/get-popular-coins-info
- Método: GET
- Descripción: Recupera información de mercado para un conjunto de monedas populares (e.g., Alephium, Bitcoin, Ethereum).

- Respuesta: Devuelve datos de mercado de monedas populares.

Obtener Información de Monedas Favoritas

- Endpoint: /indexer-alephium/favorite-coins-info
- Método: GET
- Descripción: Recupera información de mercado de las monedas favoritas del usuario.

- Respuesta: Devuelve datos de mercado de las monedas favoritas del usuario.

- Respuesta de Error: Si el usuario no tiene monedas favoritas:

```json
{
  "statusCode": 404,
  "message": "No tienes monedas favoritas",
  "error": "Not Found"
}
```

## Manejo de Errores

La API utiliza códigos de estado HTTP estándar para indicar el éxito o fracaso de una solicitud. Los errores se devuelven en el siguiente formato:

```json
{
  "statusCode": 400,
  "message": "Mensaje de error",
  "error": "Bad Request"
}
```

Códigos de error comunes incluyen:

- 400 Bad Request: La solicitud es inválida o faltan parámetros.
- 401 Unauthorized: La autenticación falló o no se proporcionó.
- 403 Forbidden: El usuario no tiene permiso para acceder al recurso.
- 404 Not Found: El recurso solicitado no existe.
- 500 Internal Server Error: Ocurrió un error en el servidor.

## Seguridad

- Autenticación JWT: Asegura tu API garantizando que los tokens JWT se generen y validen correctamente.
- Control de Acceso Basado en Roles (RBAC): Algunos endpoints requieren acceso de administrador, controlado mediante decoradores y guards personalizados (@AdminAccess, RolesGuard).
- Validación de Entrada: Utiliza DTOs y pipes de validación para asegurar que los datos entrantes sean válidos.
- Manejo de Errores: Maneja adecuadamente las excepciones para prevenir la filtración de información sensible.

## Dependencias

- NestJS: Framework para construir aplicaciones del lado del servidor eficientes y escalables en Node.js.
- Mongoose: Herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono.
- Passport JWT: Middleware para autenticación usando JWT.
- Axios: Cliente HTTP basado en promesas para realizar solicitudes API.
- Librerías Criptográficas: Para generar y verificar firmas criptográficas.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama: git checkout -b feature/tu-feature.
Realiza tus cambios y haz commit: git commit -am 'Agrega una nueva característica'.
Haz push a la rama: git push origin feature/tu-feature.
Envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
