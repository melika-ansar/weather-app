import { ReactNode } from "react";
import LoginPage from "../../pages/login/login";
import { ROUTES } from "./routes";
import WeatherPage from "../../pages/weather/weather";



interface Iroutes {
  path: string;
  element: ReactNode;
}

export const routesArray: Iroutes[] = [
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.weather,
    element: <WeatherPage />,
  },
];
