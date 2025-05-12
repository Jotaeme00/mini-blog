import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  // register
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setLoading(false);

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      const errors = {
        "auth/weak-password": "A senha deve conter pelo menos 6 caracteres.",
        "auth/email-already-in-use": "Email já cadastrado.",
        "auth/invalid-email": "Formato de e-mail inválido.",
      };

      systemErrorMessage =
        errors[error.code] || "Ocorreu um erro, tente novamente.";

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // login
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error.code);

      let systemErrorMessage;

      const errors = {
        "auth/user-not-found": "Usuário não encontrado.",
        "auth/wrong-password": "Senha incorreta.",
        "auth/invalid-email": "E-mail inválido.",
        "auth/too-many-requests":
          "Muitas tentativas. Tente novamente mais tarde.",
      };

      systemErrorMessage =
        errors[error.code] || "Ocorreu um erro, tente novamente.";

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
