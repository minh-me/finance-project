import { authApi } from "~/apis/pre-built/1-auth.api";
import type {
  AuthUser,
  Login,
  Register,
  ResetPasswordWithOtp,
  ResetPasswordWithToken,
  SocialLogin,
} from "~/types/pre-built/1-auth";
import { handleError } from "~/utils/helpers/handle-error.helper";
import { storageHelper } from "~/utils/helpers/storage.helper";

export const useAuthStore = defineStore("auth", () => {
  const forgotPassSent = reactive({ isSent: false, email: "" });
  const authUser = ref<AuthUser | null>(storageHelper.getAuth());
  const loading = ref<boolean>(false);

  const login = async (input: Login) => {
    const data = await _asyncHandler(() => authApi.login(input));

    if (data) _setAuth(data);

    return data;
  };

  const register = async (input: Register) => {
    const data = await _asyncHandler(() => authApi.register(input));

    if (data) _setAuth(data);

    return data;
  };

  const socialLogin = async (input: SocialLogin) => {
    const data = await _asyncHandler(() => authApi.socialLogin(input));

    if (data) _setAuth(data);

    return data;
  };

  const logout = async () => {
    await _asyncHandler(() => authApi.logout());

    // navigateTo('/auth/login');
    _clearAuth();
  };

  const forgotPassword = async (email: string) => {
    const data = await _asyncHandler(() => authApi.forgotPassword(email));

    if (data) setForgotPassSent(true, data.email);
  };

  const resetPasswordWithToken = async (input: ResetPasswordWithToken) => {
    const data = await _asyncHandler(() =>
      authApi.resetPasswordWithToken(input),
    );

    if (data) {
      _setAuth(data);

      return data;
    }
  };

  const resetPasswordWithOtp = async (input: ResetPasswordWithOtp) => {
    const data = await _asyncHandler(() => authApi.resetPasswordWithOtp(input));

    if (data) {
      _setAuth(data);

      return data;
    }
  };

  const getAccessToken = async () => {
    if (!authUser.value) return null;

    const currentMS = new Date().getTime();
    const { accessToken, refreshToken } = authUser.value;

    if (accessToken.expiresAt > currentMS) return accessToken.token;

    if (refreshToken.expiresAt < currentMS) {
      _clearAuth();
      return null;
    }

    const data = await refreshAuthByRfToken(refreshToken.token);

    if (data) return data.accessToken.token;

    _clearAuth();
    return null;
  };

  const refreshAuthByRfToken = async (rfToken: string) => {
    try {
      const data = await authApi.refreshToken(rfToken);

      _setAuth(data);

      return data;
    } catch (error) {
      handleError(error);
      _clearAuth();

      return null;
    }
  };

  /**
   * Set auth
   *
   * @param data
   */
  const _setAuth = (data: AuthUser) => {
    authUser.value = { ...authUser.value, ...data };
    storageHelper.setAuth(authUser.value);
  };

  /**
   * Clear auth
   */
  const _clearAuth = () => {
    storageHelper.clearAuth();
    authUser.value = null;
  };

  const setForgotPassSent = (isSent: boolean, email?: string) => {
    forgotPassSent.isSent = isSent;

    if (email) forgotPassSent.email = email;
  };

  /**
   * async handler
   *
   * @param handler
   * @returns
   */
  const _asyncHandler = async (handler: () => Promise<any>) => {
    loading.value = true;

    try {
      const res = await handler();

      return res;
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    authUser,
    loading,
    login,
    register,
    logout,
    getAccessToken,
    setForgotPassSent,
    forgotPassword,
    forgotPassSent,
    socialLogin,
    resetPasswordWithOtp,
    resetPasswordWithToken,
  };
});
