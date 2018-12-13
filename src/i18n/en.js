import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  auth: {
    users: 'Users',
    sign_up: 'Sign up',
    confirm_password: 'Confirm password',
    change_password: 'Change password'
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
      created_for_me: 'Created for me',
      all: 'All',
      assigned_to_me: 'Assigned to me'
    }
  },
  
  fields_name: {
    title: 'Title',
    description: 'Description',
    creation_date: 'Creation date',
    modified_date: 'Modified date',
    category: 'Category',
    keywords: 'Keywords',
    related_files: 'Arquivos Relacionados',
    deleted: 'Deleted',
    evaluated: 'Evaluated',
    file_name: 'File name',
    status: 'status',
    email_validated: 'E-mail validated',
    last_activity: 'Last activity',
    validated: 'Validated'
  },

  tabs_name: {
    content: 'Content',
    summary: 'Summary',
    configuration: '  Configuration',
    language: 'Language'
  },

  user: {
    name: 'Name',
    role: 'Role',
    roles: {
      expert: 'Expert',
      creator: 'Creator'
    }
  },

  recover_password: {
    title_modal: 'Recover password',
    message_modal: 'Enter the email address associated with your account, we will send an email so you can change your password.',
    forgot_your_password: '¿Forgot your password?'
  },

  action: {
    send: 'Send'
  }
};
