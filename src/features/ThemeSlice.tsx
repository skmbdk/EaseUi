import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = {
  mode: "light" | "dark";
};

const applyThemeToDOM = (mode: "light" | "dark") => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }
};

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const nextMode = state.mode === "light" ? "dark" : "light";
      state.mode = nextMode;
      localStorage.setItem("theme", nextMode);
      applyThemeToDOM(nextMode);
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      const nextMode = action.payload === "dark" ? "dark" : "light";
      state.mode = nextMode;
      localStorage.setItem("theme", nextMode);
      applyThemeToDOM(nextMode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
