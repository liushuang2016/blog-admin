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
        component: './Statistics/'
      },
      // posts
      {
        path: '/posts',
        name: 'posts',
        icon: 'bars',
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
        icon: 'user',
        routes: [
          {
            path: '/users/users',
            name: 'list',
            icon: 'table',
            component: './User/Users.js',
          }
        ]
      },
      // comments
      {
        path: '/comments',
        name: 'comments',
        icon: 'profile',
        routes: [
          {
            path: '/comments/comments',
            name: 'list',
            icon: 'table',
            component: './Comments/comments',
          }
        ]
      },
      // tags
      {
        path: '/tags',
        name: 'tags',
        icon: 'tags',
        routes: [
          {
            path: '/tags/tags',
            name: 'list',
            icon: 'table',
            component: './Tags/Tags',
          }
        ]
      },
      {
        component: '404',
      },
    ],
  },
];
