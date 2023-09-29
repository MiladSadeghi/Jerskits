import { lazy } from 'react'

const Layout = lazy(() => import('./Layout'))
const AuthenticationLayout = lazy(() => import('./AuthLayout/AuthLayout'))
const ProfileLayout = lazy(() => import('./ProfileLayout/ProfileLayout'))

export { Layout, AuthenticationLayout, ProfileLayout }
