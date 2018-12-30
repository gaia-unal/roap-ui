import spanishMessages from 'ra-language-spanish';

export default {
  ...spanishMessages,
  auth: {
    users: 'Usuarios',
    sign_up: 'Regístrate',
    confirm_password: 'Confirmar contraseña',
    change_password: 'Cambiar contraseña',
  },

  lo: {
    search: 'Buscar objeto de aprendizaje',
    all: 'Objetos de aprendizaje',
    advanced_filters: 'Filtros avanzados',
    go_to: 'Ir a objetos de aprendizaje',
    filters: {
      pending: 'Pendiente',
      evaluated: 'Evaluado',
      accepted: 'Aceptado',
      rejected: 'Rechazado',
      deleted: 'Eliminado',
      created_for_me: 'Creados por mi',
      all: 'Todos',
      assigned_to_me: 'Asignados a mi',
    },
  },

  fields_name: {
    title: 'Titulo',
    description: 'Descripción',
    creation_date: 'Fecha de creación',
    modified_date: 'Fecha de modificación',
    category: 'Categoría',
    keywords: 'Palabras clave',
    related_files: 'Archivos relacionados',
    deleted: 'Eliminado',
    evaluated: 'Evaluado',
    file_name: 'Nombre de archivo',
    status: 'Estado',
    email_validated: 'E-mail validado',
    last_activity: 'Última actividad',
    validated: 'Validado',
  },

  tabs_name: {
    content: 'Contenido',
    summary: 'Resumen',
    configuration: 'Configuración',
    language: 'Lenguaje',
  },

  user: {
    name: 'Nombre',
    role: 'Rol',
    roles: {
      expert: 'Experto',
      creator: 'Creador',
    },
  },

  recover_password: {
    title_modal: 'Recuperar su contraseña',
    message_modal:
      'Escriba la dirección del correo electrónico asociado a su cuenta, envíaremos un correo para que pueda cambiar su contraseña.',
    forgot_your_password: '¿Olvido su contraseña?',
  },

  action: {
    send: 'Enviar',
    resend: 'Reenviar',
  },

  signUp: {
    welcome: 'Su cuenta se ha creado, por favor revise su correo.',
    userExists: 'El correo electrónico ya ha sido registrado.',
  },

  errorMessages: {
    email: 'Email inválido.',
    passwordLen: 'La contraseña debe contener al menos 8 carácteres.',
    required: 'Campo requerido.',
    passwordConfirm: 'Las contraseñas no coinciden',
  },
};
