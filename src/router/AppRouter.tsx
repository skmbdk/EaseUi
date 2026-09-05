import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ComponentLayout from "../layouts/ComponentLayout";
import HomePage from "../pages/HomePage";
import ButtonPage from "../pages/components/ButtonPage";
import CardPage from "@/pages/components/CardPage";
import ModalPage from "@/pages/components/ModalPage";
import InputPage from "@/pages/components/InputPage";
import NavbarPage from "@/pages/components/NavbarPage";
import TooltipPage from "@/pages/components/TooltipPage";
import DropdownPage from "@/pages/components/DropdownPage";
import TabsPage from "@/pages/components/TabsPage";
import AccordionPage from "@/pages/components/AccordionPage";
import BadgePage from "@/pages/components/BadgePage";
import AvatarPage from "@/pages/components/AvatarPage";
import ToastPage from "@/pages/components/ToastPage";
import SkeletonPage from "@/pages/components/SkeletonPage";
import SwitchPage from "@/pages/components/SwitchPage";
import DrawerPage from "@/pages/components/DrawerPage";
import DocumentationPage from "@/pages/DocumentationPage";

type Props = {};

const AppRouter = ({}: Props) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "documentation",
          element: <DocumentationPage />,
        },
        {
          path: "components",
          element: <ComponentLayout />,
          children: [
            {
              path: "button",
              element: <ButtonPage />,
            },
            {
              path: "card",
              element: <CardPage />,
            },
            {
              path: "modal",
              element: <ModalPage />,
            },
            {
              path: "input",
              element: <InputPage />,
            },
            {
              path: "navbar",
              element: <NavbarPage />,
            },
            {
              path: "tooltip",
              element: <TooltipPage />,
            },
            {
              path: "dropdown",
              element: <DropdownPage />,
            },
            {
              path: "tabs",
              element: <TabsPage />,
            },
            {
              path: "accordion",
              element: <AccordionPage />,
            },
            {
              path: "badge",
              element: <BadgePage />,
            },
            {
              path: "avatar",
              element: <AvatarPage />,
            },
            {
              path: "toast",
              element: <ToastPage />,
            },
            {
              path: "skeleton",
              element: <SkeletonPage />,
            },
            {
              path: "switch",
              element: <SwitchPage />,
            },
            {
              path: "drawer",
              element: <DrawerPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
