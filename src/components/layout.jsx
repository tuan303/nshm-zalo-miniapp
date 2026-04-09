import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";

import HomePage from "../pages/index";

const Layout = () => {
  let theme = "light";

  try {
    const systemInfo = getSystemInfo?.();
    if (systemInfo?.zaloTheme) {
      theme = systemInfo.zaloTheme;
    }
  } catch (error) {
    theme = "light";
  }

  return (
    <App theme={theme}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />}></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
