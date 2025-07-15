import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
    return (
        <nav className="flex flex-wrap justify-between items-center gap-4 px-4 md:px-10 py-2 w-full">
            <span className="tracking-tighter text-2xl md:text-3xl font-extrabold text-primary flex gap-2 items-center">
                O-pay
            </span>
            <div className="ml-auto">
                <ModeToggle/>
            </div>
        </nav>
    );
}