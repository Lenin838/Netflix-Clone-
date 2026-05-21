import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error(error.code.split('/')[1].split('-').join(' '));
            throw error;
        }
    };

    const signUp = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "user"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        } catch (error) {
            toast.error(error.code.split('/')[1].split('-').join(' '));
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const value = {
        user,
        login,
        signUp,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
