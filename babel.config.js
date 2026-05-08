module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./"],
                    alias: {
                        "@components": "./src/components",
                        "@styles": "./src/styles",
                        "@services": "./src/services",
                        "@config": "./src/config",
                        "@lib": "./src/lib",
                        "@assets": "./assets",
                        "@screens": "./src/screens",
                        "@context": "./src/context",
                    },
                },
            ],
            "react-native-reanimated/plugin",
        ],
    };
};
