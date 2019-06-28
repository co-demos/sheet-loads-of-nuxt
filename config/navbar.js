export const NavbarConfig = Object.freeze({

  // NAVBAR TITLE
  title : {

    logo : undefined,

  },

  // GLOBAL NAVBAR MENU
  menu : [

    { 
      icon: 'apps',
      to: '/',
      code : 'n_home',
      is_divider : false,
    },

    {
      icon: 'bubble_chart',
      code : 'n_inspire',
      to: '/inspire',
      is_divider : false,
    }
  ],

  // USER PREFERENCES
  user : [

    { url : '/preferences/infos', 
      title : 'infos',
      code : 'u_infos',
      is_divider : false,
      icon : 'far fa-user',
    },

    { url : '/preferences/password', 
      title : 'password',
      code : 'u_password',
      is_divider : false,
      icon : 'fas fa-unlock',
    },

    { url : '/logout', 
      title : 'logout',
      code : 'u_logout',
      is_divider : false,
      icon : 'fas fa-sign-out-alt',
    },

  ],

})
