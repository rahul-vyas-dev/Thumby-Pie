import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/useSessionStore";
import { toast } from "sonner";
import { SendHorizonal, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { selectUserData, useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import ATG from "@/assets/images/ATG.png";
import { useHistoryStore } from "@/store/useHistoryStore";
import { Dashboard } from "./Dashboard";

const url = import.meta.env.VITE_BACKEND_URL;

export function SidebarDemo() {
  const sessionObj = useSessionStore((state) => state.data);
  const clearSessionMethod = useSessionStore(
    (state) => state.clearSessionHistory
  );
  const setSessionDataMethod = useSessionStore((state) => state.setData);

  const userObj = useUserStore((state) => state);
  const [sessionLenght, setSessionLenght] = useState(
    sessionObj?.data.length as number
  );
  const user = selectUserData(userObj);
  if (!sessionObj) {
    toast.error("No history found!!");
    // console.log("");
  }
  const [open, setOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const handleClearSessionHistory = async () => {
    try {
      toast.warning("This action is irreversible.", {
        action: {
          label: "Sure",
          onClick: async () => {
            await axios
              .delete(`${url}api/v1/sessions/delete-all-sessions`)
              .then((res) => {
                clearSessionMethod();
                console.log("this is res", res);
                toast(res.data.message);
              })
              .catch((error) => {
                console.log("error", error);
                toast.error(error?.response?.data?.message);
              });
          },
        },
      });
    } catch (error) {
      toast(error as string);
    }
  };
  type inputs = {
    sessionName: string;
  };
  const { register, handleSubmit } = useForm<inputs>();
  
  const handleCreateNewSession: SubmitHandler<inputs> = async (data) => {
    const sessionId = crypto.randomUUID();
    await axios
      .post(`${url}api/v1/sessions/create-new-session`, {
        sessionId,
        sessionName: data.sessionName,
      })
      .then((res) => {
        console.log("res success", res);
        setSessionDataMethod({
          success: true,
          message: "New session created successfully",
          statusCode: 200,
          data: [
            {
              sessionId,
              userId: user?._id as string,
              sessionName: data.sessionName,
              createdAt: Date.now().toLocaleString(),
              lastUpdated: Date.now().toLocaleString(),
            },
          ],
        });
        toast.success(res.data.message);
        setSessionLenght(sessionLenght + 1);
      })
      .catch((error) => {
        console.log("res error", error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsInput(false);
      });
  };
  const setSessionHistoryData = useHistoryStore((state) => state.SetHistory);

  const handleLoadSingleSessionHistory = async (sessionId: string) => {
    await axios
      .post(`${url}api/v1/session-history/getSessionHistory`, {
        sessionId,
      })
      .then((res) => {
        toast(res?.data?.message);
        setSessionHistoryData(res.data);
      })
      .catch((error) => {
        console.log(error)
        toast(error?.response?.data?.message);
      });
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-7">
              {open ? (
                <Button>
                  {isInput ? (
                    <form
                      onSubmit={handleSubmit(handleCreateNewSession)}
                      className="flex gap-2"
                    >
                      <input
                        defaultValue={`Untitled Session ${sessionLenght}`}
                        {...register("sessionName")}
                      ></input>
                      <span onClick={handleSubmit(handleCreateNewSession)}>
                        <SendHorizonal />
                      </span>
                    </form>
                  ) : (
                    <>
                      <SquarePen />
                      <span onClick={() => setIsInput(!isInput)}>
                        Add New Chat
                      </span>
                    </>
                  )}
                </Button>
              ) : (
                <SquarePen />
              )}
              <div className="mt-8">
                {open ? (
                  <Button onClick={handleClearSessionHistory}>
                    <Trash2 />
                    <span>Clear History</span>
                  </Button>
                ) : (
                  <Trash2 />
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {sessionObj?.data.map((sessionObj) => (
                <SidebarLink
                  key={sessionObj.sessionId}
                  sessionObj={sessionObj}
                  onClick={() => {
                    handleLoadSingleSessionHistory(sessionObj.sessionId);
                  }}
                />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img
        src={ATG}
        className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-extrabold whitespace-pre text-black dark:text-white"
      >
        Ai Thumbnail Generator{" "}
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img
        src={ATG}
        className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
      />
    </a>
  );
};
