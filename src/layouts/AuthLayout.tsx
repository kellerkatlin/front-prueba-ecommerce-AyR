import { Outlet } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex lg:w-8/12 bg-[#F3F6FF] relative">
        <div className="absolute left-4 top-4 ">
          <img src="asd" alt="diamond" className="w-20" />
        </div>

        <div className="m-auto text-center px-10">
          <img src="asd" alt="Girl with laptop" className="max-w-xs mx-auto" />
          <p className="mt-4 font-semibold">
            <span className="text-2xl">Welcome to</span>
            <br />
            <span className="text-3xl font-bold">KellerKatlin Store</span>
          </p>
        </div>

        <div className="absolute right-3 bottom-2">
          <img src="as" alt="diamond" className="w-20" />
        </div>
      </aside>
      <main className="relative flex-grow flex items-center justify-center lg:w-4/12">
        <div className="w-full px-3 md:px-9 max-w-[420px]">
          <CardContent className="p-8">
            <Outlet />
          </CardContent>
        </div>

        <div className="absolute bottom-4 text-xs text-muted-foreground flex items-center gap-2">
          <span>© KellerKatlin</span>
          <span>·</span>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <span>·</span>
          <a href="/privacy" className="hover:underline">
            Privacy & terms
          </a>
        </div>
      </main>
    </div>
  );
}
