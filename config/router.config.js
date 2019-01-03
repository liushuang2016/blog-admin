export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './User/Login' }
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      // posts
      {
        path: '/posts',
        name: 'posts',
        icon: 'table',
        routes: [
          {
            path: '/posts/list',
            name: 'list',
            icon: 'table',
            component: './Posts/posts.js',
          },
          {
            path: '/posts/create',
            name: 'create',
            icon: 'form',
            component: './Posts/create.js',
          }
        ]
      },
      // users
      {
        path: '/users',
        name: 'users',
        icon: 'table',
        component: './Dashboard/Analysis'
      },
      // tags
      {
        path: '/tags',
        name: 'tags',
        icon: 'table',
        component: './Dashboard/Analysis'
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              }
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
