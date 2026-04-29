import { createTheme } from "@mui/material/styles";
// import customPalette from "@/configs/palette";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
    interface Palette {
        mapOption: Palette["primary"];
    }

    interface PaletteOptions {
        mapOption?: PaletteOptions["primary"];
    }
}

// Update the Button"s color options to include an ochre option
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        mapOption: true;
    }
}

declare module "@mui/material/ButtonGroup" {
    interface ButtonGroupPropsColorOverrides {
        mapOption: true;
    }
}

// const THEME = createTheme({
//     palette: customPalette,
//     typography: {
//         fontFamily: "'Poppins', 'prompt' 'Roboto', 'Helvetica', 'Arial', sans-serif",
//     },
// });

// export default THEME;
