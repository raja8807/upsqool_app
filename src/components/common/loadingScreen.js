import { Colors } from "@styles/colors";

const { ActivityIndicator, View } = require("react-native");


const LoadingScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={50}
                color={Colors.secondary} />
        </View>
    );
};

export default LoadingScreen;