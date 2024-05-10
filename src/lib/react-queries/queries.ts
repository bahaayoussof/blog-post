import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostById, getPosts } from "../api";
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

// export const useGetPostById = (id: number) => {
// 	return useQuery({
// 		queryKey: [QUERY_KEYS.GET_POST, id],
// 		queryFn: () => getPostById(id),
// 		enabled: !!id,
// 	});
// };
