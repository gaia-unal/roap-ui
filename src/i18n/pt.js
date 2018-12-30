import portugueseMessages from 'ra-language-portuguese';

export default {
  ...portugueseMessages,
  auth: {
    users: 'Usuários',
    sign_up: 'Registrar',
    confirm_password: 'Confirme a Senha',
    change_password: 'Mudar senha',
  },

  lo: {
    search: 'Procurar por objeto de aprendizagem',
    all: 'Objetos de Aprendizagem',
    advanced_filters: 'Filtros Avançados',
    go_to: 'Ir para objectos de aprendizagem',
    filters: {
      pending: 'Pendente',
      evaluated: 'Avaliado',
      accepted: 'Aceite',
      rejected: 'Rejeitado',
      deleted: 'Eliminado',
      created_for_me: 'Criado por mim',
      all: 'Todos',
      assigned_to_me: 'Atribuído a mim',
    },
  },

  fields_name: {
    title: 'Título',
    description: 'Descrição',
    creation_date: 'Data de criação',
    modified_date: 'Data da modificação',
    category: 'Categoria',
    keywords: 'Palavras-chave',
    deleted: 'Eliminado',
    evaluated: 'Avaliado',
    file_name: 'Nome do arquivo',
    status: 'Estado',
    email_validated: 'E-mail validado',
    last_activity: 'Última atividade',
    validated: 'Validado',
  },

  tabs_name: {
    content: 'Conteúdo',
    summary: 'Sumário',
    configuration: 'Configuração',
    language: 'Língua',
  },

  user: {
    name: 'Nome próprio',
    role: 'Função',
    roles: {
      expert: 'Especialista',
      creator: 'Criador',
    },
  },

  recover_password: {
    title_modal: 'Recupere sua senha',
    message_modal:
      'Digite o endereço de e-mail associado à sua conta, nós enviaremos um e-mail para que você possa alterar sua senha.',
    forgot_your_password: '¿Esqueceu sua senha?',
  },

  action: {
    send: 'Enviar',
    resend: 'Reenviar',
  },

  signUp: {
    welcome: 'A sua conta foi criada, por favor verifique o seu e-mail.',
    userExists: 'O e-mail já foi registrado.',
  },

  errorMessages: {
    email: 'Email inválido.',
    passwordLen: 'La contraseña debe contener al menos 8 carácteres.',
    required: 'Este campo é obrigatório',
    passwordConfirm: 'As senhas não coincidem',
  },
};
