import FrontPage from "./components/frontPage";
import Register from "./components/register";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import RecipeList from "./components/home";
import LikedRecipes from "./components/LikedRecipes";
import RecipeDetail from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import FileUploadForm from "./components/fileUploadForm";
import ImageDisplay from "./components/DisplayImage";
import AdminDashboard from "./components/AdminDashboard";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import UpgradeToPremium from "./components/upgradeToPremium";
import PremiumSuccess from "./components/premiumSuccess";
import ProtectedRoute from "./components/protectedRoutes";
import PremiumContent from "./components/premiumContent"
import MessagesPage from "./components/Chat";



function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // localStorage.clear()

  const values = { name, setName, email, setEmail, password, setPassword }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/home' element={<RecipeList />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        {/* <Route path="/add-recipe" element={<AddRecipe/>}/> */}
        <Route path="/upload" element={<FileUploadForm />} />
        <Route path="/display" element={<ImageDisplay />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/upgrade" element={<UpgradeToPremium />} />
        <Route path="/premium-success" element={<PremiumSuccess />} />
        <Route path="/liked-recipes" element={<LikedRecipes />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/premium-content" element={<PremiumContent />} />

        </Route>


      </Routes>
    </Router>
  )
}
export default App