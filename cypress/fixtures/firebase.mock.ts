export const user_to_signup = () => ({
  email: "cypress@gmail.com",
  password: "cypress_password",
});

export const signup_new_user_response = () => ({
  kind: "identitytoolkit#SignupNewUserResponse",
  idToken: "id_token",
  email: "cypress@gmail.com",
  refreshToken: "refresh_token",
  expiresIn: "3600",
  localId: "local_id",
});

export const get_account_info_response = () => ({
  kind: "identitytoolkit#GetAccountInfoResponse",
  users: [
    {
      localId: "local_id",
      email: "cypress@gmail.com",
      passwordHash: "paswd_hash",
      emailVerified: false,
      passwordUpdatedAt: Date.now(),
      providerUserInfo: [
        {
          providerId: "password",
          federatedId: "cypress@gmail.com",
          email: "cypress@gmail.com",
          rawId: "cypress@gmail.com",
        },
      ],
      validSince: Date.now(),
      lastLoginAt: Date.now(),
      createdAt: Date.now(),
      lastRefreshAt: new Date().toLocaleDateString(),
    },
  ],
});
