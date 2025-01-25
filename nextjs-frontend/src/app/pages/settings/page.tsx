import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const Settings = () => {
  return (
    <DefaultLayout headerTitle={""}>
      <div className="mx-auto w-full max-w-[1080px]"></div>
    </DefaultLayout>
  );
};

export default Settings;
