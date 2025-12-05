"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  Delete,
  MessageCircle,
  Pencil,
  SendHorizonal,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useSessionStore } from "@/store/useSessionStore";
import { useForm, type SubmitHandler } from "react-hook-form";
const url = import.meta.env.VITE_BACKEND_URL;
interface sessionObj {
  sessionId: string;
  userId: string;
  sessionName: string;
  createdAt?: string;
  lastUpdated?: string;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-[-webkit-fill-available] px-3.5 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0 z-10 border",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "65px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-3.5 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full z-10 border"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-100 flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  sessionObj,
  className,
  ...props
}: HTMLMotionProps<"main"> & {
  sessionObj?: sessionObj;
  className?: string;
}) => {
  const deleteSingleSessionFromSessionStore = useSessionStore(
    (state) => state.deleteSession
  );
  const editSingleSessionFromSessionStore = useSessionStore(
    (state) => state.EditSessionTitle
  );
  const { open, animate } = useSidebar();
  const [isInput, setIsInput] = useState(false);
  type inputeType = {
    sessionName: string;
  };
  const { register, handleSubmit } = useForm<inputeType>();
  const handleSingleSessionDelete = async () => {
    toast.warning("This action is irreversible. Are you sure to delete", {
      action: {
        label: "Sure",
        onClick: async () => {
          await axios
            .delete(`${url}api/v1/sessions/delete-single-session`, {
              data: { sessionId: sessionObj?.sessionId },
            })
            .then((res) => {
              if (res.data.statusCode == 200) {
                deleteSingleSessionFromSessionStore(sessionObj!.sessionId);
              }
              toast(res.data.message);
            })
            .catch((error) => {
              console.log("error from deleting single session", error);
              toast(error?.response?.data.message);
            });
        },
      },
    });
  };

  const handleEditSessionTitleMethod: SubmitHandler<inputeType> = async (
    data
  ) => {
    await axios
      .put(`${url}api/v1/sessions/edit-session-title`, {
        sessionName: data.sessionName,
        sessionId: sessionObj?.sessionId,
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          editSingleSessionFromSessionStore(
            sessionObj!.sessionId,
            data.sessionName
          );
        }
        toast(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => setIsInput(false));
  };
  return (
    <motion.main
      className={cn(
        "flex items-center justify-between bg-white group/sidebar dark:bg-black hover:bg-white dark:hover:bg-black p-1.5 rounded-2xl",
        className
      )}
      {...props}
      initial={{ opacity: 0.9, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.3,
        ease: "easeInOut",
      }}
      viewport={{once:true}}
      whileHover={{
        opacity: 0.4,
        transition: { delay: 0, duration: 0 },
      }}
    >
      <form
        onSubmit={handleSubmit(handleEditSessionTitleMethod)}
        className="flex justify-between w-full group/sidebar"
      >
        <div className="flex gap-2 items-center">
          <MessageCircle className="text-black dark:text-white" />
          {isInput ? (
            <motion.input
              defaultValue={sessionObj?.sessionName}
              animate={{
                display: animate
                  ? open
                    ? "inline-block"
                    : "none"
                  : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block m-0! w-[10em] overflow-clip outline-1 rounded-2xl p-3"
              {...register("sessionName")}
            ></motion.input>
          ) : (
            <motion.span
              animate={{
                display: animate
                  ? open
                    ? "inline-block"
                    : "none"
                  : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0! m-0!"
            >
              <b>{sessionObj?.sessionName}</b>
            </motion.span>
          )}
        </div>
        <div className="flex items-center bg gap-1">
          <span className=" bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-800 p-1.5 rounded-2xl">
            {isInput ? (
              <SendHorizonal
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit(handleEditSessionTitleMethod)();
                }}
              />
            ) : (
              <Pencil
                className="text-black dark:text-white"
                onClick={() => setIsInput(true)}
              />
            )}
          </span>
          <span className=" bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-800 p-1.5 rounded-2xl">
            {isInput ? (
              <Delete
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInput(false);
                }}
              />
            ) : (
              <Trash2
                className="text-black dark:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSingleSessionDelete();
                }}
              />
            )}
          </span>
        </div>
      </form>
    </motion.main>
  );
};
