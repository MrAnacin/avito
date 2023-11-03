import { FC } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import { useLoadCredentialsFromCookies } from './hooks/useLoadCredentialsFromCookies'
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage'
import { EditProductPage } from './pages/EditProductPage/EditProductPage'
import { CommentPage } from './pages/CommentPage/CommentPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainPage } from './pages/MainPage/MainPage'
import { NotFound } from './pages/NotFound/NotFound'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SellersPage } from './pages/SellersPage/SellersPage'
import { SignUpPage } from './pages/SignUpPage/SignUpPage'

export const ROUTES = {
  main: '/',
  login: '/login',
  signup: '/signup',
  product: '/product',
  createProduct: '/createproduct',
  editProduct: '/editproduct',
  signUp: '/signup',
  profile: '/profile',
  seller: '/seller',
  comments: '/comments',
}

type Props = {
  redirectPath?: string
  isLoggedIn?: boolean
}

const ProtectedRoute: FC<Props> = ({
  redirectPath = ROUTES.main,
  isLoggedIn,
}) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace={true} />
  }

  return <Outlet />
}

export const AppRoutes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <Routes>
      <Route path={ROUTES.main} element={<MainPage />} />
      <Route path={ROUTES.seller + '/:id'} element={<SellersPage />} />
      <Route path={ROUTES.product + '/:id'} element={<ProductPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />
      <Route path={ROUTES.comments + '/:id'} element={<CommentPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.createProduct} element={<CreateProductPage />} />
        <Route
          path={ROUTES.editProduct + '/:id'}
          element={<EditProductPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
