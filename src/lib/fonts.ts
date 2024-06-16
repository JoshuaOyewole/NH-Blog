import { Roboto_Slab, Work_Sans } from "next/font/google";

export const RobotoSlab = Roboto_Slab({
    subsets: ["latin"],
    variable: "--font-roboto-slab",
    weight: ["400", "500", "600", "700", "800"],
});
export const Work = Work_Sans({
    subsets: ["latin"],
    variable: "--font-workSans",
    weight: ["400", "500", "600", "700", "800"],
});
