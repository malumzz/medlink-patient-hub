
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileHeader = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-white border-b px-4 md:hidden">
      <div className="flex items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#274D60]">
          <span className="text-lg font-bold text-white">M</span>
        </div>
        <span className="ml-2 text-xl font-bold text-[#274D60]">Mpilo Mobile</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="p-2"
      >
        <Menu size={24} />
      </Button>
    </header>
  );
};

export default MobileHeader;
