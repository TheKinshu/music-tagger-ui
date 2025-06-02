import { Api } from '@/api/Api';
import { camelize, snakeify } from '@/utils';
import { snakeCase } from 'lodash';

const apiClient = new Api({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`,
  timeout: import.meta.env.VITE_APP_AJAX_TIMEOUT ? parseInt(import.meta.env.VITE_APP_AJAX_TIMEOUT) : 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 400,
});


apiClient.instance.interceptors.request.use(
    (requestConfig) =>
        new Promise((resolve, reject) => {
            // const { bearerToken, activeCompanyId, accessLevel } = storeToRefs(useProfileStore());
            if (requestConfig.data && !(requestConfig.data instanceof window.FormData)) {
                requestConfig.data = snakeify(requestConfig.data);
            } else if (requestConfig.data instanceof window.FormData) {
                const newFormData = new FormData();
                requestConfig.data.forEach((value, key) => {
                    const snakeCaseKey = snakeCase(key);
                    newFormData.append(snakeCaseKey, value);
                });
                requestConfig.data = newFormData;
            }
            resolve(requestConfig);
            // if (accessLevel.value === 'guest') {
            //     return resolve(requestConfig);
            // }
            // keycloak
            //     .updateToken(10)
            //     .then((refreshed) => {
            //         console.log('Auth token refreshed?', refreshed);
            //         if (bearerToken.value) {
            //             requestConfig.headers.set('Authorization', 'Bearer ' + bearerToken.value, true);
            //         }
            //         if (activeCompanyId.value) {
            //             requestConfig.headers.set('x-company-id', activeCompanyId.value.toString(), true);
            //         }
            //         resolve(requestConfig);
            //     })
            //     .catch(reject);
        }),
    (error) => {
        console.log('>> Axios req error', error);
        return Promise.reject({
            description: 'Network error',
            error: 'request/error',
        });
    }
);

apiClient.instance.interceptors.response.use(
  (response) => {
    response.data = camelize(response.data);
    return response;
  }
  // (responseError) => {
  //     const { errorCode, errorMessage, isError } = storeToRefs(useAppStore());
  //     if (axios.isCancel(responseError)) {
  //         console.log('[axios]: Request canceled');
  //         return Promise.reject(responseError);
  //     }
  //     console.log('>> Axios response error', responseError);
  //     logger.error('Axios response error', responseError);
  //     if (responseError.response.status === 401) {
  //         const { logout } = useProfileStore();
  //         logout();
  //         return Promise.reject(
  //           responseError.response.data
  //             ? responseError.response.data
  //             : {
  //                 error: 'unauthorized',
  //                 description: 'Unauthorized',
  //             }
  //         );
  //     }
  //     if (responseError.response && responseError.response.data) {
  //         errorCode.value = responseError.response.status;
  //         errorMessage.value = responseError.response.data.detail;
  //         isError.value = true;
  //         return Promise.reject({ ...responseError.response.data, code: responseError.response.status });
  //     }
  //     return Promise.reject({
  //         detail: 'Unknown error',
  //         error: 'unknown-error',
  //     });
  // }
);

export default apiClient;
