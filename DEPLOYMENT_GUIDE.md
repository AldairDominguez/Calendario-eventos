# 🚀 Guía de Despliegue - GitHub + Netlify

Esta guía te llevará paso a paso para subir tu proyecto a GitHub y desplegarlo en Netlify.

## 📋 Prerrequisitos

- [ ] Cuenta de GitHub ([crear cuenta](https://github.com/signup))
- [ ] Cuenta de Netlify ([crear cuenta](https://app.netlify.com/signup))
- [ ] Git instalado en tu computadora

## 🔧 Paso 1: Inicializar Git y Subir a GitHub

### 1.1 Inicializar repositorio Git local

```bash
# Navega a tu proyecto (si no estás ahí)
cd "d:\Proyectos Aldair code\Calendario-eventos"

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: Sistema de Gestión de Calendario con IA"
```

### 1.2 Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `calendario-eventos` (o el nombre que prefieras)
   - **Description**: "Sistema de Gestión de Calendario con IA integrado con Google Calendar y n8n"
   - **Visibility**: Público o Privado (tu elección)
   - **NO marques** "Initialize this repository with a README" (ya tienes uno)
5. Haz clic en **"Create repository"**

### 1.3 Conectar tu repositorio local con GitHub

Después de crear el repositorio, GitHub te mostrará comandos. Usa estos:

```bash
# Agrega el repositorio remoto (reemplaza TU-USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/calendario-eventos.git

# Renombra la rama principal a 'main' (si es necesario)
git branch -M main

# Sube tu código a GitHub
git push -u origin main
```

> 💡 **Nota**: GitHub te pedirá autenticación. Puedes usar:
> - **Personal Access Token** (recomendado)
> - **GitHub CLI**
> - **SSH Keys**

### 1.4 Verificar que se subió correctamente

Ve a `https://github.com/TU-USUARIO/calendario-eventos` y verifica que todos tus archivos estén ahí.

---

## 🌐 Paso 2: Desplegar en Netlify

### 2.1 Preparar el proyecto para producción

Antes de desplegar, asegúrate de que tu proyecto esté listo:

```bash
# Prueba que el build funcione correctamente
npm run build

# Verifica que se creó la carpeta 'dist'
# Debería contener los archivos optimizados
```

### 2.2 Crear archivo de configuración de Netlify

Ya está incluido en tu proyecto, pero verifica que exista `netlify.toml` con:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2.3 Desplegar desde GitHub

#### Opción A: Desde la interfaz web de Netlify (Recomendado)

1. Ve a [Netlify](https://app.netlify.com) e inicia sesión
2. Haz clic en **"Add new site"** → **"Import an existing project"**
3. Selecciona **"Deploy with GitHub"**
4. Autoriza a Netlify para acceder a tu cuenta de GitHub
5. Busca y selecciona tu repositorio `calendario-eventos`
6. Configura el build:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Haz clic en **"Show advanced"** para agregar variables de entorno:
   - `VITE_CHATBOT_WEBHOOK_URL`: Tu URL de webhook de n8n
   - `VITE_CHATBOT_JWT_SECRET`: Tu secreto JWT
8. Haz clic en **"Deploy site"**

#### Opción B: Usando Netlify CLI

```bash
# Instala Netlify CLI globalmente
npm install -g netlify-cli

# Inicia sesión en Netlify
netlify login

# Inicializa el proyecto
netlify init

# Despliega
netlify deploy --prod
```

### 2.4 Configurar variables de entorno en Netlify

Si no las agregaste en el paso anterior:

1. Ve a tu sitio en Netlify
2. Navega a **Site settings** → **Environment variables**
3. Haz clic en **"Add a variable"**
4. Agrega cada variable:
   - **Key**: `VITE_CHATBOT_WEBHOOK_URL`
   - **Value**: `https://n8n.aldairdominguez.tech/webhook/agente-calendario`
   - Haz clic en **"Create variable"**
5. Repite para `VITE_CHATBOT_JWT_SECRET`

### 2.5 Personalizar el dominio (Opcional)

1. En tu sitio de Netlify, ve a **Site settings** → **Domain management**
2. Haz clic en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio personalizado

---

## 🔄 Paso 3: Configurar Despliegue Continuo

¡Ya está configurado! Cada vez que hagas push a GitHub, Netlify desplegará automáticamente:

```bash
# Haz cambios en tu código
# ...

# Guarda los cambios
git add .
git commit -m "Descripción de los cambios"

# Sube a GitHub
git push origin main

# Netlify detectará el cambio y desplegará automáticamente
```

---

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

- [ ] El sitio carga correctamente
- [ ] El login funciona
- [ ] El chatbot responde (verifica que las variables de entorno estén correctas)
- [ ] El calendario de Google se muestra
- [ ] Los eventos se crean correctamente

---

## 🐛 Solución de Problemas

### Error: "Failed to load module"
- **Causa**: Rutas incorrectas en imports
- **Solución**: Verifica que todas las rutas sean relativas y correctas

### Error: "Environment variables not defined"
- **Causa**: Variables de entorno no configuradas en Netlify
- **Solución**: Ve a Site settings → Environment variables y agrégalas

### El chatbot no responde
- **Causa**: URL de webhook incorrecta o CORS
- **Solución**: 
  1. Verifica la URL en las variables de entorno
  2. Asegúrate de que n8n permita CORS desde tu dominio de Netlify

### Error 404 al recargar la página
- **Causa**: Falta configuración de redirects
- **Solución**: Asegúrate de tener el archivo `netlify.toml` con las redirects

---

## 📚 Recursos Adicionales

- [Documentación de Netlify](https://docs.netlify.com/)
- [Guía de Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🎉 ¡Listo!

Tu aplicación ahora está:
- ✅ Versionada en GitHub
- ✅ Desplegada en Netlify
- ✅ Con despliegue continuo automático

**URL de tu sitio**: Netlify te proporcionará una URL como `https://tu-sitio.netlify.app`

---

## 📝 Comandos de Referencia Rápida

```bash
# Ver estado de Git
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "mensaje"

# Subir a GitHub
git push origin main

# Ver logs
git log --oneline

# Ver ramas
git branch

# Crear nueva rama
git checkout -b nombre-rama
```

---

¿Necesitas ayuda? Contacta a través de:
- Email: aldair30d@gmail.com
- GitHub: [@aldairdominguez](https://github.com/aldairdominguez)
