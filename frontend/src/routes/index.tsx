import { lazy, Suspense } from "react";
import RootLayout from "@/layouts/RootLayout";
import { delayForLoading } from "@/utils/delay";
import Routes from "@/interfaces/route";
import { Spinner } from "@/components/ui/spinner";

const Home = lazy(() => delayForLoading(import("@/pages/Home")));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="bg-gradient-main">
        <Spinner className="size-10! absolute top-1/2 left-1/2 -translate-1/2" />
      </div>
    }
  >
    <RootLayout>{children}</RootLayout>
  </Suspense>
);

export const router: Routes[] = [
  {
    href: "/",
    id: "home",
    name: "Home",
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
];
