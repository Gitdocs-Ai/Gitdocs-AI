"use client";

import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LuGitPullRequestArrow } from "react-icons/lu";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export function AlertDialogDemo({
  commitData,
  setCommitData,
  content,
}: {
  commitData: any;
  setCommitData: any;
  content: string;
}) {
  const { user } = useUser();

  const handleCommit = async () => {
    if (
      !commitData.doc_name ||
      !commitData.message ||
      !content ||
      !commitData.branch
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await axios.post("/api/fetch/repositorydata", {
      user_id: user?.id,
      doc_name: commitData.doc_name,
      message: commitData.message,
      content: content,
      branch: commitData.branch,
    });

    if (response.status === 200) {
      toast.success("Changes committed successfully");
    } else {
      toast.error("Failed to commit changes");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-white text-sm flex items-center gap-2 cursor-pointer bg-[#3196E3] rounded-lg py-1 px-3">
          <LuGitPullRequestArrow size={16} />
          <span>Commit Changes</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            A new commit will be created in your repository. (This action cannot
            be undone)
            <br />
            <br />
            <div className="grid grid-cols-2 gap-4 text-[#ededed]">
              <div className="flex flex-col gap-2">
                <label htmlFor="message">Commit Message</label>
                <input
                  type="text"
                  placeholder="Commit Message"
                  className="w-full p-2 rounded-lg bg-[#171717] text-white border border-[#353535] focus:outline-none focus:border-[#3196E3]"
                  onChange={(e) =>
                    setCommitData({
                      ...commitData,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="branch">
                  Branch{" "}
                  <span className="text-xs text-[#999]">(Case Sensitive)</span>
                </label>
                <input
                  type="text"
                  placeholder="Branch"
                  className="w-full p-2 rounded-lg bg-[#171717] text-white border border-[#353535] focus:outline-none focus:border-[#3196E3]"
                  onChange={(e) =>
                    setCommitData({
                      ...commitData,
                      branch: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm py-[1.15rem] text-[#ededed] px-4 ms-auto rounded-lg border border-[#353535] bg-transparent hover:bg-transparent hover:text-[#ededed]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCommit}
            className="text-sm py-2 px-4 rounded-lg bg-[#ededed] text-black hover:bg-[#ededed]/90"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
