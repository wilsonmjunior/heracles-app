import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home } from "@screens/Home"
import { History } from "@screens/History"
import { Profile } from "@screens/Profile"
import { Exercise } from "@screens/Exercise"

type AppRoutesType = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
