import { useHistoryStore } from "@/store/useHistoryStore";
import axios from "axios";
import { Copy, Delete, Pencil, Send, Trash } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./Button";

const url = import.meta.env.VITE_BACKEND_URL;

interface dataObj {
  _id: string;
  userId: string;
  prompt: string;
  sessionId: string;
  imageUrl?: string[];
  GeneratedImageUrl?: string[];
  ImagePublicId?: string[];
  AiImagePublicId?: string[];
  createdAt: Date;
}

function ContentCompo({
  dataObj,
  className,
  ...props
}: {
  className?: string;
  dataObj: dataObj;
}) {
  const deleteSessionHistory = useHistoryStore((state) => state.DeleteHistory);
  const addEditedSessionHistory = useHistoryStore((state) => state.EditHistory);
  const handleHistoryObjectDelete = async () => {
    toast.warning("This action is irreversible.", {
      action: {
        label: "Sure",
        onClick: async () => {
          await axios
            .delete(`${url}api/v1/session-history/deleteSessionChat`, {
              data: {
                data: dataObj,
              },
            })
            .then((res) => {
              deleteSessionHistory(dataObj._id);
              toast(res?.data?.message);
            })
            .catch((error) => {
              console.log("error is ", error);
              toast.error(error?.response?.data?.message);
            });
        },
      },
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(dataObj.prompt);
    toast("Prompt copied successfully");
  };

  interface prompt {
    userPrompt: string;
  }

  const [isInput, setIsInput] = useState(false);
  const { register, handleSubmit } = useForm<prompt>();

  const handleEditSessionHistory: SubmitHandler<prompt> = async (data) => {
    await axios
      .put(`${url}api/v1/images/image/edit`, {
        sessionId: dataObj.sessionId,
        prompt: data.userPrompt,
        _id: dataObj._id,
      })
      .then((res) => {
        addEditedSessionHistory(res?.data);
        toast(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div
      className={`${className} p-9 w-full flex flex-col gap-6 h-fit`}
      {...props}
    >
      {/* USER CONTENT (RIGHT SIDE) */}
      <div className="flex flex-col items-end text-right gap-2">
        {/* User images */}
        {dataObj.imageUrl?.map((imageUrl) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt="User Image"
            className="rounded-3xl w-1/3"
          />
        ))}

        {/* User prompt */}
        <form
          onSubmit={handleSubmit(handleEditSessionHistory)}
          className="mt-2"
        >
          {isInput ? (
            <textarea
              {...register("userPrompt")}
              defaultValue={dataObj.prompt}
              className="flex-1 resize-none rounded-3xl border-0 bg-transparent p-3 shadow-none focus-visible:ring-0 "
            />
          ) : (
            <b className="rounded-xl p-2 max-w-[60%] wrap-break-word bg-transparent border">
              {dataObj.prompt}
            </b>
          )}
          <div className="flex gap-3 mt-3.5 justify-end hover:bg-gray-200 border p-1.5 rounded-2xl dark:hover:bg-gray-800 ">
            {isInput ? (
              <Button type="submit">
                <Send />
              </Button>
            ) : (
              <Pencil
                onClick={() => {
                  setIsInput(true);
                }}
              />
            )}
            <Copy onClick={handleCopyPrompt} />
            {isInput ? (
              <Delete
                onClick={() => {
                  setIsInput(false);
                }}
              />
            ) : (
              <Trash onClick={handleHistoryObjectDelete} />
            )}
          </div>
        </form>
      </div>

      {/* AI CONTENT (LEFT SIDE) */}
      <div className="flex flex-col items-start gap-2">
        {dataObj.GeneratedImageUrl?.map((imageUrl) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt="AI Generated"
            className="rounded-3xl w-1/3"
          />
        ))}
        <div
          className="flex gap-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 p-1.5 rounded-2xl"
          onClick={() => {
            dataObj.GeneratedImageUrl?.map((url) => {
              navigator.clipboard.writeText(url);
            });
            toast('URLs copied successfully')
          }}
        >
          <Copy />
          <b>COPY URL</b>
        </div>
      </div>
    </div>
  );
}

export default ContentCompo;
