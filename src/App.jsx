import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Home from './pages/home/Home';
// import MyNavbar from './components/MyNavbar';
// import MyFooter from './components/MyFooter';
import Product from './pages/StorePages/Product'
import Store from './pages/StorePages/Store';
import Profile from './pages/profile/Profile';
import About from './pages/other/About';
import ContactUs from './pages/other/ContactUs';
import Cart from './pages/StorePages/Cart';
import Payment from './pages/StorePages/Payment';
import Orders from './pages/profile/Orders';
import Wishlist from './pages/profile/Wishlist';
import Donation from './pages/other/Donation';
import PrivacyPolicy from './pages/other/PrivacyPolicy';
import ShippingAndReturns from './pages/other/ShippingReturn';
import TermsAndConditions from './pages/other/TermsConditions';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminProduct from './pages/Admin/Products/AdminProduct';
import AdminUser from './pages/Admin/Users/AdminUser';
import Adduser from './pages/Admin/Users/AddUser';
import AddProduct from './pages/Admin/Products/AddProduct';
import EditProduct from './pages/Admin/Products/EditProduct';
import ProductView from './pages/Admin/Products/ProductView';
import UserView from './pages/Admin/Users/UserView';
import AdminOrder from './pages/Admin/Orders/AdminOrder';
import PageNotFound from './pages/other/PageNotFound';
import AdminRoute from './pages/Admin/Auth/AdminRoute';
import UserRoute from './pages/Auth/UserRoute';
import Test from './pages/test'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/test' element={<Test/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/store'>
          <Route path='/store' element={<Store/>}/>
          <Route path='/store/product/:productId' element={<Product/>}/>
        </Route>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<UserRoute><Cart/></UserRoute>}/>
        <Route path='/orders' element={<UserRoute><Orders/></UserRoute>}/>
        <Route path='/donation' element={<Donation/>}/>
        <Route path='/pp' element={<PrivacyPolicy/>}/>
        <Route path='/sr' element={<ShippingAndReturns/>}/>
        <Route path='/tc' element={<TermsAndConditions/>}/>
        <Route path='/wishlist' element={<UserRoute><Wishlist/></UserRoute>}/>
        <Route path='/payment' element={<UserRoute><Payment/></UserRoute>}/>
        <Route path='/store/:category' element={<Store/>}/>
        
        {/* admin  */}
        <Route path='/admin' >
          <Route path='/admin' element={<AdminRoute><Dashboard/></AdminRoute>}/>
          <Route path='/admin/products' element={<AdminRoute><AdminProduct/></AdminRoute>}/>
          <Route path='/admin/users' element={<AdminRoute><AdminUser/></AdminRoute>}/>
          <Route path='/admin/orders' element={<AdminRoute><AdminOrder/></AdminRoute>}/>
          <Route path='/admin/users/adduser' element={<AdminRoute><Adduser/></AdminRoute>}/>
          <Route path='/admin/products/addproduct' element={<AdminRoute><AddProduct/></AdminRoute>}/>
          <Route path='/admin/products/:category' element={<AdminRoute><AdminProduct/></AdminRoute>}/>
          <Route path='/admin/products/editproduct/:productId' element={<AdminRoute><AdminProduct/></AdminRoute>}/>
          <Route path='/admin/products/product/:productId' element={<AdminRoute><ProductView/></AdminRoute>}/>
          <Route path='/admin/users/user/:userId' element={<AdminRoute><UserView/></AdminRoute>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
