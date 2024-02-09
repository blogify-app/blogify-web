/**
 * Blogify
 * This module is used to emit user navigation metadata to AI in order to computed user preferences and other user related content
 */

import React, {PropsWithChildren, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "@/features/auth";
import {UserProvider} from "@/services/api";

export type ViewPostProps = PropsWithChildren<{
  pid: string;
  className?: string;
}>;

export const ViewPost = React.forwardRef<HTMLDivElement, ViewPostProps>(
  ({pid, children, ...props}, ref) => {
    const {view} = usePostAnalysis();
    return (
      <div {...props} role="button" onClick={() => view(pid)} ref={ref}>
        <Link to={`/posts/${pid}`}>{children}</Link>
      </div>
    );
  }
);

export const usePostAnalysis = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const view = useCallback(
    async (id: string) => {
      if (auth.user) {
        // emit view event to AI
        await UserProvider.viewPost(auth.user.id!, id);
      }
      return navigate(`/posts/${id}`);
    },
    [navigate, auth.user]
  );

  return {
    view,
  };
};
