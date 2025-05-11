import {
  Route,
  Routes,
  useLocation,
  Navigate,
  Outlet,
  useNavigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { OrderInfo, IngredientDetails, Modal } from '@components';
import { AppHeader } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { checkAuth } from '../../../src/services/slices/profileSlice';
import { fetchIngredients } from '../../../src/services/slices/ingredientsSlice';

export const ProtectedRoute = ({
  element,
  isProtected = true,
  redirectTo = '/login'
}: {
  element: ReactNode;
  isProtected: boolean;
  redirectTo?: string;
}) => {
  const { isAuthenticated, loading } = useSelector((state) => state.profile);

  if (loading) {
    return <p>Проверка авторизации...</p>;
  }

  if (isProtected && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Проверка токена при старте
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [isOpenOrderInfoModal, setIsOpenOrderInfoModal] =
    useState<boolean>(false);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Защищённые роуты */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute isProtected element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute isProtected element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute isProtected element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute isProtected element={<ProfileOrders />} />}
        />

        {/* Модальные окна */}
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='OrderInfo'
              onClose={() => setIsOpenOrderInfoModal(false)}
            >
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={() => window.history.back()}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              isProtected
              element={
                <Modal title='OrderInfo' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
