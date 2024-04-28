import RecipesLayout from "../layouts/RecipesLayout.tsx";
import HeroSection from "../components/HeroSection.tsx";
import FeaturesSection from "../components/FeaturesSection.tsx";
import FooterSection from "../components/FooterSection.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import Loading from "./Loading.tsx";
export const HomePage = () => {

        const [user, loading] = useAuthState(auth);

        return (
            <RecipesLayout setRecipes={null} setUsingSearch={null}>
                    {loading ? <Loading /> : (
                        <> {/* @ts-expect-error: can't typehint this */}
                                <HeroSection user={user}/>
                                <FeaturesSection />
                                <FooterSection />
                        </>
                    )}
            </RecipesLayout>
        );
};