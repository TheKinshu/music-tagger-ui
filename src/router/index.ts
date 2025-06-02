import ExpenseDashboard from '@/views/ExpenseDashboard.vue';

import { createRouter, createWebHistory } from 'vue-router';
import type { NavigationGuardNext, RouteRecordRaw, Router } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => ({
      name: 'Dashboard',
    }),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/tagger',
    name: 'Tagger',
    component: () => import('@/views/tagger/TaggerPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: () => ({
      name: 'Dashboard',
    }),
  },
];

const router: Router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
        offset: { y: 64 },
      };
    }
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach(async (to, from, next: NavigationGuardNext) => {
  console.log('[router:] Checking authentication for route:', to.path);

  if (to.hash) {
    const clearedHash = {
      ...to,
      hash: '',
    };
    return next(clearedHash);
  }

  // if (to.matched.some((record) => !record.meta.guestAccess)) {
  //   if (keycloak.authenticated) {
  //     console.log('[router:] User is authenticated');
  //     return next();
  //   } else {
  //     console.log('[router:] Not authenticated, redirecting to login');
  //     return keycloak.login({
  //       redirectUri: window.location.toString(),
  //       prompt: 'login',
  //     });
  //   }
  // }
  next();
});
export default router;
