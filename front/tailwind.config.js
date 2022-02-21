module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {colors: {
            orange1: {
              DEFAULT: "#F45D22",
            },
            gray1: {
              DEFAULT: "#C4C4C4",
              w75: "#C1C2C2",
              g75: "#959696",
              g66: "#848585",
              g50: "#676868",
              g33: "#474849",
              g00: "#1E1F20",
              dark: "#5C5C5C",
            },
            black1: {
              DEFAULT: "#090B0C",
            },
          },
        },
    },
    
    variants: {},
    plugins: []
}