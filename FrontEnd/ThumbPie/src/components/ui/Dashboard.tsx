import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useHistoryStore } from "@/store/useHistoryStore";
import ContentCompo from "./ContentCompo";
import { FileUpload } from "./file-upload";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { useSessionStore } from "@/store/useSessionStore";
import { type sessionState } from "@/store/useSessionStore";
const url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
interface FormValue {
  prompt: string;
  UserImage: File[] | null;
}

async function SessionId({
  existingSessionId,
  setSessionDataMethod,
  userId,
  sessionLenght,
}: {
  existingSessionId: string | undefined;
  setSessionDataMethod: (data: sessionState) => void;
  userId: string;
  sessionLenght: number;
}) {
  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId = crypto.randomUUID();
  return await axios
    .post(`${url}api/v1/sessions/create-new-session`, {
      sessionId,
      sessionName: `Untitled session ${sessionLenght}`,
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
            userId,
            sessionName: `Untitled session ${sessionLenght}`,
            createdAt: Date.now().toLocaleString(),
            lastUpdated: Date.now().toLocaleString(),
          },
        ],
      });
      toast.success(res.data.message);
      return sessionId;
    })
    .catch((error) => {
      console.log("res error", error);
      toast.error(error?.response?.data?.message);
      return "";
    });
}

export function Dashboard() {
  const historyData = useHistoryStore((state) => state.data);
  const addNewHistory = useHistoryStore((state) => state.EditHistory);
  const userData = useUserStore((state) => state.user?.data);
  const SessionDataLength = useSessionStore((state) => state.data?.data.length);
  const createNewSession = useSessionStore((state) => state.setData);
  const [defaultValues, setDefaultValues] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValue>({
    defaultValues: {
      UserImage: null,
      prompt: "",
    },
  });

  useEffect(() => {
    reset();
  }, [defaultValues, reset]);

  useEffect(() => {
    if (errors.UserImage) {
      console.log("error", errors);
      toast.error(errors.UserImage?.message);
    }
    if (errors.prompt) {
      toast.error(errors.prompt.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.UserImage, errors.prompt]);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const formdata = new FormData();
    formdata.append("prompt", data.prompt);
    if (data.UserImage && data.UserImage.length > 0) {
      data.UserImage.map((file) => {
        formdata.append("UserImage", file);
      });
    }
    if (!userData) {
      toast.error("Token failed. Sign-In again to get a new token");
    }
    const sessionId = await SessionId({
      existingSessionId: historyData?.data[0].sessionId,
      setSessionDataMethod: createNewSession,
      userId: "userData![0]._id",
      sessionLenght: SessionDataLength as number,
    });

    console.log("session id retured from method ", sessionId);
    formdata.append("sessionId", sessionId);

    await axios
      .post(`${url}api/v1/images/image/new`, formdata)
      .then((res) => {
        addNewHistory(res.data);
        toast(res.data.message);
        setDefaultValues((prev) => !prev);
      })
      .catch((error) => {
        console.log("error in submitting the form", error);
        toast.error("Error in generating Image." + error.response.data.message);
      });
  };

  return (
    <>
      <main className="w-full text-black dark:text-white pb-[20%]">
        {historyData?.data ? (
          <main>
            {historyData.data.map((dataObj) => (
              <ContentCompo dataObj={dataObj} key={dataObj._id} />
            ))}
          </main>
        ) : (
          <main className="w-full h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-800">
            <span>
              <b>Prompt it, Generate it</b>
            </span>
          </main>
        )}
      </main>

      <div className="flex w-full gap-6 fixed bottom-7 justify-center items-center">
        <div className="w-[79%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <Controller
                control={control}
                name="prompt"
                rules={{ required: "prompt is required" }}
                render={({ field }) => (
                  <InputGroupTextarea
                    placeholder="Ask, Search or Chat..."
                    {...field}
                  />
                )}
              />

              <InputGroupAddon align="block-end">
                <div className="w-fit h-fit border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                  <Controller
                    control={control}
                    name="UserImage"
                    rules={{ required: "Image is required!!" }}
                    render={({ field }) => (
                      <FileUpload
                        onChange={(files) => field.onChange(files)}
                        defaultValues={defaultValues}
                      ></FileUpload>
                    )}
                  />
                </div>
                <InputGroupButton
                  variant="default"
                  className="rounded-full ml-auto"
                  size="icon-xs"
                  type="submit"
                >
                  <ArrowUpIcon />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </div>
    </>
  );
}
