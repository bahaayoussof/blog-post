import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { QUERY_KEYS } from "./queryKeys";

export const useGetPosts = () => {
	return useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_POSTS],
		queryFn: ({ pageParam }) => getPosts({ pageParam }),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length > 0 ? allPages.length + 1 : undefined;
		},
		initialPageParam: 1,
	});
};
