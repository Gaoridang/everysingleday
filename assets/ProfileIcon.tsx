import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

interface ProfileIconProps extends Omit<SvgProps, "color"> {
  focused: boolean;
  color: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  focused,
  color,
  ...props
}) => {
  const strokeWidth = 2;
  const webBlack = "#333333"; // Web-friendly black color

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx="12"
        cy="7"
        r="4"
        stroke={webBlack}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill={focused ? color : "none"}
      />
      <Path
        d="M5.33788 18.3206C5.99897 15.5269 8.77173 14 11.6426 14H12.3574C15.2283 14 18.001 15.5269 18.6621 18.3206C18.79 18.8611 18.8917 19.4268 18.9489 20.0016C19.0036 20.5512 18.5523 21 18 21H6C5.44772 21 4.99642 20.5512 5.0511 20.0016C5.1083 19.4268 5.20997 18.8611 5.33788 18.3206Z"
        stroke={webBlack}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? color : "none"}
      />
    </Svg>
  );
};

export default ProfileIcon;
