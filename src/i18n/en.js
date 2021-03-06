import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  auth: {
    users: 'Users',
    sign_up: 'Sign up',
    confirm_password: 'Confirm password',
    change_password: 'Change password',
  },

  lo: {
    search: 'Search learning object',
    all: 'Learning objects',
    advanced_filters: 'Advanced filters',
    go_to: 'Go to learning objects',

    filters: {
      pending: 'Pending',
      evaluated: 'Evaluated',
      accepted: 'Accepted',
      rejected: 'Rejected',
      deleted: 'Deleted',
      created_for_me: 'Created for me',
      all: 'All',
      assigned_to_me: 'Assigned to me',
    },
  },

  fields_name: {
    title: 'Title',
    description: 'Description',
    creation_date: 'Creation date',
    modified_date: 'Modified date',
    collection: 'Collection',
    keywords: 'Keywords',
    related_files: 'Arquivos Relacionados',
    deleted: 'Deleted',
    evaluated: 'Evaluated',
    file_name: 'File name',
    status: 'status',
    email_validated: 'E-mail validated',
    last_activity: 'Last activity',
    validated: 'Validated',
  },

  tabs_name: {
    content: 'Content',
    summary: 'Summary',
    configuration: '  Configuration',
    language: 'Language',
  },

  user: {
    name: 'Name',
    role: 'Role',
    roles: {
      expert: 'Expert',
      creator: 'Creator',
    },
  },

  recover_password: {
    title_modal: 'Recover password',
    message_modal:
      'Enter the email address associated with your account, we will send an email so you can change your password.',
    forgot_your_password: '¿Forgot your password?',
  },

  get_account_validation: {
    title_modal: 'Activate your account',
    message_modal: "Enter the email address associated with your account, we'll send an email so you can activate it.",
  },
  action: {
    send: 'Send',
    resend: 'Resend',
  },

  signUp: {
    welcome: 'Your account has been created, please check your email.',
    userExists: 'The email has already been registered.',
  },

  errorMessages: {
    email: 'Email is not valid.',
    passwordLen: 'La contraseña debe contener al menos 8 carácteres.',
    required: 'This field is required',
    passwordConfirm: 'Passwords do not match',
  },
  collections: {
    name: 'Name collection',
    subcollections: 'Subcollections',
    name_sub_collection: 'Name subcollection',
    collections: 'Collections',
    lo_quantity: 'LOs quantity',
    sc_quantity: 'Sub collections quantity',
    add_sub_collection: 'Add subcollection',
    delete_sub_collection: 'Remove subcollection',
    create_collection: 'Create collection'
  }
};
