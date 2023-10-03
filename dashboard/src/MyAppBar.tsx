import { useLayoutEffect, useState } from "react";
import { AppBar, Logout, UserMenu } from "react-admin";
import authProvider from "./authProvider";

const CustomUserMenu = () => {
  return (
    <UserMenu>
      <Logout />
    </UserMenu>
  );
};

export const MyAppBar = (props: any) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useLayoutEffect(() => {
    setIsUserSignedIn(authProvider.isUserSignedIn());
  }, [authProvider.isUserSignedIn()]);

  return (
    <AppBar
      color="primary"
      userMenu={isUserSignedIn ? <CustomUserMenu /> : false}
    ></AppBar>
  );
};
