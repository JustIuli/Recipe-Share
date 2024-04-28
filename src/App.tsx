import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SignIn} from "./pages/SignIn.tsx";
import Recipes from "./pages/Recipes.tsx";
import Recipe from "./pages/Recipe.tsx";
import {Toaster} from "react-hot-toast";
import {ForgotPassword} from "./pages/ForgotPassword.tsx";
import AddRecipe from "./pages/AddRecipe.tsx";
import YourRecipes from "./pages/YourRecipes.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RecipeNotFound from "./pages/RecipeNotFound.tsx";
import Profile from "./pages/Profile.tsx";
import {HomePage} from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import SavedRecipes from "./pages/SavedRecipes.tsx";
import LikedRecipes from "./pages/LikedRecipes.tsx";
import Settings from "./pages/Settings.tsx";
function App() {

 const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />
        },
         {
             path: "/auth/sign-in",
             element: <SignIn />,
             errorElement: <ErrorPage />
         },
         {
             path: "/auth/sign-up",
             element: <SignUp />,
             errorElement: <ErrorPage />
         },
         {
             path: "/auth/forgot-password",
             element: <ForgotPassword />,
             errorElement: <ErrorPage />
         },
        {
             path: "/profile/:userUID",
             element: <Profile />,
             errorElement: <ErrorPage />
         },
         {
             path: "/recipes",
             element: <Recipes />,
             errorElement: <ErrorPage />
         },
         {
             path: "/recipes/create",
             element: <AddRecipe />,
             errorElement: <ErrorPage />
         },
         {
             path: "/settings",
             element: <Settings/>,
             errorElement: <ErrorPage />
         },
         {
             path: "/your-recipes",
             element: <YourRecipes />,
             errorElement: <ErrorPage />
         },
         {
             path: "/saved-recipes",
             element: <SavedRecipes />,
             errorElement: <ErrorPage />
         },
         {
             path: "/liked-recipes",
             element: <LikedRecipes />,
             errorElement: <ErrorPage />
         },
         {
             path: "/recipe-not-found",
             element: <RecipeNotFound />,
             errorElement: <ErrorPage />
         },
         {
             path: "/recipe/:slug",
             element: <Recipe />,
             errorElement: <ErrorPage />
         },
 ]);
  const theme = createTheme({

  });

  return (
      <MantineProvider theme={theme}>
          <RouterProvider router={router} />
          <Toaster/>
      </MantineProvider>
  )
}

export default App
