# Agenda navideña · LookMe Studio

Agenda web de reservas de LookMe Studio (cejas y pestañas), hecha por **Redyz · By Marypaz Cadavid**.

- **Clientas:** https://jcmarypaz-web.github.io/agenda-lookme-studio/
- **Panel de la secretaria:** https://jcmarypaz-web.github.io/agenda-lookme-studio/#panel-secretaria-lookme

## Cómo funciona

1. La clienta elige semana → artista → día → hora, acepta las políticas y envía su solicitud por WhatsApp (+57 301 292 7656).
2. La cita **solo se confirma por WhatsApp** después del abono.
3. La secretaria entra al panel con su correo y contraseña (Firebase Authentication) y toca los horarios para marcarlos como reservados. Se tachan al instante en la página de las clientas.

## Dónde se edita

Todo está en `index.html`:

- `TEMA DE MARCA` (CSS `:root`): colores y tipografías.
- `CONFIG DE LA CLIENTA` (script): WhatsApp, Instagram, catálogo, abono, artistas, semanas, horarios (`HORARIO`, `HORARIO_ARTISTA`, `HORAS_FIJAS`), políticas y textos.
- `FIREBASE_CONFIG`: proyecto `agenda-lookme-studio`. Las reglas de Firestore permiten leer a todos y escribir solo a usuarias con sesión iniciada. El registro libre está desactivado: las cuentas se crean en Firebase → Authentication → Usuarios.
