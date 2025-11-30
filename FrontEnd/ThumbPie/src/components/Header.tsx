import React from 'react'
import ATG from '@/assets/images/ATG.png'
import { useUserStore, selectIsAuthenticated } from "@/store/useUserStore";
import { cos } from 'three/tsl';


function Header() {
  const User = useUserStore((state) => state);
  const isAuthenticated = selectIsAuthenticated(User);
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-black shadow-md">
        <div>
          <img
            src={ATG}
            alt="ATG Logo"
            className="w-10 h-10 rounded-2xl bg-transparent outline-8 blur-out"
          />
        </div>
        <div className="text-black dark:text-white">
          
        </div>
        <div></div>
      </header>
    </>
  );
}

export default Header