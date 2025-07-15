import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
    return (
        <nav className="flex justify-between gap-4 mx-10 py-2">
            <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
                O-pay
            </span>
            <ModeToggle/>
        </nav>
    );
}