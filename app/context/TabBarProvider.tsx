import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { Animated, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabBarContextType {
  isTabBarVisible: boolean;
  showTabBar: () => void;
  hideTabBar: () => void;
  toggleTabBar: () => void;
  tabBarAnimatedValue: Animated.Value;
  handleScroll: (event: any) => void;
  tabBarHeight: number;
}

const TAB_BAR_HEIGHT = 40; // Adjust this to match your tab bar height

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const tabBarAnimatedValue = useRef(new Animated.Value(1)).current;
  const lastScrollY = useRef(0);
  const insets = useSafeAreaInsets();
  const tabBarHeight =
    TAB_BAR_HEIGHT + (Platform.OS === "ios" ? insets.bottom : 0);

  const showTabBar = () => {
    setIsTabBarVisible(true);
    Animated.spring(tabBarAnimatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideTabBar = () => {
    setIsTabBarVisible(false);
    Animated.spring(tabBarAnimatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const toggleTabBar = () => {
    if (isTabBarVisible) {
      hideTabBar();
    } else {
      showTabBar();
    }
  };

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY < 0) return; // Ignore overscroll
    if (currentScrollY > lastScrollY.current && isTabBarVisible) {
      hideTabBar();
    } else if (currentScrollY < lastScrollY.current && !isTabBarVisible) {
      showTabBar();
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <TabBarContext.Provider
      value={{
        isTabBarVisible,
        showTabBar,
        hideTabBar,
        toggleTabBar,
        tabBarAnimatedValue,
        handleScroll,
        tabBarHeight,
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error("useTabBar must be used within a TabBarProvider");
  }
  return context;
};
