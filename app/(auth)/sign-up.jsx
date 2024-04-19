import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (!form.email || !form.password || !form.username) {
        Alert.alert("Error", "Please fill in all fields")
        return;
      }
      const result = await createUser(form.email, form.username, form.password);
      setUser(result);
      setIsLogged(true);
      router.replace("/home")
    } catch (e) {
        Alert.alert("Error", e.message);
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[83vh] px-4 w-full justify-center gap-y-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mb-3"
          />
          <Text className="text-white text-2xl font-psemibold mb-2">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            style="mt-7"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />
          <FormField
            title="Email"
            style="mt-7"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <FormField
            type="password"
            style="mt-7"
            title="Password"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <CustomButton isLoading={isLoading} text="Sign Up" style="mt-5" onPress={onSubmit} />

          <View className="flex-row  justify-center items-center gap-2">
            <Text className="text-base text-gray-100 text-center font-pregular">
             Have an Account already?
            </Text>
            <Link href="/sign-in" className="font-psemibold text-secondary">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
