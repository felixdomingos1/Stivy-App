import {Stack, useRouter} from "expo-router";

export default function Layout() {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle:"Post"}} router={router}/>
        </Stack>
    )
}