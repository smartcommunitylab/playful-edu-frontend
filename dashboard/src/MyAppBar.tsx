import { useLayoutEffect, useState } from "react";
import { AppBar, Logout, UserMenu } from "react-admin";
import authProvider from "./provider/authProvider";

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
    const checkUserSignedIn = async () => {
      await authProvider
        .checkAuth({})
        .then(() => {
          setIsUserSignedIn(true);
        })
        .catch(() => {
          setIsUserSignedIn(false);
        });
    };

    checkUserSignedIn();
  }, []);

  return (
    <AppBar
      color="primary"
      userMenu={isUserSignedIn ? <CustomUserMenu /> : false}
    ></AppBar>
  );
};
