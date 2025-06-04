// src/store/useAuthStore.ts

import { create } from 'zustand'
import { authApi } from '@/services/auth'
import {
    createBaseActions,
    handleAsyncAction,
    BaseStoreState,
    BaseStoreActions,
} from '@/lib/storeUtils'

/** Matches the shape your backend returns for the authenticated user **/
interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    avatar?: string
}

interface AuthState extends BaseStoreState, BaseStoreActions {
    user: User | null
    isAuthenticated: boolean

    /** Initiates a “login” flow (CSRF → login → fetch current user) **/
    signIn: (email: string, password: string) => Promise<void>

    /** Creates a new account and then fetches current user **/
    signUp: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>

    /** Logs out on backend, clears user & isAuthenticated **/
    signOut: () => Promise<void>

    /** Sends “reset password” email to the given address **/
    resetPassword: (email: string) => Promise<void>

    /** Fetches /api/user (or equivalent) to see if someone is logged in **/
    getCurrentUser: () => Promise<void>

    /** Low-level setters (provided by createBaseActions) **/
    setUser: (user: User | null) => void
    setIsAuthenticated: (val: boolean) => void
    setLoading: (val: boolean) => void
    setError: (msg: string | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    // ─── Base actions from your storeUtils (setLoading, setError, etc.) ───────────
    ...createBaseActions(set),

    // ─── signIn: CSRF → login → fetch current user → clear flag ──────────────────
    signIn: async (email: string, password: string) => {
        // 1) Mark that we’re about to attempt login, so AppRoutes can decide to rehydrate
        sessionStorage.setItem('auth_attempted', 'true')

        await handleAsyncAction(
            async () => {
                // 2) Fetch CSRF token (e.g. for Laravel/Sanctum)
                await authApi.csrf()

                // 3) Call the login endpoint
                await authApi.login({ email, password })

                // 4) Now that login succeeded, fetch the “current user”
                await get().getCurrentUser()

                // 5) Remove the “auth_attempted” flag so we don’t rehydrate on future reloads
                sessionStorage.removeItem('auth_attempted')
            },
            get().setLoading,
            get().setError
        )
    },

    // ─── signUp: register → fetch current user → clear flag ────────────────────────
    signUp: async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        // 1) Indicate we’re attempting authentication
        sessionStorage.setItem('auth_attempted', 'true')

        await handleAsyncAction(
            async () => {
                // 2) Call the registration endpoint
                await authApi.register({ email, password, firstName, lastName })

                // 3) After registering, fetch current user so state is updated
                await get().getCurrentUser()

                // 4) Clear the flag (successful signup means session is live)
                sessionStorage.removeItem('auth_attempted')
            },
            get().setLoading,
            get().setError
        )
    },

    // ─── signOut: log out on backend, clear user/isAuthenticated, remove flag ──────
    signOut: async () => {
        await handleAsyncAction(
            async () => {
                await authApi.logout()

                // Clear both `user` and `isAuthenticated` in one shot
                set({ user: null, isAuthenticated: false })

                // Also remove the “auth_attempted” flag (just in case)
                sessionStorage.removeItem('auth_attempted')
            },
            get().setLoading,
            get().setError
        )
    },

    // ─── resetPassword: simply call the reset endpoint ────────────────────────────
    resetPassword: async (email: string) => {
        await handleAsyncAction(
            async () => {
                await authApi.resetPassword(email)
            },
            get().setLoading,
            get().setError
        )
    },

    // ─── getCurrentUser: calls /api/user (or equivalent) ──────────────────────────
    getCurrentUser: async () => {
        await handleAsyncAction(
            async () => {
                // 1) Pull “current user” from the backend
                const fetchedUser = await authApi.getCurrentUser()

                // 2) On success, stash it in state and mark as authenticated
                set({ user: fetchedUser, isAuthenticated: true })
            },
            get().setLoading,
            // 3) On failure (e.g. 401), clear user and isAuthenticated, and record error
            (error) => {
                set({ user: null, isAuthenticated: false, error })
            }
        )
    },
}))
