# 🖥️ Version Control Website — Frontend
 
Aplicación web construida con **Next.js + TypeScript** que consume la API de temas de versionamiento y DevOps. Incluye soporte para temas claro/oscuro, carga de datos con SWR y despliegue automatizado en Azure VM con Docker.
 
---
 
## 📁 Estructura de componentes
 
```
components/
├── Header.tsx              # Barra superior con título y badges de tecnología
├── ThemeProvider.tsx       # Proveedor de temas (claro/oscuro) con next-themes
├── TopicCard.tsx           # Tarjeta individual de cada tema
├── TopicsGrid.tsx          # Grid que renderiza todas las tarjetas
└── TopicsContainer.tsx     # Contenedor principal con lógica de fetching (SWR)
```
 
---
 
## 🧩 Componentes
 
### `Header`
Barra de navegación superior con el título de la app y badges que indican las tecnologías principales (Git, DevOps). Usa íconos de `lucide-react` y estilos con backdrop blur.
 
### `ThemeProvider`
Wrapper sobre `next-themes` que habilita el cambio entre tema claro y oscuro en toda la aplicación.
 
### `TopicCard`
Tarjeta que muestra un tema individual. Asigna automáticamente un ícono según el contenido del título:
 
| Palabra clave en el título | Ícono |
|----------------------------|-------|
| git, version | `GitBranch` |
| docker, contenedor | `Box` |
| ci/cd, pipeline | `Workflow` |
| kubernetes | `Server` |
| cualquier otro | `Code` |
 
Incluye efecto hover con gradiente, número de ítem en formato `#01`, descripción y enlace a documentación externa.
 
### `TopicsContainer`
Componente principal que maneja toda la lógica de datos:
 
- Consume la API con **SWR** (`useSWR`)
- Muestra un **spinner** mientras carga
- Muestra un **mensaje de error** con botón de reintento si falla la conexión
- Muestra un mensaje si no hay temas disponibles
- Incluye botón de **actualización manual**
---
 
## 🔌 Conexión con la API
 
```ts
const API_URL = "http://68.220.147.196"
```
 
El fetcher lanza un error si la respuesta no es `ok`, lo que permite a SWR manejar el estado de error correctamente.
 
**Configuración de SWR:**
- `revalidateOnFocus: false` — no recarga al volver a la pestaña
- `dedupingInterval: 60000` — evita peticiones duplicadas por 60 segundos
---
 
## ▶️ Correr localmente
 
```bash
# Instalar dependencias
npm install
 
# Iniciar servidor de desarrollo
npm run dev
```
 
La app queda disponible en: `http://localhost`
 
---
 
## 🔁 Pipeline CI/CD
 
El archivo `.github/workflows/ci-cd.yml` define el pipeline de producción que se activa al crear un tag `v*`.
 
```
git tag v1.0.0 && git push --tags
        │
        ▼
  [build-and-push]
  ├── Login en DockerHub
  ├── docker build → shaggymission/version-control-website:v1.0.0
  └── docker push → DockerHub
        │
        ▼
  [deploy-prod] → Azure VM (SSH)
  ├── Verificar/instalar Docker en la VM
  ├── docker pull (descarga la nueva imagen)
  ├── docker stop + docker rm (detiene el contenedor anterior)
  └── docker run -d -p 80:3000 (inicia el nuevo contenedor como "frontend")
```
 
> A diferencia del pipeline del backend, este no tiene etapa de tests ni SonarQube. Solo build, push y deploy.
 
---
 
## 🐳 Docker
 
La imagen se publica en DockerHub con el tag de la versión:
 
```
shaggymission/version-control-website:v1.0.0
```
 
El contenedor se llama `frontend` y mapea el puerto `80` del host al `3000` de la app.
 
Para correr la imagen manualmente:
 
```bash
docker pull shaggymission/version-control-website:v1.0.0
docker run -d --name frontend -p 80:3000 shaggymission/version-control-website:v1.0.0
```
 
---
 
## 🔐 Secrets de GitHub Actions requeridos
 
| Secret | Uso |
|--------|-----|
| `DOCKER_USERNAME` | Login en DockerHub |
| `DOCKERHUB_TOKEN` | Token de acceso a DockerHub |
| `AZURE_VM_IP` | IP pública de la VM en Azure |
| `AZURE_VM_USER` | Usuario SSH de la VM |
| `AZURE_VM_SSH_KEY` | Clave privada SSH para acceder a la VM |
 
---
 
## 🛠️ Tecnologías usadas
 
- **Next.js + TypeScript** — Framework frontend
- **SWR** — Fetching y caché de datos
- **next-themes** — Soporte para tema claro/oscuro
- **lucide-react** — Íconos
- **shadcn/ui** — Componentes de UI (Card, Button, Spinner)
- **Tailwind CSS** — Estilos
- **Docker + DockerHub** — Empaquetado de la aplicación
- **Azure VM** — Servidor de producción
- **GitHub Actions** — CI/CD