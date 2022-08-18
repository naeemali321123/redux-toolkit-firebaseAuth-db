import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

let initialState = {};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    submitHandlar: (state, action) => {
      state = {
        ...action.payload,
        isProcessing: true,
        isAuthentication: false,
        uid: "",
        fullName: "",
        status: "",
      };
      toast("Loading...");
      console.log("submit action updated state", state);
      createAccount(state);
    },
    loginHandler: (state, action) => {
      state = {
        ...action.payload,
        isProcessing: true,
        isAuthentication: false,
        uid: "",
        fullName: "",
        status: "",
      };
      console.log("submit action updated state", state);
      signInAccount(state);
    },
    login: (state, action) => {
      state.isAuthentication = true;

      console.log("Account Login", state.isAuthentication);
    },
    logout: (state, action) => {
      const isAuthenticated = (state.isAuthentication = false);
      console.log("Account Logout", isAuthenticated);
    },
  },
});
export const { submitHandlar, login, logout, loginHandler } = authSlice.actions;
export default authSlice.reducer;


const createAccount = async (state) => {
  let { email, password, isProcessing, firstName, lastName } = state;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const fullName = (user.displayName = `${firstName} ${lastName}`);
      toast.success("Account Created");
      state.isAuthentication = true;
      state.uid = user.uid;
      state.fullName = fullName;
      console.log("Account created and state then user ", state, user);
      addDocOnFirebase(state);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode, errorMessage);
      console.log("acount created error", errorCode, errorMessage);
      // ..
    })
    .finally(() => {
      isProcessing = false;
      console.log("FINALLY isProcessing ", isProcessing);
    });
};

const addDocOnFirebase = async (state) => {
  try {
    const docData = state;

    await setDoc(doc(db, "users", state.uid), docData);
    toast.success("Data successfully set in firestore");
    console.log(
      "User info successfully add in fireStore data docData : ",
      docData
    );
  } catch (error) {
    console.log("Error: User Info add in db ", error);
  }
};


const signInAccount = async (state) => {
    toast("Loading...");
    state.isProcessing = true;
    console.log("clicked Login button", "isProcessing", state.isProcessing);
    await signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("ACCOUNT lOGIN SUCCESSFULY");
        console.log("Account Login Successfully Full Name ", user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${(errorCode, errorMessage)}`);
      })
      .finally(() => {
        state.isProcessing = false
      });
};
