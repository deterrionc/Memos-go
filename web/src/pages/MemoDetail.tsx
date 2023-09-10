import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import FloatingNavButton from "@/components/FloatingNavButton";
import Memo from "@/components/Memo";
import UserAvatar from "@/components/UserAvatar";
import useLoading from "@/hooks/useLoading";
import { useMemoStore, useUserStore } from "@/store/module";

const MemoDetail = () => {
  const params = useParams();
  const memoStore = useMemoStore();
  const userStore = useUserStore();
  const loadingState = useLoading();
  const [user, setUser] = useState<User>();
  const memoId = Number(params.memoId);
  const memo = memoStore.state.memos.find((memo) => memo.id === memoId);

  useEffect(() => {
    if (memoId && !isNaN(memoId)) {
      memoStore
        .fetchMemoById(memoId)
        .then(async (memo) => {
          const user = await userStore.getUserByUsername(memo.creatorUsername);
          setUser(user);
          loadingState.setFinish();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  }, [memoId]);

  return (
    <>
      <section className="relative top-0 w-full min-h-full overflow-x-hidden bg-zinc-100 dark:bg-zinc-800">
        <div className="relative w-full min-h-full mx-auto flex flex-col justify-start items-center pb-6">
          <div className="w-full flex flex-col justify-start items-center py-8">
            <UserAvatar className="!w-20 h-auto mb-4 drop-shadow" avatarUrl={user?.avatarUrl} />
            <div>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{user?.nickname}</p>
            </div>
          </div>
          {!loadingState.isLoading &&
            (memo ? (
              <>
                <main className="relative flex-grow max-w-2xl w-full min-h-full flex flex-col justify-start items-start px-4">
                  <Memo memo={memo} />
                </main>
              </>
            ) : (
              <>
                <p>Not found</p>
              </>
            ))}
        </div>
      </section>

      <FloatingNavButton />
    </>
  );
};

export default MemoDetail;
