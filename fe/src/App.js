import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/navbar/Navbar";
import Profile from "./pages/Profile";
import MyPetsPage from "./pages/MyPetsPage";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import AddPetPage from "./pages/AddPetPage";
import Dashboard from "./pages/Dashboard";
import PetPage from "./components/myPets/PetPage";
import ProtectedRouteAdmin from "./context/ProtectedRouteAdmin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets"
            element={
              <ProtectedRoute>
                <MyPetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addPet"
            element={
              <ProtectedRouteAdmin>
                <AddPetPage />
                </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteAdmin>
                <Dashboard />
                </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/petPage"
            element={
              <PetPage/>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
