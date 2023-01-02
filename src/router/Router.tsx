import { Route, Routes } from 'react-router-dom';
import pages from '@pages/pages';

const Router = () => (
  <Routes>
    <Route path='/'>
      <Route index element={<pages.Index />} />
      <Route path='auth' element={<pages.Auth.Index />} />
    </Route>
  </Routes>
);

export default Router;
