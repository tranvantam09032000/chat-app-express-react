import {create} from "zustand"
import {axiosInstance} from "../lib/Axios";

export const useAuthStore = create((set)=> (
    {
        authUser: null,
        isSigningUp: false,
        isLoggingIng: false,
        isUpdateProfile: false,
        isCheckingAuth: true,
        checkAuth: async ()=> {
            try {
                const response = await axiosInstance.get("/auth/profile");
                set({authUser: response});
            }catch (error) {
                console.log("Error in checkAuth: ", error)
                set({authUser: null});
            }finally {
                set({isCheckingAuth: false});
            }
        }
    }
))