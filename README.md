# Agenda navideña · LookMe Studio

Agenda web de reservas de LookMe Studio (cejas y pestañas), hecha por **Redyz · By Marypaz Cadavid**.

- **Clientas:** https://jcmarypaz-web.github.io/agenda-lookme-studio/
- **Panel de la secretaria:** https://jcmarypaz-web.github.io/agenda-lookme-studio/panel.html

## Cómo funciona

1. La clienta elige semana → artista → día → hora, acepta las políticas y envía su solicitud por WhatsApp.
2. La cita **solo se confirma por WhatsApp** después del abono.
3. La secretaria entra a `panel.html` con su correo y contraseña (Firebase Authentication). El panel tiene:
   - **Agenda:** por día o por artista; registrar citas con datos de la clienta, bloquear o liberar horarios.
   - **Clientas:** CRM con ficha, teléfono, cumpleaños, notas e historial de visitas.
   - **Horarios:** calendario para habilitar días, cambiar horas por artista, marcar "próximamente" o cerrar.
   - **Artistas:** fotos, frase, orden y estado (activa, próximamente, oculta).
   - **Portada y ajustes:** textos, foto de portada, WhatsApp, Instagram, catálogo, abono, políticas y modo Navidad.

## Archivos

- `index.html` + `js/clientas.js`: página pública.
- `panel.html` + `js/panel.js`: panel de la secretaria.
- `js/datos.js`: conexión a Firebase (Firestore + Authentication).
- `js/semilla.js`: datos iniciales de LookMe (se cargan solos la primera vez que la secretaria entra con la base vacía).
- `js/firebase-config.js`: proyecto `agenda-lookme-studio`.
- `css/estilos.css` y `css/panel.css`: tema beige, café claro y dorado (Julius Sans One + Poppins).

## Seguridad (reglas de Firestore)

- Públicas (solo lectura): `config`, `artistas`, `dias`, `ocupados` (sin datos personales).
- Privadas: `citas` y `clientas`; solo usuarias con sesión iniciada.
- El registro libre está desactivado: las cuentas se crean en Firebase → Authentication → Usuarios.
